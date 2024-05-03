import { HttpAPI } from "../common/http.service";
export class AuthService {
    static async login(email: string, password: string, onUserLoaded: (user: any) => void) {
        try {
            const response = await HttpAPI.post('http://localhost:3000/api/v1/auth/login', { email, password });
            localStorage.setItem('access-token', response.token);
            
            const userResponse = await HttpAPI.get('http://localhost:3000/api/v1/auth/me', {
                headers: {
                    'Authorization': `Bearer ${response.token}`
                }
            });
            onUserLoaded(userResponse.data);
            return response;
        } catch (error) {
            throw new Error('Error while login in')
        }
    }

    static async getUserProfile(token: string) {
        try {
            const response = await HttpAPI.get('http://localhost:3000/api/v1/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener el perfil del usuario');
        }
    }
    


    static async logout(){
        localStorage.removeItem('access-token');
    }
}
