import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DevzzBadge } from "@/components/devzz-badge";
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
  title: "Vallentina Monteiro — Edição Profissional de Fotos de Arquitetura e Interiores",
  description:
    "Edição de fotos de arquitetura com olhar refinado e acabamento profissional. Tratamento de imagens para arquitetos, designers de interiores, fotógrafos e imobiliárias.",
  openGraph: {
    title: "Vallentina Monteiro — Edição de Fotos de Arquitetura",
    description:
      "Transforme suas imagens em apresentações visuais de alto padrão.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <script src="/__devtools-bridge.js" async />
        <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <DevzzBadge />
      </body>
    </html>
  );
}
