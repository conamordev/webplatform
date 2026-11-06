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
      className={`flex items-center justify-center p-6 h-[450px] ${className}`.trim()}
    >
      <Link
        href={href}
        className="w-full h-full flex flex-col items-center justify-center bg-white border-2 border-primary rounded-xl group transition-all duration-700 hover:bg-primary"
      >
        <span className="font-sans font-semibold text-[11px] text-primary mb-4 tracking-[0.4em] group-hover:text-white transition-colors">
          {eyebrow}
        </span>
        <span className="font-serif text-lg md:text-xl text-on-surface mb-8 group-hover:text-white transition-colors">
          {title}
        </span>
        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all">
          <span className="material-symbols-outlined text-primary group-hover:text-primary">
            {icon}
          </span>
        </div>
      </Link>
    </div>
  );
}
