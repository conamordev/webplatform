"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth, UserProfile } from "@/lib/auth-context";

function PerfilContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as any) || "resumen";

  const { user, updateUser, updateBankInfo, events } = useAuth();

  const [activeTab, setActiveTab] = useState<"resumen" | "datos" | "banco" | "eventos" | "cuenta">(
    initialTab
  );

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["resumen", "datos", "banco", "eventos", "cuenta"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  // Form states
  const [formData, setFormData] = useState<UserProfile>(user);
  const [saveAlert, setSaveAlert] = useState(false);
  const [docFileUploaded, setDocFileUploaded] = useState(Boolean(user.documentFileName));

  // Change password modal / state
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSaveData = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2000);
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    updateBankInfo(formData.bankInfo);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPass && passwords.newPass === passwords.confirm) {
      setPasswordSuccess(true);
      setPasswords({ current: "", newPass: "", confirm: "" });
      setTimeout(() => setPasswordSuccess(false), 2500);
    }
  };

  const hostEvents = events.filter((e) => e.isHost);
  const guestEvents = events.filter((e) => !e.isHost);

  const totalRecaudadoGlobal = hostEvents.reduce(
    (acc, ev) => acc + ev.gifts.reduce((gsum, g) => gsum + g.currentAmount, 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 pt-32 pb-20 flex">
        {/* Sidebar Navigation (Stitch Profile Screens 21, 22, 23, 24, 27) */}
        <aside className="w-72 bg-white border-r border-muted-border p-6 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="px-3">
              <span className="font-sans text-[10px] text-accent-gold uppercase tracking-[0.3em] font-bold block mb-1">
                Expediente Con Amor
              </span>
              <h2 className="font-serif text-xl font-bold text-ink-black">
                {user.name} {user.lastName}
              </h2>
              <p className="font-body text-xs text-on-surface-variant truncate">{user.email}</p>
            </div>

            <nav className="space-y-1.5 pt-2 border-t border-muted-border">
              <button
                onClick={() => setActiveTab("resumen")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === "resumen"
                    ? "bg-primary text-white shadow-sm"
                    : "text-stone-700 hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                <span>Resumen General</span>
              </button>

              <button
                onClick={() => setActiveTab("datos")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === "datos"
                    ? "bg-primary text-white shadow-sm"
                    : "text-stone-700 hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-base">person</span>
                <span>Mis Datos & KYC</span>
              </button>

              <button
                onClick={() => setActiveTab("banco")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === "banco"
                    ? "bg-primary text-white shadow-sm"
                    : "text-stone-700 hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-base">account_balance</span>
                <span>Información Bancaria</span>
              </button>

              <button
                onClick={() => setActiveTab("eventos")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === "eventos"
                    ? "bg-primary text-white shadow-sm"
                    : "text-stone-700 hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>Mis Eventos</span>
              </button>

              <button
                onClick={() => setActiveTab("cuenta")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeTab === "cuenta"
                    ? "bg-primary text-white shadow-sm"
                    : "text-stone-700 hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined text-base">settings</span>
                <span>Mi Cuenta & Seguridad</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-muted-border">
            <Link
              href="/dashboard/onboarding"
              className="w-full py-2.5 px-4 rounded-xl bg-accent-gold/15 text-accent-gold hover:bg-accent-gold/25 transition-all text-xs font-sans uppercase tracking-widest font-bold flex items-center justify-center gap-2 border border-accent-gold/30"
            >
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Stripe Express KYC</span>
            </Link>
          </div>
        </aside>

        {/* Workspace Content */}
        <div className="flex-1 px-6 md:px-12 max-w-5xl">
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-muted-border mb-8">
            <div>
              <span className="font-sans text-[10px] text-accent-gold uppercase tracking-[0.3em] font-bold block mb-1">
                Panel de Usuario
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-black">
                {activeTab === "resumen" && "Resumen de Actividad"}
                {activeTab === "datos" && "Mis Datos Personales & Validación"}
                {activeTab === "banco" && "Información Bancaria & Retiros"}
                {activeTab === "eventos" && "Mis Eventos (Anfitrión e Invitado)"}
                {activeTab === "cuenta" && "Configuración de Cuenta"}
              </h1>
            </div>

            {saveAlert && (
              <span className="text-xs font-sans text-emerald-700 flex items-center gap-1 font-semibold animate-in fade-in">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Cambios guardados con éxito</span>
              </span>
            )}
          </div>

          {/* ========================================================== */}
          {/* TAB 1: RESUMEN GENERAL (Stitch Screen 22)                   */}
          {/* ========================================================== */}
          {activeTab === "resumen" && (
            <div className="space-y-8">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-muted-border shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-primary">
                    <span className="material-symbols-outlined text-2xl">payments</span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
                      8% Comisión Con Amor
                    </span>
                  </div>
                  <span className="font-sans text-xs uppercase tracking-wider text-stone-500 block pt-2">
                    Total Recaudado en Regalos
                  </span>
                  <p className="font-serif text-3xl font-bold text-primary">
                    ${totalRecaudadoGlobal.toLocaleString("es-MX")} MXN
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-muted-border shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-accent-gold">
                    <span className="material-symbols-outlined text-2xl">celebration</span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest bg-accent-gold/15 px-2 py-0.5 rounded-full">
                      Activos
                    </span>
                  </div>
                  <span className="font-sans text-xs uppercase tracking-wider text-stone-500 block pt-2">
                    Eventos como Anfitrión
                  </span>
                  <p className="font-serif text-3xl font-bold text-ink-black">
                    {hostEvents.length} celebraciones
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-muted-border shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-emerald-700">
                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Verificado SAT
                    </span>
                  </div>
                  <span className="font-sans text-xs uppercase tracking-wider text-stone-500 block pt-2">
                    Estado Bancario KYC
                  </span>
                  <p className="font-serif text-xl font-bold text-emerald-800">
                    {user.bankInfo.stripeConnected ? "Conectado & Habilitado" : "Pendiente"}
                  </p>
                </div>
              </div>

              {/* Host Events Summary */}
              <div className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-ink-black">
                    Eventos Destacados
                  </h3>
                  <Link
                    href="/crear-evento"
                    className="text-xs font-sans text-primary font-bold hover:underline"
                  >
                    + Nuevo Evento
                  </Link>
                </div>

                <div className="space-y-4">
                  {hostEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-5 rounded-2xl bg-surface-container-low border border-muted-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={evt.coverImage}
                          alt={evt.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-accent-gold block">
                            {evt.type} • {evt.date}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-ink-black">{evt.title}</h4>
                          <p className="text-xs font-sans text-stone-500">{evt.locationName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/evento/${evt.slug}`}
                          className="px-4 py-2 rounded-xl border border-muted-border font-sans text-xs uppercase tracking-wider font-semibold hover:bg-white"
                        >
                          Ver Invitado
                        </Link>
                        <Link
                          href={`/evento/${evt.slug}/configuracion`}
                          className="px-4 py-2 rounded-xl bg-primary text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-primary-container shadow"
                        >
                          Configurar
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: MIS DATOS & DOCUMENTO KYC (Stitch Screen 21)        */}
          {/* ========================================================== */}
          {activeTab === "datos" && (
            <form
              onSubmit={handleSaveData}
              className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-8"
            >
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-ink-black">
                  Información Personal del Titular
                </h3>
                <p className="font-body text-xs text-on-surface-variant">
                  Datos oficiales para validación de cuenta y emisión de comprobantes fiscales.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Nacionalidad
                  </label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  >
                    <option>Mexicana</option>
                    <option>Española</option>
                    <option>Estadounidense</option>
                    <option>Colombiana</option>
                  </select>
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    País de Residencia
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  >
                    <option>México</option>
                    <option>Estados Unidos</option>
                    <option>España</option>
                  </select>
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Teléfono Celular
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                  />
                </div>
              </div>

              {/* Document Validation (Stitch KYC Section) */}
              <div className="pt-6 border-t border-muted-border space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-ink-black">
                      Validación de Documento Oficial (CNBV / SAT)
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant">
                      Sube una fotografía de tu identificación oficial para validar tu cuenta.
                    </p>
                  </div>
                  {formData.documentValidated && (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      <span>Validado</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                  <div className="space-y-3">
                    <label className="font-sans text-xs font-bold uppercase text-stone-700 block">
                      Tipo de Documento
                    </label>
                    <div className="space-y-2 text-xs font-sans">
                      {[
                        { id: "ine", label: "INE / Credencial de Elector" },
                        { id: "curp", label: "CURP Oficial" },
                        { id: "rfc", label: "Constancia de Situación Fiscal (RFC)" },
                        { id: "passport", label: "Pasaporte Mexicano" },
                      ].map((doc) => (
                        <label
                          key={doc.id}
                          className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-surface-container-low"
                        >
                          <input
                            type="radio"
                            name="documentType"
                            checked={formData.documentType === doc.id}
                            onChange={() =>
                              setFormData({ ...formData, documentType: doc.id as any })
                            }
                            className="accent-primary"
                          />
                          <span>{doc.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-3">
                    <label className="font-sans text-xs font-bold uppercase text-stone-700 block">
                      Cargar foto o archivo PDF del documento
                    </label>
                    <div
                      onClick={() => {
                        setDocFileUploaded(true);
                        setFormData({
                          ...formData,
                          documentFileName: "INE_Oficial_Verificada.pdf",
                          documentValidated: true,
                        });
                      }}
                      className="border-2 border-dashed border-accent-gold/60 rounded-2xl p-8 text-center cursor-pointer hover:bg-surface-container-low transition-all"
                    >
                      <span className="material-symbols-outlined text-4xl text-primary mb-2 block">
                        {docFileUploaded ? "task" : "cloud_upload"}
                      </span>
                      <p className="font-serif text-sm font-bold text-ink-black">
                        {docFileUploaded
                          ? `Archivo cargado: ${formData.documentFileName || "Documento.pdf"}`
                          : "Arrastra tu archivo aquí o haz clic para examinar"}
                      </p>
                      <p className="text-[10px] font-sans text-stone-400 mt-1">
                        Formatos permitidos: JPG, PNG, PDF (Máx 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="pt-6 border-t border-muted-border space-y-3 text-xs font-sans text-stone-600">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptedTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, acceptedTerms: e.target.checked })
                    }
                    className="mt-0.5 accent-primary"
                  />
                  <span>Acepto los términos y condiciones de Con Amor Eventos.</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptedPrivacy}
                    onChange={(e) =>
                      setFormData({ ...formData, acceptedPrivacy: e.target.checked })
                    }
                    className="mt-0.5 accent-primary"
                  />
                  <span>Acepto la política de privacidad y protección de datos personales.</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentDataProcessing}
                    onChange={(e) =>
                      setFormData({ ...formData, consentDataProcessing: e.target.checked })
                    }
                    className="mt-0.5 accent-primary"
                  />
                  <span>
                    Doy mi consentimiento para el uso de datos de contacto con fines informativos y promociones.
                  </span>
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-10 py-3 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container shadow"
                >
                  Guardar Datos
                </button>
              </div>
            </form>
          )}

          {/* ========================================================== */}
          {/* TAB 3: INFORMACIÓN BANCARIA (Stitch Screen 23)              */}
          {/* ========================================================== */}
          {activeTab === "banco" && (
            <div className="space-y-8">
              {/* Stripe Connect Express Status Card */}
              <div className="p-8 rounded-3xl bg-surface-container-low border border-accent-gold/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      account_balance
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ink-black">
                      Stripe Connect Express (México)
                    </h3>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant max-w-xl leading-relaxed">
                    Tus fondos se dispersan a través de la infraestructura bancaria oficial de Stripe en México. Requiere validación de identidad para habilitar transferencias SPEI automáticas.
                  </p>
                </div>

                <Link
                  href="/dashboard/onboarding"
                  className="px-6 py-3.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container transition-all shadow-md shrink-0 flex items-center gap-2"
                >
                  <span>Abrir Onboarding KYC Stripe</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>

              {/* Bank Details Form */}
              <form
                onSubmit={handleSaveBank}
                className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-ink-black">
                    Cuenta Bancaria para Depósitos
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant">
                    Ingresa la CLABE interbancaria donde deseas recibir tus regalos en efectivo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-muted-border">
                  <div className="sm:col-span-2">
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      Nombre del Titular de la Cuenta *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.bankInfo.holderName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bankInfo: { ...formData.bankInfo, holderName: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      Institución Bancaria *
                    </label>
                    <select
                      value={formData.bankInfo.bankName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bankInfo: { ...formData.bankInfo, bankName: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                    >
                      <option>BBVA México</option>
                      <option>Banorte</option>
                      <option>Santander</option>
                      <option>Citibanamex</option>
                      <option>HSBC</option>
                      <option>Scotiabank</option>
                      <option>Nu México</option>
                      <option>Mercado Pago</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      Tipo de Cuenta
                    </label>
                    <select
                      value={formData.bankInfo.accountType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bankInfo: { ...formData.bankInfo, accountType: e.target.value as any },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                    >
                      <option value="debito">Cuenta de Débito</option>
                      <option value="cheques">Cuenta de Cheques</option>
                      <option value="ahorro">Cuenta de Ahorro</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                      CLABE Interbancaria (18 dígitos) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={18}
                      value={formData.bankInfo.clabe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bankInfo: { ...formData.bankInfo, clabe: e.target.value },
                        })
                      }
                      placeholder="0121 8000 1234 5678 90"
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm font-mono tracking-wider outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-10 py-3 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container shadow"
                  >
                    Guardar Datos Bancarios
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 4: MIS EVENTOS (Stitch Screen 24)                       */}
          {/* ========================================================== */}
          {activeTab === "eventos" && (
            <div className="space-y-10">
              {/* Sección Anfitrión */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-2xl font-bold text-ink-black">
                    Eventos como Anfitrión ({hostEvents.length})
                  </h3>
                  <Link
                    href="/crear-evento"
                    className="px-5 py-2 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary-container"
                  >
                    + Crear Evento
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {hostEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="bg-white rounded-3xl overflow-hidden border border-muted-border shadow-xs hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={evt.coverImage}
                          alt={evt.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 text-white font-sans text-[10px] uppercase tracking-widest font-bold">
                          {evt.type}
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-widest text-secondary font-bold">
                            {evt.date}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-ink-black mt-1">
                            {evt.title}
                          </h4>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <Link
                            href={`/evento/${evt.slug}`}
                            className="flex-1 text-center py-2 rounded-xl border border-muted-border font-sans text-xs uppercase tracking-wider font-semibold hover:bg-surface-container"
                          >
                            Ver Sitio
                          </Link>
                          <Link
                            href={`/evento/${evt.slug}/configuracion`}
                            className="flex-1 text-center py-2 rounded-xl bg-primary text-white font-sans text-xs uppercase tracking-wider font-semibold hover:bg-primary-container"
                          >
                            Builder
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección Invitado */}
              <div className="space-y-4 pt-6 border-t border-muted-border">
                <h3 className="font-serif text-2xl font-bold text-ink-black">
                  Eventos como Invitado ({guestEvents.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {guestEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="bg-white rounded-3xl overflow-hidden border border-muted-border shadow-xs flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={evt.coverImage}
                          alt={evt.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 text-white font-sans text-[10px] uppercase tracking-widest font-bold">
                          Invitado
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-[10px] font-sans uppercase tracking-widest text-secondary font-bold">
                            {evt.date}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-ink-black mt-1">
                            {evt.title}
                          </h4>
                          <p className="text-xs font-sans text-stone-500 mt-1">{evt.locationName}</p>
                        </div>
                        <div>
                          <Link
                            href={`/evento/${evt.slug}`}
                            className="w-full block text-center py-2 rounded-xl bg-primary text-white font-sans text-xs uppercase tracking-widest font-semibold hover:bg-primary-container"
                          >
                            Abrir Mesa & RSVP
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 5: MI CUENTA (Stitch Screen 27)                         */}
          {/* ========================================================== */}
          {activeTab === "cuenta" && (
            <div className="bg-white rounded-3xl p-8 border border-muted-border shadow-sm space-y-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-ink-black">
                  Seguridad & Contraseña
                </h3>

                {passwordSuccess && (
                  <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-sans">
                    Tu contraseña ha sido actualizada correctamente.
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md text-xs font-sans">
                  <div>
                    <label className="text-stone-700 font-semibold uppercase block mb-1">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-700 font-semibold uppercase block mb-1">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.newPass}
                      onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-700 font-semibold uppercase block mb-1">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 rounded-xl border border-muted-border text-sm outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-primary text-white uppercase tracking-widest font-bold"
                  >
                    Actualizar Contraseña
                  </button>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="pt-6 border-t border-rose-100 space-y-3">
                <h4 className="font-serif text-lg font-bold text-rose-700">Zona de Riesgo</h4>
                <p className="font-body text-xs text-stone-500">
                  Si eliminas tu cuenta, se cancelarán tus sitios web de eventos y no podrás recuperar las dedicatorias recibidas.
                </p>
                <button
                  type="button"
                  onClick={() => alert("Por favor contacta al concierge para procesar la baja de tu cuenta.")}
                  className="px-5 py-2.5 rounded-xl border border-rose-300 text-rose-700 font-sans text-xs uppercase tracking-wider font-semibold hover:bg-rose-50"
                >
                  Eliminar Mi Cuenta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PerfilContent />
    </Suspense>
  );
}
