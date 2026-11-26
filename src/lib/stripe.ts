import Stripe from "stripe";

export const isStripeConfigured = Boolean(
  process.env.STRIPE_SECRET_KEY &&
    !process.env.STRIPE_SECRET_KEY.includes("sk_test_...") &&
    !process.env.STRIPE_SECRET_KEY.includes("placeholder")
);

if (!isStripeConfigured && process.env.NODE_ENV !== "production") {
  console.warn(
    "⚠️ ADVERTENCIA: STRIPE_SECRET_KEY no está definida en las variables de entorno. Configúrala en .env.local o en Vercel."
  );
}

// Safe initialization so `next build` on Vercel never crashes if STRIPE_SECRET_KEY is not yet set
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build_only",
  {
    typescript: true,
    appInfo: {
      name: "ConAmor, - Mesa de Regalos Digital",
      version: "0.1.0",
    },
  }
);
