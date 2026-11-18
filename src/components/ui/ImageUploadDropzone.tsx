"use client";

import React, { useState, useRef } from "react";

interface ImageUploadDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: "events" | "gifts" | "kyc" | "avatars";
  label?: string;
  helperText?: string;
  aspectRatio?: "video" | "square" | "banner";
  className?: string;
}

export default function ImageUploadDropzone({
  value,
  onChange,
  folder = "events",
  label = "Imagen de portada",
  helperText = "Formatos soportados: JPG, PNG o WEBP (máx. 10 MB)",
  aspectRatio = "video",
  className = "",
}: ImageUploadDropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    video: "aspect-[16/9]",
    square: "aspect-square",
    banner: "aspect-[21/9]",
  }[aspectRatio];

  const handleFile = async (file: File) => {
    setError(null);

    // Validate size
    if (file.size > 10 * 1024 * 1024) {
      setError("El archivo seleccionado excede el tamaño máximo de 10 MB");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona un archivo de imagen válido");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Error al subir la imagen");
      }

      onChange(data.secureUrl || data.url);
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-on-surface">
          {label}
        </label>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative w-full ${aspectClasses} rounded-2xl overflow-hidden border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-4 text-center group shadow-2xl ${
          dragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-muted-border hover:border-primary/60 bg-white"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {value ? (
          <>
            <img
              src={value}
              alt="Vista previa"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 backdrop-blur-xs">
              <span className="material-symbols-outlined text-3xl">photo_camera</span>
              <span className="font-sans text-xs uppercase tracking-wider font-bold">
                Cambiar imagen
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors flex items-center justify-center shadow-lg"
              title="Eliminar imagen"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-2xl">
                cloud_upload
              </span>
            </div>
            <p className="font-serif text-sm sm:text-base font-semibold text-on-surface">
              Haz clic o arrastra tu fotografía aquí
            </p>
            <p className="font-sans text-[11px] text-on-surface-variant max-w-xs">
              {helperText}
            </p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-sans text-xs uppercase tracking-wider font-bold text-primary animate-pulse">
              Subiendo a Cloudinary...
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="font-sans text-xs text-rose-600 mt-1 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">error</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
