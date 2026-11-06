import React from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-16 md:mb-20 ${
        align === "center" ? "text-center mx-auto max-w-3xl" : ""
      } ${className}`.trim()}
    >
      <span className="font-sans font-semibold text-[11px] text-primary block mb-6 uppercase tracking-[0.4em]">
        {eyebrow}
      </span>
      <h2 className="font-serif font-bold text-4xl sm:text-6xl md:text-[80px] text-on-surface leading-[1] max-w-5xl tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="font-body text-base md:text-lg text-on-surface-variant mt-6 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

