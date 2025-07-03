import type { Metadata, Viewport } from "next";
import { Inter,Epilogue } from "next/font/google";
import { generateMetadata, DEFAULT_SEO } from "@/lib/seo";
import PreLoader from "@/components/preloader"

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateMetadata(DEFAULT_SEO);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${epilogue.variable}`}>

      <body className="antialiased">
        <PreLoader/>
        {children}
      </body>
    </html>
  );
}
