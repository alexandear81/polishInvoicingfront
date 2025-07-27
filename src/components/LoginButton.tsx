import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const LoginButton = () => {
    const navigate = useNavigate();

  const login = async () => {
    console.log("🔥 login function triggered! And now it will work :)");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("👤 Logged in as:", user.email);
        navigate("/dashboard"); // 🎯 Go go go!
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-lg font-semibold" onClick={login}>Log in</button>;
};
