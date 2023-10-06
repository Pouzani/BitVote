import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { login } from "../api/authService";

export async function useLogin(username: string, password: string){
    const { setAccessToken, accessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    try {
        setLoading(true);
        const response = await login(username, password);
        setAccessToken(response.accessToken);
        setLoading(false);
    } catch (error: any) {
        setError(error);
    }

    return { loading, error, accessToken, setAccessToken };
}