"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AvisoLegalPage() {
  const [activeTab, setActiveTab] = useState<"terminos" | "privacidad" | "tarifas" | "cookies">("terminos");

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-accent-gold/40 text-primary font-sans text-xs uppercase tracking-[0.3em]">
            <span className="material-symbols-outlined text-sm">gavel</span>
            <span>Marco Legal & Transparencia</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-ink-black">
            Aviso Legal & Términos de Servicio
          </h1>
          <p className="font-body text-base text-on-surface-variant max-w-2xl mx-auto">
            Información legal completa sobre el uso de la plataforma Con Amor Eventos, comisiones de recaudación y tratamiento de datos personales en los Estados Unidos Mexicanos.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-muted-border pb-4">
          {[
            { id: "terminos", label: "Términos y Condiciones" },
            { id: "privacidad", label: "Política de Privacidad" },
            { id: "tarifas", label: "Tarifas y Comisiones" },
            { id: "cookies", label: "Cookies & Consentimiento" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-muted-border shadow-xl font-body leading-relaxed space-y-8 text-sm text-stone-700">
          {activeTab === "terminos" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-black">
                1. Términos y Condiciones de Uso
              </h2>
              <p>
                Bienvenido a <strong>Con Amor Eventos</strong>. Al acceder y utilizar este sitio web, aceptas quedar legalmente vinculado por los siguientes términos y condiciones. Si no estás de acuerdo con alguna de las cláusulas, deberás abstenerte de utilizar la plataforma.
              </p>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Naturaleza del Servicio
              </h3>
              <p>
                Con Amor es una plataforma tecnológica que permite a los anfitriones crear un sitio web personalizado para su evento (bodas, aniversarios, baby showers, cumpleaños u otros), recibir confirmaciones de asistencia (RSVP) y habilitar una mesa de regalos donde los invitados pueden realizar aportaciones monetarias en efectivo para proyectos, experiencias o bienes.
              </p>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Responsabilidad del Anfitrión
              </h3>
              <p>
                El anfitrión es el único responsable de la veracidad y legalidad de la información proporcionada en su sitio web de evento, incluyendo nombres, fechas, imágenes y cuentas bancarias registradas para el depósito de los fondos.
              </p>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Pagos y Seguridad Bancaria
              </h3>
              <p>
                El procesamiento de pagos y transferencias se realiza a través de <strong>Stripe Payments Mexico, S. de R.L. de C.V.</strong> (&ldquo;Stripe&rdquo;). Con Amor no almacena datos de tarjetas de crédito o débito en sus servidores propios. Toda transacción está protegida mediante cifrado TLS 256-bit y protocolos PCI-DSS Nivel 1.
              </p>
            </div>
          )}

          {activeTab === "privacidad" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-black">
                2. Política de Privacidad y Protección de Datos Personales
              </h2>
              <p>
                En cumplimiento con la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</em> y su Reglamento en México, Con Amor hace de tu conocimiento su Aviso de Privacidad.
              </p>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Datos Recabados
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Anfitriones:</strong> Nombre completo, correo electrónico, teléfono móvil, documento de identificación oficial (INE, Pasaporte o CURP), RFC con homoclave y CLABE interbancaria mexicana.</li>
                <li><strong>Invitados:</strong> Nombre, correo electrónico, teléfono, datos de facturación para aportaciones y dedicatorias enviadas.</li>
              </ul>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Finalidades Primarias
              </h3>
              <p>
                Validación de identidad (KYC) conforme a las disposiciones emitidas por la Comisión Nacional Bancaria y de Valores (CNBV) y el Servicio de Administración Tributaria (SAT), dispersión de fondos a través de Stripe Express, confirmación de asistencia al evento y envío de comprobantes de pago.
              </p>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Derechos ARCO
              </h3>
              <p>
                Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos personales enviando una solicitud por escrito a <strong>privacidad@conamor.mx</strong>.
              </p>
            </div>
          )}

          {activeTab === "tarifas" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-black">
                3. Tarifas y Comisiones Transparentes
              </h2>
              <p>
                En Con Amor creemos en la total transparencia sin cobros sorpresa:
              </p>
              <div className="p-6 rounded-2xl bg-surface-container-low border border-accent-gold/40 space-y-3">
                <div className="flex justify-between items-center text-primary font-serif font-bold text-xl">
                  <span>Comisión Única de Plataforma:</span>
                  <span>8.0% + IVA</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Esta comisión se deduce exclusivamente al momento de dispersar los fondos recibidos a la cuenta bancaria del anfitrión.
                </p>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                ¿Qué incluye la comisión?
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comisión por procesamiento de pagos con tarjetas nacionales e internacionales (Visa, Mastercard, American Express).</li>
                <li>Transferencias interbancarias directas (SPEI) procesadas vía Stripe Connect Express.</li>
                <li>Hospedaje de alta disponibilidad, certificados SSL y almacenamiento de imágenes en la nube.</li>
                <li>Soporte concierge prioritario para anfitriones e invitados.</li>
              </ul>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Plazos de Dispersión
              </h3>
              <p>
                Los fondos confirmados pueden ser solicitados por el anfitrión en cualquier momento y se reflejan en su cuenta bancaria en un plazo de 24 a 48 horas hábiles bancarias.
              </p>
            </div>
          )}

          {activeTab === "cookies" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-black">
                4. Política de Cookies y Consentimiento
              </h2>
              <p>
                Utilizamos cookies esenciales para mantener tu sesión activa, recordar tus preferencias de navegación y garantizar la seguridad en el procesamiento de pagos.
              </p>
              <h3 className="font-serif text-xl font-bold text-ink-black pt-2">
                Finalidades Adicionales
              </h3>
              <p>
                Con tu consentimiento expreso, podemos utilizar identificadores anónimos para analizar el rendimiento del sitio web y optimizar la experiencia de usuario. Puedes deshabilitar las cookies no esenciales desde la configuración de tu navegador web en cualquier momento.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
