import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  const bodyText = await req.text();
  const signature = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || webhookSecret.includes("placeholder")) {
    console.warn("⚠️ STRIPE_WEBHOOK_SECRET no está configurado en .env.local.");
    return NextResponse.json(
      { error: "Webhook secret no configurado en el servidor." },
      { status: 500 }
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Cabecera stripe-signature faltante." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(bodyText, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Firma inválida";
    console.error(`❌ Error de verificación de webhook Stripe: ${errorMsg}`);
    return NextResponse.json({ error: `Webhook Error: ${errorMsg}` }, { status: 400 });
  }

  // Procesamiento de eventos
  console.log(`\n🔔 [Webhook Stripe] Recibido evento: ${event.type} (ID: ${event.id})`);

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      const accountId = account.id;
      const chargesEnabled = account.charges_enabled;
      const payoutsEnabled = account.payouts_enabled;
      const detailsSubmitted = account.details_submitted;
      const currentlyDue = account.requirements?.currently_due || [];
      const eventuallyDue = account.requirements?.eventually_due || [];
      const pastDue = account.requirements?.past_due || [];
      const pendingVerification = account.requirements?.pending_verification || [];
      const disabledReason = account.requirements?.disabled_reason;

      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📋 ACTUALIZACIÓN DE CUENTA CONECTADA (MÉXICO - MX)`);
      console.log(`🆔 ID de Cuenta: ${accountId}`);
      console.log(`📧 Email: ${account.email ?? "No especificado"}`);
      console.log(`🏢 Tipo: ${account.type} | País: ${account.country} | Entidad: ${account.business_type}`);
      console.log(`📝 Datos Enviados (details_submitted): ${detailsSubmitted ? "✅ SÍ" : "❌ NO"}`);
      console.log(`💳 Cobros Habilitados (charges_enabled): ${chargesEnabled ? "✅ SÍ" : "❌ NO"}`);
      console.log(`🏦 Transferencias Habilitadas (payouts_enabled): ${payoutsEnabled ? "✅ SÍ" : "❌ NO"}`);

      // Análisis de Requisitos KYC en México (INE/Pasaporte, RFC, CURP, CLABE)
      const mexicoKycKeywords = [
        "individual.id_number", // RFC / CURP en México
        "individual.verification.document", // INE / Pasaporte frontal y reverso
        "individual.verification.additional_document",
        "external_account", // CLABE interbancaria (18 dígitos)
        "business_profile.url",
        "tos_acceptance",
      ];

      const pendingMexicoKyc = currentlyDue.filter((reqItem) =>
        mexicoKycKeywords.some((keyword) => reqItem.includes(keyword))
      );

      if (chargesEnabled && payoutsEnabled && currentlyDue.length === 0) {
        console.log(`🎉 ¡ESTADO KYC: VERIFICADO COMPLETAMENTE!`);
        console.log(`   La cuenta ${accountId} está lista para recibir regalos y dispersar fondos.`);
      } else {
        console.log(`⚠️  ESTADO KYC: REQUIERE ATENCIÓN O VERIFICACIÓN`);
        if (currentlyDue.length > 0) {
          console.log(`   ⏳ Requisitos pendientes inmediatos (currently_due):`);
          currentlyDue.forEach((reqItem) => {
            console.log(`      - ${reqItem}`);
          });
        }
        if (eventuallyDue.length > 0) {
          console.log(`   📅 Requisitos eventuales (eventually_due): ${eventuallyDue.join(", ")}`);
        }
        if (pendingMexicoKyc.length > 0) {
          console.log(`   🇲🇽 Documentos/Datos Oficiales de México requeridos:`);
          pendingMexicoKyc.forEach((item) => console.log(`      👉 ${item}`));
        }
        if (pendingVerification.length > 0) {
          console.log(`   🔍 En proceso de revisión por Stripe (pending_verification):`);
          pendingVerification.forEach((item) => console.log(`      - ${item}`));
        }
        if (pastDue.length > 0) {
          console.log(`   🚨 Requisitos vencidos (past_due): ${pastDue.join(", ")}`);
        }
        if (disabledReason) {
          console.log(`   ⛔ Motivo de restricción (disabled_reason): ${disabledReason}`);
        }
      }
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
      break;
    }

    case "person.updated":
    case "person.created": {
      const person = event.data.object as Stripe.Person;
      const accountId = event.account || (person as unknown as { account?: string }).account || "N/A";
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`👤 EVENTO DE PERSONA FÍSICA / ANFITRIÓN (${event.type})`);
      console.log(`🆔 ID de Cuenta: ${accountId}`);
      console.log(`🆔 ID de Persona: ${person.id}`);
      if (person.first_name || person.last_name) {
        console.log(`👤 Nombre: ${person.first_name ?? ""} ${person.last_name ?? ""}`);
      }
      if (person.verification?.status) {
        console.log(`🔍 Estado de Verificación de Identidad: ${person.verification.status}`);
      }
      if (person.requirements?.currently_due && person.requirements.currently_due.length > 0) {
        console.log(`⏳ Requisitos de persona pendientes: ${person.requirements.currently_due.join(", ")}`);
      }
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
      break;
    }

    case "capability.updated": {
      const capability = event.data.object as Stripe.Capability;
      const accountId = event.account || capability.account || "N/A";
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`⚡ CAPACIDAD ACTUALIZADA (${capability.id})`);
      console.log(`🆔 ID de Cuenta: ${accountId}`);
      console.log(`📊 Estado: ${capability.status} | Solicitada: ${capability.requested ? "Sí" : "No"}`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
      break;
    }

    default:
      console.log(`ℹ️ Evento Stripe ${event.type} recibido para cuenta ${event.account ?? "plataforma"}.`);
      break;
  }

  return NextResponse.json({ received: true });
}
