"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth, EventData } from "@/lib/auth-context";

export default function BuscarEventosPage() {
  const { events } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Todos");

  const types = ["Todos", "Boda", "Baby Shower", "Cumpleaños", "Bautizo", "Otro"];

  const filteredEvents = events.filter((evt) => {
    const matchesQuery =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.hostNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "Todos" || evt.type === selectedType;

    return matchesQuery && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-container-high border border-accent-gold/30 text-primary font-sans text-xs uppercase tracking-[0.3em]">
            <span className="material-symbols-outlined text-sm">search</span>
            <span>Buscador Oficial</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink-black leading-tight">
            Encuentra la celebración de tus seres queridos
          </h1>

          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Ingresa el nombre de los novios, anfitriones o la ciudad del evento para acceder a su sitio web privado, confirmar tu asistencia y aportar a su mesa de regalos.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-full shadow-lg border-2 border-accent-gold/40 p-2 focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-accent-gold ml-4 text-2xl">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca por nombre (ej. Sofía, Camila, Mateo)..."
                className="w-full px-4 py-3 bg-transparent text-ink-black font-body text-base focus:outline-none placeholder:text-stone-400 placeholder:italic"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="p-1 mr-2 text-stone-400 hover:text-stone-600 rounded-full"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
              <button
                type="button"
                className="px-6 sm:px-8 py-3 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-primary-container transition-all shadow shrink-0"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-wider transition-all ${
                  selectedType === t
                    ? "bg-primary text-white font-bold shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-muted-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-muted-border">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant">
              Resultados ({filteredEvents.length} eventos encontrados)
            </span>
            {(searchTerm || selectedType !== "Todos") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("Todos");
                }}
                className="font-sans text-xs text-primary hover:underline font-semibold"
              >
                Restablecer filtros
              </button>
            )}
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl overflow-hidden border border-muted-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-sans text-[10px] uppercase tracking-widest font-semibold border border-white/20">
                        {evt.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-accent-gold block font-semibold">
                        {evt.date}
                      </span>
                      <h3 className="font-serif text-xl font-bold line-clamp-1">{evt.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs text-stone-500 font-sans">
                        <strong className="text-stone-700">Anfitriones:</strong> {evt.hostNames}
                      </p>
                      <p className="text-xs text-stone-500 font-sans flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-accent-gold">
                          location_on
                        </span>
                        <span>
                          {evt.locationName}, {evt.city}
                        </span>
                      </p>
                      <p className="font-body text-xs text-on-surface-variant line-clamp-2 italic pt-1">
                        &ldquo;{evt.story}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-muted-border flex items-center justify-between">
                      <span className="text-[11px] font-sans text-secondary font-semibold">
                        {evt.gifts.length} regalos activos
                      </span>
                      <Link
                        href={`/evento/${evt.slug}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow"
                      >
                        <span>Ver Evento</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-20 px-6 bg-surface-container-low rounded-3xl border border-muted-border space-y-4 max-w-xl mx-auto">
              <span className="material-symbols-outlined text-5xl text-accent-gold">
                event_busy
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink-black">
                No encontramos eventos con esos criterios
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Verifica la ortografía de los nombres o la ciudad. Si tus amigos te enviaron un enlace directo, puedes abrirlo directamente en tu navegador.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("Todos");
                  }}
                  className="px-6 py-2.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest hover:bg-primary-container transition-all"
                >
                  Ver Todos los Eventos
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
