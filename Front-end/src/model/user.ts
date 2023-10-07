export default interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    imageUrl?: string;
    age?: string;
    phone?: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    role: string | "USER";
    imageUrl?: string;
    age?: string;
    phone?: string;
}