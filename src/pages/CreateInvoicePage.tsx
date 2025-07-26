// src/pages/CreateInvoicePage.tsx

import { useState } from "react";
import DashboardLayout from "../layout/AppLayout";
import type { InvoiceData, Party, InvoiceItem } from "../types/invoice";

const emptyParty: Party = { name: "", nip: "", address: "", account: "", email: "" };
const emptyItem: InvoiceItem = { description: "", unit: "", quantity: 1, price: 0, vatRate: 23 };

export default function CreateInvoicePage() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    parties: { buyer: { ...emptyParty }, seller: { ...emptyParty } },
    dates: { issueDate: "", saleDate: "", dueDate: "" },
    currency: "PLN",
    paymentMethod: "Bank Transfer",
    items: [{ ...emptyItem }],
  });

  // Calculate totals
  const totalNet = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalVat = invoice.items.reduce((sum, item) => sum + item.price * item.quantity * (item.vatRate / 100), 0);
  const totalGross = totalNet + totalVat;

  // Handlers
  const handlePartyChange = (role: "buyer" | "seller", field: keyof Party, value: string) => {
    setInvoice(prev => ({
      ...prev,
      parties: {
        ...prev.parties,
        [role]: { ...prev.parties[role], [field]: value }
      }
    }));
  };

  const handleDateChange = (field: keyof InvoiceData["dates"], value: string) => {
    setInvoice(prev => ({ ...prev, dates: { ...prev.dates, [field]: value } }));
  };

  const handleGeneralChange = (field: keyof Omit<InvoiceData, "parties" | "dates" | "items">, value: string) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (idx: number, field: keyof InvoiceItem, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === idx ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = () => {
    setInvoice(prev => ({ ...prev, items: [...prev.items, { ...emptyItem }] }));
  };

  const removeItem = (idx: number) => {
    setInvoice(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  return (
    <DashboardLayout title="Create Invoice" description="Fill in the details to generate a new invoice">
      <form className="space-y-8 max-w-3xl mx-auto">
        {/* Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["buyer", "seller"].map(role => (
            <div key={role} className="p-4 border rounded-lg bg-gray-50">
              <h2 className="font-semibold mb-2 text-blue-600">{role === "buyer" ? "Buyer" : "Seller"}</h2>
              {Object.keys(emptyParty).map(field => (
                <div key={field} className="mb-2">
                  <label className="block text-sm text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    className="w-full border px-2 py-1 rounded"
                    value={invoice.parties[role as "buyer" | "seller"][field as keyof Party] || ""}
                    onChange={e => handlePartyChange(role as "buyer" | "seller", field as keyof Party, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Dates, Currency, Payment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(invoice.dates).map(field => (
            <div key={field} className="mb-2">
              <label className="block text-sm text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="date"
                className="w-full border px-2 py-1 rounded"
                value={invoice.dates[field as keyof InvoiceData["dates"]]}
                onChange={e => handleDateChange(field as keyof InvoiceData["dates"], e.target.value)}
              />
            </div>
          ))}
          <div className="mb-2">
            <label className="block text-sm text-gray-700 mb-1">Currency</label>
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              value={invoice.currency}
              onChange={e => handleGeneralChange("currency", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm text-gray-700 mb-1">Payment Method</label>
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              value={invoice.paymentMethod}
              onChange={e => handleGeneralChange("paymentMethod", e.target.value)}
            />
          </div>
        </div>

        {/* Items */}
        <div>
          <h2 className="font-semibold mb-2 text-blue-600">Invoice Items</h2>
          {invoice.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-2 items-end">
              <input
                type="text"
                className="border px-2 py-1 rounded"
                placeholder="Description"
                value={item.description}
                onChange={e => handleItemChange(idx, "description", e.target.value)}
              />
              <input
                type="text"
                className="border px-2 py-1 rounded"
                placeholder="Unit"
                value={item.unit}
                onChange={e => handleItemChange(idx, "unit", e.target.value)}
              />
              <input
                type="number"
                className="border px-2 py-1 rounded"
                placeholder="Quantity"
                value={item.quantity}
                min={1}
                onChange={e => handleItemChange(idx, "quantity", Number(e.target.value))}
              />
              <input
                type="number"
                className="border px-2 py-1 rounded"
                placeholder="Price"
                value={item.price}
                min={0}
                step={0.01}
                onChange={e => handleItemChange(idx, "price", Number(e.target.value))}
              />
              <input
                type="number"
                className="border px-2 py-1 rounded"
                placeholder="VAT Rate (%)"
                value={item.vatRate}
                min={0}
                max={100}
                onChange={e => handleItemChange(idx, "vatRate", Number(e.target.value))}
              />
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => removeItem(idx)}
                disabled={invoice.items.length === 1}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        {/* Totals */}
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div>
              <span className="font-semibold">Total Net:</span> {totalNet.toFixed(2)} {invoice.currency}
            </div>
            <div>
              <span className="font-semibold">Total VAT:</span> {totalVat.toFixed(2)} {invoice.currency}
            </div>
            <div>
              <span className="font-semibold">Total Gross:</span> {totalGross.toFixed(2)} {invoice.currency}
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
