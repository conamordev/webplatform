import React from "react";
import Link from "next/link";

export interface EventPreviewCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt?: string;
  href: string;
  offsetClassName?: string;
}

export default function EventPreviewCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  href,
  offsetClassName = "",
}: EventPreviewCardProps) {
  return (
    <Link
      href={href}
      className={`relative block group border-[2px] rounded-xl overflow-hidden bg-white transition-all duration-500 hover:shadow-xl h-fit border-[#E9D08C] ${offsetClassName}`.trim()}
    >
      {/* Marco interior dorado que se contrae y cambia a primario en hover */}
      <div className="absolute inset-4 rounded-lg z-30 pointer-events-none transition-all duration-700 group-hover:inset-2 border-2 border-[#E9D08C]/40 group-hover:border-primary" />

      {/* Imagen con proporción 3:4.5 y degradado oscuro inferior */}
      <div className="aspect-[3/4.5] overflow-hidden relative w-full h-full">
        <img
          alt={imageAlt || title}
          src={imageSrc}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
      </div>

      {/* Información inferior y botón de flecha diagonal */}
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex justify-between items-end z-40">
        <div className="drop-shadow-lg pr-2">
          <h3 className="font-serif text-white text-sm sm:text-base uppercase tracking-widest font-semibold leading-snug">
            {title}
          </h3>
          <p className="font-sans text-[10px] text-white/90 tracking-[0.2em] uppercase mt-1">
            {subtitle}
          </p>
        </div>

        <div
          className="w-10 h-10 shrink-0 backdrop-blur-md rounded-lg flex items-center justify-center text-white transition-all group-hover:bg-primary group-hover:scale-110 shadow-lg"
          style={{ backgroundColor: "#E9D08C" }}
        >
          <span className="material-symbols-outlined text-xl">north_east</span>
        </div>
      </div>
    </Link>
  );
}

