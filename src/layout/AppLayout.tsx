import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  const { user, logout } = useAuth0()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
          Polish Invoicing
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <img src={user.picture} alt="avatar" className="w-8 h-8 rounded-full" />
              <span className="text-gray-700">{user.name}</span>
            </>
          )}
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="p-6 flex-1">{children}</main>
    </div>
  )
}
