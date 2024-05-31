import { AuthProvider } from '@/contexts/auth.context';
import { ThemeProvider } from '@/contexts/theme.context';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <ThemeProvider>
        <body className="flex bg-white dark:bg-dark">
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </ThemeProvider>
      </html>
  );
}