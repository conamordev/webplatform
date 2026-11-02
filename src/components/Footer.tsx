"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/10 pt-20 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-16 mb-16">
        {/* Brand column */}
        <div className="max-w-md">
          <div className="font-serif text-3xl text-white mb-6 tracking-tight flex items-center gap-2">
            <span>Con Amor</span>
            <span className="text-[10px] font-sans font-normal uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full text-accent-gold">
              Eventos
            </span>
          </div>
          <p className="font-body text-white/70 leading-relaxed mb-8 text-xs sm:text-sm">
            Curaduría de experiencias editoriales de lujo, confirmación de asistencia y gestión de mesas de regalos en México. Pagos protegidos y transferencias bancarias respaldadas por Stripe Connect.
          </p>
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Instagram"
            >
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a
              href="mailto:hola@conamor.mx"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Email"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
            <Link
              href="/contacto"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Concierge"
            >
              <span className="material-symbols-outlined text-lg">support_agent</span>
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
          <div>
            <span className="font-sans text-[11px] font-bold text-accent-gold mb-6 block uppercase tracking-[0.25em]">
              Plataforma
            </span>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/crear-evento"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Crear Evento
                </Link>
              </li>
              <li>
                <Link
                  href="/como-crear-evento"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/buscar-eventos"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Buscar Evento
                </Link>
              </li>
              <li>
                <Link
                  href="/evento/boda-sofia-mateo"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Demo de Invitado
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-sans text-[11px] font-bold text-accent-gold mb-6 block uppercase tracking-[0.25em]">
              Legal & Tarifas
            </span>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/aviso-legal"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal#terminos"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal#privacidad"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Privacidad & Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/aviso-legal#tarifas"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Comisiones Transparentes
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="font-sans text-[11px] font-bold text-accent-gold mb-6 block uppercase tracking-[0.25em]">
              Soporte
            </span>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/contacto"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto#faq"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="font-sans text-xs text-white/70 hover:text-white transition-colors"
                >
                  Concierge VIP
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/onboarding"
                  className="font-sans text-xs text-accent-gold hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>KYC Stripe México</span>
                  <span className="material-symbols-outlined text-xs">verified</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 font-sans tracking-wider">
        <span>© 2026 Con Amor Eventos. Todos los derechos reservados.</span>
        <span className="mt-3 sm:mt-0 italic font-serif text-white/40">
          Diseñado con curaduría editorial para momentos inolvidables.
        </span>
      </div>
    </footer>
  );
}
