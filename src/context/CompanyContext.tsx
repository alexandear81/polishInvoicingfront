import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { Company, Environment } from '../types/company';
import { ksefApi } from '../services/ksefApi';
import { useAuth } from './AuthContext';
import {
  getCompaniesForUser,
  saveCompanyForUser,
  removeCompanyForUser,
  getActiveCompanyIdForUser,
  setActiveCompanyIdForUser,
} from '../services/firebaseCompanyStore';
import {
  getCompanies,
  saveCompanies,
  upsertCompany,
  getActiveCompany,
  getActiveCompanyId,
  setActiveCompanyId,
  removeCompany as removeCompanyStore
} from '../services/companyStore';

type Ctx = {
  companies: Company[];
  activeCompany: Company | null;
  setActive: (id: string | null) => void;
  addCompanyFromLookup: (id: string, environment: Environment) => Promise<Company>;
  removeCompany: (id: string) => void;
  loading: boolean;
};

const CompanyContext = createContext<Ctx | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>(() => getCompanies());
  const [activeCompany, setActiveCompany] = useState<Company | null>(() => getActiveCompany());
  const [loading, setLoading] = useState(false);

  // Sync with Firebase when user logs in
  useEffect(() => {
    if (!user) return;

    const syncWithFirebase = async () => {
      setLoading(true);
      try {
        // Get data from both sources
        const localCompanies = getCompanies();
        const firebaseCompanies = await getCompaniesForUser(user);
        const firebaseActiveId = await getActiveCompanyIdForUser(user);

        // Merge companies (Firebase takes precedence for conflicts)
        const mergedCompanies = [...firebaseCompanies];
        localCompanies.forEach(localComp => {
          if (!mergedCompanies.find(fbComp => fbComp.id === localComp.id)) {
            mergedCompanies.push(localComp);
            // Save new local company to Firebase
            saveCompanyForUser(user, localComp).catch(console.error);
          }
        });

        // Update localStorage with merged data
        saveCompanies(mergedCompanies);
        setCompanies(mergedCompanies);

        // Set active company (Firebase preference, then local)
        const activeId = firebaseActiveId || getActiveCompanyId();
        if (activeId) {
          const active = mergedCompanies.find(c => c.id === activeId);
          if (active) {
            setActiveCompanyId(activeId);
            setActiveCompany(active);
            // Sync active company to Firebase if it was local-only
            if (!firebaseActiveId) {
              setActiveCompanyIdForUser(user, activeId).catch(console.error);
            }
          }
        }
      } catch (error) {
        console.error('Failed to sync with Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    syncWithFirebase();
  }, [user]);

  // Keep localStorage in sync with state changes
  useEffect(() => {
    saveCompanies(companies);
  }, [companies]);

  const setActive = useCallback(async (id: string | null) => {
    // Update localStorage immediately
    setActiveCompanyId(id);
    const active = id ? companies.find(c => c.id === id) || null : null;
    setActiveCompany(active);

    // Sync to Firebase if user is logged in
    if (user) {
      try {
        await setActiveCompanyIdForUser(user, id);
      } catch (error) {
        console.error('Failed to sync active company to Firebase:', error);
      }
    }
  }, [user, companies]);

  const removeCompany = useCallback(async (id: string) => {
    // Update localStorage immediately
    removeCompanyStore(id);
    const updatedCompanies = getCompanies();
    setCompanies(updatedCompanies);
    
    if (getActiveCompanyId() === id) {
      await setActive(null);
    }

    // Sync to Firebase if user is logged in
    if (user) {
      try {
        await removeCompanyForUser(user, id);
      } catch (error) {
        console.error('Failed to remove company from Firebase:', error);
      }
    }
  }, [user, setActive]);

  const addCompanyFromLookup = useCallback(async (id: string, environment: Environment) => {
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
    
    // Update localStorage immediately
    upsertCompany(company);
    setCompanies(getCompanies());
    await setActive(company.id);

    // Sync to Firebase if user is logged in
    if (user) {
      try {
        await saveCompanyForUser(user, company);
      } catch (error) {
        console.error('Failed to save company to Firebase:', error);
      }
    }

    return company;
  }, [user, setActive]);

  const value = useMemo<Ctx>(() => ({
    companies,
    activeCompany,
    setActive,
    addCompanyFromLookup,
    removeCompany,
    loading
  }), [companies, activeCompany, setActive, addCompanyFromLookup, removeCompany, loading]);

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};

export const useCompanyContext = () => {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error('useCompanyContext must be used within CompanyProvider');
  return ctx;
};
