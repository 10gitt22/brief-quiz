'use client';
import localFont from 'next/font/local';
import { AuthProvider } from 'contexts/auth';
import Header from 'components/Header/Header';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const Helvetica = localFont({
  src: [
    {
      path: '../public/fonts/Helvetica.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/Helvetica-Bold.ttf',
      weight: '700',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${Helvetica.className} bg-app-white h-screen overflow-y-scroll`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
