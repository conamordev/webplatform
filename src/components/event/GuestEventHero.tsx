import React from "react";
import { EventData } from "@/lib/auth-context";

interface GuestEventHeroProps {
  event: EventData;
}

export default function GuestEventHero({ event }: GuestEventHeroProps) {
  // Check if hostNames has an ampersand to italicize it
  const hasAmpersand = event.hostNames.includes("&");
  const nameParts = hasAmpersand
    ? event.hostNames.split("&")
    : [event.hostNames];

  const scrollToSummary = () => {
    const el = document.getElementById("resumen");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[95vh] w-full overflow-hidden bg-negro-profundo">
      {/* Imagen de fondo */}
      <img
        alt={event.title}
        src={event.coverImage}
        className="w-full h-full object-cover object-center scale-105"
      />

      {/* Superposición oscura editorial */}
      <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <h1 className="text-white font-serif text-[48px] sm:text-[80px] md:text-[120px] lg:text-[140px] leading-[1.05] mb-3 drop-shadow-2xl">
          {hasAmpersand ? (
            <>
              <span>{nameParts[0].trim()}</span>{" "}
              <span className="italic font-normal">&amp;</span>{" "}
              <span>{nameParts[1].trim()}</span>
            </>
          ) : (
            event.hostNames
          )}
        </h1>

        <p className="text-white font-sans text-xs sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] mt-3 opacity-95 drop-shadow">
          {event.date} • {event.city}
        </p>
      </div>

      {/* Botón flotante Descubrir con rebote */}
      <div
        onClick={scrollToSummary}
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-1.5 animate-bounce cursor-pointer z-20 group"
      >
        <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest font-semibold group-hover:text-accent-gold transition-colors">
          Descubrir
        </span>
        <span className="material-symbols-outlined text-2xl group-hover:text-accent-gold transition-colors">
          expand_more
        </span>
      </div>
    </section>
  );
}

