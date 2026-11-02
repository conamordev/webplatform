import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { accountId } = await req.json();

    if (!accountId || typeof accountId !== "string" || !accountId.startsWith("acct_")) {
      return NextResponse.json(
        { error: "Se requiere un 'accountId' válido de Stripe que comience con 'acct_'." },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
      return NextResponse.json(
        {
          error:
            "STRIPE_SECRET_KEY no configurada. Agrega una clave válida de Stripe (sk_test_...) en .env.local",
        },
        { status: 500 }
      );
    }

    // Creación de la sesión para el componente embebido account_onboarding
    const accountSession = await stripe.accountSessions.create({
      account: accountId,
      components: {
        account_onboarding: {
          enabled: true,
          features: {
            external_account_collection: true,
          },
        },
      },
    });

    return NextResponse.json({
      client_secret: accountSession.client_secret,
      expires_at: accountSession.expires_at,
    });
  } catch (error: unknown) {
    console.error("❌ Error al crear Stripe AccountSession:", error);
    const errorMessage = error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
