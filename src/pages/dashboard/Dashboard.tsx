import AppLayout from "../../layout/AppLayout"
import DashboardTiles from "./components/DashboardTiles"

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available actions</h1>
      <DashboardTiles />
    </div>
    </AppLayout>
  )
}
