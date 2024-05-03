import './globals.css'
import { AuthProvider } from '@/contexts/authContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={``}>
        <body className="flex">
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
  );
}