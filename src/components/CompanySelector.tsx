import React, { useState } from 'react';
import { useCompanies } from '../context/DataContext';
import type { Environment } from '../types/company';

const CompanySelector: React.FC = () => {
  const { activeCompany, addCompanyFromLookup } = useCompanies();
  const [id, setId] = useState('');
  const [env, setEnv] = useState<Environment>('production');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="space-y-3">
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

