import DashboardLayout from "../layout/AppLayout";
import Settings from "../components/settings/Settings";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings" description="Manage company and signature settings">
      <Settings />
    </DashboardLayout>
  );
}
