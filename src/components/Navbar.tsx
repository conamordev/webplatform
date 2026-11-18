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
    <header className="fixed top-3 md:top-6 left-3 md:left-12 right-3 md:right-12 z-[60]">
      <nav
        className="navbar-pill flex justify-between items-center w-full px-6 md:px-8 py-3.5 md:py-4 bg-marfil/95 text-on-surface backdrop-blur-md shadow-2xl transition-all duration-500 border border-muted-border/80"
        id="main-nav"
      >
        {/* Brand Logo - Elemento original */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-primary hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Con Amor Eventos
        </Link>

        {/* Desktop Navigation Links - Elementos originales intactos */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center font-sans text-[10px] font-semibold uppercase tracking-widest text-on-surface/80">
          <Link
            href="/crear-evento"
            className={`transition-colors py-1 hover:text-primary ${
              pathname === "/crear-evento"
                ? "text-primary border-b-2 border-primary font-bold"
                : ""
            }`}
          >
            Crear evento
          </Link>
          <Link
            href="/como-crear-evento"
            className={`transition-colors py-1 hover:text-primary ${
              pathname === "/como-crear-evento"
                ? "text-primary border-b-2 border-primary font-bold"
                : ""
            }`}
          >
            Cómo crear evento
          </Link>
          <Link
            href="/buscar-eventos"
            className={`transition-colors py-1 hover:text-primary ${
              pathname === "/buscar-eventos"
                ? "text-primary border-b-2 border-primary font-bold"
                : ""
            }`}
          >
            Buscar evento
          </Link>

          {isLoggedIn ? (
            <Link
              href="/perfil?tab=eventos"
              className={`transition-colors py-1 hover:text-primary ${
                pathname.includes("/perfil")
                  ? "text-primary border-b-2 border-primary font-bold"
                  : ""
              }`}
            >
              Mis eventos
            </Link>
          ) : (
            <Link
              href="/contacto"
              className={`transition-colors py-1 hover:text-primary ${
                pathname === "/contacto"
                  ? "text-primary border-b-2 border-primary font-bold"
                  : ""
              }`}
            >
              Ayuda/Soporte
            </Link>
          )}

          <Link
            href="/contacto"
            className={`transition-colors py-1 hover:text-primary ${
              pathname === "/contacto"
                ? "text-primary border-b-2 border-primary font-bold"
                : ""
            }`}
          >
            Contacto
          </Link>
        </div>

        {/* Action Controls & Session - Elementos originales intactos */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick toggle for testing session vs no-session */}
          <button
            onClick={toggleAuth}
            title="Alternar vista con / sin sesión para probar el MVP"
            className="text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-primary border border-muted-border hidden sm:inline-flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLoggedIn ? "bg-emerald-500" : "bg-durazno"
              }`}
            />
            <span>{isLoggedIn ? "Con Sesión" : "Sin Sesión"}</span>
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/iniciar-sesion"
                className="bg-primary text-white hover:bg-primary-container px-8 py-2.5 rounded-full font-sans font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95"
              >
                LOGIN
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors py-1 px-2 rounded-full hover:bg-surface-container"
              >
                <div className="w-7 h-7 rounded-full bg-rosa-petalo/60 border border-primary/30 text-primary flex items-center justify-center font-bold text-xs uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider hidden md:inline-block">
                  {user.name}
                </span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">expand_more</span>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-3 w-56 bg-white border border-muted-border rounded-2xl overflow-hidden shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-5 py-3 border-b border-muted-border bg-marfil/50">
                    <p className="text-xs font-serif font-bold text-on-surface">
                      {user.name} {user.lastName}
                    </p>
                    <p className="text-[10px] font-sans text-on-surface-variant truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/perfil"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-on-surface hover:bg-surface-container hover:text-primary uppercase tracking-wider"
                  >
                    <span className="material-symbols-outlined text-base text-primary">person</span>
                    <span>Mi Perfil</span>
                  </Link>

                  <Link
                    href="/perfil?tab=eventos"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-on-surface hover:bg-surface-container hover:text-primary uppercase tracking-wider"
                  >
                    <span className="material-symbols-outlined text-base text-primary">event</span>
                    <span>Mis Eventos</span>
                  </Link>

                  <Link
                    href="/evento/boda-sofia-mateo/configuracion"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-primary hover:bg-surface-container uppercase tracking-wider font-semibold"
                  >
                    <span className="material-symbols-outlined text-base">dashboard_customize</span>
                    <span>Panel Builder</span>
                  </Link>

                  <Link
                    href="/dashboard/onboarding"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-on-surface hover:bg-surface-container hover:text-primary uppercase tracking-wider"
                  >
                    <span className="material-symbols-outlined text-base text-primary">account_balance</span>
                    <span>Stripe Express</span>
                  </Link>

                  <div className="border-t border-muted-border my-1"></div>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left flex items-center gap-3 px-5 py-2.5 font-sans text-[11px] text-rose-600 hover:bg-rose-50 uppercase tracking-wider cursor-pointer"
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
            className="lg:hidden p-1.5 text-on-surface hover:text-primary"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu - Elementos originales intactos */}
      {menuOpen && (
        <div className="lg:hidden mt-2 p-6 bg-marfil text-on-surface rounded-3xl shadow-2xl border border-muted-border space-y-4 animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest">
            <Link
              href="/crear-evento"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-muted-border hover:text-primary flex items-center justify-between"
            >
              <span>Crear evento</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/como-crear-evento"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-muted-border hover:text-primary flex items-center justify-between"
            >
              <span>Cómo crear evento</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/buscar-eventos"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-muted-border hover:text-primary flex items-center justify-between"
            >
              <span>Buscar evento</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            {isLoggedIn && (
              <Link
                href="/perfil?tab=eventos"
                onClick={() => setMenuOpen(false)}
                className="py-2 border-b border-muted-border hover:text-primary flex items-center justify-between"
              >
                <span>Mis eventos</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            )}
            <Link
              href="/contacto"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-muted-border hover:text-primary flex items-center justify-between"
            >
              <span>Contacto & Concierge</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/aviso-legal"
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-muted-border hover:text-primary flex items-center justify-between"
            >
              <span>Términos y Privacidad</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={toggleAuth}
              className="text-[10px] font-sans uppercase tracking-widest px-3 py-1.5 rounded-full bg-surface-container border border-muted-border text-on-surface-variant"
            >
              Modo: {isLoggedIn ? "Con Sesión" : "Sin Sesión"}
            </button>

            {!isLoggedIn ? (
              <Link
                href="/iniciar-sesion"
                onClick={() => setMenuOpen(false)}
                className="bg-primary text-white hover:bg-primary-container px-6 py-2 rounded-full font-sans font-bold text-xs uppercase shadow-2xl"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="text-rose-600 text-xs font-sans uppercase tracking-wider font-semibold"
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
