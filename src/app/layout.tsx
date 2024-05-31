import { AuthProvider } from "@/contexts/auth.context";
import { ThemeProvider } from "@/contexts/theme.context";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_tvb.png" />
        {/* Puedes agregar más meta tags aquí si es necesario */}
      </head>
      <ThemeProvider>
        <body className="flex bg-white dark:bg-dark">
          <Suspense fallback={<Loading />}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </body>
      </ThemeProvider>
    </html>
  );
}
