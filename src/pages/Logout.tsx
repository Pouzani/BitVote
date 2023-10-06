import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect } from "react";

const Logout = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    handleLogout();
  }
  );
  return <></>;
};

export default Logout;