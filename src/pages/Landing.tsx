import { LoginButton } from "../components/LoginButton";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4 text-center">
      <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Polish Invoicing</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Automate invoices with KSeF. You pay for what really works.
      </p>
      <LoginButton />
    </div>
  );
}