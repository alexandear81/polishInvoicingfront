import React, { useState, useEffect } from 'react';
import { useCompanies } from '../context/DataContext';
import type { Environment } from '../types/company';

const CompanySelector: React.FC = () => {
  const ctx = useCompanies();
  const { activeCompany, addCompanyFromLookup } = ctx as any;
  const companies = (ctx as any)?.companies || [];
  const setActiveCompany = (ctx as any)?.setActiveCompany;
  const setActiveCompanyId = (ctx as any)?.setActiveCompanyId;

  const [id, setId] = useState('');
  const [env, setEnv] = useState<Environment>('production');
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>(() => (activeCompany?.nip || activeCompany?.regon) || '');

  useEffect(() => {
    setSelectedKey((activeCompany?.nip || activeCompany?.regon) || '');
  }, [activeCompany]);

  const onAdd = async () => {
    if (!id.trim()) return alert('Provide NIP or REGON');
    try {
      setLoading(true);
      await addCompanyFromLookup(id.trim().replace(/\s|-/g, ''), env);
    } catch (e: any) {
      alert(`Lookup failed: ${e?.message || 'Unknown error'}`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    const selected = companies.find((c: any) => (c.nip || c.regon) === key);
    if (!selected) return;
    if (typeof setActiveCompany === 'function') setActiveCompany(selected);
    else if (typeof setActiveCompanyId === 'function') setActiveCompanyId(key);
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-gray-700">Seller company</div>

      {/* Select existing seller company */}
      {companies.length > 0 && (
        <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-700">Select existing:</label>
          <select
            className="border rounded px-3 py-2 flex-1"
            value={selectedKey}
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="">-- Choose company --</option>
            {companies.map((c: any) => {
              const key = c.nip || c.regon;
              return (
                <option key={key} value={key}>
                  {c.name} ({key}){c.environment ? ` - ${c.environment}` : ''}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Show current active company info */}
      {activeCompany && (
        <div className="text-sm p-2 bg-gray-50 rounded border">
          Current: <strong>{activeCompany.name}</strong> ({activeCompany.nip || activeCompany.regon})
          <span className="ml-2 px-2 py-0.5 rounded bg-white border text-xs">
            {activeCompany.environment}
          </span>
        </div>
      )}

      {/* Add new company form */}
      <div className="flex gap-2 flex-wrap">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="NIP or REGON"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={env}
          onChange={(e) => setEnv(e.target.value as Environment)}
        >
          <option value="production">Production</option>
          <option value="test">Test</option>
        </select>
        <button
          type="button"
          disabled={loading}
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? 'Adding...' : 'Add company'}
        </button>
      </div>
    </div>
  );
};

export default CompanySelector;

