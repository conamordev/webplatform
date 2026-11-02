"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  loadConnectAndInitialize,
  StripeConnectInstance,
} from "@stripe/connect-js/pure";
import {
  ConnectComponentsProvider,
  ConnectAccountOnboarding,
} from "@stripe/react-connect-js";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  ShieldCheck,
  User,
  Heart,
  Copy,
  Check,
  Sparkles,
  ArrowLeft,
  Info,
} from "lucide-react";

interface AccountStatusData {
  accountId: string;
  email?: string;
  country: string;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  details_submitted: boolean;
  statusCategory: "VERIFIED" | "PENDING_VERIFICATION" | "REQUIRES_ACTION";
  requirements: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
    pending_verification: string[];
    disabled_reason?: string | null;
  };
}

export default function OnboardingDashboardPage() {
  const [accountId, setAccountId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("conamor_account_id");
      return saved && saved.startsWith("acct_") ? saved : "";
    }
    return "";
  });
  const [inputAccountId, setInputAccountId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("conamor_account_id");
      return saved && saved.startsWith("acct_") ? saved : "";
    }
    return "";
  });
  const [coupleNames, setCoupleNames] = useState<string>("Sofía & Mateo");
  const [hostEmail, setHostEmail] = useState<string>("novios.conamor@ejemplo.com");

  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false);
  const [accountStatus, setAccountStatus] = useState<AccountStatusData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

  // Consultar estado actual de la cuenta en Stripe
  const fetchAccountStatus = useCallback(async (id: string) => {
    if (!id) return;
    setIsLoadingStatus(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/stripe/account-status?accountId=${encodeURIComponent(id)}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al consultar estado de la cuenta");
      }
      const data: AccountStatusData = await res.json();
      setAccountStatus(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al consultar cuenta";
      console.error(message);
      // No bloquear si solo no se ha podido sincronizar
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  // Crear nueva cuenta conectada Express para México
  const handleCreateAccount = async () => {
    setIsCreatingAccount(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/stripe/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: hostEmail.trim() || undefined,
          coupleNames: coupleNames.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No se pudo crear la cuenta conectada");
      }

      setAccountId(data.accountId);
      setInputAccountId(data.accountId);
      if (typeof window !== "undefined") {
        localStorage.setItem("conamor_account_id", data.accountId);
      }
      await fetchAccountStatus(data.accountId);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al crear cuenta";
      setErrorMsg(message);
    } finally {
      setIsCreatingAccount(false);
    }
  };

  // Cargar cuenta existente por ID manual
  const handleLoadManualAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = inputAccountId.trim();
    if (!cleanId.startsWith("acct_")) {
      setErrorMsg("El ID de cuenta debe comenzar con 'acct_'");
      return;
    }
    setAccountId(cleanId);
    if (typeof window !== "undefined") {
      localStorage.setItem("conamor_account_id", cleanId);
    }
    fetchAccountStatus(cleanId);
  };

  // Consultar estado al montar si ya existe una cuenta guardada
  useEffect(() => {
    let ignore = false;
    if (!accountId) return;

    fetch(`/api/stripe/account-status?accountId=${encodeURIComponent(accountId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: AccountStatusData | null) => {
        if (!ignore && data) {
          setAccountStatus(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      ignore = true;
    };
  }, [accountId]);

  // Instancia de Stripe Connect usando loadConnectAndInitialize
  const stripeConnectInstance = useMemo<StripeConnectInstance | null>(() => {
    if (!accountId || !publishableKey || publishableKey.includes("placeholder")) {
      return null;
    }

    try {
      return loadConnectAndInitialize({
        publishableKey,
        fetchClientSecret: async () => {
          const res = await fetch("/api/stripe/account-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accountId }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "No se pudo obtener el client_secret de la sesión");
          }

          const data = await res.json();
          return data.client_secret;
        },
        appearance: {
          overlays: "dialog",
          variables: {
            colorPrimary: "#be185d", // Rose luxury wedding accent
            colorBackground: "#ffffff",
            colorText: "#18181b",
            colorDanger: "#dc2626",
            borderRadius: "12px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          },
        },
      });
    } catch (err) {
      console.error("Error inicializando loadConnectAndInitialize:", err);
      return null;
    }
  }, [accountId, publishableKey]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="min-h-screen bg-rose-50/40 text-stone-900 pb-20">
      {/* Top Header / Navigation */}
      <header className="border-b border-rose-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-2 text-stone-700 hover:text-rose-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Volver a Inicio</span>
            </Link>
            <div className="h-4 w-px bg-stone-300" />
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl tracking-tight text-stone-900 font-semibold flex items-center gap-1.5">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                Con Amor
              </span>
              <span className="text-xs bg-rose-100 text-rose-800 font-medium px-2 py-0.5 rounded-full border border-rose-200">
                Panel Anfitrión
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center gap-2 text-xs bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg border border-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Entorno Protegido: <strong>Stripe Connect Express (México)</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-600 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200">
              <User className="w-3.5 h-3.5 text-rose-500" />
              <span>{coupleNames}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Banner de Bienvenida y Explicación del Flujo */}
        <section className="bg-gradient-to-r from-rose-900 via-rose-800 to-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
            <Heart className="w-64 h-64 text-rose-200" />
          </div>
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-rose-200 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-700/50">
              <Sparkles className="w-3.5 h-3.5" />
              Verificación de Identidad (KYC) México
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Configura tu cuenta bancaria para recibir los regalos de boda
            </h1>
            <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
              En cumplimiento con la regulación mexicana (SAT y CNBV), Stripe solicita validar tu identidad como persona física mediante tu <strong>RFC con homoclave</strong>, <strong>CURP</strong>, <strong>INE o Pasaporte vigente</strong> y <strong>CLABE interbancaria (18 dígitos)</strong>.
            </p>
          </div>
        </section>

        {/* Gestor de Cuenta Conectada (Selector / Creador) */}
        <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <h2 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                <span>Cuenta Conectada de Prueba</span>
                {accountId && (
                  <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-mono border border-stone-200">
                    {accountId}
                  </span>
                )}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Crea una nueva cuenta de prueba en modo Express para México o introduce una existente para continuar el KYC.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {accountId && (
                <button
                  type="button"
                  onClick={() => fetchAccountStatus(accountId)}
                  disabled={isLoadingStatus}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors disabled:opacity-50"
                  title="Refrescar estado en Stripe"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStatus ? "animate-spin text-rose-600" : ""}`} />
                  Refrescar Estado
                </button>
              )}

              {accountId && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(accountId)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId ? "Copiado" : "Copiar ID"}
                </button>
              )}
            </div>
          </div>

          {/* Formulario para Crear o Cambiar Cuenta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {/* Creador de Cuenta Rápido */}
            <div className="bg-rose-50/60 p-5 rounded-xl border border-rose-200/80 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-900">
                Opción 1: Generar Nueva Cuenta MX
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Nombres de la Pareja
                  </label>
                  <input
                    type="text"
                    value={coupleNames}
                    onChange={(e) => setCoupleNames(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="Ej. Sofía & Mateo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    value={hostEmail}
                    onChange={(e) => setHostEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="email@ejemplo.com"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateAccount}
                disabled={isCreatingAccount}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs disabled:opacity-50"
              >
                {isCreatingAccount ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Creando Cuenta Express en México...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Crear Nueva Cuenta Express (MX)
                  </>
                )}
              </button>
            </div>

            {/* Cargar Cuenta Existente */}
            <form
              onSubmit={handleLoadManualAccount}
              className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Opción 2: Usar Cuenta Existente
              </span>
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Stripe Account ID (acct_...)
                </label>
                <input
                  type="text"
                  value={inputAccountId}
                  onChange={(e) => setInputAccountId(e.target.value)}
                  placeholder="acct_1..."
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-800 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors"
              >
                Cargar Cuenta para Onboarding
              </button>
            </form>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <strong>Error:</strong> {errorMsg}
              </div>
            </div>
          )}
        </section>

        {/* Indicador de Estado Visual (Cargando / Requiere Verificación / Verificado) */}
        {accountId && (
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-stone-900">Estado de Verificación KYC:</span>

                {isLoadingStatus ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                    Consultando estado en Stripe...
                  </span>
                ) : accountStatus?.statusCategory === "VERIFIED" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Cuenta Verificada (Listo para recibir regalos)
                  </span>
                ) : accountStatus?.statusCategory === "PENDING_VERIFICATION" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    En Revisión por Stripe
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Requiere Verificación (KYC Pendiente en México)
                  </span>
                )}
              </div>

              {/* Indicadores de Capacidades */}
              {accountStatus && (
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        accountStatus.charges_enabled ? "bg-emerald-500" : "bg-stone-300"
                      }`}
                    />
                    <span className="text-stone-600">
                      Cobros: {accountStatus.charges_enabled ? "Activos" : "Inactivos"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        accountStatus.payouts_enabled ? "bg-emerald-500" : "bg-stone-300"
                      }`}
                    />
                    <span className="text-stone-600">
                      Transferencias: {accountStatus.payouts_enabled ? "Activas" : "Inactivas"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de Requisitos Pendientes */}
            {accountStatus?.requirements?.currently_due &&
              accountStatus.requirements.currently_due.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 space-y-2">
                  <div className="font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-700" />
                    Requisitos pendientes de verificación inmediata (currently_due):
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pl-6 list-disc text-stone-700">
                    {accountStatus.requirements.currently_due.map((req) => (
                      <li key={req} className="font-mono text-[11px]">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </section>
        )}

        {/* Guía Rápida para Pruebas KYC en México */}
        <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-rose-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              Datos de Prueba para KYC en México (Stripe Test Mode)
            </h3>
            <span className="text-xs text-stone-400">Ambiente Sandbox</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 space-y-1">
              <span className="text-stone-400 font-medium">RFC Genérico / Prueba:</span>
              <div className="font-mono text-emerald-400 font-semibold select-all">
                XAXX010101000
              </div>
              <p className="text-[11px] text-stone-400">
                O cualquier RFC de 13 dígitos para persona física.
              </p>
            </div>

            <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 space-y-1">
              <span className="text-stone-400 font-medium">CURP de Prueba:</span>
              <div className="font-mono text-emerald-400 font-semibold select-all">
                AAAA000000HDFRR00
              </div>
              <p className="text-[11px] text-stone-400">
                18 caracteres alfanuméricos válidos.
              </p>
            </div>

            <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 space-y-1">
              <span className="text-stone-400 font-medium">CLABE Interbancaria:</span>
              <div className="font-mono text-emerald-400 font-semibold select-all">
                012180001234567897
              </div>
              <p className="text-[11px] text-stone-400">
                18 dígitos (ej. BBVA Bancomer Test MX).
              </p>
            </div>

            <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700 space-y-1">
              <span className="text-stone-400 font-medium">Documento INE / Pasaporte:</span>
              <div className="text-rose-300 font-semibold">
                Cualquier imagen PNG/JPG
              </div>
              <p className="text-[11px] text-stone-400">
                En modo test se aprueba automáticamente en minutos.
              </p>
            </div>
          </div>
        </section>

        {/* Contenedor Limpio del Componente Embebido: <stripe-account-onboarding> */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                <span>Componente Embebido:</span>
                <code className="text-xs font-mono bg-stone-200 text-stone-800 px-2 py-0.5 rounded">
                  &lt;stripe-account-onboarding&gt;
                </code>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Integrado nativamente vía <code>@stripe/connect-js</code> y <code>@stripe/react-connect-js</code>.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-8 min-h-[500px]">
            {!publishableKey || publishableKey.includes("placeholder") ? (
              <div className="flex flex-col items-center justify-center text-center p-12 bg-amber-50/60 rounded-xl border border-dashed border-amber-300 max-w-xl mx-auto space-y-3">
                <AlertTriangle className="w-10 h-10 text-amber-600" />
                <h3 className="text-base font-semibold text-amber-900">
                  Clave pública de Stripe no configurada
                </h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Para montar el componente web de Connect, define <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> con tu llave de prueba (<code>pk_test_...</code>) en el archivo <code>.env.local</code> y reinicia el servidor.
                </p>
              </div>
            ) : !accountId ? (
              <div className="flex flex-col items-center justify-center text-center p-12 bg-stone-50 rounded-xl border border-dashed border-stone-300 max-w-xl mx-auto space-y-3">
                <User className="w-10 h-10 text-stone-400" />
                <h3 className="text-base font-semibold text-stone-800">
                  Ninguna cuenta conectada seleccionada
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Haz clic arriba en <strong>&quot;Crear Nueva Cuenta Express (MX)&quot;</strong> o ingresa un <code>accountId</code> existente para inicializar la sesión y renderizar el formulario oficial de onboarding de Stripe.
                </p>
              </div>
            ) : !stripeConnectInstance ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-500 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-rose-600" />
                <p className="text-sm font-medium">Inicializando Stripe Connect Instance...</p>
              </div>
            ) : (
              <div className="w-full">
                <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
                  <ConnectAccountOnboarding
                    onExit={() => {
                      console.log("🔔 [Stripe Connect] El usuario completó o salió del Onboarding.");
                      fetchAccountStatus(accountId);
                    }}
                    onLoadError={(err) => {
                      console.error("❌ Error al cargar ConnectAccountOnboarding:", err);
                      setErrorMsg(
                        `Error al cargar el componente embebido de Stripe: ${
                          err?.error?.message || "Error desconocido"
                        }`
                      );
                    }}
                  />
                </ConnectComponentsProvider>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
