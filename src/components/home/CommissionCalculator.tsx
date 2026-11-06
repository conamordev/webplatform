"use client";

import React, { useState } from "react";

export default function CommissionCalculator() {
  const [calculatorBudget, setCalculatorBudget] = useState<number>(150000);
  const commissionFee = Math.round(calculatorBudget * 0.08);

  return (
    <section className="bg-surface-container-low pt-20 md:pt-28 pb-0" id="calculator-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="bg-white rounded-t-[28px] sm:rounded-t-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
          {/* Columna Izquierda: Calculadora Interactiva */}
          <div className="w-full md:w-[55%] p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center">
            <span className="font-sans text-[11px] text-primary block mb-6 md:mb-8 uppercase tracking-[0.4em] font-semibold">
              TRANSPARENCIA
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] text-on-surface mb-6 md:mb-8 leading-tight font-normal">
              Calculadora de Comisiones
            </h2>

            <p className="font-body text-base text-on-surface-variant mb-10 md:mb-12 max-w-md leading-relaxed">
              Nuestro modelo es simple y honesto. Sin cargos ocultos, solo el
              valor real de la excelencia operativa y curaduría premium.
            </p>

            <div className="space-y-8">
              {/* Slider de Presupuesto */}
              <div className="relative">
                <div className="flex justify-between items-baseline mb-4">
                  <label className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-on-surface/60 font-semibold">
                    PRESUPUESTO ESTIMADO (MXN)
                  </label>
                  <span className="font-serif text-2xl md:text-3xl text-primary font-normal">
                    ${calculatorBudget.toLocaleString("es-MX")}
                  </span>
                </div>

                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={calculatorBudget}
                  onChange={(e) => setCalculatorBudget(Number(e.target.value))}
                  className="premium-slider cursor-pointer"
                />

                <div className="flex justify-between mt-2.5">
                  <span className="text-[10px] font-sans opacity-40 font-semibold">
                    $10,000
                  </span>
                  <span className="text-[10px] font-sans opacity-40 font-semibold">
                    $500,000+
                  </span>
                </div>
              </div>

              {/* Detalle de Comisión (Sin borde según lo solicitado) */}
              <div className="py-2 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface/50 font-semibold">
                    COMISIÓN BASE (8%)
                  </span>
                  <span className="font-body text-base md:text-lg font-semibold text-on-surface">
                    ${commissionFee.toLocaleString("es-MX")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface/50 font-semibold">
                    GESTIÓN VIP
                  </span>
                  <span className="font-body text-base md:text-lg italic text-on-surface/80">
                    Incluido
                  </span>
                </div>
              </div>

              {/* Total Servicio */}
              <div className="flex justify-between items-end pt-2">
                <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-on-surface pb-1">
                  TOTAL SERVICIO
                </span>
                <span className="font-serif text-3xl md:text-4xl text-primary font-normal leading-none">
                  ${commissionFee.toLocaleString("es-MX")}
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Fotografía de oficina con escritorio de mármol */}
          <div className="w-full md:w-[45%] bg-primary relative min-h-[360px] md:min-h-full overflow-hidden">
            <img
              alt="Curaduría y gestión de eventos de alto perfil"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlbaSG6KhjxiCmuDbSlCN7UU5FziyINwjb5Uo0FNhaVQ8526Q8RGENt9l1tXfJlDNVpEZ75hpxvp-rTgMY-to_RLTf9GYA90N80L7_fXDarF5RIr1MgZrERjxMCSDnNsBW4OihyHJLFlSTAoA5GX2f0Lxo9e8Bsc-JfAZoJ8q443opXc4dbwaZ2MONssKKdposjpj5yfXmuQqzLxzAiQGIiqUgciE3sPxLY4K7sbot7o83sdjtkL-Bv0Hhaaj6qozvMu58DXTO55Y"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
