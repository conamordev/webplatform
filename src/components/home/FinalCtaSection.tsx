import React from "react";
import Link from "next/link";

export default function FinalCtaSection() {
  return (
    <section className="py-24 sm:py-28 md:py-36 px-6 text-center bg-surface relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow con líneas decorativas a los lados */}
        <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
          <div className="w-10 sm:w-16 h-[1px] bg-primary/30" />
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] font-semibold text-primary">
            Tu Próximo Capítulo
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-primary/30" />
        </div>

        {/* Título editorial limpio idéntico al diseño */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-normal text-on-surface leading-tight tracking-tight mb-8 md:mb-10">
          Comienza tu evento
        </h2>

        {/* Botón Empezar Ahora (sin flecha, con shadow-2xl y estilo pill exacto) */}
        <div>
          <Link
            href="/crear-evento"
            className="inline-flex items-center justify-center px-10 sm:px-12 py-3.5 sm:py-4 rounded-full bg-primary text-white font-sans text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold hover:bg-primary-container transition-all shadow-2xl hover:shadow-2xl active:scale-95"
          >
            Empezar Ahora
          </Link>
        </div>
      </div>
    </section>
  );
}

