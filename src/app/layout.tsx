import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

// Tipografía para Títulos (estilo TAN Twinkle)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Tipografía principal para Textos según Brand Guide (Montserrat)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Tipografía para Detalles según Brand Guide (estilo Bristol)
const bristol = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConAmor, | Mesa de Regalos Digital en México",
  description:
    "Una forma más libre de celebrar y compartir lo que realmente importa. Crea tu mesa de regalos digital y recibe aportaciones para tus momentos, sueños y proyectos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${playfair.variable} ${montserrat.variable} ${bristol.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-on-surface selection:bg-primary selection:text-white">
        <AuthProvider>
          <div className="editorial-frame-overlay" aria-hidden="true" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
