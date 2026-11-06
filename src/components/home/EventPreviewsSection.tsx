import React from "react";
import EventPreviewCard, {
  EventPreviewCardProps,
} from "@/components/ui/EventPreviewCard";

const PREVIEW_CARDS: EventPreviewCardProps[] = [
  {
    title: "Boda de Ensueño",
    subtitle: "Diseño Nupcial Atemporal",
    imageSrc:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Boda de Ensueño",
    href: "/evento/boda-erika-jose-luis",
    offsetClassName: "",
  },
  {
    title: "Networking de Lujo",
    subtitle: "Elegancia Profesional",
    imageSrc:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Networking de Lujo",
    href: "/evento/networking-de-lujo",
    offsetClassName: "md:mt-24",
  },
  {
    title: "Evento Privado",
    subtitle: "Intimidad y Detalle",
    imageSrc:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Evento Privado",
    href: "/evento/evento-privado",
    offsetClassName: "lg:mt-48",
  },
];

export default function EventPreviewsSection() {
  return (
    <section
      className="py-16 md:py-[8rem] bg-surface relative border-b hairline-border"
      id="plantillas-demo"
    >
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 relative">
        <div className="flex flex-col md:flex-row gap-0 items-start">
          {/* Columna Izquierda: Titular asimétrico con brush-highlight */}
          <div className="w-full md:w-2/5 relative z-50 mb-10 md:mb-0 pointer-events-none">
            <div className="md:sticky md:top-32">
              <span className="font-sans font-semibold text-[11px] text-primary block mb-4 md:mb-8 uppercase tracking-[0.4em]">
                Personalización Editorial
              </span>
              <h2 className="font-serif font-normal text-[clamp(2.5rem,7.5vw,96px)] text-on-surface leading-[0.95] max-w-lg md:-mr-32">
                <span className="brush-highlight inline-block mb-2">
                  Mira cómo
                </span>
                <br />
                <span className="brush-highlight inline-block mb-2">
                  se vería la
                </span>
                <br />
                <span className="brush-highlight inline-block">
                  web de tu evento
                </span>
              </h2>
            </div>
          </div>

          {/* Columna Derecha: Tarjetas (Horizontales y compactas en mobile, escalonadas en desktop) */}
          <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-40">
            {PREVIEW_CARDS.map((card) => (
              <EventPreviewCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        {/* Pie de sección */}
        <div className="mt-16 md:mt-32 text-center">
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-8 md:mb-12 leading-relaxed">
            Cada diseño es una pieza única, adaptada a la identidad visual de tu
            celebración con tipografías y paletas de colores exclusivas.
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-[1px] bg-primary/30" />
            <span className="font-sans font-semibold text-[10px] tracking-[0.4em] uppercase text-primary">
              Sastrería Digital
            </span>
            <div className="w-12 h-[1px] bg-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
