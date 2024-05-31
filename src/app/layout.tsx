import './globals.css'
import { AuthProvider } from '@/contexts/auth.context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
        <body className="flex bg-white dark:bg-dark">
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
  );
}