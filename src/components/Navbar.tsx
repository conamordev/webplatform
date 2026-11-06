"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { isLoggedIn, user, logout, toggleAuth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-4 md:top-8 left-4 md:left-12 right-4 md:right-12 z-[60]">
      <nav
        className="navbar-pill flex justify-between items-center w-full px-6 md:px-8 py-3.5 md:py-4 bg-primary text-white backdrop-blur-md shadow-2xl transition-all duration-500 border border-white/10"
        id="main-nav"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-white hover:text-accent-gold transition-colors whitespace-nowrap"
        >
          Con Amor Eventos
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center font-sans text-[10px] font-semibold uppercase tracking-widest text-white/90">
          <Link
            href="/crear-evento"
            className={`transition-colors py-1 ${
              pathname === "/crear-evento"
                ? "text-accent-gold border-b border-accent-gold"
                : "hover:text-white"
            }`}
          >
            Crear evento
          </Link>
          <Link
            href="/como-crear-evento"
            className={`transition-colors py-1 ${
              pathname === "/como-crear-evento"
                ? "text-accent-gold border-b border-accent-gold"
                : "hover:text-white"
            }`}
          >
            Cómo crear evento
          </Link>
          <Link
            href="/buscar-eventos"
            className={`transition-colors py-1 ${
              pathname === "/buscar-eventos"
                ? "text-accent-gold border-b border-accent-gold"
                : "hover:text-white"
            }`}
          >
            Buscar evento
          </Link>

          {isLoggedIn ? (
            <Link
              href="/perfil?tab=eventos"
              className={`transition-colors py-1 ${
                pathname.includes("/perfil")
                  ? "text-accent-gold border-b border-accent-gold"
                  : "hover:text-white"
              }`}
            >
              Mis eventos
            </Link>
          ) : (
            <Link
              href="/contacto"
              className={`transition-colors py-1 ${
                pathname === "/contacto"
                  ? "text-accent-gold border-b border-accent-gold"
                  : "hover:text-white"
              }`}
            >
              Ayuda/Soporte
            </Link>
          )}

          <Link
            href="/contacto"
            className={`transition-colors py-1 ${
              pathname === "/contacto"
                ? "text-accent-gold border-b border-accent-gold"
                : "hover:text-white"
            }`}
          >
            Contacto
          </Link>
        </div>

        {/* Action Controls & Session */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick toggle for testing session vs no-session */}
          <button
            onClick={toggleAuth}
            title="Alternar vista con / sin sesión para probar el MVP"
            className="text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/25 text-white/80 hover:text-white border border-white/10 hidden sm:inline-flex items-center gap-1.5 transition-all"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLoggedIn ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <span>{isLoggedIn ? "Con Sesión" : "Sin Sesión"}</span>
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/iniciar-sesion"
                className="bg-white text-primary px-8 py-2.5 rounded-full font-sans font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-surface-container transition-all shadow-md active:scale-95"
              >
                LOGIN
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors py-1 px-2 rounded-full hover:bg-white/10"
              >
                <div className="w-7 h-7 rounded-full bg-accent-gold/30 border border-accent-gold text-accent-gold flex items-center justify-center font-bold text-xs uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="font-sans text-[11px] uppercase tracking-widest hidden md:inline-block">
                  {user.name}
                </span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 bg-primary-container border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-5 py-3 border-b border-white/10">
                    <p className="text-xs font-serif font-bold text-white">
                      {user.name} {user.lastName}
                    </p>
                    <p className="text-[10px] font-sans text-white/70 truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/perfil"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-white hover:bg-white/10 uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-base">person</span>
                    <span>Mi Perfil & KYC</span>
                  </Link>

                  <Link
                    href="/perfil?tab=eventos"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-white hover:bg-white/10 uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-base">event</span>
                    <span>Mis Eventos</span>
                  </Link>

                  <Link
                    href="/evento/boda-sofia-mateo/configuracion"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-accent-gold hover:bg-white/10 uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-base">dashboard_customize</span>
                    <span>Panel Builder</span>
                  </Link>

                  <Link
                    href="/dashboard/onboarding"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-white/90 hover:bg-white/10 uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-base">account_balance</span>
                    <span>Stripe Express</span>
                  </Link>

                  <div className="border-t border-white/10 my-1"></div>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-rose-200 hover:bg-white/10 uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 text-white hover:text-accent-gold"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-2 p-6 bg-primary-container text-white rounded-3xl shadow-2xl border border-white/15 space-y-4 animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest">
            <Link
              href="/crear-evento"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-accent-gold flex items-center justify-between"
            >
              <span>Crear evento</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/como-crear-evento"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-accent-gold flex items-center justify-between"
            >
              <span>Cómo crear evento</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/buscar-eventos"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-accent-gold flex items-center justify-between"
            >
              <span>Buscar evento</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            {isLoggedIn && (
              <Link
                href="/perfil?tab=eventos"
                onClick={() => setMenuOpen(false)}
                className="py-2 border-b border-white/10 hover:text-accent-gold flex items-center justify-between"
              >
                <span>Mis eventos</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            )}
            <Link
              href="/contacto"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-accent-gold flex items-center justify-between"
            >
              <span>Contacto & Concierge</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/aviso-legal"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-accent-gold flex items-center justify-between"
            >
              <span>Términos y Privacidad</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={toggleAuth}
              className="text-[10px] font-sans uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/30 border border-white/20 text-white"
            >
              Modo: {isLoggedIn ? "Con Sesión" : "Sin Sesión"}
            </button>

            {!isLoggedIn ? (
              <Link
                href="/iniciar-sesion"
                onClick={() => setMenuOpen(false)}
                className="bg-white text-primary px-6 py-2 rounded-full font-sans font-bold text-xs uppercase"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="text-rose-200 text-xs font-sans uppercase tracking-wider"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
