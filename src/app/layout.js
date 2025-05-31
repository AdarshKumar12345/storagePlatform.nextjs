// app/layout.js or app/layout.tsx
"use client";

import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
          <header className=" justify-center items-center gap-4 h-16 border-b shadow-sm ">
            <Navbar />
          </header>
          <main className="p-6 max-w-6xl mx-auto">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
