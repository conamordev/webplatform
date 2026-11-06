import React from "react";
import Link from "next/link";

interface BentoCtaCardProps {
  eyebrow?: string;
  title?: string;
  href?: string;
  icon?: string;
  className?: string;
}

export default function BentoCtaCard({
  eyebrow = "Comienza el viaje",
  title = "Crear evento",
  href = "/crear-evento",
  icon = "arrow_forward",
  className = "",
}: BentoCtaCardProps) {
  return (
    <div
      className={`col-span-1 flex items-center justify-center p-2 sm:p-4 md:p-6 h-[280px] sm:h-[370px] md:h-[450px] ${className}`.trim()}
    >
      <Link
        href={href}
        className="w-full h-full flex flex-col items-center justify-center bg-white border border-primary md:border-2 rounded-xl group transition-all duration-700 hover:bg-primary px-3 text-center"
      >
        <span className="font-sans font-semibold text-[9px] sm:text-[10px] md:text-[11px] text-primary mb-2 sm:mb-4 tracking-[0.25em] sm:tracking-[0.4em] group-hover:text-white transition-colors">
          {eyebrow}
        </span>
        <span className="font-serif text-sm sm:text-base md:text-lg text-on-surface mb-4 sm:mb-8 group-hover:text-white transition-colors">
          {title}
        </span>
        <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-primary flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all">
          <span className="material-symbols-outlined text-primary group-hover:text-primary text-lg sm:text-2xl">
            {icon}
          </span>
        </div>
      </Link>
    </div>
  );
}
