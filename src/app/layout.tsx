import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 1. Import Header-nya

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Compressor - Kelompok 7",
  description: "Aplikasi kompresi citra menggunakan metode PCA - Kelompok 7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* 2. Letakkan Header di sini */}
        {children}
      </body>
    </html>
  );
}