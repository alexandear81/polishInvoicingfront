import React, { useState } from 'react';
import type { Party } from '../../types/invoice';
//import type { Client } from '../../types/client';
import { useCompanyContext } from '../../context/CompanyContext';
import { useClientContext } from '../../context/ClientContext';
import { ksefApi } from '../../services/ksefApi';

interface PartySelectorProps {
  label: string;
  party: Party;
  onChange: (party: Party) => void;
  type: 'seller' | 'buyer';
}

const PartySelector: React.FC<PartySelectorProps> = ({ label, party, onChange, type }) => {
  const { activeCompany, companies, setActive, addCompanyFromLookup } = useCompanyContext();
  const { clients, addClientFromLookup, markClientUsed } = useClientContext();
  const [lookupId, setLookupId] = useState('');
  const [isLooking, setIsLooking] = useState(false);

  const onSelectExisting = (selectedId: string) => {
    if (type === 'seller') {
      const company = companies.find(c => c.id === selectedId);
      if (company) {
        setActive(selectedId);
        onChange({
          name: company.name,
          nip: company.nip || '',
          address: company.address || '',
          account: '',
          email: ''
        });
      }
    } else {
      const client = clients.find(c => c.id === selectedId);
      if (client) {
        markClientUsed(selectedId);
        onChange({
          name: client.name,
          nip: client.nip || '',
          address: client.address || '',
          account: '',
          email: client.email || ''
        });
      }
    }
  };

  const onLookup = async () => {
    const id = lookupId.trim().replace(/[\s-]/g, '');
    if (!id) return alert(`Provide NIP or REGON for ${type}`);
    
    try {
      setIsLooking(true);
      const env = activeCompany?.environment || 'production';
      const resp = await ksefApi.lookupCompany(id, env);
      const data = resp?.data || resp;
      
      const newParty: Party = {
        name: data.name || data.shortName || '',
        nip: data.nip || '',
        address: [data.street, data.houseNumber, data.city, data.postalCode].filter(Boolean).join(', '),
        account: '',
        email: ''
      };
      
      onChange(newParty);
      
      if (type === 'seller' && activeCompany) {
        // Auto-add seller as new company
        const shouldAdd = confirm(`Add "${newParty.name}" as a new company and set as active?`);
        if (shouldAdd) {
          await addCompanyFromLookup(id, env);
        }
      } else if (type === 'buyer' && activeCompany) {
        // Prompt to save buyer as client
        const shouldSave = confirm(`Save "${newParty.name}" to your client list?`);
        if (shouldSave) {
          await addClientFromLookup(id, activeCompany.id, env);
        }
      }
    } catch (e: any) {
      alert(`Lookup failed: ${e?.message || 'Unknown error'}`);
      console.error(e);
    } finally {
      setIsLooking(false);
    }
  };

  const existingOptions = type === 'seller' ? companies : clients;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Existing selection */}
      {existingOptions.length > 0 && (
        <select
          className="w-full border rounded px-3 py-2"
          value=""
          onChange={(e) => onSelectExisting(e.target.value)}
        >
          <option value="">Select from saved {type === 'seller' ? 'companies' : 'clients'}</option>
          {existingOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.nip || item.regon})
            </option>
          ))}
        </select>
      )}
      
      {/* Lookup new */}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Or enter NIP/REGON to lookup"
          value={lookupId}
          onChange={(e) => setLookupId(e.target.value)}
        />
        <button
          type="button"
          disabled={isLooking}
          onClick={onLookup}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {isLooking ? 'Looking up...' : 'Lookup'}
        </button>
      </div>
      
      {/* Manual fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={party.name}
            onChange={(e) => onChange({ ...party, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">NIP</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={party.nip}
            onChange={(e) => onChange({ ...party, nip: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 mb-1">Address</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={party.address}
            onChange={(e) => onChange({ ...party, address: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Account</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={party.account}
            onChange={(e) => onChange({ ...party, account: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-2 py-1 rounded"
            value={party.email}
            onChange={(e) => onChange({ ...party, email: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default PartySelector;
