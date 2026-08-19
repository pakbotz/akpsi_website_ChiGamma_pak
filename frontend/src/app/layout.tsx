import type { Metadata } from "next";
import { ReactNode } from 'react';
import Providers from '@/components/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import { getSubOrganizations } from '@/lib/api';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Alpha Kappa Psi - Chi Gamma',
  description: 'The premier professional business fraternity at UCSC',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const subOrganizations = await getSubOrganizations();

  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar subOrganizations={subOrganizations} />
            <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
