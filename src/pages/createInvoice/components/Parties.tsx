import type { Party } from "../../../types/invoice";

interface PartiesProps {
  parties: { buyer: Party; seller: Party };
  onChange: (parties: { buyer: Party; seller: Party }) => void;
}

export default function Parties({ parties, onChange }: PartiesProps) {
  const handleChange = (role: "buyer" | "seller", field: keyof Party, value: string) => {
    onChange({
      ...parties,
      [role]: { ...parties[role], [field]: value }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {["seller", "buyer"].map(role => (
        <div key={role} className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-semibold mb-2 text-blue-600">{role === "buyer" ? "Buyer" : "Seller"}</h2>
          {Object.keys(parties[role as "buyer" | "seller"]).map(field => (
            <div key={field} className="mb-2">
              <label className="block text-sm text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                className="w-full border px-2 py-1 rounded"
                value={parties[role as "buyer" | "seller"][field as keyof Party] || ""}
                onChange={e => handleChange(role as "buyer" | "seller", field as keyof Party, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}