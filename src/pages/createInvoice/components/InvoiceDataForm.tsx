import { useState, useEffect } from "react";
import type { InvoiceData, Party, InvoiceItem } from "../../../types/invoice";
import Parties from "./Parties";
import Dates from "./Dates";
import Items from "./Items";
import InvoicePreview from "./InvoicePreview"
import CompanySelector from "../../../components/CompanySelector";
import { useCompanies } from "../../../context/DataContext";

const emptyParty: Party = { name: "", nip: "", address: "", account: "", email: "" };
const emptyItem: InvoiceItem = { description: "", unit: "", quantity: 1, price: 0, vatRate: 23, taxAmount: 0, total: 0 };

export default function InvoiceDataForm() {
    const [showPreview, setShowPreview] = useState(false)
    const [invoice, setInvoice] = useState<InvoiceData>({
        parties: { buyer: { ...emptyParty }, seller: { ...emptyParty } },
        dates: { issueDate: "", saleDate: "", dueDate: "" },
        number: "",
        currency: "PLN",
        paymentMethod: "Bank Transfer",
        items: [{ ...emptyItem }],
    });
    const { activeCompany } = useCompanies();

    // Auto-fill seller from active company
    useEffect(() => {
        if (!activeCompany) return;
        setInvoice(prev => ({
            ...prev,
            parties: {
                ...prev.parties,
                seller: {
                    ...prev.parties.seller,
                    name: activeCompany.name || "",
                    nip: activeCompany.nip || "",
                    address: activeCompany.address || ""
                }
            }
        }));
    }, [activeCompany]);

    // Handlers for subcomponents
    const updateParties = (parties: InvoiceData["parties"]) => setInvoice(prev => ({ ...prev, parties }));
    const updateDates = (dates: InvoiceData["dates"]) => setInvoice(prev => ({ ...prev, dates }));
    const updateGeneral = (field: keyof Omit<InvoiceData, "parties" | "dates" | "items">, value: string) => setInvoice(prev => ({ ...prev, [field]: value }));
    const updateItems = (items: InvoiceItem[]) => setInvoice(prev => ({ ...prev, items }));

    // Totals
    const totalNet = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalVat = invoice.items.reduce((sum, item) => sum + item.price * item.quantity * (item.vatRate / 100), 0);
    const totalGross = totalNet + totalVat;

    return (
        <form className="space-y-8 max-w-3xl mx-auto">
            {/* Company selection first */}
            <div className="p-4 border rounded bg-gray-50 space-y-3">
                <h3 className="font-semibold">Your Company</h3>
                <CompanySelector />
                {activeCompany ? (
                    <div className="text-sm">
                        Current environment: <span className="px-2 py-0.5 rounded bg-white border">{activeCompany.environment}</span>
                    </div>
                ) : (
                    <div className="text-sm text-amber-700">No company selected. Add/select your company to enable smart party lookup.</div>
                )}
            </div>

            <Parties parties={invoice.parties} onChange={updateParties} />
            <Dates dates={invoice.dates} onChange={updateDates} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">Invoice Number</label>
                    <input type="text" className="w-full border px-2 py-1 rounded" value={invoice.number || ""} onChange={e => updateGeneral("number", e.target.value)} />
                </div>
                <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">Currency</label>
                    <input type="text" className="w-full border px-2 py-1 rounded" value={invoice.currency} onChange={e => updateGeneral("currency", e.target.value)} />
                </div>
                <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">Payment Method</label>
                    <input type="text" className="w-full border px-2 py-1 rounded" value={invoice.paymentMethod} onChange={e => updateGeneral("paymentMethod", e.target.value)} />
                </div>
            </div>
            <Items items={invoice.items} onChange={updateItems} />
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
            <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-6"
            >
                Generate Preview
            </button>
            {showPreview && (
                <div className="mt-10 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Invoice Preview</h2>
                    <InvoicePreview data={invoice} />
                </div>
            )}
        </form>
    );
}
