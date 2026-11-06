import React from "react";
import { EventData } from "@/lib/auth-context";

interface GuestEventDetailsProps {
  event: EventData;
}

export default function GuestEventDetails({ event }: GuestEventDetailsProps) {
  const mapImage =
    event.mapImage ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWjF4jYpCyEgdh1UGg_YG9vXBwWscYnNV3d4nGIZea7m08NskFjZ1b4mwozfgltxAliF5KpgtybkuyFhNkE-0vV2SjrCwGjJ-KFWWlUokfBFWQAyK7k5YzuaXqg0Kfgh3K_hfcYgutgcC_pQV2fX4gtTTxrhJXa7He9_Kqj81TyTUT6Mrw6Gij16zzgXrlYNbvUYCgFnP7j1NIZ4nf_hx7iquNGNtoX0fH9RAvL4o2ezxQ_aeqQzX2dJveIX6eDi7Ng_ZFHHIqw08";

  const dressCodeImage =
    event.dressCodeImage ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDaimOTr_dIN3vrZ-D1S4rJvW2TEQHFvixOFq839KkNcVZnGvSGVo4m1IbqM42rgTQyvSdE2BZcDEn4UNg_cCz3OlaltylOH67AkGDPJEoPB4Dcm9xcZmvroBZxA9TuaMtp2NnKeDvYXkqgqjl0rd0KvoFkoqH2gHn8yMZX-9dfDqQIFxIq61dp3rQUhc0-PzRaEQhAgRy8U9NZufzcC6j7Y6RRVlyvJe2JGcbNOj9J_zF0zYa_Tf-pnqYUQi7Ox6cMl6Gq_cAQ2YE";

  const dressCodeDetails = event.dressCodeDetails || {
    styleName: "Etiqueta Rigurosa",
    gentlemen: "Smoking o traje oscuro formal con corbata.",
    ladies: "Vestido largo de gala. Tonos sugeridos: Tierra y Joya.",
  };

  const isBoda = event.type === "Boda";
  const venueTitle = isBoda ? "Ceremonia y Recepción" : "Sede & Recepción";

  return (
    <section className="bg-surface-container-low py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        {/* Encabezado Editorial */}
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
          <p className="text-accent-gold font-sans text-xs uppercase tracking-[0.25em] mb-3 font-semibold">
            Información Esencial
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-primary mb-5 font-normal">
            Detalles del Evento
          </h2>
          <div className="w-24 h-px bg-accent-gold/60" />
        </div>

        {/* Cuadrícula de Dos Columnas con Fondos Blancos y Marcos Editoriales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Tarjeta 1: Sede / Ceremonia y Recepción */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">
                map
              </span>
              <h3 className="font-serif text-2xl md:text-[28px] text-on-surface font-normal">
                {venueTitle}
              </h3>
            </div>

            <div className="relative group">
              {/* Marco desplazado detrás (layered line) */}
              <div className="absolute top-3 left-3 w-full h-full border border-primary/20 rounded-xl pointer-events-none z-0" />

              {/* Contenedor blanco principal con marco dorado interior */}
              <div className="relative z-10 bg-white border border-[#D9D4B5] rounded-xl h-[550px] p-4 sm:p-5 shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5">
                {/* Marco dorado interior del contenedor blanco */}
                <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#E9D08C] rounded-lg pointer-events-none z-20" />

                {/* Lienzo interior del mapa enmarcado */}
                <div className="w-full h-full rounded-md overflow-hidden relative border border-stone-200 shadow-sm">
                  <img
                    alt={event.locationName}
                    src={mapImage}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent flex items-end p-6 sm:p-8">
                    <div className="text-white z-10">
                      <h4 className="font-serif text-2xl md:text-3xl mb-1.5 font-normal leading-snug">
                        {event.locationName}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm opacity-90 mb-5 max-w-md">
                        {event.address}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          `${event.locationName}, ${event.address}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold border border-white/40 px-6 py-2.5 rounded-full hover:bg-white hover:text-primary transition-all backdrop-blur-xs"
                      >
                        <span>Cómo llegar</span>
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Código de Vestimenta */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">
                styler
              </span>
              <h3 className="font-serif text-2xl md:text-[28px] text-on-surface font-normal">
                Código de Vestimenta
              </h3>
            </div>

            <div className="relative group">
              {/* Marco desplazado detrás (layered line) */}
              <div className="absolute top-3 left-3 w-full h-full border border-primary/20 rounded-xl pointer-events-none z-0" />

              {/* Contenedor blanco principal con marco dorado interior */}
              <div className="relative z-10 bg-white border border-[#D9D4B5] rounded-xl h-[550px] p-4 sm:p-5 shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5">
                {/* Marco dorado interior del contenedor blanco */}
                <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#E9D08C] rounded-lg pointer-events-none z-20" />

                {/* Contenido dividido en 2 columnas: Foto a la izquierda, Texto sobre fondo blanco a la derecha */}
                <div className="grid grid-cols-1 sm:grid-cols-2 h-full gap-4 relative z-10">
                  {/* Foto de Vestimenta con su propio marco dorado */}
                  <div className="h-60 sm:h-full rounded-md overflow-hidden border border-muted-border relative shadow-xs">
                    <img
                      alt="Referencia Código de Vestimenta"
                      src={dressCodeImage}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-2.5 border-2 border-[#E9D08C] rounded-sm pointer-events-none" />
                  </div>

                  {/* Texto sobre fondo blanco */}
                  <div className="flex flex-col justify-center px-4 sm:px-6 py-2 text-center sm:text-left space-y-6">
                    <h4 className="font-serif text-primary italic text-3xl md:text-4xl font-normal leading-tight">
                      {dressCodeDetails.styleName || event.dressCode}
                    </h4>

                    <div className="space-y-6">
                      <div>
                        <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-bold block mb-1.5">
                          Caballeros
                        </span>
                        <p className="font-body text-sm text-on-surface-variant italic leading-relaxed">
                          {dressCodeDetails.gentlemen}
                        </p>
                      </div>

                      <div>
                        <span className="font-sans text-xs uppercase tracking-widest text-accent-gold font-bold block mb-1.5">
                          Damas
                        </span>
                        <p className="font-body text-sm text-on-surface-variant italic leading-relaxed">
                          {dressCodeDetails.ladies}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
