"use client";

import React, { useState, useEffect } from "react";
import { EventData } from "@/lib/auth-context";

interface GuestEventSummaryProps {
  event: EventData;
}

export default function GuestEventSummary({ event }: GuestEventSummaryProps) {
  // Live countdown calculation
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    isPast: boolean;
  }>({
    days: 160,
    hours: 6,
    minutes: 3,
    isPast: false,
  });

  useEffect(() => {
    const targetDate = new Date(
      event.countdownTargetDate || "2026-05-30T18:00:00"
    ).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;
      const isPast = diff < 0;
      const absDiff = Math.abs(diff);

      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes, isPast });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 30);
    return () => clearInterval(interval);
  }, [event.countdownTargetDate]);

  return (
    <section id="resumen" className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Columna Izquierda: Tarjetas y Narrativa con Letra Capitular */}
        <div className="md:col-span-7 space-y-12">
          {/* Tres Tarjetas Editoriales con doble marco */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Tarjeta Fecha */}
            <div className="editorial-container p-8 text-center">
              <div className="layered-lines" />
              <div className="floating-gold-frame" />
              <span className="material-symbols-outlined text-primary mb-3 text-2xl">
                calendar_today
              </span>
              <span className="font-sans font-semibold text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                Fecha
              </span>
              <span className="font-serif text-primary text-[22px] md:text-[24px] font-normal">
                {event.date}
              </span>
            </div>

            {/* Tarjeta Ubicación */}
            <div className="editorial-container p-8 text-center">
              <div className="layered-lines" />
              <div className="floating-gold-frame" />
              <span className="material-symbols-outlined text-primary mb-3 text-2xl">
                location_on
              </span>
              <span className="font-sans font-semibold text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                Ubicación
              </span>
              <span className="font-serif text-primary text-[22px] md:text-[24px] font-normal">
                {event.city}
              </span>
            </div>

            {/* Tarjeta Dress Code */}
            <div className="editorial-container p-8 text-center">
              <div className="layered-lines" />
              <div className="floating-gold-frame" />
              <span className="material-symbols-outlined text-primary mb-3 text-2xl">
                apparel
              </span>
              <span className="font-sans font-semibold text-xs uppercase tracking-widest text-on-surface-variant block mb-1">
                Dress Code
              </span>
              <span className="font-serif text-primary text-[22px] md:text-[24px] font-normal">
                {event.dressCode}
              </span>
            </div>
          </div>

          {/* Narrativa con Letra Capitular */}
          <div className="prose max-w-none">
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-primary first-letter:leading-none">
              {event.story ||
                "Nos complace enormemente invitarles a ser testigos de este momento inolvidable, rodeados de la elegancia y el afecto de quienes más apreciamos."}
            </p>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Cuenta Regresiva */}
        <div className="md:col-span-5 flex flex-col justify-center items-center">
          <div className="editorial-container w-full max-w-[420px] aspect-square flex flex-col items-center justify-center p-8 sm:p-12 text-center">
            <div className="layered-lines" />
            <div className="floating-gold-frame" />

            <h2 className="font-serif text-accent-gold uppercase tracking-[0.2em] text-lg sm:text-xl mb-8 font-semibold">
              Cuenta Regresiva
            </h2>

            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
              <div className="text-center">
                <span className="font-serif text-4xl sm:text-6xl text-primary font-normal block leading-none">
                  {timeLeft.isPast ? `-${timeLeft.days}` : timeLeft.days}
                </span>
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant font-semibold mt-2 block">
                  Días
                </span>
              </div>

              <span className="font-serif text-4xl sm:text-5xl text-muted-border block leading-none translate-y-[-6px]">
                :
              </span>

              <div className="text-center">
                <span className="font-serif text-4xl sm:text-6xl text-primary font-normal block leading-none">
                  {timeLeft.isPast ? `-${timeLeft.hours}` : timeLeft.hours}
                </span>
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant font-semibold mt-2 block">
                  Hrs
                </span>
              </div>

              <span className="font-serif text-4xl sm:text-5xl text-muted-border block leading-none translate-y-[-6px]">
                :
              </span>

              <div className="text-center">
                <span className="font-serif text-4xl sm:text-6xl text-primary font-normal block leading-none">
                  {timeLeft.isPast ? `-${timeLeft.minutes}` : timeLeft.minutes}
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
    </section>
  );
}
