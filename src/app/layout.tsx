import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className={``}>
      <body className="flex">
        {children}
      </body>
    </html>
  );
}