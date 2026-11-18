"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

interface ShareEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventSlug: string;
  hostNames?: string;
}

export default function ShareEventModal({
  isOpen,
  onClose,
  eventTitle,
  eventSlug,
  hostNames,
}: ShareEventModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const eventUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/evento/${eventSlug}`
      : `https://conamor.mx/evento/${eventSlug}`;

  const shareText = `¡Estás cordialmente invitado a celebrar con nosotros! ${eventTitle}${
    hostNames ? ` — ${hostNames}` : ""
  }. Visita nuestra web y mesa de regalos digital:`;

  useEffect(() => {
    if (isOpen && eventUrl) {
      QRCode.toDataURL(eventUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: "#8B162B",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error("Error generating QR:", err));
    }
  }, [isOpen, eventUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventTitle,
          text: shareText,
          url: eventUrl,
        });
      } catch (err) {
        // user cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n${eventUrl}`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-muted-border shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-1">
              Difundir Celebración
            </span>
            <h3 className="font-serif text-2xl font-bold text-on-surface">
              Compartir Evento
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* QR Code */}
        {qrCodeDataUrl && (
          <div className="flex flex-col items-center justify-center p-4 bg-marfil rounded-2xl border border-muted-border/60">
            <img
              src={qrCodeDataUrl}
              alt="Código QR del Evento"
              className="w-48 h-48 rounded-xl shadow-md border border-white"
            />
            <p className="font-sans text-[11px] text-on-surface-variant mt-3 text-center">
              Tus invitados pueden escanear este código QR para acceder directo a la mesa de regalos y RSVP.
            </p>
            <a
              href={qrCodeDataUrl}
              download={`qr-${eventSlug}.png`}
              className="mt-2 text-primary font-sans text-xs font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Descargar código QR</span>
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-[#25D366] text-white font-sans text-xs uppercase tracking-wider font-bold shadow-2xl hover:opacity-90 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            <span>Compartir por WhatsApp</span>
          </a>

          {/* Native Web Share (if supported) */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-wider font-bold shadow-2xl hover:bg-primary-container transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">share</span>
            <span>Compartir en Redes / Mensajes</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="pt-2 border-t border-muted-border/60">
          <label className="block font-sans text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-2">
            Enlace permanente
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={eventUrl}
              className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-surface-container text-xs font-sans text-on-surface border border-muted-border select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-primary text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-all shrink-0 shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? "check" : "content_copy"}
              </span>
              <span>{copied ? "Copiado" : "Copiar"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
