import React, { useState } from 'react';
import { useCompanyContext } from '../context/CompanyContext';
import type { Environment } from '../types/company';

const CompanySelector: React.FC = () => {
  const { companies, activeCompany, setActive, addCompanyFromLookup } = useCompanyContext();
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
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <select
          className="border rounded px-3 py-2"
          value={activeCompany?.id || ''}
          onChange={(e) => setActive(e.target.value || null)}
        >
          <option value="">{companies.length ? 'Select company' : 'No companies saved'}</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.nip || c.regon}) [{c.environment}]
            </option>
          ))}
        </select>
        {activeCompany && (
          <span className="text-xs px-2 py-1 rounded bg-gray-100 border">
            Active env: {activeCompany.environment}
          </span>
        )}
      </div>

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
