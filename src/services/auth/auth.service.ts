import { HttpAPI } from "../common/http.service";

export class AuthService {
    static async login(email: string, password: string) {
        try {
            const response = await HttpAPI.post('http://localhost:3000/api/v1/auth/login', { email, password });
            localStorage.setItem('access-token', response.token);
            return response;
        } catch (error) {
            throw new Error('Error while login in')
        }
    }

    static async logout(){
        localStorage.removeItem('access-token');
    }
}