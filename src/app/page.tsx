import Link from "next/link";
import {
  Heart,
  CreditCard,
  Building2,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-rose-100 selection:text-rose-900">
      {/* Header */}
      <header className="border-b border-rose-100/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-200">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                Con Amor
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-sans text-rose-600 uppercase tracking-widest font-semibold">
                Mesas de Regalos México
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/onboarding"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-white bg-rose-700 hover:bg-rose-800 transition-all duration-200 shadow-sm hover:shadow"
            >
              <span>Panel Anfitrión</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32">
          {/* Subtle decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Plataforma de Regalos de Boda en Efectivo</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-stone-900 leading-tight">
              Celebra tu boda, <br className="hidden sm:inline" />
              <span className="text-rose-700 italic">recibe tu amor sin fronteras</span>.
            </h1>

            <p className="max-w-2xl mx-auto text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
              <strong>Con Amor</strong> es la plataforma de mesas de regalos para bodas en México. Permite a los anfitriones recibir aportaciones y regalos de sus invitados directo a su cuenta bancaria de forma segura y automatizada.
            </p>

            {/* Main Call to Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard/onboarding"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-[0.99]"
              >
                <span>Probar Flujo de Anfitrión (Onboarding KYC)</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="pt-2 text-xs text-stone-500 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>Verificación oficial respaldada por Stripe Connect Express en México (SAT & CNBV)</span>
            </div>
          </div>
        </section>

        {/* Feature Cards / KYC Overview */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Validación KYC y Recepción de Documentos en México
            </h2>
            <p className="text-sm text-stone-600">
              Integración nativa con componentes embebidos de Stripe para que los novios completen su registro sin salir de Con Amor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">
                Documentos Oficiales MX
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Recepción segura de <strong>INE</strong> o <strong>Pasaporte mexicano vigente</strong> mediante captura de cámara o carga de archivo.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-rose-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Validación biométrica e IA</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">
                RFC & CURP
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Captura del <strong>Registro Federal de Contribuyentes con homoclave</strong> y <strong>CURP</strong> para el cumplimiento de retenciones fiscales mexicanas.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-rose-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Persona Física / Individual</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">
                CLABE Interbancaria (SPEI)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Asociación de la <strong>CLABE de 18 dígitos</strong> de cualquier banco en México (BBVA, Santander, Banorte, Nu, etc.) para dispersión directa.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-rose-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Transferencias automáticas vía SPEI</span>
              </div>
            </div>
          </div>

          {/* Quick Technical Architecture summary for the developer */}
          <div className="mt-12 bg-stone-900 text-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-rose-400">
                  Arquitectura Técnica del MVP
                </span>
                <h4 className="text-base font-semibold text-white mt-1">
                  Endpoints y Flujo de Stripe Connect Integrados
                </h4>
              </div>
              <Link
                href="/dashboard/onboarding"
                className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300"
              >
                <span>Abrir Onboarding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700">
                <code className="text-rose-300 font-mono">POST /api/stripe/create-account</code>
                <p className="text-stone-400 mt-1 text-[11px]">
                  Crea la cuenta Express en México con tipo <code>individual</code>, país <code>MX</code> y capacidades <code>card_payments</code> y <code>transfers</code>.
                </p>
              </div>

              <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700">
                <code className="text-rose-300 font-mono">POST /api/stripe/account-session</code>
                <p className="text-stone-400 mt-1 text-[11px]">
                  Genera el <code>client_secret</code> autorizando el componente embebido <code>account_onboarding</code>.
                </p>
              </div>

              <div className="bg-stone-800/80 p-3 rounded-lg border border-stone-700">
                <code className="text-rose-300 font-mono">POST /api/webhooks/stripe</code>
                <p className="text-stone-400 mt-1 text-[11px]">
                  Verifica firma con <code>STRIPE_WEBHOOK_SECRET</code> e inspecciona <code>account.updated</code> (INE, RFC, CURP, estado KYC).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <p>Con Amor © 2026 — Plataforma de Mesas de Regalos para Bodas en México.</p>
      </footer>
    </div>
  );
}
