import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    "⚠️ ADVERTENCIA: STRIPE_SECRET_KEY no está definida en las variables de entorno. Configúrala en .env.local"
  );
}

// Inicialización de Stripe con la versión más reciente compatible con Accounts v2
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  typescript: true,
  appInfo: {
    name: "Con Amor - Mesas de Regalos",
    version: "0.1.0",
  },
});
