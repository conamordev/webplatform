import React from "react";
import Link from "next/link";

export type PillButtonVariant = "white" | "primary" | "glass" | "outline";

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: PillButtonVariant;
  icon?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<PillButtonVariant, string> = {
  white:
    "bg-white text-primary px-10 py-4 font-sans font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all duration-700 whitespace-nowrap rounded-full flex items-center justify-center shadow-lg active:scale-95",
  primary:
    "bg-primary text-white px-10 py-4 font-sans font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-ink-black transition-all duration-700 whitespace-nowrap rounded-full flex items-center justify-center shadow-lg active:scale-95",
  glass:
    "glass-pill px-8 py-3 text-white/85 hover:text-white text-[10px] uppercase font-sans font-semibold tracking-widest hover:bg-primary transition-colors whitespace-nowrap flex items-center justify-center",
  outline:
    "bg-transparent border border-primary text-primary px-8 py-3 rounded-full font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 whitespace-nowrap flex items-center justify-center",
};

export default function PillButton({
  children,
  href,
  onClick,
  variant = "white",
  icon,
  className = "",
  type = "button",
}: PillButtonProps) {
  const combinedClassName = `${variantClasses[variant]} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="material-symbols-outlined ml-2 text-sm">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {content}
    </button>
  );
}

