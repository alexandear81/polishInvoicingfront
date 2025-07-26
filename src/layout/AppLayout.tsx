// src/layout/DashboardLayout.tsx
import type { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

interface DashboardLayoutProps {
  title?: string
  description?: string
  children?: ReactNode
}

export default function AppLayout({ title, description, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth0()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-gray-400 font-bold text-sm tracking-wide uppercase">Polish Invoicing</div>
          {title && (
            <div className="text-lg font-semibold text-gray-900">
              {title}
              {description && (
                <span className="text-sm font-normal text-gray-500 ml-2">({description})</span>
              )}
            </div>
          )}
        </div>

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
        {children || <Outlet />}
      </main>
    </div>
  )
}
