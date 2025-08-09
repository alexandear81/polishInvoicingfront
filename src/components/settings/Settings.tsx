import { useCompanyContext } from "../../context/CompanyContext";
import CompanySelector from "../CompanySelector";

export default function Settings() {
  const { companies, activeCompany, setActive, removeCompany } = useCompanyContext();

  return (
    <>
      <div className="p-4 max-w-3xl mx-auto">
        {/* Add new company section */}
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-medium mb-3">Add New Company</h3>
          <CompanySelector />
        </div>

        {/* Existing companies list */}
        <h2 className="text-xl font-semibold mb-4">Companies</h2>
        {!companies.length && <div className="text-sm">No companies saved yet.</div>}
        <ul className="space-y-2">
          {companies.map((c) => (
            <li key={c.id} className="p-3 border rounded flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium">{c.name}</div>
                <div className="text-gray-600">
                  {(c.nip && `NIP: ${c.nip}`) || (c.regon && `REGON: ${c.regon}`)}
                  {' '}• Env: <span className="px-2 py-0.5 rounded bg-gray-50 border">{c.environment}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded border"
                  onClick={() => setActive(c.id)}
                  disabled={activeCompany?.id === c.id}
                >
                  {activeCompany?.id === c.id ? 'Active' : 'Set active'}
                </button>
                <button className="px-3 py-1 rounded border text-red-600" onClick={() => removeCompany(c.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
