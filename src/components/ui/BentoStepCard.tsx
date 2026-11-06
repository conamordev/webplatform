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
        fullWidth ? "md:col-span-3" : ""
      } rounded-xl relative overflow-hidden h-[450px] border border-primary/20 group ${className}`.trim()}
    >
      <span
        className={`absolute z-20 font-serif text-primary opacity-45 select-none ${
          fullWidth ? "top-8 left-10 text-7xl md:text-8xl" : "top-6 left-8 text-6xl"
        }`}
      >
        {stepNumber}
      </span>

      <img
        alt={imageAlt}
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      <div
        className={`absolute inset-x-0 bottom-0 bento-glass ${
          fullWidth ? "p-10 pt-14" : "p-8 pt-10"
        }`}
      >
        <h3
          className={`font-serif text-white drop-shadow-md ${
            fullWidth ? "text-lg md:text-xl mb-3" : "text-base md:text-lg mb-2"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-body text-white/95 text-sm leading-relaxed drop-shadow-sm ${
            fullWidth ? "max-w-2xl md:text-base" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
