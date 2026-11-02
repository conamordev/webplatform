"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ComoCrearEventoPage() {
  const steps = [
    {
      num: "01",
      tag: "Registro y Datos Básicos",
      title: "Configura los cimientos de tu gran día",
      desc: "Define el tipo de celebración: Boda, Baby Shower, Cumpleaños o Bautizo. Añade la fecha, hora, ubicación exacta en mapa y un mensaje de dedicatoria personalizado para dar la bienvenida a tus invitados.",
      icon: "app_registration",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    },
    {
      num: "02",
      tag: "Diseño & Identidad",
      title: "Personaliza colores, tipografía y portada",
      desc: "Adapta la estética visual de tu evento con nuestra curaduría de colores editoriales (Burgundy Royal, Terracota Rosé, Oro Champán) y tipografías finas como Playfair Display. Sube fotografías de alta resolución para la portada y tu historia.",
      icon: "palette",
      image:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
    },
    {
      num: "03",
      tag: "Mesa de Regalos",
      title: "Crea experiencias y aportes libres en efectivo",
      desc: "Diseña tu mesa de regalos con fotos, descripciones y metas. Puedes listar aportaciones libres para tu Luna de Miel o fijar el valor de electrodomésticos y experiencias. Tus invitados eligen libremente cuánto y cómo regalarte.",
      icon: "featured_seasonal_and_gifts",
      image:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80",
    },
    {
      num: "04",
      tag: "Stripe Connect Express",
      title: "Recibe los fondos directo en tu banco en México",
      desc: "Completa la verificación KYC requerida por la CNBV y el SAT directamente en la plataforma mediante componentes embebidos de Stripe Express. Vincula tu CLABE interbancaria mexicana y recibe transferencias seguras y transparentes.",
      icon: "account_balance",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-surface-container-high border border-accent-gold/40 text-primary font-sans text-xs uppercase tracking-[0.3em]">
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            <span>Guía Paso a Paso para Anfitriones</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-black leading-tight">
            Cómo crear y gestionar tu evento en Con Amor
          </h1>

          <p className="font-body text-base sm:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Una plataforma pensada para eliminar el estrés del anfitrión. En solo 4 sencillos pasos tendrás un sitio web premium con confirmaciones de asistencia y mesa de regalos lista para compartir.
          </p>

          <div className="pt-4">
            <Link
              href="/crear-evento"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-primary-container transition-all shadow-xl active:scale-95"
            >
              <span>Comenzar a Crear mi Evento</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Steps Detailed Showcase */}
        <div className="space-y-24">
          {steps.map((st, idx) => (
            <div
              key={st.num}
              className={`flex flex-col ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12 lg:gap-16`}
            >
              {/* Image Frame */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-accent-gold/40 shadow-2xl">
                  <img src={st.image} alt={st.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                {/* Step badge overlay */}
                <div className="absolute -top-6 -left-4 sm:-left-6 w-16 h-16 rounded-2xl bg-primary text-white border-4 border-background flex items-center justify-center font-serif text-2xl font-bold shadow-xl">
                  {st.num}
                </div>
              </div>

              {/* Text Description */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="inline-flex items-center gap-2 text-accent-gold font-sans text-xs uppercase tracking-[0.3em] font-bold">
                  <span className="material-symbols-outlined text-sm">{st.icon}</span>
                  <span>{st.tag}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-black leading-snug">
                  {st.title}
                </h2>

                <p className="font-body text-base text-on-surface-variant leading-relaxed">
                  {st.desc}
                </p>

                {idx === 3 && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-muted-border flex items-start gap-3 text-xs font-sans text-stone-700">
                    <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <p>
                      Cumplimiento riguroso con la Ley Fintech mexicana. Stripe Connect Express garantiza que tus transferencias lleguen de manera íntegra, segura y directa a tu cuenta bancaria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-surface-container-low rounded-3xl p-8 sm:p-14 border border-muted-border space-y-10">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-primary">
              Respuestas Rápidas
            </span>
            <h3 className="font-serif text-3xl font-bold text-ink-black">
              Preguntas Frecuentes sobre la Creación de Eventos
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-ink-black">
                ¿Cuánto tiempo tarda en activarse mi sitio web?
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                De inmediato. Una vez que guardas los datos básicos, tu sitio web ya tiene un enlace único listo para enviar a tus invitados por WhatsApp, correo o tarjeta de invitación.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-ink-black">
                ¿Puedo modificar los regalos y fechas después de publicar?
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                ¡Por supuesto! Desde tu panel de anfitrión puedes añadir regalos nuevos, cambiar las fotos, actualizar el itinerario o ajustar el código de vestimenta en cualquier momento.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-ink-black">
                ¿Qué documentos necesito para retirar el dinero?
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Por normativa mexicana (SAT / CNBV), Stripe solicita una identificación oficial (INE o Pasaporte vigente), tu RFC con homoclave y una CLABE interbancaria a tu nombre.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-ink-black">
                ¿Cómo ven los invitados mi mesa de regalos?
              </h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Tus invitados ven un catálogo elegante con las fotos que subiste. Pueden pagar con tarjeta de crédito/débito o transferencia bancaria y dejarte una dedicatoria personalizada.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="text-center py-12 space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink-black">
            ¿Listo para empezar a planear tu evento?
          </h3>
          <Link
            href="/crear-evento"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-primary-container transition-all shadow-xl"
          >
            <span>Crear Mi Evento Gratis</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
