import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { getCurrent, login, register } from "../api/authService";
import User from "../model/user";

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

export async function useRegister(user:User){
    const { setAccessToken, accessToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    try {
        setLoading(true);
        const response = await register(user);
        setAccessToken(response.accessToken);
        setLoading(false);
    } catch (error: any) {
        setError(error);
    }

    return { loading, error, accessToken, setAccessToken };
}

export function useGetCurrent(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [currentUser, setCurrentUser] = useState<User>();

    const fetchUser = async () => {
        try {
            setLoading(true);
            const user = await getCurrent();
            setCurrentUser(user);
            setLoading(false);
        } catch (error: any) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { loading, error, currentUser };
}