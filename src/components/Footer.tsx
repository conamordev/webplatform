"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "ConAmor, | Mesa de Regalos Digital",
          text: "Una forma más libre de celebrar y compartir lo que realmente importa.",
          url: window.location.href,
        })
        .catch(() => {});
    }
  };

  return (
    <footer className="bg-primary text-white border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-12">
        {/* Cuerpo Principal del Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Columna Izquierda: Brand & Filosofía */}
          <div className="max-w-lg">
            <Link
              href="/"
              className="font-serif text-3xl sm:text-4xl text-white tracking-tight hover:opacity-90 transition-opacity inline-flex items-baseline mb-3"
            >
              <span>ConAmor</span>
              <span className="text-durazno font-serif not-italic">,</span>
            </Link>

            <span className="font-sans text-[10px] text-amarillo uppercase tracking-[0.3em] font-semibold block mb-4">
              Mesa de Regalos Digital
            </span>

            <p className="font-sans text-[11px] sm:text-xs text-white/80 uppercase tracking-[0.2em] leading-relaxed mb-8">
              Una forma más libre de celebrar y compartir lo que realmente importa.
              Regalos que construyen comienzos.
            </p>

            {/* Iconos Minimalistas idénticos al diseño */}
            <div className="flex items-center gap-6 text-white/80">
              <a
                href="/"
                className="hover:text-white transition-colors"
                title="Sitio Web"
                aria-label="Sitio Web"
              >
                <span className="material-symbols-outlined text-xl">language</span>
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="hover:text-white transition-colors cursor-pointer"
                title="Compartir"
                aria-label="Compartir"
              >
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
              <a
                href="mailto:contacto@conamor.com"
                className="hover:text-white transition-colors"
                title="Correo Electrónico"
                aria-label="Correo Electrónico"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>

          {/* Columnas Derechas: Enlaces de Plataforma, Legal y Soporte (Sin KYC) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 w-full lg:w-auto">
            {/* Columna Plataforma */}
            <div>
              <span className="font-sans text-[11px] font-semibold text-white/70 mb-5 block uppercase tracking-[0.25em]">
                Plataforma
              </span>
              <ul className="space-y-3.5 font-sans text-[11px] uppercase tracking-[0.2em] text-white/85">
                <li>
                  <Link
                    href="/crear-evento"
                    className="hover:text-white transition-colors block"
                  >
                    Crear Evento
                  </Link>
                </li>
                <li>
                  <Link
                    href="/como-crear-evento"
                    className="hover:text-white transition-colors block"
                  >
                    Cómo Funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buscar-eventos"
                    className="hover:text-white transition-colors block"
                  >
                    Buscar Evento
                  </Link>
                </li>
                <li>
                  <Link
                    href="/evento/boda-erika-jose-luis"
                    className="hover:text-white transition-colors block"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna Legal */}
            <div>
              <span className="font-sans text-[11px] font-semibold text-white/70 mb-5 block uppercase tracking-[0.25em]">
                Legal
              </span>
              <ul className="space-y-3.5 font-sans text-[11px] uppercase tracking-[0.2em] text-white/85">
                <li>
                  <Link
                    href="/aviso-legal#privacidad"
                    className="hover:text-white transition-colors block"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aviso-legal#terminos"
                    className="hover:text-white transition-colors block"
                  >
                    Términos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aviso-legal#privacidad"
                    className="hover:text-white transition-colors block"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aviso-legal#tarifas"
                    className="hover:text-white transition-colors block"
                  >
                    Tarifas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna Soporte */}
            <div className="col-span-2 sm:col-span-1">
              <span className="font-sans text-[11px] font-semibold text-white/70 mb-5 block uppercase tracking-[0.25em]">
                Soporte
              </span>
              <ul className="space-y-3.5 font-sans text-[11px] uppercase tracking-[0.2em] text-white/85">
                <li>
                  <Link
                    href="/contacto"
                    className="hover:text-white transition-colors block"
                  >
                    Ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto#faq"
                    className="hover:text-white transition-colors block"
                  >
                    Preguntas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="hover:text-white transition-colors block"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Barra Inferior Copyright & Editorial */}
        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 font-sans text-[10px] sm:text-[11px] tracking-[0.2em] text-center md:text-left">
          <span className="uppercase">© 2026 ConAmor, Mesa de Regalos Digital.</span>
          <a
            href="https://www.blackcherryitconsulting.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/75 hover:text-white transition-colors inline-flex items-center gap-1.5 hover:underline"
          >
            <span>Desarrollado por</span>
            <span className="font-semibold text-white">BlackCherryItConsulting</span>
          </a>
          <span className="italic uppercase text-white/70">
            Hecho con amor y precisión editorial.
          </span>
        </div>
      </div>
    </footer>
  );
}
