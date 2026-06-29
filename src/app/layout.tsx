import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 1. Import Header-nya

const inter = Inter({ subsets: ["latin"] });

const siteName = "Image Compressor - Kelompok 7";
const siteDescription = "Aplikasi kompresi citra menggunakan metode PCA - Kelompok 7";
const appPort = process.env.PORT;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!appPort || !siteUrl) {
  throw new Error(
    "Environment variables belum diset. Tambahkan PORT dan NEXT_PUBLIC_SITE_URL di .env.local berdasarkan .env.example."
  );
}

const metadataBase = new URL(siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: ["image compression", "PCA", "kompresi citra", "Kelompok 7"],
  authors: [{ name: "Kelompok 7" }],
  creator: "Kelompok 7",
  publisher: "Kelompok 7",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/logo-uns-biru.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/logo-uns-biru.png"],
  },
  icons: {
    icon: "/logo-uns-biru.png",
    apple: "/logo-uns-biru.png",
  },
  robots: {
    index: true,
    follow: true,
  },
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