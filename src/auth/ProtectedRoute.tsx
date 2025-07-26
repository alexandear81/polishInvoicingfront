import { useAuth0 } from "@auth0/auth0-react"
import type { JSX } from "react"
import { Navigate } from "react-router-dom"

interface Props {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div className="text-center mt-10">Загрузка...</div>
  return isAuthenticated ? children : <Navigate to="/" />
}
