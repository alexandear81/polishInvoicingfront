import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./auth/ProtectedRoute"
import CallbackPage from './pages/CallbackPage'
import CreateInvoicePage from './pages/CreateInvoicePage'
import EditInvoicePage from './pages/EditInvoicePage'
import IncomingInvoicesPage from './pages/IncomingInvoicesPage'
import SendToKsefPage from './pages/SendToKsefPage'
import RequestTokenPage from './pages/RequestTokenPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/create" element={
        <ProtectedRoute>
          <CreateInvoicePage />
        </ProtectedRoute>
      } />
      <Route path="/edit" element={
        <ProtectedRoute>
          <EditInvoicePage />
        </ProtectedRoute>
      } />
      <Route path="/incoming" element={
        <ProtectedRoute>
          <IncomingInvoicesPage />
        </ProtectedRoute>
      } />
      <Route path="/send" element={
        <ProtectedRoute>
          <SendToKsefPage />
        </ProtectedRoute>
      } />
      <Route path="/token" element={
        <ProtectedRoute>
          <RequestTokenPage />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
