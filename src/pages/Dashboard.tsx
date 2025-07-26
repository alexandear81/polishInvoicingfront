import AppLayout from "../layout/AppLayout"

export default function Dashboard() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать в панель управления!</h1>
      <p className="text-gray-600">Здесь будут действия: создать инвойс, исправить, просмотреть входящие…</p>
    </AppLayout>
  )
}
