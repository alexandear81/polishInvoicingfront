// src/pages/CreateInvoicePage.tsx

import DashboardLayout from "../layout/AppLayout";
import InvoiceDataForm from "../components/invoice/InvoiceDataForm";

export default function CreateInvoicePage() {
  return (
    <DashboardLayout title="Create Invoice" description="Fill in the details to generate a new invoice">
      <InvoiceDataForm />
    </DashboardLayout>
  );
}
