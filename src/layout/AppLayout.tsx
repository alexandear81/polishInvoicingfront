import type { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, Home } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase/firebase";

interface DashboardLayoutProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export default function DashboardLayout({ title, description, children }: DashboardLayoutProps) {
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {title && (
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-blue-600 transition"
              title="Home"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="text-gray-400 font-bold text-sm tracking-wide uppercase">
              Polish Invoicing
            </div>
            {title && (
              <div className="text-lg font-semibold text-gray-900">
                {title}
                {description && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({description})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              {user.photoURL && (
                <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
              )}
              <span className="text-sm text-gray-700">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="hover:text-red-600 transition"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {children || <Outlet />}
      </main>
    </div>
  );
}
