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
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover object-center"
          src={backgroundImage}
          alt="Con Amor Eventos - El arte de celebrar"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      <div className="relative z-20 h-full flex flex-col justify-between px-8 sm:px-12 md:px-16 lg:px-20 py-24 pb-12 md:pb-16">
        {/* Top Right: Tagline & CTA */}
        <div className="flex justify-end items-start w-full mt-16 md:mt-24">
          <div className="max-w-[320px] flex flex-col items-end gap-6 text-right">
            <p className="font-body text-base md:text-lg text-white leading-relaxed drop-shadow-md">
              Curaduría de experiencias de lujo y gestión de eventos de alto perfil.
            </p>
            <PillButton href="/crear-evento" variant="white" icon="arrow_forward">
              Crear evento
            </PillButton>
          </div>
        </div>

        {/* Bottom: Main Title & Exclusive Benefits */}
        <div className="flex flex-col gap-6 md:gap-8 w-full">
          <h1 className="font-serif text-[clamp(4.2rem,9.5vw,8.5rem)] text-white italic leading-[0.88] -ml-2 drop-shadow-2xl">
            El arte de <br /> celebrar.
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-baseline w-full gap-4">
            <div className="shrink-0">
              <span className="text-white font-serif italic text-2xl md:text-3xl leading-none drop-shadow">
                Beneficios Exclusivos
              </span>
            </div>

            <div className="h-[0.5px] bg-white/40 flex-grow self-center translate-y-1 hidden sm:block" />

            <div className="flex flex-wrap gap-3 shrink-0">
              <PillButton href="#mesa-de-regalos" variant="glass">
                Mesa de Regalos
              </PillButton>
              <PillButton href="#como-crear-evento" variant="glass">
                Web Personalizada
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

