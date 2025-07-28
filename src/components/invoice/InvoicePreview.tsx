// src/components/InvoicePreview.tsx
import type { InvoiceData } from "../../types/invoice"

interface Props {
  data: InvoiceData
}

export default function InvoicePreview({ data }: Props) {
  const { parties, dates, currency, paymentMethod, items } = data

  const totals = items.reduce(
    (acc, item) => {
      acc.netto += item.price * item.quantity
      acc.vat += item.taxAmount
      acc.brutto += item.total
      return acc
    },
    { netto: 0, vat: 0, brutto: 0 }
  )

  return (
    <div className="bg-white p-8 shadow max-w-4xl mx-auto text-sm">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="font-bold text-gray-700">Seller</h2>
          <div>{parties.seller.name}</div>
          <div>{parties.seller.address}</div>
          <div>NIP: {parties.seller.nip}</div>
        </div>
        <div className="text-right">
          <h2 className="font-bold text-gray-700">Buyer</h2>
          <div>{parties.buyer.name}</div>
          <div>{parties.buyer.address}</div>
          <div>NIP: {parties.buyer.nip}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div><strong>Issue date:</strong> {dates.issueDate}</div>
        <div><strong>Sale date:</strong> {dates.saleDate}</div>
        <div><strong>Due date:</strong> {dates.dueDate}</div>
      </div>

      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Unit</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">VAT %</th>
            <th className="border px-2 py-1">Net</th>
            <th className="border px-2 py-1">VAT</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{item.description}</td>
              <td className="border px-2 py-1">{item.unit}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">{item.price.toFixed(2)}</td>
              <td className="border px-2 py-1">{item.vatRate}%</td>
              <td className="border px-2 py-1">{(item.price * item.quantity).toFixed(2)}</td>
              <td className="border px-2 py-1">{item.taxAmount.toFixed(2)}</td>
              <td className="border px-2 py-1">{item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mb-4">
        <div><strong>Total Net:</strong> {totals.netto.toFixed(2)} {currency}</div>
        <div><strong>Total VAT:</strong> {totals.vat.toFixed(2)} {currency}</div>
        <div className="text-lg font-bold"><strong>Total:</strong> {totals.brutto.toFixed(2)} {currency}</div>
      </div>

      <div>
        <strong>Payment method:</strong> {paymentMethod}
      </div>
    </div>
  )
}
