import type { InvoiceItem } from "../types/invoice";

interface ItemsProps {
  items: InvoiceItem[];
  onChange: (items: InvoiceItem[]) => void;
  currency: string;
}

const emptyItem: InvoiceItem = { description: "", unit: "", quantity: 1, price: 0, vatRate: 23 };

export default function Items({ items, onChange, currency }: ItemsProps) {
  const handleChange = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    onChange(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };
  const addItem = () => onChange([...items, { ...emptyItem }]);
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div>
      <h2 className="font-semibold mb-2 text-blue-600">Invoice Items</h2>
      {items.map((item, idx) => {
        const vatAmount = item.price * item.quantity * (item.vatRate / 100);
        return (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-2 items-end">
            <input
              type="text"
              className="border px-2 py-1 rounded"
              placeholder="Description"
              value={item.description}
              onChange={e => handleChange(idx, "description", e.target.value)}
            />
            <input
              type="text"
              className="border px-2 py-1 rounded"
              placeholder="Unit"
              value={item.unit}
              onChange={e => handleChange(idx, "unit", e.target.value)}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded"
              placeholder="Quantity"
              value={item.quantity}
              min={1}
              onChange={e => handleChange(idx, "quantity", Number(e.target.value))}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded"
              placeholder="Price"
              value={item.price}
              min={0}
              step={0.01}
              onChange={e => handleChange(idx, "price", Number(e.target.value))}
            />
            <input
              type="number"
              className="border px-2 py-1 rounded"
              placeholder="VAT Rate (%)"
              value={item.vatRate}
              min={0}
              max={100}
              onChange={e => handleChange(idx, "vatRate", Number(e.target.value))}
            />
            <div className="text-sm text-gray-700 font-semibold">VAT: {vatAmount.toFixed(2)} {currency}</div>
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => removeItem(idx)}
              disabled={items.length === 1}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button
        type="button"
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={addItem}
      >
        Add Item
      </button>
    </div>
  );
}
