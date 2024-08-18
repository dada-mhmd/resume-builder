import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/providers/themeProvider';

import { ClerkProvider } from '@clerk/nextjs';
import LayoutProvider from '@/providers/layoutProvider';

export const metadata: Metadata = {
  title: 'Resume Builder',
  description:
    'Resume builder app built with nextjs, styled with tailwindcss and typescript, mongodb for the database',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
