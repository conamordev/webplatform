import React from "react";
import PillButton from "@/components/ui/PillButton";

interface GuestHeroProps {
  backgroundImage?: string;
}

export default function GuestHero({
  backgroundImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2560&q=90",
}: GuestHeroProps) {
  return (
    <section
      id="guest-hero"
      className="relative min-h-[100dvh] w-full bg-negro-profundo flex flex-col justify-between overflow-x-hidden"
    >
      {/* Background Image & Overlay con tono cálido editorial */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover object-center"
          src={backgroundImage}
          alt="ConAmor, Mesa de Regalos Digital"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45 z-10" />
      </div>

      <div className="relative z-20 flex-1 flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-12 md:pb-16">
        {/* Top Right: Tagline & CTA (sin la etiqueta de Mesa de Regalos Digital) */}
        <div className="flex justify-end items-start w-full mt-2 sm:mt-4 md:mt-6">
          <div className="max-w-[320px] sm:max-w-[360px] flex flex-col items-end gap-3.5 sm:gap-4 text-right">
            <p className="font-sans text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-md">
              Crea tu mesa de regalos digital y recibe aportaciones para los momentos, sueños y proyectos que más importan.
            </p>
            <PillButton href="/crear-evento" variant="white" icon="arrow_forward">
              Crear mi mesa
            </PillButton>
          </div>
        </div>

        {/* Bottom: Main Title & Brand Philosophy */}
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 w-full pt-8 sm:pt-12">
          <div className="relative">
            <h1 className="font-serif text-[clamp(2.5rem,6.2vw,5.8rem)] text-white leading-[0.94] -ml-1 drop-shadow-2xl">
              Todo lo que viene, <br />
              <span className="italic font-normal">se celebra</span> <br />
              <span>ConAmor</span>
              <span className="text-durazno font-serif not-italic">,</span>
            </h1>

            {/* Badge flotante "Para todas las etapas." según Brand Guide */}
            <div className="inline-flex items-center gap-2 mt-3 sm:mt-4 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-sans text-xs tracking-wider">
              <span className="font-script text-base sm:text-lg text-amarillo">Para todas las etapas</span>
              <span className="text-durazno font-serif font-bold">’</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline w-full gap-4 pt-2">
            <div className="shrink-0">
              <span className="text-white/95 font-sans font-medium text-xs sm:text-sm uppercase tracking-[0.25em] leading-none drop-shadow">
                Regalos que construyen comienzos
              </span>
            </div>

            <div className="h-[0.5px] bg-white/30 flex-grow self-center translate-y-1 hidden sm:block" />

            <div className="flex flex-wrap gap-2.5 sm:gap-3 shrink-0">
              <PillButton href="#como-crear-evento" variant="glass">
                Ver cómo funciona
              </PillButton>
              <PillButton href="#celebraciones" variant="glass">
                Celebraciones
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
