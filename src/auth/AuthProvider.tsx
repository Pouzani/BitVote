import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";

  const AuthContext = createContext(null);

  interface AuthProviderProps {
    children: React.ReactNode;
  }

  const AuthProvider = ({ children }:AuthProviderProps) => {
    // State to hold the authentication token
    const [accessToken, setAccessToken_] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken_] = useState(localStorage.getItem("refreshToken"));
  
    // Function to set the authentication token
    const setAccessToken = (newToken : string) => {
      setAccessToken_(newToken);
    };

    const setRefreshToken = (newToken : string) => {
        setRefreshToken_(newToken);
        }
  
    useEffect(() => {
      if (accessToken) {
        localStorage.setItem('accessToken',accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken',refreshToken);
      } else {
        localStorage.removeItem('refreshToken')
      }
    }, [accessToken, refreshToken]);
  
    // Memoized value of the authentication context
    const contextValue = useMemo(
      () => ({
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }),
      [accessToken, refreshToken]
    );
  
    // Provide the authentication context to the children components
    return (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;