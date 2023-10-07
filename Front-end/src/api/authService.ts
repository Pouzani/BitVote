import { RegisterRequest } from "../model/user";
import axios from "./axios";

/**
 * The login function sends a POST request to the "/auth/login" endpoint with the provided username and
 * password, and returns the response data.
 * @param {string} username - A string representing the username of the user trying to login.
 * @param {string} password - The `password` parameter is a string that represents the user's password.
 * It is used as a credential to authenticate the user during the login process.
 * @returns the data from the response of the login request.
 */
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

/**
 * The function `register` sends a POST request to the "/auth/register" endpoint with the provided
 * request data and returns the response data, or throws an error if there is one.
 * @param {RegisterRequest} request - The `request` parameter is an object of type `RegisterRequest`.
 * It contains the data needed to register a user. The specific properties and their types are not
 * provided in the code snippet, so you would need to refer to the `RegisterRequest` type definition to
 * see what properties are expected and their
 * @returns the data from the response of the axios post request.
 */
export async function register(request: RegisterRequest) {
    try {
        const response = await axios.post("/auth/register", request);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * The above function is an asynchronous function that sends a GET request to the "/auth/logout"
 * endpoint and returns the response data.
 * @returns the data from the response of the axios GET request.
 */
export async function logout() {
    try {
        const response = await axios.get("/auth/logout");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
