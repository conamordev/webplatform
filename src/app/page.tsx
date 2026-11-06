"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuestHero from "@/components/home/GuestHero";
import HowToCreateSection from "@/components/home/HowToCreateSection";
import EventPreviewsSection from "@/components/home/EventPreviewsSection";
import { useAuth } from "@/lib/auth-context";

export default function HomePage() {
  const { isLoggedIn, user, events } = useAuth();

  // Calculator state
  const [calculatorBudget, setCalculatorBudget] = useState(50000);
  const commissionFee = Math.round(calculatorBudget * 0.08);

  // Active event for logged in countdown
  const upcomingEvent = events[0];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1">
        {/* ============================================================== */}
        {/* CONDITIONAL HERO: LOGGED IN vs UNAUTHENTICATED               */}
        {/* ============================================================== */}
        {isLoggedIn ? (
          /* CON SESIÓN: Hero con accesos directos, cuenta regresiva y eventos */
          <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 bg-negro-profundo text-white overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2560&q=85"
                alt="Con Amor Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-negro-profundo via-negro-profundo/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
              {/* Header greeting */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-gold text-xs font-sans uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
                  <span>Panel de Anfitrión Activo</span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                  Bienvenida de vuelta, <br />
                  <span className="text-accent-gold italic font-normal">{user.name}</span>.
                </h1>
                <p className="font-body text-white/80 text-base sm:text-xl max-w-2xl leading-relaxed">
                  Tu evento está tomando forma. Revisa las confirmaciones de asistencia, aportaciones en tu mesa de regalos y gestiona tus fondos.
                </p>
              </div>

              {/* Event Shortcuts by Type */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { name: "Bodas", icon: "favorite", link: "/crear-evento?tipo=Boda" },
                  { name: "Baby Shower", icon: "child_care", link: "/crear-evento?tipo=Baby%20Shower" },
                  { name: "Cumpleaños", icon: "celebration", link: "/crear-evento?tipo=Cumpleaños" },
                  { name: "Otro Evento", icon: "auto_awesome", link: "/crear-evento?tipo=Otro" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    className="p-5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all duration-300 group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-accent-gold text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="font-sans text-xs uppercase tracking-wider font-semibold text-white">
                        {item.name}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-white/50 text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                ))}
              </div>

              {/* Countdown Banner to Next Event */}
              {upcomingEvent && (
                <div className="p-8 rounded-3xl bg-surface-container/10 backdrop-blur-xl border border-accent-gold/40 shadow-2xl space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-accent-gold text-xs font-sans uppercase tracking-[0.3em] block mb-1">
                        Próximo Evento Destacado
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                        {upcomingEvent.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-white/70 mt-1">
                        {upcomingEvent.date} — {upcomingEvent.locationName}, {upcomingEvent.city}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/evento/${upcomingEvent.slug}`}
                        className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs uppercase tracking-widest border border-white/20 transition-all"
                      >
                        Vista de Invitado
                      </Link>
                      <Link
                        href={`/evento/${upcomingEvent.slug}/configuracion`}
                        className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-white font-sans text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">tune</span>
                        <span>Configurar Evento</span>
                      </Link>
                    </div>
                  </div>

                  {/* Countdown Clock Grid */}
                  <div className="grid grid-cols-4 gap-4 max-w-lg">
                    {[
                      { label: "Días", val: "105" },
                      { label: "Horas", val: "14" },
                      { label: "Minutos", val: "38" },
                      { label: "Segundos", val: "42" },
                    ].map((t, idx) => (
                      <div
                        key={idx}
                        className="text-center p-3 rounded-xl bg-black/40 border border-white/10"
                      >
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-accent-gold block">
                          {t.val}
                        </span>
                        <span className="font-sans text-[10px] text-white/60 uppercase tracking-widest">
                          {t.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* SIN SESIÓN: Hero de Inicio (Diseño Stitch Screen 01) */
          <GuestHero />
        )}

        {/* ============================================================== */}
        {/* SECTION: MIS EVENTOS (Visible when logged in)                   */}
        {/* ============================================================== */}
        {isLoggedIn && (
          <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 pb-6 border-b border-muted-border">
              <div>
                <span className="font-sans text-xs text-primary font-bold uppercase tracking-[0.3em] block mb-2">
                  Panel de Gestión
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-on-surface">
                  Tus Eventos Activos
                </h2>
              </div>
              <Link
                href="/crear-evento"
                className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest hover:bg-primary-container transition-all"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Registrar Nuevo Evento</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl overflow-hidden border border-muted-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-sans text-[10px] uppercase tracking-widest font-semibold">
                        {evt.type}
                      </span>
                    </div>
                    {evt.isHost && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-accent-gold text-ink-black font-sans text-[10px] uppercase tracking-widest font-bold">
                          Anfitrión
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[11px] font-sans text-secondary font-semibold uppercase tracking-wider block mb-1">
                        {evt.date}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-ink-black line-clamp-1">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant font-body line-clamp-2 mt-1">
                        {evt.locationName} — {evt.city}
                      </p>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-muted-border/60 text-xs font-sans">
                      <div className="bg-surface-container-low p-2.5 rounded-xl">
                        <span className="text-[10px] text-on-surface-variant uppercase block">
                          Regalos
                        </span>
                        <span className="font-serif text-base font-bold text-primary">
                          {evt.gifts.length} listados
                        </span>
                      </div>
                      <div className="bg-surface-container-low p-2.5 rounded-xl">
                        <span className="text-[10px] text-on-surface-variant uppercase block">
                          RSVP
                        </span>
                        <span className="font-serif text-base font-bold text-primary">
                          {evt.rsvps.filter((r) => r.attending).length} confirmados
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        href={`/evento/${evt.slug}`}
                        className="flex-1 text-center py-2.5 rounded-xl border border-primary text-primary hover:bg-primary/5 font-sans text-xs uppercase tracking-wider font-semibold transition-all"
                      >
                        Ver Sitio
                      </Link>
                      <Link
                        href={`/evento/${evt.slug}/configuracion`}
                        className="flex-1 text-center py-2.5 rounded-xl bg-primary text-white hover:bg-primary-container font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow"
                      >
                        Builder
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* SECTION: CÓMO CREAR TU EVENTO (Bento Grid Stitch Screen 01)    */}
        {/* ============================================================== */}
        <HowToCreateSection />

        {/* ============================================================== */}
        {/* SECTION: MIRA CÓMO SE VERÍA LA WEB DE TU EVENTO                */}
        {/* ============================================================== */}
        <EventPreviewsSection />

        {/* ============================================================== */}
        {/* SECTION: CALCULADORA DE COMISIONES TRANSPARENTES                */}
        {/* ============================================================== */}
        <section className="py-20 px-6 md:px-12 bg-surface-container-high border-t border-muted-border">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="font-sans text-xs font-bold text-primary uppercase tracking-[0.4em] block">
                Sin Letras Pequeñas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-black">
                Calculadora de Recaudación
              </h2>
              <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
                En Con Amor cobramos una comisión fija transparente del 8% que cubre el procesamiento de pagos bancarios con Stripe, hosting seguro y soporte para tus invitados.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-muted-border shadow-lg space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink-black">
                    Monto estimado en regalos
                  </label>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    ${calculatorBudget.toLocaleString("es-MX")} MXN
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="300000"
                  step="5000"
                  value={calculatorBudget}
                  onChange={(e) => setCalculatorBudget(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-sans text-on-surface-variant mt-2">
                  <span>$5,000 MXN</span>
                  <span>$150,000 MXN</span>
                  <span>$300,000+ MXN</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-muted-border">
                <div className="bg-surface-container-low p-6 rounded-2xl">
                  <span className="font-sans text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                    Comisión Con Amor (8%)
                  </span>
                  <span className="font-serif text-2xl font-bold text-secondary">
                    ${commissionFee.toLocaleString("es-MX")} MXN
                  </span>
                  <p className="text-[11px] font-body text-on-surface-variant mt-2">
                    Incluye pasarela de pago Stripe, infraestructura y soporte concierge.
                  </p>
                </div>

                <div className="bg-primary text-white p-6 rounded-2xl shadow-md">
                  <span className="font-sans text-xs uppercase tracking-wider text-accent-gold block mb-1">
                    Recibes en tu Cuenta Bancaria
                  </span>
                  <span className="font-serif text-3xl font-bold text-white">
                    ${(calculatorBudget - commissionFee).toLocaleString("es-MX")} MXN
                  </span>
                  <p className="text-[11px] font-body text-white/80 mt-2">
                    Transferencia directa a tu CLABE interbancaria en México.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FINAL CALL TO ACTION                                           */}
        {/* ============================================================== */}
        <section className="py-24 px-6 md:px-12 text-center bg-surface-container-low relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-4 text-primary">
              <div className="w-12 h-[1px] bg-primary/40" />
              <span className="font-sans text-xs uppercase tracking-[0.4em] font-bold">
                Tu Próximo Gran Capítulo
              </span>
              <div className="w-12 h-[1px] bg-primary/40" />
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-ink-black leading-tight">
              Comienza a crear tu evento hoy mismo
            </h2>

            <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
              Solo toma 2 minutos registrar tu evento y empezar a compartir tu mesa de regalos con todos tus seres queridos.
            </p>

            <div>
              <Link
                href="/crear-evento"
                className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-primary text-white font-sans text-xs font-bold uppercase tracking-[0.3em] hover:bg-primary-container transition-all shadow-xl hover:shadow-2xl active:scale-95"
              >
                <span>Empezar Ahora</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
