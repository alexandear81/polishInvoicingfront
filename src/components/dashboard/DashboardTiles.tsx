// src/components/DashboardTiles.tsx
import { useNavigate } from "react-router-dom"
import { FilePlus, Edit, Inbox, Send, KeyRound, Upload, Settings } from "lucide-react"

const actions = [
  {
    title: "Create Invoice",
    description: "Create a new invoice manually",
    icon: <FilePlus className="w-8 h-8 text-blue-600" />,
    route: "/create"
  },
  {
    title: "Edit Invoice",
    description: "Load or edit an existing draft",
    icon: <Edit className="w-8 h-8 text-yellow-600" />,
    route: "/edit"
  },
  {
    title: "Incoming Invoices",
    description: "View invoices received via KSeF",
    icon: <Inbox className="w-8 h-8 text-green-600" />,
    route: "/incoming"
  },
  {
    title: "Send to KSeF",
    description: "Upload and sign a file",
    icon: <Upload className="w-8 h-8 text-purple-600" />,
    route: "/send"
  },
  {
    title: "Request Token",
    description: "Request a token to connect with KSeF",
    icon: <KeyRound className="w-8 h-8 text-red-600" />,
    route: "/token"
  },
  {
    title: "Send Invoice",
    description: "Send invoice with session token",
    icon: <Send className="w-8 h-8 text-orange-600" />,
    route: "/send-invoice"
  },
  {
    title: "Settings",
    description: "Manage company and signature settings",
    icon: <Settings className="w-8 h-8 text-gray-600" />,
    route: "/settings"
  }
]

export default function DashboardTiles() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {actions.map(({ title, description, icon, route }) => (
        <div
          key={title}
          onClick={() => navigate(route)}
          className="cursor-pointer p-6 bg-white rounded-2xl shadow hover:shadow-md transition border border-gray-200 hover:border-blue-400"
        >
          <div className="flex items-center gap-4 mb-4">
            {icon}
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      ))}
    </div>
  )
}
