import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import type { Client } from '../types/client';
import type { Environment } from '../types/company';
import { useAuth } from './AuthContext';
import { useCompanyContext } from './CompanyContext';
import { ksefApi } from '../services/ksefApi';
import {
  getClientsForSeller,
  saveClientForUser,
  removeClientForUser,
  updateClientLastUsed
} from '../services/firebaseClientStore';

type Ctx = {
  clients: Client[];
  addClientFromLookup: (id: string, sellerId: string, environment: Environment) => Promise<Client>;
  removeClient: (clientId: string) => void;
  refreshClients: () => void;
  markClientUsed: (clientId: string) => void;
};

const ClientContext = createContext<Ctx | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { activeCompany } = useCompanyContext();
  const [clients, setClients] = useState<Client[]>([]);

  const refreshClients = useCallback(async () => {
    if (!user || !activeCompany) {
      setClients([]);
      return;
    }
    
    try {
      const clientList = await getClientsForSeller(user, activeCompany.id);
      setClients(clientList);
    } catch (error) {
      console.error('Failed to load clients:', error);
    }
  }, [user, activeCompany]);

  // Load clients when active company changes
  React.useEffect(() => {
    refreshClients();
  }, [refreshClients]);

  const addClientFromLookup = useCallback(async (id: string, sellerId: string, environment: Environment) => {
    if (!user) throw new Error('User must be logged in');
    
    const resp = await ksefApi.lookupCompany(id, environment === 'production' ? 'production' : 'test');
    const data = resp?.data || resp;
    const client: Client = {
      id: `${sellerId}_${(data.nip || id)}:${environment}`,
      sellerId,
      name: data.name || data.shortName || 'Unknown client',
      nip: data.nip,
      regon: data.regon,
      address: [data.street, data.houseNumber, data.city, data.postalCode].filter(Boolean).join(', '),
      email: '', // Can be filled later
      environment,
      createdAt: new Date().toISOString(),
    };
    
    await saveClientForUser(user, client);
    await refreshClients();
    return client;
  }, [user, refreshClients]);

  const removeClient = useCallback(async (clientId: string) => {
    if (!user) return;
    
    try {
      await removeClientForUser(clientId);
      await refreshClients();
    } catch (error) {
      console.error('Failed to remove client:', error);
    }
  }, [refreshClients]);

  const markClientUsed = useCallback(async (clientId: string) => {
    if (!user) return;
    
    try {
      await updateClientLastUsed(clientId);
      await refreshClients();
    } catch (error) {
      console.error('Failed to update client usage:', error);
    }
  }, [refreshClients]);

  const value = useMemo<Ctx>(() => ({
    clients,
    addClientFromLookup,
    removeClient,
    refreshClients,
    markClientUsed
  }), [clients, addClientFromLookup, removeClient, refreshClients, markClientUsed]);

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};

export const useClientContext = () => {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error('useClientContext must be used within ClientProvider');
  return ctx;
};
