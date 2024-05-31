import { AuthProvider } from "@/contexts/auth.context";
import { ThemeProvider } from "@/contexts/theme.context";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

const setInitialThemeScript = `
  (function() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_tvb.png" />
        <script dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
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
