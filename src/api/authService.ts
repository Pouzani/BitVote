import { RegisterRequest } from "../model/user";
import axios from "./axios";

export async function login(username: string, password: string) {
    try {
        const response = await axios.post("/auth/login", {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function register(request: RegisterRequest) {
    try {
        const response = await axios.post("/auth/register", request);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

