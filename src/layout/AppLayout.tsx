// src/layout/DashboardLayout.tsx
import type { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

interface DashboardLayoutProps {
  title?: string
  description?: string
  children?: ReactNode
}

export default function DashboardLayout({ title, description, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth0()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="text-lg font-semibold">Polish Invoicing</div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <img src={user.picture} alt="avatar" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-700">{user.name}</span>
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="text-red-600 hover:underline text-sm"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {title && (
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
        )}
        {description && (
          <p className="text-gray-500 mb-6 text-sm">{description}</p>
        )}
        {children || <Outlet />}
      </main>
    </div>
  )
}
