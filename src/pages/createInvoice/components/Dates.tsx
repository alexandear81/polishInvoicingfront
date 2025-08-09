import type { InvoiceData } from "../../../types/invoice";

interface DatesProps {
  dates: InvoiceData["dates"];
  onChange: (dates: InvoiceData["dates"]) => void;
}

export default function Dates({ dates, onChange }: DatesProps) {
  const handleChange = (field: keyof InvoiceData["dates"], value: string) => {
    onChange({ ...dates, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.keys(dates).map(field => (
        <div key={field} className="mb-2">
          <label className="block text-sm text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="date"
            className="w-full border px-2 py-1 rounded"
            value={dates[field as keyof InvoiceData["dates"]]}
            onChange={e => handleChange(field as keyof InvoiceData["dates"], e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
