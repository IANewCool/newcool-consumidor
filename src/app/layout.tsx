import type { Metadata } from "next";
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
  title: "Derechos del Consumidor Chile | NewCooltura Informada",
  description: "Oficinas SERNAC, derechos del consumidor, calculadora de garantia y proceso de reclamo en Chile",
  keywords: ["SERNAC", "derechos consumidor", "reclamos", "garantia legal", "proteccion consumidor"],
  openGraph: {
    title: "Consumidor Chile - NewCooltura Informada",
    description: "SERNAC, garantias y reclamos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
