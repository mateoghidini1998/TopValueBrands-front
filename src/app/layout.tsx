import './globals.css'
import { AuthProvider } from '@/contexts/auth.context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={``}>
        <body className="flex min-h-screen">
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
  );
}