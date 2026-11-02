import type { Metadata } from "next";
import { Playfair_Display, Literata, Libre_Franklin } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Con Amor Eventos | Mesas de Regalos y Experiencias para Bodas en México",
  description:
    "Crea un sitio web personalizado para tu evento, recibe confirmaciones de asistencia (RSVP) y gestiona tu mesa de regalos con pagos seguros directos a tu banco con Stripe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${playfair.variable} ${literata.variable} ${libreFranklin.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-background text-on-surface selection:bg-primary selection:text-white">
        <AuthProvider>
          <div className="editorial-frame-overlay" aria-hidden="true" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
