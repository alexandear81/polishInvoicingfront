import { useAuth } from "../hooks/useAuth";
import { LoginButton } from "../components/LoginButton";
import { LogoutButton } from "../components/LogoutButton";
import { Link } from "react-router-dom";

export default function Landing() {
  const user = useAuth();

  return (
    <div>
      <h1>Добро пожаловать в систему инвойсов!</h1>
      {user ? (
        <>
          <p>Вы вошли как: {user.email}</p>
          <Link to="/dashboard">Перейти в Dashboard</Link>
          <br />
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
