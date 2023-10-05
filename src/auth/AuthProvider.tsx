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
  
    // Function to set the authentication token
    const setAccessToken = (newToken : string) => {
      setAccessToken_(newToken);
    };
  
    useEffect(() => {
      if (accessToken) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        localStorage.setItem('accessToken',accessToken);
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem('accessToken')
      }
    }, [accessToken]);
  
    // Memoized value of the authentication context
    const contextValue = useMemo(
      () => ({
        accessToken,
        setAccessToken,
      }),
      [accessToken]
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