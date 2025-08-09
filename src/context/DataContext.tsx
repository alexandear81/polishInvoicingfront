import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import type { Company, Environment } from '../types/company';
import type { Client } from '../types/client';
import { useAuth } from './AuthContext';
import { ksefApi } from '../services/ksefApi';
import {
  getCompaniesForUser,
  saveCompanyForUser,
  removeCompanyForUser,
  getActiveCompanyIdForUser,
  setActiveCompanyIdForUser,
} from '../services/firebaseCompanyStore';
import {
  getClientsForSeller,
  saveClientForUser,
  removeClientForUser,
  updateClientLastUsed
} from '../services/firebaseClientStore';
// Future collections can be imported here as needed

type DataState = {
  companies: Company[];
  clients: Client[];
  activeCompany: Company | null;
  // Future collections: invoices: Invoice[], customers: Customer[], etc.
};

type DataActions = {
  // Company actions
  addCompanyFromLookup: (id: string, environment: Environment) => Promise<Company>;
  setActiveCompany: (id: string | null) => void;
  removeCompany: (id: string) => void;
  
  // Client actions
  addClientFromLookup: (id: string, sellerId: string, environment: Environment) => Promise<Client>;
  removeClient: (clientId: string) => void;
  markClientUsed: (clientId: string) => void;
  
  // Generic refresh
  refreshAll: () => void;
  refreshCompanies: () => void;
  refreshClients: () => void;
};

type Ctx = DataState & DataActions & { loading: boolean };

const DataContext = createContext<Ctx | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState<DataState>({
    companies: [],
    clients: [],
    activeCompany: null,
  });
  const [loading, setLoading] = useState(false);

  // Refresh functions
  const refreshCompanies = useCallback(async () => {
    if (!user) return [];
    const companies = await getCompaniesForUser(user);
    const activeId = await getActiveCompanyIdForUser(user);
    const activeCompany = activeId ? companies.find(c => c.id === activeId) || null : null;
    
    setState(prev => ({ ...prev, companies, activeCompany }));
    return companies;
  }, [user]);

  const refreshClients = useCallback(async () => {
    if (!user || !state.activeCompany) return [];
    const clients = await getClientsForSeller(user, state.activeCompany.id);
    setState(prev => ({ ...prev, clients }));
    return clients;
  }, [user, state.activeCompany]);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    try {
      await refreshCompanies();
      // refreshClients will be called automatically when activeCompany changes
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setLoading(false);
    }
  }, [refreshCompanies]);

  // Load data when user or activeCompany changes
  React.useEffect(() => {
    refreshAll();
  }, [user]);

  React.useEffect(() => {
    refreshClients();
  }, [state.activeCompany?.id]);

  // Company actions
  const addCompanyFromLookup = useCallback(async (id: string, environment: Environment) => {
    if (!user) throw new Error('User must be logged in');
    
    const resp = await ksefApi.lookupCompany(id, environment === 'production' ? 'production' : 'test');
    const data = resp?.data || resp;
    const company: Company = {
      id: `${(data.nip || id)}:${environment}`,
      name: data.name || data.shortName || 'Unknown company',
      nip: data.nip,
      regon: data.regon,
      address: [data.street, data.houseNumber, data.city, data.postalCode].filter(Boolean).join(', '),
      environment,
      createdAt: new Date().toISOString(),
    };
    
    await saveCompanyForUser(user, company);
    await refreshCompanies();
    await setActiveCompany(company.id);
    return company;
  }, [user, refreshCompanies]);

  const setActiveCompany = useCallback(async (id: string | null) => {
    if (!user) return;
    
    try {
      await setActiveCompanyIdForUser(user, id);
      const active = id ? state.companies.find(c => c.id === id) || null : null;
      setState(prev => ({ ...prev, activeCompany: active }));
    } catch (error) {
      console.error('Failed to set active company:', error);
    }
  }, [user, state.companies]);

  const removeCompany = useCallback(async (id: string) => {
    if (!user) return;
    
    try {
      await removeCompanyForUser(user, id);
      if (state.activeCompany?.id === id) {
        await setActiveCompany(null);
      }
      await refreshCompanies();
    } catch (error) {
      console.error('Failed to remove company:', error);
    }
  }, [user, state.activeCompany, setActiveCompany, refreshCompanies]);

  // Client actions
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
      email: '',
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
  }, [user, refreshClients]);

  const markClientUsed = useCallback(async (clientId: string) => {
    if (!user) return;
    
    try {
      await updateClientLastUsed(clientId);
      await refreshClients();
    } catch (error) {
      console.error('Failed to update client usage:', error);
    }
  }, [user, refreshClients]);

  const value = useMemo<Ctx>(() => ({
    ...state,
    loading,
    addCompanyFromLookup,
    setActiveCompany,
    removeCompany,
    addClientFromLookup,
    removeClient,
    markClientUsed,
    refreshAll,
    refreshCompanies,
    refreshClients,
  }), [state, loading, addCompanyFromLookup, setActiveCompany, removeCompany, addClientFromLookup, removeClient, markClientUsed, refreshAll, refreshCompanies, refreshClients]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Convenience hooks for specific data types
export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDataContext must be used within DataProvider');
  return ctx;
};

export const useCompanies = () => {
  const { companies, activeCompany, addCompanyFromLookup, setActiveCompany, removeCompany } = useDataContext();
  return { companies, activeCompany, addCompanyFromLookup, setActiveCompany, removeCompany };
};

export const useClients = () => {
  const { clients, addClientFromLookup, removeClient, markClientUsed } = useDataContext();
  return { clients, addClientFromLookup, removeClient, markClientUsed };
};
