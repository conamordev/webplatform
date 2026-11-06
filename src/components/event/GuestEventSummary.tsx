"use client";

import React, { useState, useEffect } from "react";
import { EventData } from "@/lib/auth-context";

interface GuestEventSummaryProps {
  event: EventData;
}

export default function GuestEventSummary({ event }: GuestEventSummaryProps) {
  // Live dynamic countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    isPast: boolean;
  }>({
    days: "160",
    hours: "06",
    minutes: "03",
    seconds: "00",
    isPast: false,
  });

  useEffect(() => {
    // Target date from event, fallback to May 30, 2026 18:00
    const rawTarget = event.countdownTargetDate || "2026-05-30T18:00:00";
    const parsedTarget = new Date(rawTarget).getTime();
    const targetDate = isNaN(parsedTarget)
      ? new Date("2026-05-30T18:00:00").getTime()
      : parsedTarget;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;
      const isPast = diff < 0;
      const absDiff = Math.abs(diff);

      const d = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const h = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((absDiff % (1000 * 60)) / 1000);

      const prefix = isPast ? "-" : "";
      setTimeLeft({
        days: `${prefix}${d}`,
        hours: `${prefix}${String(h).padStart(2, "0")}`,
        minutes: `${prefix}${String(m).padStart(2, "0")}`,
        seconds: String(s).padStart(2, "0"),
        isPast,
      });
    };

    updateCountdown();
    // Live tick every second
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.countdownTargetDate]);

  return (
    <section id="resumen" className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Columna Izquierda: 3 Tarjetas Blancas con Doble Marco & Narrativa */}
        <div className="md:col-span-7 space-y-12">
          {/* Tres Tarjetas Editoriales con doble marco */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Tarjeta Fecha */}
            <div className="relative group">
              {/* Marco desplazado detrás (layered line) */}
              <div className="absolute top-2.5 left-2.5 w-full h-full border border-primary/20 rounded-xl pointer-events-none z-0" />
              {/* Tarjeta blanca */}
              <div className="relative z-10 bg-white border border-[#D9D4B5] rounded-xl p-8 text-center shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5">
                {/* Marco dorado interior */}
                <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#E9D08C] rounded-lg pointer-events-none" />
                <span className="material-symbols-outlined text-primary mb-3 text-2xl">
                  calendar_today
                </span>
                <span className="font-sans font-semibold text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  Fecha
                </span>
                <span className="font-serif text-primary text-[22px] md:text-[24px] font-normal leading-snug block">
                  {event.date}
                </span>
              </div>
            </div>

            {/* Tarjeta Ubicación */}
            <div className="relative group">
              {/* Marco desplazado detrás (layered line) */}
              <div className="absolute top-2.5 left-2.5 w-full h-full border border-primary/20 rounded-xl pointer-events-none z-0" />
              {/* Tarjeta blanca */}
              <div className="relative z-10 bg-white border border-[#D9D4B5] rounded-xl p-8 text-center shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5">
                {/* Marco dorado interior */}
                <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#E9D08C] rounded-lg pointer-events-none" />
                <span className="material-symbols-outlined text-primary mb-3 text-2xl">
                  location_on
                </span>
                <span className="font-sans font-semibold text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  Ubicación
                </span>
                <span className="font-serif text-primary text-[22px] md:text-[24px] font-normal leading-snug block">
                  {event.city}
                </span>
              </div>
            </div>

            {/* Tarjeta Dress Code */}
            <div className="relative group">
              {/* Marco desplazado detrás (layered line) */}
              <div className="absolute top-2.5 left-2.5 w-full h-full border border-primary/20 rounded-xl pointer-events-none z-0" />
              {/* Tarjeta blanca */}
              <div className="relative z-10 bg-white border border-[#D9D4B5] rounded-xl p-8 text-center shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5">
                {/* Marco dorado interior */}
                <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#E9D08C] rounded-lg pointer-events-none" />
                <span className="material-symbols-outlined text-primary mb-3 text-2xl">
                  apparel
                </span>
                <span className="font-sans font-semibold text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                  Dress Code
                </span>
                <span className="font-serif text-primary text-[22px] md:text-[24px] font-normal leading-snug block">
                  {event.dressCode}
                </span>
              </div>
            </div>
          </div>

          {/* Narrativa con Letra Capitular */}
          <div className="prose max-w-none pt-2">
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-primary first-letter:leading-none">
              {event.story ||
                "Nos complace enormemente invitarles a ser testigos de nuestra unión. Este día marca el comienzo de una nueva aventura, rodeados de la elegancia y el amor de quienes más apreciamos. La celebración se llevará a cabo en el corazón de León, prometiendo ser una velada inolvidable de alta costura, música y romance."}
            </p>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Blanca de Cuenta Regresiva con Doble Marco */}
        <div className="md:col-span-5 flex flex-col justify-center items-center">
          <div className="relative group w-full max-w-[420px]">
            {/* Marco desplazado detrás (layered line) */}
            <div className="absolute top-3 left-3 w-full h-full border border-primary/20 rounded-xl pointer-events-none z-0" />

            {/* Tarjeta blanca cuadrada */}
            <div className="relative z-10 bg-white border border-[#D9D4B5] rounded-xl aspect-square flex flex-col items-center justify-center p-8 sm:p-12 text-center shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5">
              {/* Marco dorado interior */}
              <div className="absolute inset-3 sm:inset-4 border-2 border-[#E9D08C] rounded-lg pointer-events-none" />

              <h2 className="font-serif text-accent-gold uppercase tracking-[0.2em] text-lg sm:text-xl mb-8 font-semibold">
                Cuenta Regresiva
              </h2>

              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
                <div className="text-center">
                  <span className="font-serif text-4xl sm:text-6xl text-primary font-normal block leading-none tabular-nums">
                    {timeLeft.days}
                  </span>
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant font-semibold mt-2 block">
                    Días
                  </span>
                </div>

                <span className="font-serif text-4xl sm:text-5xl text-muted-border block leading-none translate-y-[-6px]">
                  :
                </span>

                <div className="text-center">
                  <span className="font-serif text-4xl sm:text-6xl text-primary font-normal block leading-none tabular-nums">
                    {timeLeft.hours}
                  </span>
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant font-semibold mt-2 block">
                    Hrs
                  </span>
                </div>

                <span className="font-serif text-4xl sm:text-5xl text-muted-border block leading-none translate-y-[-6px]">
                  :
                </span>

                <div className="text-center">
                  <span className="font-serif text-4xl sm:text-6xl text-primary font-normal block leading-none tabular-nums">
                    {timeLeft.minutes}
                  </span>
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant font-semibold mt-2 block">
                    Min
                  </span>
                </div>
              </div>

              <p className="font-body italic text-sm text-on-surface-variant opacity-75">
                {event.countdownSubtitle || 'Hasta el "Sí, acepto"'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
