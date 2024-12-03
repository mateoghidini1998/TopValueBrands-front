import { HttpAPI } from "../common/http.service";
export class AuthService {
  static async login(
    email: string,
    password: string,
    onUserLoaded: (user: any) => void
  ) {
    const response = await HttpAPI.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login `,
      {
        email,
        password,
      }
    );
    localStorage.setItem("access-token", response.token);

    const userResponse = await HttpAPI.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${response.token}`,
        },
      }
    );
    onUserLoaded(userResponse.data);
    document.cookie = "authenticated=true; path=/";
    // Establecer el token como una cookie
    document.cookie = `access-token=${response.token}; path=/; secure; samesite=strict`;
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
    localStorage.removeItem("access-token");
    function deleteCookie(name: string) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; secure; samesite=strict`;
    }
    deleteCookie("authenticated");
    deleteCookie("access-token");

    // window.location.replace("/login");
  }
}
