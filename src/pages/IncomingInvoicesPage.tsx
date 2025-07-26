import DashboardLayout from "../layout/AppLayout"

export default function IncomingInvoicesPage() {
  return (
    <DashboardLayout title="Incoming Invoices" description="View invoices received via KSeF">
      <div className="text-xl font-bold text-green-700">This is the Incoming Invoices page</div>
    </DashboardLayout>
  )
}
