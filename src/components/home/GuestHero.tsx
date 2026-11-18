import React from "react";
import PillButton from "@/components/ui/PillButton";

interface GuestHeroProps {
  backgroundImage?: string;
}

export default function GuestHero({
  backgroundImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2560&q=90",
}: GuestHeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-negro-profundo">
      {/* Background Image & Overlay con tono cálido editorial */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover object-center"
          src={backgroundImage}
          alt="ConAmor, Mesa de Regalos Digital"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40 z-10" />
      </div>

      <div className="relative z-20 h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-24 pb-12 md:pb-16">
        {/* Top Right: Tagline & CTA según Brand Guide */}
        <div className="flex justify-end items-start w-full mt-16 md:mt-20">
          <div className="max-w-[340px] flex flex-col items-end gap-5 text-right">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-amarillo bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
              Mesa de Regalos Digital
            </span>
            <p className="font-sans text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-md">
              Crea tu mesa de regalos digital y recibe aportaciones para los momentos, sueños y proyectos que más importan.
            </p>
            <PillButton href="/crear-evento" variant="white" icon="arrow_forward">
              Crear mi mesa
            </PillButton>
          </div>
        </div>

        {/* Bottom: Main Title & Brand Philosophy */}
        <div className="flex flex-col gap-6 md:gap-8 w-full">
          <div className="relative">
            <h1 className="font-serif text-[clamp(3.5rem,8.5vw,7.8rem)] text-white leading-[0.92] -ml-1 drop-shadow-2xl">
              Todo lo que viene, <br />
              <span className="italic font-normal">se celebra</span> <br />
              <span>ConAmor</span>
              <span className="text-durazno font-serif not-italic">,</span>
            </h1>

            {/* Badge flotante "Para todas las etapas." según Brand Guide */}
            <div className="hidden md:inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-sans text-xs tracking-wider">
              <span className="font-script text-lg text-amarillo">Para todas las etapas</span>
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

            <div className="flex flex-wrap gap-3 shrink-0">
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
