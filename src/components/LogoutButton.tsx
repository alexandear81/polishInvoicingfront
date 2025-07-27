import { auth } from "../firebase/firebase";

export const LogoutButton = () => {
  const logout = async () => {
    await auth.signOut();
  };

  return <button onClick={logout}>Выйти</button>;
};
