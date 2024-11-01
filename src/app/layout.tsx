import { AuthProvider } from "@/contexts/auth.context";
import { ThemeProvider } from "@/contexts/theme.context";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "@/components/ui/sonner";
import ScanButton from "@/components/util/scan-button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_tvb.png" />
      </head>
      <ThemeProvider>
        <body className="flex bg-white dark:bg-dark">
          <Suspense fallback={<Loading />}>
            <AuthProvider>
              <>
                {children}
                <ScanButton />
              </>
            </AuthProvider>
            <Toaster position="top-right" richColors />
          </Suspense>
        </body>
      </ThemeProvider>
    </html>
  );
}
