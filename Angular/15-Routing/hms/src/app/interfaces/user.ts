export interface User {
    id: number;
    email: string;
    password: string;
    role: 'manager' | 'admin' | 'user';
}
