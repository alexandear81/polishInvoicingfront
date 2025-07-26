import { useAuth0 } from "@auth0/auth0-react"

export default function Dashboard() {
  const { user } = useAuth0()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Привет, {user?.name}!</h1>
      <img src={user?.picture} alt="Avatar" className="w-24 h-24 rounded-full" />
      <p className="mt-2 text-gray-600">{user?.email}</p>
    </div>
  )
}
