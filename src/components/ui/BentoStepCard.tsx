import React from "react";

export interface BentoStepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  fullWidth?: boolean;
  className?: string;
}

export default function BentoStepCard({
  stepNumber,
  title,
  description,
  imageSrc,
  imageAlt,
  fullWidth = false,
  className = "",
}: BentoStepCardProps) {
  return (
    <div
      className={`${
        fullWidth
          ? "col-span-2 md:col-span-3 h-[230px] sm:h-[340px] md:h-[450px]"
          : "col-span-1 h-[280px] sm:h-[370px] md:h-[450px]"
      } rounded-xl relative overflow-hidden border-[0.5px] border-primary/20 group ${className}`.trim()}
    >
      {/* Numeración editorial */}
      <span
        className={`absolute z-20 font-serif text-primary opacity-40 select-none pointer-events-none ${
          fullWidth
            ? "top-4 left-5 text-4xl sm:top-6 sm:left-8 sm:text-6xl md:top-8 md:left-10 md:text-8xl"
            : "top-3 left-4 text-3xl sm:top-5 sm:left-6 sm:text-5xl md:top-6 md:left-8 md:text-6xl"
        }`}
      >
        {stepNumber}
      </span>

      {/* Imagen de fondo */}
      <img
        alt={imageAlt}
        src={imageSrc}
        className="absolute inset-0 z-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      {/* Contenedor inferior con blur y borde sutil */}
      <div
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className={`absolute inset-x-0 bottom-0 z-10 bg-white/[0.08] backdrop-blur-md border-t border-white/10 ${
          fullWidth
            ? "p-4 pt-5 sm:p-8 sm:pt-10 md:p-10 md:pt-14"
            : "p-3.5 pt-4 sm:p-6 sm:pt-8 md:p-8 md:pt-10"
        }`}
      >
        <h3
          className={`font-serif font-normal text-white drop-shadow-md ${
            fullWidth
              ? "text-sm sm:text-lg md:text-xl mb-1.5 sm:mb-3"
              : "text-xs sm:text-base md:text-lg mb-1 sm:mb-2"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-body text-white/95 leading-snug sm:leading-relaxed drop-shadow-sm ${
            fullWidth
              ? "text-[11px] sm:text-sm md:text-base max-w-2xl"
              : "text-[11px] sm:text-xs md:text-sm"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
