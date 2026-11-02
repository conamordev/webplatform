"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 flex items-center justify-center text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-surface-container-high text-primary mx-auto flex items-center justify-center font-serif text-3xl font-bold">
            !
          </div>

          <span className="font-serif text-7xl sm:text-9xl font-bold text-primary block tracking-tighter">
            404
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-black">
            Página o Evento no Encontrado
          </h1>

          <p className="font-body text-base text-on-surface-variant max-w-md mx-auto leading-relaxed">
            El enlace al que intentas acceder no existe, ha cambiado de dirección o el evento aún no ha sido publicado por los anfitriones.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container shadow"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/buscar-eventos"
              className="px-8 py-3.5 rounded-full border border-muted-border bg-white text-stone-700 font-sans text-xs uppercase tracking-widest font-bold hover:bg-surface-container"
            >
              Buscar Eventos
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
