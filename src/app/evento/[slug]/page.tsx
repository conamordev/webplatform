"use client";

import React, { useState, use, Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAuth, Gift } from "@/lib/auth-context";
import GuestEventHero from "@/components/event/GuestEventHero";
import GuestEventSummary from "@/components/event/GuestEventSummary";
import GuestEventDetails from "@/components/event/GuestEventDetails";
import GuestEventConfirmationCta from "@/components/event/GuestEventConfirmationCta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function EventoGuestContent({ params }: PageProps) {
  const { slug } = use(params);
  const { getEventBySlug, recordGiftPayment, submitRSVP, submitDedicatoria } = useAuth();

  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Active section
  const [activeTab, setActiveTab] = useState<"evento" | "regalos" | "rsvp" | "dedicatorias">("evento");

  // Selected gift for detail / payment
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [giftContributionAmount, setGiftContributionAmount] = useState<number>(1000);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [guestPersonalData, setGuestPersonalData] = useState({
    name: "",
    ine: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    cardHolder: "",
    cardNumber: "",
    exp: "",
    cvv: "",
    dedicationMessage: "",
  });
  const [receiptFileUploaded, setReceiptFileUploaded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // RSVP Form state
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    email: "",
    phone: "",
    attending: true,
    guestsCount: 1,
    dietaryRestrictions: "",
  });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Standalone Dedicatoria state
  const [newDedication, setNewDedication] = useState({ name: "", message: "" });
  const [dedicationSubmitted, setDedicationSubmitted] = useState(false);

  // Filter gifts by category
  const [selectedGiftCategory, setSelectedGiftCategory] = useState<string>("Todos");
  const giftCategories = ["Todos", "Luna de Miel", "Hogar", "Experiencias", "Aporte Libre"];

  const filteredGifts = event.gifts.filter(
    (g) => selectedGiftCategory === "Todos" || g.category === selectedGiftCategory
  );

  const openGiftDetail = (gift: Gift) => {
    setSelectedGift(gift);
    setGiftContributionAmount(
      gift.isFreeAmount ? 1500 : Math.max(500, gift.targetPrice - gift.currentAmount)
    );
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGift) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      recordGiftPayment(event.slug, selectedGift.id, giftContributionAmount, {
        name: guestPersonalData.name,
        message: guestPersonalData.dedicationMessage,
      });
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRSVP(event.slug, rsvpForm);
    setRsvpSubmitted(true);
  };

  const handleDedicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDedication.message) return;
    submitDedicatoria(event.slug, {
      authorName: newDedication.name || "Invitado con Amor",
      message: newDedication.message,
    });
    setDedicationSubmitted(true);
    setNewDedication({ name: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface relative">
      {/* Floating Pill Guest Navigation Bar (Stitch Screen 15) */}
      <header className="fixed top-4 md:top-8 left-4 md:left-12 right-4 md:right-12 z-[60]">
        <nav className="navbar-pill flex justify-between items-center w-full px-6 md:px-8 py-3.5 md:py-4 bg-primary text-white backdrop-blur-md shadow-2xl border border-white/10">
          <Link
            href="/"
            className="font-serif text-lg md:text-2xl font-bold tracking-tighter text-accent-gold uppercase"
          >
            {event.brandTitle || "ALURE WEDDINGS"}
          </Link>

          <div className="hidden md:flex gap-6 lg:gap-8 items-center font-sans text-[11px] uppercase tracking-widest font-semibold">
            <button
              onClick={() => setActiveTab("evento")}
              className={`py-1 transition-colors cursor-pointer ${
                activeTab === "evento"
                  ? "text-accent-gold border-b-2 border-accent-gold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Evento
            </button>
            <button
              onClick={() => setActiveTab("regalos")}
              className={`py-1 transition-colors cursor-pointer ${
                activeTab === "regalos"
                  ? "text-accent-gold border-b-2 border-accent-gold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Mesa de Regalos
            </button>
            <button
              onClick={() => setActiveTab("rsvp")}
              className={`py-1 transition-colors cursor-pointer ${
                activeTab === "rsvp"
                  ? "text-accent-gold border-b-2 border-accent-gold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Confirmar Asistencia
            </button>
            <button
              onClick={() => setActiveTab("dedicatorias")}
              className={`py-1 transition-colors cursor-pointer ${
                activeTab === "dedicatorias"
                  ? "text-accent-gold border-b-2 border-accent-gold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Dedicatorias
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/evento/${event.slug}/configuracion`}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-sans text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 border border-white/20"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Volver al editor</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ========================================================== */}
        {/* TAB 1: SECCIÓN EVENTO (Diseño Stitch Screen 15)            */}
        {/* ========================================================== */}
        {activeTab === "evento" && (
          <div className="space-y-0">
            {/* Hero Principal */}
            <GuestEventHero event={event} />

            {/* Resumen & Cuenta Regresiva */}
            <GuestEventSummary event={event} />

            {/* Información Esencial & Detalles */}
            <GuestEventDetails event={event} />

            {/* Confirmación de Asistencia CTA */}
            <GuestEventConfirmationCta
              event={event}
              onConfirmClick={() => setActiveTab("rsvp")}
            />

            {/* Footer con el nombre de los anfitriones */}
            <footer className="bg-surface-container py-20 px-6 border-t border-muted-border">
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="font-serif text-primary italic text-3xl sm:text-4xl mb-4">
                  {event.hostNames}
                </div>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500">
                  Con Amor Eventos • Sastrería Digital
                </p>
              </div>
            </footer>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: MESA DE REGALOS (Stitch Screen 16)                   */}
        {/* ========================================================== */}
        {activeTab === "regalos" && (
          <section className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-primary">
                Aportaciones & Regalos
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ink-black">
                Mesa de Regalos
              </h1>
              <p className="font-body text-base text-on-surface-variant max-w-xl mx-auto">
                Tu presencia es nuestro mayor regalo. Si deseas hacernos un presente, puedes contribuir a nuestras experiencias, luna de miel o artículos para el hogar.
              </p>

              {/* Category Pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {giftCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedGiftCategory(cat)}
                    className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-wider transition-all ${
                      selectedGiftCategory === cat
                        ? "bg-primary text-white font-bold shadow-md"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-muted-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gifts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredGifts.map((gift) => {
                const percentage = Math.min(
                  100,
                  Math.round((gift.currentAmount / gift.targetPrice) * 100)
                );
                return (
                  <div
                    key={gift.id}
                    className="bg-white rounded-3xl overflow-hidden border border-muted-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={gift.image}
                        alt={gift.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-sans text-[10px] uppercase tracking-widest font-semibold">
                          {gift.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-ink-black line-clamp-1">
                          {gift.title}
                        </h3>
                        <p className="font-body text-xs text-on-surface-variant line-clamp-2 mt-1">
                          {gift.description}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs font-sans">
                          <span className="text-stone-500">Recaudado:</span>
                          <span className="font-serif font-bold text-primary">
                            ${gift.currentAmount.toLocaleString("es-MX")} / $
                            {gift.targetPrice.toLocaleString("es-MX")} MXN
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-right text-[10px] font-sans text-stone-400">
                          {percentage}% completado
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => openGiftDetail(gift)}
                          className="w-full py-3 rounded-xl bg-primary text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-primary-container transition-all shadow active:scale-95 flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">redeem</span>
                          <span>Regalar o Aportar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ========================================================== */}
        {/* TAB 3: CONFIRMAR ASISTENCIA (RSVP - Stitch Screen 20)       */}
        {/* ========================================================== */}
        {activeTab === "rsvp" && (
          <section className="pt-36 pb-24 px-6 md:px-12 max-w-3xl mx-auto w-full space-y-10">
            <div className="text-center space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-primary">
                RSVP
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink-black">
                Confirmación de Asistencia
              </h1>
              <p className="font-body text-base text-on-surface-variant">
                Por favor confírmanos si podrás acompañarnos para contemplar tus lugares y detalles con el banquetero.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-muted-border shadow-xl">
              {rsvpSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink-black">
                    ¡Confirmación Recibida con Amor!
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto">
                    Muchas gracias {rsvpForm.name}. Tu respuesta ha quedado registrada para {event.hostNames}. ¡Nos dará una dicha enorme verte!
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setActiveTab("regalos")}
                      className="px-6 py-2.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest"
                    >
                      Ver Mesa de Regalos
                    </button>
                    <button
                      onClick={() => setRsvpSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-surface-container text-stone-700 font-sans text-xs uppercase tracking-widest"
                    >
                      Modificar Respuesta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink-black block">
                      ¿Asistirás al evento? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRsvpForm({ ...rsvpForm, attending: true })}
                        className={`p-4 rounded-2xl border text-center font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                          rsvpForm.attending
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "border-muted-border hover:bg-surface-container-low text-stone-600"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span>Sí, ahí estaré</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRsvpForm({ ...rsvpForm, attending: false, guestsCount: 0 })}
                        className={`p-4 rounded-2xl border text-center font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 ${
                          !rsvpForm.attending
                            ? "bg-stone-800 text-white border-stone-800 shadow-sm"
                            : "border-muted-border hover:bg-surface-container-low text-stone-600"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">cancel</span>
                        <span>No podré asistir</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-muted-border">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.name}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                        placeholder="ej. Julianne Moore"
                        className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={rsvpForm.email}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                        placeholder="julianne@ejemplo.com"
                        className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={rsvpForm.phone}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                        placeholder="+52 55 0000 0000"
                        className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                      />
                    </div>

                    {rsvpForm.attending && (
                      <>
                        <div className="space-y-1.5">
                          <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                            Número de Pases / Acompañantes
                          </label>
                          <select
                            value={rsvpForm.guestsCount}
                            onChange={(e) =>
                              setRsvpForm({ ...rsvpForm, guestsCount: Number(e.target.value) })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                          >
                            <option value={1}>1 persona (solo yo)</option>
                            <option value={2}>2 personas</option>
                            <option value={3}>3 personas</option>
                            <option value={4}>4 personas</option>
                          </select>
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                            Requerimientos Dietéticos o Alergias
                          </label>
                          <input
                            type="text"
                            value={rsvpForm.dietaryRestrictions}
                            onChange={(e) =>
                              setRsvpForm({ ...rsvpForm, dietaryRestrictions: e.target.value })
                            }
                            placeholder="ej. Vegetariano, celíaco, alergia a mariscos..."
                            className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="pt-4 border-t border-muted-border">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-primary-container transition-all shadow-xl active:scale-95"
                    >
                      Enviar Confirmación
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {/* ========================================================== */}
        {/* TAB 4: DEDICATORIAS (Stitch Screen 19)                      */}
        {/* ========================================================== */}
        {activeTab === "dedicatorias" && (
          <section className="pt-36 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-primary">
                Muro con Amor
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink-black">
                Dedicatorias & Mensajes
              </h1>
              <p className="font-body text-base text-on-surface-variant">
                Palabras llenas de bendición y cariño dejadas por los seres queridos de {event.hostNames}.
              </p>
            </div>

            {/* Submit new dedication */}
            <div className="bg-white rounded-3xl p-8 border border-muted-border shadow-md max-w-2xl mx-auto space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink-black">
                Deja tu dedicatoria para los anfitriones
              </h3>

              {dedicationSubmitted ? (
                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-800 text-xs font-sans text-center">
                  ¡Gracias! Tu mensaje ha sido publicado en el muro.
                </div>
              ) : (
                <form onSubmit={handleDedicationSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={newDedication.name}
                    onChange={(e) => setNewDedication({ ...newDedication, name: e.target.value })}
                    placeholder="Tu nombre (ej. Carlos y Mariana)"
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm outline-none"
                  />
                  <textarea
                    rows={3}
                    required
                    value={newDedication.message}
                    onChange={(e) =>
                      setNewDedication({ ...newDedication, message: e.target.value })
                    }
                    placeholder="Escribe tus mejores deseos para este día tan especial..."
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm outline-none italic"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container"
                  >
                    Publicar Dedicatoria
                  </button>
                </form>
              )}
            </div>

            {/* Dedications wall */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.dedicatorias.map((d) => (
                <div
                  key={d.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-muted-border shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-serif text-lg font-bold text-primary">{d.authorName}</span>
                    <span className="text-[10px] font-sans text-stone-400 uppercase tracking-widest">
                      {d.createdAt}
                    </span>
                  </div>
                  <p className="font-body text-sm text-stone-700 italic leading-relaxed">
                    &ldquo;{d.message}&rdquo;
                  </p>
                  {d.giftTitle && (
                    <div className="pt-2 text-xs font-sans text-accent-gold flex items-center gap-1.5 font-semibold">
                      <span className="material-symbols-outlined text-sm">redeem</span>
                      <span>Aportó para {d.giftTitle}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ========================================================== */}
      {/* MODAL: DETALLE DEL REGALO (Stitch Screen 17)                */}
      {/* ========================================================== */}
      {selectedGift && !checkoutModal && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-muted-border flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <img
                src={selectedGift.image}
                alt={selectedGift.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white font-sans text-[10px] uppercase tracking-widest font-semibold">
                {selectedGift.category}
              </span>
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-primary font-bold">
                    Detalle de Regalo
                  </span>
                  <button
                    onClick={() => setSelectedGift(null)}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <h3 className="font-serif text-2xl font-bold text-ink-black">
                  {selectedGift.title}
                </h3>
                <p className="font-body text-xs text-on-surface-variant mt-2 leading-relaxed">
                  {selectedGift.description}
                </p>

                {/* Amount selection */}
                <div className="space-y-3 pt-6 border-t border-muted-border mt-4">
                  <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink-black block">
                    {selectedGift.isFreeAmount ? "Monto de tu aporte:" : "Valor de tu regalo:"}
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl font-bold text-primary">$</span>
                    <input
                      type="number"
                      step="100"
                      min="100"
                      value={giftContributionAmount}
                      onChange={(e) => setGiftContributionAmount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border font-serif text-xl font-bold text-primary focus:border-accent-gold outline-none"
                    />
                    <span className="font-sans text-xs text-stone-500">MXN</span>
                  </div>

                  <div className="flex gap-2">
                    {[500, 1000, 2500, 5000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setGiftContributionAmount(amt)}
                        className="px-2.5 py-1 rounded-lg border border-muted-border text-[11px] font-sans hover:bg-surface-container font-semibold"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setCheckoutModal(true)}
                  className="w-full py-3.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-container transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Continuar al Pago</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: PAGO DE REGALO COMPLETO (Stitch Screen 18)           */}
      {/* ========================================================== */}
      {checkoutModal && selectedGift && (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full my-8 p-6 sm:p-10 shadow-2xl border border-muted-border space-y-8">
            <div className="flex justify-between items-center pb-4 border-b border-muted-border">
              <div>
                <span className="font-sans text-[10px] text-accent-gold uppercase tracking-[0.3em] font-bold block">
                  Procesamiento Seguro con Stripe Connect
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-black">
                  Pago de Regalo — {selectedGift.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  setCheckoutModal(false);
                  setPaymentSuccess(false);
                }}
                className="text-stone-400 hover:text-stone-600 p-2"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-ink-black">
                  ¡Aportación Confirmada con Éxito!
                </h3>
                <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto">
                  Tu regalo de <strong>${giftContributionAmount.toLocaleString("es-MX")} MXN</strong> para {event.hostNames} ha sido procesado de manera segura. Tu mensaje ya luce en el muro de dedicatorias.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setCheckoutModal(false);
                      setSelectedGift(null);
                      setPaymentSuccess(false);
                    }}
                    className="px-8 py-3 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold"
                  >
                    Aceptar & Volver a la Celebración
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left column: User identity & payment */}
                <div className="md:col-span-8 space-y-8">
                  {/* Step 1: Personal info for Mexican AML KYC */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-accent-gold italic">01</span>
                      <h4 className="font-serif text-lg font-bold text-ink-black uppercase tracking-wider">
                        Información Personal
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-surface-container-low/50 border border-accent-gold/30 text-xs font-sans">
                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold uppercase block">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={guestPersonalData.name}
                          onChange={(e) =>
                            setGuestPersonalData({ ...guestPersonalData, name: e.target.value })
                          }
                          placeholder="ej. Julianne Moore"
                          className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold uppercase block">
                          Documento Oficial (INE / Pasaporte) *
                        </label>
                        <input
                          type="text"
                          required
                          value={guestPersonalData.ine}
                          onChange={(e) =>
                            setGuestPersonalData({ ...guestPersonalData, ine: e.target.value })
                          }
                          placeholder="Clave de elector o pasaporte"
                          className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold uppercase block">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          value={guestPersonalData.email}
                          onChange={(e) =>
                            setGuestPersonalData({ ...guestPersonalData, email: e.target.value })
                          }
                          placeholder="julianne@ejemplo.com"
                          className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-stone-700 font-semibold uppercase block">
                          Teléfono Celular *
                        </label>
                        <input
                          type="tel"
                          required
                          value={guestPersonalData.phone}
                          onChange={(e) =>
                            setGuestPersonalData({ ...guestPersonalData, phone: e.target.value })
                          }
                          placeholder="+52 55 0000 0000"
                          className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-stone-700 font-semibold uppercase block">
                          Dirección (Calle, Número y Colonia)
                        </label>
                        <input
                          type="text"
                          value={guestPersonalData.address}
                          onChange={(e) =>
                            setGuestPersonalData({ ...guestPersonalData, address: e.target.value })
                          }
                          placeholder="ej. Av. Horacio 1520, Polanco"
                          className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Payment method */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-accent-gold italic">02</span>
                      <h4 className="font-serif text-lg font-bold text-ink-black uppercase tracking-wider">
                        Método de Pago
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-muted-border hover:bg-surface-container-low text-stone-600"
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">credit_card</span>
                        <div>
                          <p className="font-sans text-xs font-bold uppercase">Tarjeta</p>
                          <p className="text-[10px] text-stone-500">Crédito o Débito (Stripe)</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("transfer")}
                        className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          paymentMethod === "transfer"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-muted-border hover:bg-surface-container-low text-stone-600"
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">account_balance</span>
                        <div>
                          <p className="font-sans text-xs font-bold uppercase">Transferencia</p>
                          <p className="text-[10px] text-stone-500">SPEI Directo a CLABE</p>
                        </div>
                      </button>
                    </div>

                    {paymentMethod === "card" ? (
                      <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-accent-gold/30 space-y-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="text-stone-700 font-semibold uppercase block">
                            Nombre en la Tarjeta
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Como aparece en el plástico"
                            value={guestPersonalData.cardHolder}
                            onChange={(e) =>
                              setGuestPersonalData({
                                ...guestPersonalData,
                                cardHolder: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-stone-700 font-semibold uppercase block">
                            Número de Tarjeta
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="4000 0000 0000 0000"
                            value={guestPersonalData.cardNumber}
                            onChange={(e) =>
                              setGuestPersonalData({
                                ...guestPersonalData,
                                cardNumber: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-stone-700 font-semibold uppercase block">
                              Vencimiento (MM/AA)
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="12/28"
                              value={guestPersonalData.exp}
                              onChange={(e) =>
                                setGuestPersonalData({ ...guestPersonalData, exp: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-stone-700 font-semibold uppercase block">
                              CVC / CVV
                            </label>
                            <input
                              type="password"
                              maxLength={4}
                              required
                              placeholder="123"
                              value={guestPersonalData.cvv}
                              onChange={(e) =>
                                setGuestPersonalData({ ...guestPersonalData, cvv: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-muted-border bg-white outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-accent-gold/30 space-y-4 text-xs font-sans">
                        <div className="space-y-2 border-l-2 border-primary pl-4">
                          <p>
                            <strong>Banco:</strong> BBVA México (Stripe Express SPEI)
                          </p>
                          <p>
                            <strong>CLABE:</strong> 0121 8000 1234 5678 90
                          </p>
                          <p>
                            <strong>Beneficiario:</strong> Con Amor Eventos — {event.hostNames}
                          </p>
                          <p>
                            <strong>Referencia:</strong> {event.slug.toUpperCase().slice(0, 8)}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-muted-border">
                          <label className="text-stone-700 font-semibold uppercase block">
                            Subir Comprobante de Transferencia *
                          </label>
                          <div
                            onClick={() => setReceiptFileUploaded(true)}
                            className="border-2 border-dashed border-accent-gold/50 rounded-xl p-4 text-center cursor-pointer hover:bg-white/40 transition-all"
                          >
                            <span className="material-symbols-outlined text-2xl text-accent-gold block">
                              {receiptFileUploaded ? "check_circle" : "upload_file"}
                            </span>
                            <span className="text-xs text-stone-600 block mt-1">
                              {receiptFileUploaded
                                ? "Comprobante cargado correctamente (SPEI_Recibo.pdf)"
                                : "Haz clic para subir imagen o comprobante bancario (JPG, PNG o PDF)"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 3: Dedication message */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-accent-gold italic">03</span>
                      <h4 className="font-serif text-lg font-bold text-ink-black uppercase tracking-wider">
                        Dedicatoria con Amor
                      </h4>
                    </div>

                    <textarea
                      rows={3}
                      value={guestPersonalData.dedicationMessage}
                      onChange={(e) =>
                        setGuestPersonalData({
                          ...guestPersonalData,
                          dedicationMessage: e.target.value,
                        })
                      }
                      placeholder="Escribe un mensaje de felicitación para los anfitriones que se mostrará en el muro..."
                      className="w-full p-4 rounded-2xl border border-muted-border bg-surface-container-low/40 text-xs font-body italic outline-none"
                    />
                  </div>
                </div>

                {/* Right column: Order Summary */}
                <div className="md:col-span-4 space-y-6">
                  <div className="p-6 rounded-3xl bg-surface-container-low border border-accent-gold/30 space-y-4">
                    <h4 className="font-serif text-xl font-bold text-ink-black border-b border-muted-border pb-3">
                      Resumen del Regalo
                    </h4>

                    <div className="space-y-2 text-xs font-sans">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Regalo:</span>
                        <span className="font-semibold text-stone-800 text-right">
                          {selectedGift.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Para:</span>
                        <span className="font-semibold text-stone-800">{event.hostNames}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-muted-border text-sm font-serif font-bold text-primary">
                        <span>Total a Pagar:</span>
                        <span>${giftContributionAmount.toLocaleString("es-MX")} MXN</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-4 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-container transition-all shadow-xl active:scale-95 disabled:opacity-50 mt-4"
                    >
                      {isProcessingPayment ? "Procesando pago..." : "Confirmar & Pagar Regalo"}
                    </button>

                    <div className="pt-2 text-[10px] text-stone-400 font-sans text-center flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-xs">lock</span>
                      <span>Transacción encriptada con Stripe Connect</span>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventoGuestPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <EventoGuestContent params={params} />
    </Suspense>
  );
}
