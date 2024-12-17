import { HttpAPI } from "../common/http.service";

export class AuthService {
  static async login(
    email: string,
    password: string,
    onUserLoaded: (user: any) => void
  ) {
    const response = await HttpAPI.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      {
        email,
        password,
      }
    );

    // Configurar la cookie
    document.cookie = `access-token=${response.token}; path=/; secure; samesite=strict;`;

    // Obtener y cargar perfil de usuario
    const userResponse = await HttpAPI.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${response.token}`,
        },
      }
    );
    onUserLoaded(userResponse.data);

    return response;
  }

  static async getUserProfile(token: string) {
    try {
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el perfil del usuario");
    }
  }

  static async logout() {
    // Eliminar cookie
    document.cookie = `access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict`;

    // Redirigir al login
    window.location.replace("/login");
  }
}
