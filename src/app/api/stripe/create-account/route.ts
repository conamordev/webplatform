import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    let body: { email?: string; coupleNames?: string } = {};
    try {
      body = await req.json();
    } catch {
      // Body vacío o no parseable, proseguir con defaults
    }

    const { email, coupleNames } = body;

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
      return NextResponse.json(
        {
          error:
            "STRIPE_SECRET_KEY no configurada. Agrega una clave válida de Stripe (sk_test_...) en .env.local",
        },
        { status: 500 }
      );
    }

    let accountId: string;
    let contactEmail = email || undefined;
    const displayName = coupleNames
      ? `Boda ${coupleNames} | Con Amor`
      : "Mesa de Regalos - Con Amor";

    // Creación moderna vía Stripe Accounts v2 (/v2/core/accounts)
    // Recomendado por Stripe para nuevas integraciones Connect (Marketplace / Recipient en México)
    try {
      const v2Account = await stripe.v2.core.accounts.create({
        contact_email: contactEmail,
        display_name: displayName,
        dashboard: "express",
        identity: {
          country: "MX",
          entity_type: "individual",
        },
        defaults: {
          responsibilities: {
            fees_collector: "application",
            losses_collector: "application",
          },
        },
        configuration: {
          recipient: {
            capabilities: {
              stripe_balance: {
                stripe_transfers: {
                  requested: true,
                },
              },
            },
          },
        },
        metadata: {
          platform: "Con Amor",
          country: "MX",
          coupleNames: coupleNames || "Anfitriones Con Amor",
        },
      });

      accountId = v2Account.id;
      contactEmail = v2Account.contact_email || contactEmail;
    } catch (v2Error: unknown) {
      console.warn(
        "⚠️ Intentando fallback con Accounts v1:",
        v2Error instanceof Error ? v2Error.message : v2Error
      );
      // Fallback a Accounts v1 si la cuenta de Stripe tiene habilitada la política v1
      const v1Account = await stripe.accounts.create({
        type: "express",
        country: "MX",
        email: email || undefined,
        business_type: "individual",
        capabilities: {
          transfers: { requested: true },
        },
        business_profile: {
          name: displayName,
          product_description:
            "Mesa de regalos para bodas en México. Recepción de aportaciones y regalos de bodas.",
          mcc: "5999",
        },
        metadata: {
          platform: "Con Amor",
          country: "MX",
          coupleNames: coupleNames || "Anfitriones Con Amor",
        },
      });

      accountId = v1Account.id;
      contactEmail = v1Account.email || contactEmail;
    }

    return NextResponse.json({
      accountId,
      email: contactEmail,
      country: "MX",
      type: "express",
      businessType: "individual",
    });
  } catch (error: unknown) {
    console.error("❌ Error al crear cuenta Stripe Connect Express:", error);
    const errorMessage = error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
