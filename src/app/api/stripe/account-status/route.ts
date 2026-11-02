import { NextResponse, connection } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: Request) {
  await connection();
  try {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");

    if (!accountId || !accountId.startsWith("acct_")) {
      return NextResponse.json(
        { error: "Parámetro 'accountId' inválido o faltante." },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
      return NextResponse.json(
        {
          error: "STRIPE_SECRET_KEY no configurada.",
        },
        { status: 500 }
      );
    }

    const account = await stripe.accounts.retrieve(accountId);

    const isVerified = Boolean(account.charges_enabled && account.payouts_enabled);
    const hasPendingRequirements =
      (account.requirements?.currently_due && account.requirements.currently_due.length > 0) ||
      (account.requirements?.past_due && account.requirements.past_due.length > 0);

    let statusCategory: "VERIFIED" | "PENDING_VERIFICATION" | "REQUIRES_ACTION" =
      "REQUIRES_ACTION";

    if (isVerified && !hasPendingRequirements) {
      statusCategory = "VERIFIED";
    } else if (account.details_submitted) {
      statusCategory = "PENDING_VERIFICATION";
    }

    return NextResponse.json({
      accountId: account.id,
      email: account.email,
      country: account.country,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      details_submitted: account.details_submitted,
      statusCategory,
      requirements: {
        currently_due: account.requirements?.currently_due || [],
        eventually_due: account.requirements?.eventually_due || [],
        past_due: account.requirements?.past_due || [],
        pending_verification: account.requirements?.pending_verification || [],
        disabled_reason: account.requirements?.disabled_reason || null,
      },
    });
  } catch (error: unknown) {
    console.error("❌ Error al consultar estado de cuenta:", error);
    const errorMessage = error instanceof Error ? error.message : "Error interno";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
