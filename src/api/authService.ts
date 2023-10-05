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

