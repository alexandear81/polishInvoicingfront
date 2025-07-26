import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function CallbackPage() {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isLoading, isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-700">Вход... Пожалуйста, подождите.</p>
    </div>
  )
}
