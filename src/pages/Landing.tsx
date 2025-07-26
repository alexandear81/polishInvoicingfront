import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Добро пожаловать!</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Это приложение позволяет генерировать, подписывать и отправлять инвойсы в систему KSeF.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Войти
      </button>
    </div>
  )
}
