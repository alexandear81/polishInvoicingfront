import { useState, useEffect } from "react";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <p className="text-sm mb-2 md:mb-0">
        🍪 This site uses local storage to ensure proper functionality. By using the app, you agree to this.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-white text-gray-900 px-4 py-1 rounded hover:bg-gray-200 transition"
      >
        Got it
      </button>
    </div>
  );
};

export default CookieBanner;
// This component displays a cookie consent banner at the bottom of the screen.
// It checks local storage for a consent flag and shows the banner if not found.