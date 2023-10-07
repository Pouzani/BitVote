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

  /**
   * The AuthProvider component is a wrapper that provides authentication context to its children
   * components in a TypeScript React application.
   * @param {AuthProviderProps}  - The `AuthProvider` component takes a single prop called `children`.
   * This prop represents the child components that will be wrapped by the `AuthProvider` and have
   * access to the authentication context. The `children` prop is typically used with the JSX syntax to
   * include child components within the `AuthProvider` component.
   * @returns The AuthProvider component is returning the AuthContext.Provider component with the value
   * prop set to the contextValue. The children components are wrapped inside the AuthContext.Provider
   * component, allowing them to access the authentication context provided by the AuthProvider.
   */
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