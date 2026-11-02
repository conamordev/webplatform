"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 flex items-center justify-center text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 mx-auto flex items-center justify-center font-serif text-3xl font-bold">
            !
          </div>

          <span className="font-serif text-7xl sm:text-9xl font-bold text-rose-800 block tracking-tighter">
            500
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-black">
            Algo salió mal en el servidor
          </h1>

          <p className="font-body text-base text-on-surface-variant max-w-md mx-auto leading-relaxed">
            Hemos registrado la incidencia. Nuestro equipo concierge y técnico está trabajando para resolverla a la brevedad.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => reset()}
              className="px-8 py-3.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container shadow"
            >
              Reintentar
            </button>
            <Link
              href="/contacto"
              className="px-8 py-3.5 rounded-full border border-muted-border bg-white text-stone-700 font-sans text-xs uppercase tracking-widest font-bold hover:bg-surface-container"
            >
              Contactar Soporte
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
