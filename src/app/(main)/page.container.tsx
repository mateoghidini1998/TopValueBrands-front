"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthContext from "@/contexts/auth.context";
import { Loader } from "./loader";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}

export const ALLOWED_NON_ADMIN_ROUTES = [
  "/warehouse/incoming-shipments",
  "/warehouse/outgoing-shipments",
  "/warehouse/outgoing-shipments/details",
  "/warehouse/storage",
] as const;

const IndexPageContainer: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { authToken, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  const isAllowedRoute = (path: string): boolean => {
    // Admin tiene acceso a todas las rutas
    if (user?.role === "admin") return true;

    // Verificar si la ruta actual coincide con alguna ruta permitida
    return ALLOWED_NON_ADMIN_ROUTES.some((allowedRoute) => {
      // Manejo especial para rutas con parámetros dinámicos
      if (
        path.includes("/details/") &&
        allowedRoute === "/warehouse/outgoing-shipments/details"
      ) {
        return true;
      }
      if (
        path.match(/^\/warehouse\/storage\/[\w-]+$/) &&
        allowedRoute === "/warehouse/storage"
      ) {
        return true;
      }
      return path === allowedRoute;
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!authToken) {
          router.push("/login");
          return;
        }

        if (user) {
          if (!isAllowedRoute(pathname)) {
            // Si no es una ruta permitida, redirigir a la primera ruta permitida
            router.push("/warehouse/incoming-shipments");
            router.refresh();
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [authToken, user, router, pathname]);

  if (isLoading) {
    return <Loader />;
  }

  // Solo mostrar el contenido si hay un token de autenticación y la ruta está permitida
  return authToken && isAllowedRoute(pathname) ? children : null;
};

export default IndexPageContainer;
