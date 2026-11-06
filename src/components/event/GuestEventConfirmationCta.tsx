import React from "react";
import { EventData } from "@/lib/auth-context";

interface GuestEventConfirmationCtaProps {
  event: EventData;
  onConfirmClick: () => void;
}

export default function GuestEventConfirmationCta({
  event,
  onConfirmClick,
}: GuestEventConfirmationCtaProps) {
  const quote =
    event.closingQuote ||
    '"Que este día sea el fiel reflejo de la belleza que compartimos juntos y el inicio de una eternidad rodeados de vuestro cariño."';

  return (
    <section className="py-24 md:py-32 max-w-4xl mx-auto px-4 sm:px-8 text-center">
      <div className="editorial-container p-10 sm:p-16 md:p-20 inline-block w-full">
        <div className="layered-lines" />
        <div className="floating-gold-frame" />

        <div className="relative z-10 flex flex-col items-center">
          <span
            className="material-symbols-outlined text-primary text-5xl md:text-6xl mb-6 select-none"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>

          <h2 className="font-serif text-primary text-3xl sm:text-4xl md:text-5xl font-normal mb-5">
            Esperamos verles pronto
          </h2>

          <p className="font-body text-base sm:text-lg text-on-surface-variant italic mb-10 max-w-2xl mx-auto leading-relaxed">
            {quote}
          </p>

          <button
            onClick={onConfirmClick}
            className="bg-primary text-white px-12 py-4 rounded-full font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-primary-container transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            Confirmar Asistencia
          </button>
        </div>
      </div>
    </section>
  );
}
