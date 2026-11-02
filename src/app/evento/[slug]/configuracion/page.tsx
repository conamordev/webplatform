"use client";

import React, { useState, use, Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth, EventData, Gift } from "@/lib/auth-context";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function EventoConfiguracionContent({ params }: PageProps) {
  const { slug } = use(params);
  const { getEventBySlug, updateEvent, addGiftToEvent, user } = useAuth();

  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Active builder tab
  const [activeTab, setActiveTab] = useState<
    "info" | "hosts" | "detalles" | "estilo" | "regalos" | "invitados"
  >("info");

  // Form states
  const [title, setTitle] = useState(event.title);
  const [hostNames, setHostNames] = useState(event.hostNames);
  const [coHosts, setCoHosts] = useState(event.coHosts || "");
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [locationName, setLocationName] = useState(event.locationName);
  const [address, setAddress] = useState(event.address);
  const [city, setCity] = useState(event.city);
  const [dressCode, setDressCode] = useState(event.dressCode);
  const [story, setStory] = useState(event.story || "");
  const [coverImage, setCoverImage] = useState(event.coverImage);
  const [primaryColor, setPrimaryColor] = useState(event.primaryColor);
  const [typography, setTypography] = useState(event.typography);

  // New gift modal
  const [showAddGiftModal, setShowAddGiftModal] = useState(false);
  const [newGift, setNewGift] = useState({
    title: "",
    description: "",
    category: "Hogar" as Gift["category"],
    targetPrice: 2500,
    isFreeAmount: false,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  });

  // Share alert
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Itinerary items
  const [itinerary, setItinerary] = useState(event.itinerary || []);
  const [newItineraryItem, setNewItineraryItem] = useState({ time: "", title: "", desc: "" });

  const handleSave = () => {
    updateEvent(event.slug, {
      title,
      hostNames,
      coHosts,
      date,
      time,
      locationName,
      address,
      city,
      dressCode,
      story,
      coverImage,
      primaryColor,
      typography,
      itinerary,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/evento/${event.slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddGift = (e: React.FormEvent) => {
    e.preventDefault();
    addGiftToEvent(event.slug, newGift);
    setShowAddGiftModal(false);
    setNewGift({
      title: "",
      description: "",
      category: "Hogar",
      targetPrice: 2500,
      isFreeAmount: false,
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    });
  };

  const handleAddItineraryItem = () => {
    if (!newItineraryItem.title || !newItineraryItem.time) return;
    setItinerary([...itinerary, newItineraryItem]);
    setNewItineraryItem({ time: "", title: "", desc: "" });
  };

  // Color palettes from Stitch
  const colorPalettes = [
    { name: "Borgoña Royal", primary: "#870104", preview: ["#870104", "#ffffff", "#fead9d"] },
    { name: "Terracota Rosé", primary: "#8c4d41", preview: ["#8c4d41", "#ffffff", "#ffdad3"] },
    { name: "Oro Champán", primary: "#9E8C34", preview: ["#9E8C34", "#ffffff", "#f9e381"] },
    { name: "Azul Medianoche", primary: "#1c2e4a", preview: ["#1c2e4a", "#ffffff", "#757ea1"] },
    { name: "Verde Olivo", primary: "#4a5d3f", preview: ["#4a5d3f", "#ffffff", "#cbd5e1"] },
    { name: "Negro Ébano", primary: "#1e1e1e", preview: ["#1e1e1e", "#cccccc", "#666666"] },
  ];

  const totalRecaudado = event.gifts.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalConfirmados = event.rsvps.filter((r) => r.attending).reduce((sum, r) => sum + r.guestsCount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 pt-32 pb-20 flex">
        {/* Left Side Navigation (Stitch Builder Navigation) */}
        <aside className="w-72 bg-white border-r border-muted-border p-6 hidden lg:flex flex-col justify-between shrink-0">
          <div className="space-y-8">
            <div className="px-2">
              <span className="font-sans text-[10px] text-accent-gold uppercase tracking-[0.3em] font-bold block mb-1">
                Builder Anfitrión
              </span>
              <h2 className="font-serif text-xl font-bold text-ink-black truncate">
                {event.title}
              </h2>
              <p className="font-body text-xs text-on-surface-variant mt-1">
                {event.date}
              </p>
            </div>

            {/* Navigation Groups */}
            <nav className="space-y-6">
              {/* Grupo 1: Configuración Evento */}
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 block mb-2">
                  Configuración Evento
                </span>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "info"
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-700 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">info</span>
                  <span>Información básica</span>
                </button>

                <button
                  onClick={() => setActiveTab("hosts")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "hosts"
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-700 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">group</span>
                  <span>Anfitriones & Permisos</span>
                </button>
              </div>

              {/* Grupo 2: Web del Evento */}
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 block mb-2">
                  Web del Evento
                </span>
                <button
                  onClick={() => setActiveTab("detalles")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "detalles"
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-700 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">event_note</span>
                  <span>Detalles & Itinerario</span>
                </button>

                <button
                  onClick={() => setActiveTab("estilo")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "estilo"
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-700 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">palette</span>
                  <span>Colores & Tipografía</span>
                </button>
              </div>

              {/* Grupo 3: Gestión de Regalos e Invitados */}
              <div className="space-y-1">
                <span className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest px-3 block mb-2">
                  Gestión & Finanzas
                </span>
                <button
                  onClick={() => setActiveTab("regalos")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "regalos"
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-700 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">featured_seasonal_and_gifts</span>
                  <span>Lista de Regalos</span>
                </button>

                <button
                  onClick={() => setActiveTab("invitados")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "invitados"
                      ? "bg-primary text-white shadow-sm"
                      : "text-stone-700 hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">how_to_reg</span>
                  <span>RSVP & Dedicatorias</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-muted-border space-y-3">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-all text-xs font-sans uppercase tracking-widest font-bold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              <span>{copiedLink ? "¡Enlace Copiado!" : "Compartir Evento"}</span>
            </button>

            <Link
              href={`/evento/${event.slug}`}
              className="w-full py-2.5 px-4 rounded-xl bg-primary text-white hover:bg-primary-container transition-all text-xs font-sans uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Ver Sitio Invitado</span>
            </Link>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="flex-1 px-6 md:px-12 max-w-5xl">
          {/* Top Bar inside Builder */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-muted-border mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-stone-500 mb-1">
                <Link href="/perfil" className="hover:text-primary">
                  Mis Eventos
                </Link>
                <span>/</span>
                <span className="text-primary font-bold">{event.title}</span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-ink-black">
                {activeTab === "info" && "Información del Evento"}
                {activeTab === "hosts" && "Anfitriones & Permisos de Colaboración"}
                {activeTab === "detalles" && "Detalles, Lugar & Cronograma"}
                {activeTab === "estilo" && "Paleta de Color & Tipografía Editorial"}
                {activeTab === "regalos" && "Catálogo de Mesa de Regalos"}
                {activeTab === "invitados" && "Confirmaciones RSVP & Muro de Dedicatorias"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {savedSuccess && (
                <span className="text-xs font-sans text-emerald-700 flex items-center gap-1 font-semibold animate-in fade-in">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Guardado</span>
                </span>
              )}
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container shadow active:scale-95 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-muted-border shadow-xs">
              <span className="text-[10px] font-sans text-stone-400 uppercase tracking-widest block font-bold">
                Recaudado en Regalos
              </span>
              <p className="font-serif text-2xl font-bold text-primary mt-1">
                ${totalRecaudado.toLocaleString("es-MX")} MXN
              </p>
              <Link
                href="/dashboard/onboarding"
                className="text-[11px] font-sans text-accent-gold hover:underline font-semibold block mt-1"
              >
                Gestionar Retiros & KYC →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-muted-border shadow-xs">
              <span className="text-[10px] font-sans text-stone-400 uppercase tracking-widest block font-bold">
                Invitados Confirmados
              </span>
              <p className="font-serif text-2xl font-bold text-ink-black mt-1">
                {totalConfirmados} asistentes
              </p>
              <p className="text-[11px] font-sans text-stone-500 mt-1">
                {event.rsvps.length} respuestas recibidas
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-muted-border shadow-xs">
              <span className="text-[10px] font-sans text-stone-400 uppercase tracking-widest block font-bold">
                Regalos Listados
              </span>
              <p className="font-serif text-2xl font-bold text-ink-black mt-1">
                {event.gifts.length} regalos activos
              </p>
              <button
                onClick={() => {
                  setActiveTab("regalos");
                  setShowAddGiftModal(true);
                }}
                className="text-[11px] font-sans text-primary hover:underline font-semibold block mt-1"
              >
                + Añadir Nuevo Regalo
              </button>
            </div>
          </div>

          {/* ========================================================== */}
          {/* TAB: INFORMACIÓN BÁSICA (Stitch Screen 10)                 */}
          {/* ========================================================== */}
          {activeTab === "info" && (
            <div className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Título del Evento
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none focus:border-accent-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      Nombres de los Anfitriones
                    </label>
                    <input
                      type="text"
                      value={hostNames}
                      onChange={(e) => setHostNames(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none focus:border-accent-gold"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      Co-Anfitriones / Familias
                    </label>
                    <input
                      type="text"
                      value={coHosts}
                      onChange={(e) => setCoHosts(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none focus:border-accent-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Mensaje de Bienvenida / Historia
                  </label>
                  <textarea
                    rows={4}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none focus:border-accent-gold italic font-body"
                  />
                </div>

                {/* Portada */}
                <div className="space-y-2 pt-4 border-t border-muted-border">
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                    Foto de Portada Principal
                  </label>
                  <div className="relative h-60 rounded-2xl overflow-hidden border border-muted-border">
                    <img src={coverImage} alt="Portada" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    {[
                      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
                      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=80",
                      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
                      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
                    ].map((img, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setCoverImage(img)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          coverImage === img ? "border-primary scale-105" : "border-transparent opacity-60"
                        }`}
                      >
                        <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB: ANFITRIONES Y PERMISOS (Stitch Screen 11)             */}
          {/* ========================================================== */}
          {activeTab === "hosts" && (
            <div className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-ink-black">
                  Colaboradores y Co-Anfitriones
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Permite a tu pareja, wedding planner o familiares acceder para ayudarte a gestionar los regalos y confirmaciones.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-muted-border">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-muted-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-sans text-xs font-bold text-ink-black">
                        {user.name} {user.lastName} (Tú)
                      </p>
                      <p className="text-[11px] font-sans text-stone-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-sans text-[10px] uppercase tracking-widest font-bold">
                    Propietario Principal
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-dashed border-accent-gold/60 space-y-3">
                  <span className="font-sans text-xs font-semibold text-stone-700 block">
                    Invitar a un nuevo colaborador
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="correo@colaborador.com"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                    />
                    <select className="px-4 py-2.5 rounded-xl border border-muted-border text-xs font-sans outline-none">
                      <option>Editor Completo</option>
                      <option>Solo Ver RSVP</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => alert("Invitación de colaborador enviada con éxito.")}
                      className="px-6 py-2.5 rounded-xl bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container"
                    >
                      Invitar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB: DETALLES & ITINERARIO (Stitch Screen 12)               */}
          {/* ========================================================== */}
          {activeTab === "detalles" && (
            <div className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Fecha del Evento
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Hora de Inicio
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Nombre del Lugar / Hacienda
                  </label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Ciudad y Estado
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Dirección Exacta
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Código de Vestimenta (Dress Code)
                  </label>
                  <input
                    type="text"
                    value={dressCode}
                    onChange={(e) => setDressCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>
              </div>

              {/* Itinerary editor */}
              <div className="space-y-4 pt-6 border-t border-muted-border">
                <h3 className="font-serif text-lg font-bold text-ink-black">
                  Itinerario del Evento
                </h3>

                <div className="space-y-2">
                  {itinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-surface-container-low rounded-xl border border-muted-border flex justify-between items-center text-xs font-sans"
                    >
                      <div>
                        <strong>{item.time}</strong> — {item.title}: {item.desc}
                      </div>
                      <button
                        type="button"
                        onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))}
                        className="text-rose-600 hover:text-rose-800"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Hora (ej. 18:00)"
                    value={newItineraryItem.time}
                    onChange={(e) =>
                      setNewItineraryItem({ ...newItineraryItem, time: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl border border-muted-border text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Actividad (ej. Brindis)"
                    value={newItineraryItem.title}
                    onChange={(e) =>
                      setNewItineraryItem({ ...newItineraryItem, title: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl border border-muted-border text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Detalles"
                    value={newItineraryItem.desc}
                    onChange={(e) =>
                      setNewItineraryItem({ ...newItineraryItem, desc: e.target.value })
                    }
                    className="px-3 py-2 rounded-xl border border-muted-border text-xs outline-none sm:col-span-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddItineraryItem}
                    className="px-4 py-2 rounded-xl bg-surface-container text-primary font-sans text-xs uppercase tracking-wider font-bold hover:bg-surface-container-high"
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB: ESTILO, COLORES & TIPOGRAFÍA (Stitch Screen 13)       */}
          {/* ========================================================== */}
          {activeTab === "estilo" && (
            <div className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-8">
              <div className="space-y-4">
                <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.3em] block">
                  Identidad Visual Editorial
                </span>
                <h3 className="font-serif text-2xl font-bold text-ink-black">
                  Paleta de Color Predeterminada
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Selecciona la armonía de color que teñirá los botones, títulos y destacados de tu sitio web.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  {colorPalettes.map((pal) => (
                    <button
                      type="button"
                      key={pal.name}
                      onClick={() => setPrimaryColor(pal.primary)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        primaryColor === pal.primary
                          ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                          : "border-muted-border hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="flex -space-x-1 mb-2">
                        {pal.preview.map((c, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="font-sans text-xs font-bold text-stone-800 block">
                        {pal.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-muted-border">
                <h3 className="font-serif text-2xl font-bold text-ink-black">
                  Tipografía Titular
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { font: "Playfair Display", tag: "Editorial Serif", sample: "Sofía & Mateo" },
                    { font: "Literata", tag: "Humanist Classic", sample: "Sofía & Mateo" },
                    { font: "Libre Franklin", tag: "Modern Sans", sample: "SOFÍA & MATEO" },
                  ].map((f) => (
                    <button
                      type="button"
                      key={f.font}
                      onClick={() => setTypography(f.font)}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        typography === f.font
                          ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                          : "border-muted-border hover:bg-surface-container-low"
                      }`}
                    >
                      <span className="font-sans text-[10px] text-accent-gold uppercase tracking-widest block font-bold">
                        {f.tag}
                      </span>
                      <p className="font-serif text-xl font-bold mt-1 text-ink-black">
                        {f.sample}
                      </p>
                      <span className="text-[11px] font-sans text-stone-400 mt-2 block">
                        {f.font}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB: LISTA DE REGALOS (Stitch Screen 14)                   */}
          {/* ========================================================== */}
          {activeTab === "regalos" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-ink-black">
                    Tus Regalos en Catálogo
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant">
                    {event.gifts.length} regalos dados de alta para aportaciones en efectivo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddGiftModal(true)}
                  className="px-6 py-2.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container shadow"
                >
                  + Agregar Regalo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.gifts.map((gift) => (
                  <div
                    key={gift.id}
                    className="p-4 bg-white rounded-2xl border border-muted-border flex gap-4 items-center shadow-xs"
                  >
                    <img
                      src={gift.image}
                      alt={gift.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-primary font-bold">
                        {gift.category}
                      </span>
                      <h4 className="font-serif text-base font-bold text-ink-black truncate">
                        {gift.title}
                      </h4>
                      <p className="text-xs font-sans text-stone-500 mt-0.5">
                        Meta: ${gift.targetPrice.toLocaleString("es-MX")} MXN
                      </p>
                      <p className="text-xs font-sans text-emerald-700 font-semibold">
                        Recaudado: ${gift.currentAmount.toLocaleString("es-MX")} MXN
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB: INVITADOS, RSVP & DEDICATORIAS                        */}
          {/* ========================================================== */}
          {activeTab === "invitados" && (
            <div className="space-y-8">
              {/* RSVP Table */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-muted-border shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-ink-black">
                    Lista de Confirmaciones (RSVP)
                  </h3>
                  <span className="text-xs font-sans font-bold text-primary">
                    Total: {totalConfirmados} personas
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-surface-container-low text-stone-600 uppercase tracking-wider border-b border-muted-border">
                      <tr>
                        <th className="py-3 px-4">Invitado</th>
                        <th className="py-3 px-4">Contacto</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Lugares</th>
                        <th className="py-3 px-4">Dietas / Alergias</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted-border">
                      {event.rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-surface-container-low/40">
                          <td className="py-3 px-4 font-semibold text-ink-black">{rsvp.name}</td>
                          <td className="py-3 px-4 text-stone-500">
                            {rsvp.email} <br /> {rsvp.phone}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                rsvp.attending
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {rsvp.attending ? "Asiste" : "No asiste"}
                            </span>
                          </td>
                          <td className="py-3 px-4">{rsvp.guestsCount}</td>
                          <td className="py-3 px-4 text-stone-500 italic">
                            {rsvp.dietaryRestrictions || "Ninguna"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dedicatorias list */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-muted-border shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-ink-black">
                  Dedicatorias Recibidas ({event.dedicatorias.length})
                </h3>

                <div className="space-y-3">
                  {event.dedicatorias.map((d) => (
                    <div
                      key={d.id}
                      className="p-4 bg-surface-container-low/60 rounded-2xl border border-muted-border"
                    >
                      <div className="flex justify-between items-center text-xs font-sans">
                        <strong className="text-primary font-serif text-sm">{d.authorName}</strong>
                        <span className="text-stone-400">{d.createdAt}</span>
                      </div>
                      <p className="font-body text-xs text-stone-700 italic mt-1">&ldquo;{d.message}&rdquo;</p>
                      {d.amount && (
                        <span className="text-[10px] font-sans text-accent-gold font-bold mt-1 block">
                          Aportó ${d.amount.toLocaleString("es-MX")} MXN
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================== */}
      {/* MODAL: AGREGAR REGALO                                      */}
      {/* ========================================================== */}
      {showAddGiftModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-muted-border space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-2xl font-bold text-ink-black">
                Agregar Regalo a la Mesa
              </h3>
              <button
                onClick={() => setShowAddGiftModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddGift} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase block">Título del Regalo *</label>
                <input
                  type="text"
                  required
                  value={newGift.title}
                  onChange={(e) => setNewGift({ ...newGift, title: e.target.value })}
                  placeholder="ej. Noche de Hotel en París"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase block">Categoría *</label>
                <select
                  value={newGift.category}
                  onChange={(e) =>
                    setNewGift({ ...newGift, category: e.target.value as Gift["category"] })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                >
                  <option value="Hogar">Hogar</option>
                  <option value="Luna de Miel">Luna de Miel</option>
                  <option value="Experiencias">Experiencias</option>
                  <option value="Aporte Libre">Aporte Libre</option>
                  <option value="Electrodomésticos">Electrodomésticos</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase block">Meta en Pesos (MXN) *</label>
                <input
                  type="number"
                  required
                  min="100"
                  step="100"
                  value={newGift.targetPrice}
                  onChange={(e) => setNewGift({ ...newGift, targetPrice: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase block">Descripción</label>
                <textarea
                  rows={3}
                  value={newGift.description}
                  onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
                  placeholder="Detalles sobre por qué este regalo es especial para ustedes..."
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newGift.isFreeAmount}
                  onChange={(e) => setNewGift({ ...newGift, isFreeAmount: e.target.checked })}
                  className="accent-primary rounded"
                />
                <span>Permitir aportes libres de cualquier cantidad</span>
              </label>

              <div className="pt-4 border-t border-muted-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddGiftModal(false)}
                  className="px-6 py-2.5 rounded-full border border-muted-border font-sans uppercase tracking-wider text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-primary text-white font-sans uppercase tracking-widest text-xs font-bold hover:bg-primary-container"
                >
                  Guardar Regalo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function EventoConfiguracionPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <EventoConfiguracionContent params={params} />
    </Suspense>
  );
}
