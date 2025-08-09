import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { Company, Environment } from '../types/company';
import { ksefApi } from '../services/ksefApi';
import {
  getCompanies, upsertCompany,
  getActiveCompany, getActiveCompanyId, setActiveCompanyId, removeCompany as removeCompanyStore
} from '../services/companyStore';

type Ctx = {
  companies: Company[];
  activeCompany: Company | null;
  setActive: (id: string | null) => void;
  addCompanyFromLookup: (id: string, environment: Environment) => Promise<Company>;
  removeCompany: (id: string) => void;
};

const CompanyContext = createContext<Ctx | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(() => getCompanies());
  const [activeCompany, setActiveCompany] = useState<Company | null>(() => getActiveCompany());

  useEffect(() => {
    // keep state in sync with storage (in case other tabs modify it)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'pi_companies') setCompanies(getCompanies());
      if (e.key === 'pi_activeCompanyId') setActiveCompany(getActiveCompany());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setActive = useCallback((id: string | null) => {
    setActiveCompanyId(id);
    setActiveCompany(id ? getCompanies().find(c => c.id === id) || null : null);
  }, []);

  const removeCompany = useCallback((id: string) => {
    removeCompanyStore(id);
    setCompanies(getCompanies());
    const currentActive = getActiveCompanyId();
    if (currentActive === id) setActive(null);
  }, [setActive]);

  const addCompanyFromLookup = useCallback(async (id: string, environment: Environment) => {
    const resp = await ksefApi.lookupCompany(id, environment === 'production' ? 'production' : 'test');
    // Map backend response to Company entity
    const data = resp?.data || resp; // handle either wrapped or plain
    const company: Company = {
      id: `${(data.nip || id)}:${environment}`,
      name: data.name || data.shortName || 'Unknown company',
      nip: data.nip,
      regon: data.regon,
      address: [data.street, data.houseNumber, data.city, data.postalCode].filter(Boolean).join(', '),
      environment,
      createdAt: new Date().toISOString(),
    };
    upsertCompany(company);
    setCompanies(getCompanies());
    setActive(company.id);
    return company;
  }, [setActive]);

  const value = useMemo<Ctx>(() => ({
    companies,
    activeCompany,
    setActive,
    addCompanyFromLookup,
    removeCompany,
  }), [companies, activeCompany, setActive, addCompanyFromLookup, removeCompany]);

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
};

export const useCompanyContext = () => {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error('useCompanyContext must be used within CompanyProvider');
  return ctx;
};
