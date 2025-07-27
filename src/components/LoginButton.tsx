import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const LoginButton = () => {
  const login = async () => {
    console.log("🔥 login function triggered! And now it will work :)");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("👤 Logged in as:", user.email);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return <button onClick={login}>Log in</button>;
};
