"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";

export default function RegistroPage() {
  const router = useRouter();
  const { login, loginSocial, updateUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: true,
    consentDataProcessing: true,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!form.acceptedTerms) {
      setError("Debes aceptar los Términos y Condiciones y la Política de Privacidad.");
      return;
    }

    login(form.email);
    updateUser({
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      acceptedTerms: form.acceptedTerms,
      consentDataProcessing: form.consentDataProcessing,
    });

    router.push("/crear-evento");
  };

  const handleSocial = (provider: "google" | "facebook") => {
    loginSocial(provider);
    router.push("/crear-evento");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 md:px-12 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-12 border border-muted-border shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface-container-high text-primary mx-auto flex items-center justify-center font-serif text-2xl font-bold">
              CA
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink-black">
              Crea tu Cuenta de Anfitrión
            </h1>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant">
              Comienza a diseñar tu sitio web, confirmar asistencia y recibir regalos seguros.
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleSocial("google")}
              type="button"
              className="py-3 px-4 rounded-xl border border-muted-border hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-wider font-semibold text-stone-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Con Google</span>
            </button>

            <button
              onClick={() => handleSocial("facebook")}
              type="button"
              className="py-3 px-4 rounded-xl border border-muted-border hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 text-xs font-sans uppercase tracking-wider font-semibold text-stone-700"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Con Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-muted-border w-full" />
            <span className="bg-white px-3 text-[11px] font-sans text-stone-400 uppercase tracking-widest absolute">
              o con tus datos
            </span>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-sans">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="ej. Sofía"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Apellidos *
                </label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="ej. Alcocer"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="sofia@ejemplo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Teléfono Móvil
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+52 55 1234 5678"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Contraseña *
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Confirmar Contraseña *
                </label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-muted-border bg-surface-container-low/30 text-sm focus:border-accent-gold outline-none"
                />
              </div>
            </div>

            {/* Checkboxes required by Mexican regulations */}
            <div className="space-y-3 pt-2 text-xs font-sans text-stone-600">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.acceptedTerms}
                  onChange={(e) => setForm({ ...form, acceptedTerms: e.target.checked })}
                  className="mt-0.5 accent-primary rounded cursor-pointer"
                />
                <span>
                  Acepto los{" "}
                  <Link href="/aviso-legal#terminos" className="text-primary hover:underline font-semibold">
                    Términos y Condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/aviso-legal#privacidad" className="text-primary hover:underline font-semibold">
                    Política de Privacidad
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consentDataProcessing}
                  onChange={(e) => setForm({ ...form, consentDataProcessing: e.target.checked })}
                  className="mt-0.5 accent-primary rounded cursor-pointer"
                />
                <span>
                  Consiento el tratamiento de mis datos de contacto para notificaciones del evento y finalidades adicionales.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-primary text-white font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary-container transition-all shadow-lg active:scale-95 mt-4"
            >
              Crear Cuenta & Comenzar
            </button>
          </form>

          <div className="text-center pt-2 border-t border-muted-border">
            <p className="text-xs text-stone-600 font-sans">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/iniciar-sesion"
                className="text-primary font-bold hover:underline uppercase tracking-wider ml-1"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
