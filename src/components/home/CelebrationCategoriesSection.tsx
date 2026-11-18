"use client";

import React from "react";
import Link from "next/link";

const CELEBRATION_TYPES = [
  { name: "Bodas", icon: "favorite", bg: "bg-rosa-petalo/40 text-primary border border-rosa-petalo" },
  { name: "Baby showers", icon: "stroller", bg: "bg-durazno/35 text-primary border border-durazno" },
  { name: "Cumpleaños", icon: "cake", bg: "bg-amarillo/45 text-primary border border-amarillo" },
  { name: "Bautizos", icon: "water_drop", bg: "bg-azul-cielo/40 text-primary border border-azul-cielo" },
  { name: "Aniversarios", icon: "volunteer_activism", bg: "bg-durazno/35 text-primary border border-durazno" },
  { name: "Graduaciones", icon: "school", bg: "bg-verde-salvia/40 text-primary border border-verde-salvia" },
  { name: "Otras celebraciones", icon: "celebration", bg: "bg-rosa-petalo/40 text-primary border border-rosa-petalo" },
];

const GIFT_COLLECTIONS = [
  {
    title: "Luna de miel",
    desc: "Escapadas, experiencias y momentos inolvidables.",
    icon: "flight",
    circleBg: "bg-azul-cielo",
    tag: "Experiencia",
    tagClass: "badge-experiencia",
  },
  {
    title: "Nuestro hogar",
    desc: "Para crear el espacio donde empieza su historia.",
    icon: "home",
    circleBg: "bg-rosa-petalo",
    tag: "Hogar",
    tagClass: "badge-hogar",
  },
  {
    title: "Experiencias",
    desc: "Cenas, viajes, conciertos y más.",
    icon: "celebration",
    circleBg: "bg-amarillo",
    tag: "Más popular",
    tagClass: "badge-popular",
  },
  {
    title: "Nuestro futuro",
    desc: "Ahorro, familia, proyectos y sueños.",
    icon: "spa",
    circleBg: "bg-verde-salvia",
    tag: "Futuro",
    tagClass: "badge-futuro",
  },
];

export default function CelebrationCategoriesSection() {
  return (
    <section className="py-20 md:py-28 bg-surface relative border-b hairline-border" id="celebraciones">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Tira de Iconografía de Celebraciones según Brand Guide */}
        <div className="mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-primary/40" />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] font-bold text-primary">
              Celebraciones
            </span>
            <span className="w-8 h-[1px] bg-primary/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-on-surface font-normal mb-10 tracking-tight">
            Para cada momento que vale la pena celebrar
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            {CELEBRATION_TYPES.map((cat) => (
              <Link
                key={cat.name}
                href="/buscar-eventos"
                className="group flex flex-col items-center gap-2.5 transition-transform hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${cat.bg} flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-300`}
                >
                  <span className="material-symbols-outlined text-2xl sm:text-[26px]">
                    {cat.icon}
                  </span>
                </div>
                <span className="font-sans text-[11px] sm:text-xs text-on-surface/80 group-hover:text-primary font-medium tracking-wide">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 4 Pilares de Colecciones de Regalos según Brand Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {GIFT_COLLECTIONS.map((col) => (
            <div
              key={col.title}
              className="bg-white p-7 rounded-2xl border border-muted-border shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold shadow-sm ${col.tagClass}`}>
                  {col.tag}
                </span>
              </div>

              <div
                className={`w-14 h-14 rounded-full ${col.circleBg} text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-2xl mt-3`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {col.icon}
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-on-surface mb-2">
                {col.title}
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                {col.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tarjetas Editoriales de Cita con Coma ConAmor, */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta Durazno / Rosa */}
          <div className="bg-[#F8E7E1] p-8 sm:p-10 rounded-2xl border border-durazno/40 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Elemento gráfico: Coma de Marca */}
            <span className="font-serif text-6xl sm:text-7xl text-primary leading-none block mb-4 select-none">
              ’
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl text-primary font-normal leading-snug mb-8">
              “Más que regalos, pedacitos de historia.”
            </blockquote>
            <div>
              <Link
                href="/como-crear-evento"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-ink-black transition-colors"
              >
                <span>Conoce más</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Tarjeta Marfil / Comienzos */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-muted-border shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            <span className="font-serif text-6xl sm:text-7xl text-primary leading-none block mb-4 select-none">
              ’
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl text-on-surface font-normal leading-snug mb-8">
              “Para nuevos comienzos.”
            </blockquote>
            <div>
              <Link
                href="/crear-evento"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-ink-black transition-colors"
              >
                <span>Crear mi mesa</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
