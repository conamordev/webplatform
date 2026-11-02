"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Boda",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-accent-gold/40 text-primary font-sans text-xs uppercase tracking-[0.3em]">
            <span className="material-symbols-outlined text-sm">support_agent</span>
            <span>Atención Personalizada</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink-black">
            Contacto & Concierge Con Amor
          </h1>
          <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            ¿Tienes dudas con la configuración de tu mesa de regalos, verificación bancaria o el diseño de tu sitio web? Nuestro equipo concierge te atiende de inmediato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-8 bg-surface-container-low p-8 sm:p-10 rounded-3xl border border-muted-border shadow-sm">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl font-bold text-ink-black">
                Canales de Atención Directa
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Asesoría humana con especialistas en eventos en México y pagos digitales.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-muted-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">phone_iphone</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans text-on-surface-variant uppercase tracking-widest block font-bold">
                    Concierge WhatsApp & Llamadas
                  </span>
                  <a
                    href="tel:+525549128300"
                    className="font-serif text-base font-bold text-primary hover:underline"
                  >
                    +52 55 4912 8300
                  </a>
                  <p className="text-[11px] font-sans text-stone-500">Lun a Sáb, 9:00 - 19:00 hrs</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans text-on-surface-variant uppercase tracking-widest block font-bold">
                    Correo Electrónico
                  </span>
                  <a
                    href="mailto:hola@conamor.mx"
                    className="font-serif text-base font-bold text-primary hover:underline"
                  >
                    hola@conamor.mx
                  </a>
                  <p className="text-[11px] font-sans text-stone-500">Respuesta en menos de 2 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                </div>
                <div>
                  <span className="text-[10px] font-sans text-on-surface-variant uppercase tracking-widest block font-bold">
                    Soporte de Pagos & Stripe Connect
                  </span>
                  <p className="text-xs font-sans text-stone-700">
                    Soporte especializado para anfitriones con cuentas Express en México.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-6 border-t border-muted-border space-y-3">
              <span className="text-[10px] font-sans text-on-surface-variant uppercase tracking-[0.2em] font-bold block">
                Síguenos en Redes
              </span>
              <div className="flex gap-4">
                {["Instagram", "Pinterest", "TikTok"].map((net, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-muted-border text-xs font-sans font-semibold text-primary shadow-xs cursor-pointer hover:bg-primary hover:text-white transition-all"
                  >
                    {net}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-muted-border shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-ink-black">
                  ¡Mensaje Enviado con Amor!
                </h3>
                <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto">
                  Gracias por escribirnos, {form.name}. Nuestro concierge se pondrá en contacto contigo a la brevedad a través de {form.email}.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", eventType: "Boda", message: "" });
                    }}
                    className="px-8 py-3 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest hover:bg-primary-container"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-ink-black mb-2">
                  Escríbenos tu mensaje
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="ej. Julianne Moore"
                      className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="julianne@ejemplo.com"
                      className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+52 55 0000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                      Tipo de Evento
                    </label>
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                    >
                      <option value="Boda">Boda</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Cumpleaños">Cumpleaños</option>
                      <option value="Bautizo">Bautizo</option>
                      <option value="Otro">Otro Evento</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                      ¿En qué te podemos ayudar? *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Cuéntanos tus requerimientos, dudas con la plataforma o fechas de tu evento..."
                      className="w-full px-4 py-3 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none italic"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-primary-container transition-all shadow-xl active:scale-95"
                  >
                    Enviar Mensaje al Concierge
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
