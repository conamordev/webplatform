"use client";

import React, { useState } from "react";

export default function CommissionCalculator() {
  const [calculatorBudget, setCalculatorBudget] = useState<number>(150000);
  const commissionFee = Math.round(calculatorBudget * 0.08);
  const receivedAmount = calculatorBudget - commissionFee;

  return (
    <section className="bg-surface-container-low pt-20 md:pt-28 pb-0" id="calculator-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="bg-white rounded-t-[28px] sm:rounded-t-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
          {/* Columna Izquierda: Calculadora Interactiva */}
          <div className="w-full md:w-[55%] p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center">
            <span className="font-sans text-[11px] text-primary block mb-4 md:mb-6 uppercase tracking-[0.4em] font-bold">
              Sin Letras Pequeñas
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] text-on-surface mb-4 md:mb-6 leading-tight font-normal">
              Calculadora de Recaudación
            </h2>

            <p className="font-body text-sm sm:text-base text-on-surface-variant mb-8 md:mb-10 max-w-md leading-relaxed">
              En Con Amor cobramos una comisión fija transparente del 8% que cubre el procesamiento de pagos bancarios con Stripe, hosting seguro y soporte para tus invitados.
            </p>

            <div className="space-y-7">
              {/* Slider de Presupuesto */}
              <div className="relative">
                <div className="flex justify-between items-baseline mb-3">
                  <label className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-on-surface/70 font-bold">
                    Monto estimado en regalos
                  </label>
                  <span className="font-serif text-2xl md:text-3xl text-primary font-normal">
                    ${calculatorBudget.toLocaleString("es-MX")} MXN
                  </span>
                </div>

                <div className="py-2">
                  <input
                    type="range"
                    min={10000}
                    max={500000}
                    step={5000}
                    value={calculatorBudget}
                    onChange={(e) => setCalculatorBudget(Number(e.target.value))}
                    className="premium-slider cursor-pointer"
                  />
                </div>

                <div className="flex justify-between mt-1 text-[11px] font-sans text-on-surface-variant font-medium">
                  <span>$10,000 MXN</span>
                  <span>$500,000+ MXN</span>
                </div>
              </div>

              {/* Detalle de Comisión (Sin borde según lo solicitado) */}
              <div className="py-2 space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-on-surface/70 font-semibold">
                      Comisión Con Amor (8%)
                    </span>
                    <span className="font-body text-base md:text-lg font-bold text-on-surface">
                      ${commissionFee.toLocaleString("es-MX")} MXN
                    </span>
                  </div>
                  <p className="text-[11px] font-body text-on-surface-variant mt-0.5">
                    Incluye pasarela de pago Stripe, infraestructura y soporte concierge.
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-on-surface/70 font-semibold">
                    Gestión VIP & Seguridad
                  </span>
                  <span className="font-body text-base md:text-lg italic text-on-surface/80">
                    Incluido
                  </span>
                </div>
              </div>

              {/* Recibes en tu Cuenta Bancaria (Total) */}
              <div className="pt-3 border-t border-muted-border/40">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-on-surface block">
                      Recibes en tu Cuenta Bancaria
                    </span>
                    <span className="text-[11px] font-body text-on-surface-variant block mt-1">
                      Transferencia directa a cualquier CLABE interbancaria en México.
                    </span>
                  </div>
                  <span className="font-serif text-3xl md:text-4xl text-primary font-normal leading-none pl-4 whitespace-nowrap">
                    ${receivedAmount.toLocaleString("es-MX")} MXN
                  </span>
                </div>
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
