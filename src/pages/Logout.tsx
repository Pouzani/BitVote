import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";

const Logout = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken();
    setRefreshToken();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    handleLogout();
  }
  );
  return <></>;
};

export default Logout;