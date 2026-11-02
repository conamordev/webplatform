"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth, EventData } from "@/lib/auth-context";

function CrearEventoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("tipo") as EventData["type"]) || "Boda";

  const { createEvent } = useAuth();

  const [type, setType] = useState<EventData["type"]>(initialType);
  const [title, setTitle] = useState("");
  const [hostNames, setHostNames] = useState("");
  const [coHosts, setCoHosts] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Ciudad de México");
  const [dressCode, setDressCode] = useState("Rigurosa Etiqueta / Formal");
  const [story, setStory] = useState("");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes: { type: EventData["type"]; label: string; icon: string; defaultImg: string }[] = [
    {
      type: "Boda",
      label: "Boda",
      icon: "favorite",
      defaultImg:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
    },
    {
      type: "Baby Shower",
      label: "Baby Shower",
      icon: "child_care",
      defaultImg:
        "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=2000&q=80",
    },
    {
      type: "Cumpleaños",
      label: "Cumpleaños",
      icon: "celebration",
      defaultImg:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2000&q=80",
    },
    {
      type: "Bautizo",
      label: "Bautizo",
      icon: "church",
      defaultImg:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80",
    },
    {
      type: "Otro",
      label: "Otro Evento",
      icon: "auto_awesome",
      defaultImg:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=80",
    },
  ];

  const handleTypeSelect = (selected: EventData["type"], defaultImg: string) => {
    setType(selected);
    setCoverImage(defaultImg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newEvent = createEvent({
      title: title || `${type} de ${hostNames || "Nuestra Celebración"}`,
      type,
      hostNames: hostNames || "Anfitriones",
      coHosts,
      date: date || "Próximamente",
      time: time ? `${time} hrs` : "18:00 hrs",
      locationName: locationName || "Lugar del Evento",
      address,
      city,
      dressCode,
      story: story || "Esperamos contar con tu valiosa presencia para celebrar este día tan especial.",
      coverImage,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/evento/${newEvent.slug}/configuracion`);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-accent-gold/40 text-primary font-sans text-xs uppercase tracking-[0.3em]">
            <span className="material-symbols-outlined text-sm">celebration</span>
            <span>Registro de Evento</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-ink-black">
            Crea el sitio web de tu celebración
          </h1>
          <p className="font-body text-base text-on-surface-variant max-w-xl mx-auto">
            Completa la información esencial. Podrás editar todos los detalles, paletas de color y regalos más adelante en tu panel de control.
          </p>
        </div>

        {/* Step-by-Step Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-muted-border shadow-xl space-y-12"
        >
          {/* 1. Tipo de Evento */}
          <div className="space-y-4">
            <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink-black flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Selecciona el tipo de evento</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {eventTypes.map((item) => (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => handleTypeSelect(item.type, item.defaultImg)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    type === item.type
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-muted-border hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  <span className="font-sans text-xs font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Información General */}
          <div className="space-y-6 pt-6 border-t border-muted-border">
            <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink-black flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Datos Principales</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2 space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Título del Evento *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ej. Nuestra Boda — Sofía & Mateo"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Nombres de los Anfitriones *
                </label>
                <input
                  type="text"
                  required
                  value={hostNames}
                  onChange={(e) => setHostNames(e.target.value)}
                  placeholder="ej. Sofía Alcocer & Mateo Delgado"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Co-Anfitriones o Familia (opcional)
                </label>
                <input
                  type="text"
                  value={coHosts}
                  onChange={(e) => setCoHosts(e.target.value)}
                  placeholder="ej. Fam. Alcocer & Delgado"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Fecha del Evento *
                </label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="ej. 14 de Febrero, 2027"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Hora de Inicio *
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Ubicación y Código de Vestimenta */}
          <div className="space-y-6 pt-6 border-t border-muted-border">
            <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink-black flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Lugar & Detalles</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Nombre del Lugar o Salón *
                </label>
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="ej. Hacienda San José Lavista"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Ciudad y Estado *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="ej. San Miguel de Allende, GTO"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Dirección Completa
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ej. Carretera San Miguel - Dolores Km 10"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Código de Vestimenta (Dress Code)
                </label>
                <input
                  type="text"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  placeholder="ej. Rigurosa Etiqueta / Black Tie (Evitar blanco)"
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Dedicatoria o Historia para tus invitados
                </label>
                <textarea
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Escribe unas palabras cálidas dando la bienvenida a tus invitados..."
                  className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold text-ink-black text-sm outline-none italic"
                />
              </div>
            </div>
          </div>

          {/* 4. Portada del Evento */}
          <div className="space-y-4 pt-6 border-t border-muted-border">
            <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink-black flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Foto de Portada</span>
            </label>

            <div className="relative h-48 rounded-2xl overflow-hidden border border-muted-border">
              <img src={coverImage} alt="Preview Portada" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-sans text-xs uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full border border-white/20">
                  Vista Previa de Portada
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {[
                "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
              ].map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCoverImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    coverImage === img ? "border-primary scale-105" : "border-transparent opacity-70"
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-6 border-t border-muted-border flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-primary-container transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <span>{isSubmitting ? "Creando sitio..." : "Guardar & Configurar Evento"}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default function CrearEventoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CrearEventoForm />
    </Suspense>
  );
}
