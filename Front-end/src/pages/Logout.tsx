import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";
import { logout } from "../api/authService";

const Logout = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    
    setAccessToken();
    setRefreshToken();

    localStorage.removeItem("username");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");

    navigate("/", { replace: true });
  };

  useEffect(() => {
    handleLogout();
  }
  );
  return <></>;
};

export default Logout;