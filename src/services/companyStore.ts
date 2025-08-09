import type { Company } from '../types/company';

const COMPANIES_KEY = 'pi_companies';
const ACTIVE_COMPANY_KEY = 'pi_activeCompanyId';

export function getCompanies(): Company[] {
  try {
    const raw = localStorage.getItem(COMPANIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCompanies(companies: Company[]) {
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
}

export function upsertCompany(company: Company) {
  const companies = getCompanies();
  const idx = companies.findIndex(c => c.id === company.id);
  if (idx >= 0) companies[idx] = { ...companies[idx], ...company };
  else companies.push(company);
  saveCompanies(companies);
}

export function removeCompany(id: string) {
  const companies = getCompanies().filter(c => c.id !== id);
  saveCompanies(companies);
  const activeId = getActiveCompanyId();
  if (activeId === id) setActiveCompanyId(null);
}

export function getActiveCompanyId(): string | null {
  return localStorage.getItem(ACTIVE_COMPANY_KEY);
}

export function setActiveCompanyId(id: string | null) {
  if (id) localStorage.setItem(ACTIVE_COMPANY_KEY, id);
  else localStorage.removeItem(ACTIVE_COMPANY_KEY);
}

export function getActiveCompany(): Company | null {
  const id = getActiveCompanyId();
  if (!id) return null;
  return getCompanies().find(c => c.id === id) || null;
}
