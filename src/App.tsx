import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
//import CallbackPage from './pages/CallbackPage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import EditInvoicePage from './pages/EditInvoicePage';
import IncomingInvoicesPage from './pages/IncomingInvoicesPage';
import SendToKsefPage from './pages/SendToKsefPage';
import RequestTokenPage from './pages/RequestTokenPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";

export default function App() {
  const user = useAuth();

  const requireAuth = (component: JSX.Element) => {
    return user ? component : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/callback" element={<CallbackPage />} /> */}
      <Route path="/dashboard" element={requireAuth(<Dashboard />)} />
      <Route path="/create" element={requireAuth(<CreateInvoicePage />)} />
      <Route path="/edit" element={requireAuth(<EditInvoicePage />)} />
      <Route path="/incoming" element={requireAuth(<IncomingInvoicesPage />)} />
      <Route path="/send" element={requireAuth(<SendToKsefPage />)} />
      <Route path="/token" element={requireAuth(<RequestTokenPage />)} />
      <Route path="/settings" element={requireAuth(<SettingsPage />)} />
    </Routes>
  );
}
