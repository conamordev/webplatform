# Con Amor — MVP de Mesas de Regalos para Bodas en México
### Integración de Stripe Connect Express con Embedded Components (`<stripe-account-onboarding>`)

Este repositorio contiene la base del proyecto **"Con Amor"**, diseñado para validar localmente el flujo de Onboarding KYC (Conozca a su Cliente) para anfitriones de mesas de regalos en México, incluyendo la verificación de documentos oficiales (**INE / Pasaporte**), datos fiscales (**RFC con homoclave**, **CURP**) y cuenta bancaria (**CLABE interbancaria**).

---

## 1. Stack Tecnológico

- **Framework**: [Next.js 15+ / 16](https://nextjs.org/) (App Router, Server Route Handlers) con **TypeScript** estricto.
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) v4.
- **Frontend Stripe**: `@stripe/connect-js` y `@stripe/react-connect-js` (Embedded Web Components).
- **Backend Stripe**: `stripe` (SDK oficial para Node.js).
- **Iconografía**: `lucide-react`.

---

## 2. Estructura del Proyecto

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── stripe/
│   │   │   │   ├── create-account/route.ts  # POST: Crea cuenta Express (individual, MX)
│   │   │   │   ├── account-session/route.ts # POST: Genera client_secret para embedded onboarding
│   │   │   │   └── account-status/route.ts  # GET: Consulta estado de verificación y requisitos
│   │   │   └── webhooks/
│   │   │       └── stripe/route.ts          # POST: Valida firma y escucha account.updated
│   │   ├── dashboard/
│   │   │   └── onboarding/page.tsx          # Vista protegida con <stripe-account-onboarding>
│   │   ├── layout.tsx                       # Layout raíz
│   │   └── page.tsx                         # Landing page con enlace directo al onboarding
│   └── lib/
│       └── stripe.ts                        # Singleton del SDK de Stripe backend
├── .env.example                             # Plantilla de variables de entorno
└── package.json
```

---

## 3. Configuración de Variables de Entorno

Copia el archivo `.env.example` como `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Stripe (modo Test):

```env
# Claves de prueba de Stripe (https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Secreto del webhook obtenido con Stripe CLI
STRIPE_WEBHOOK_SECRET=whsec_...
```

> **Nota importante:** En tu Dashboard de Stripe, asegúrate de tener habilitado **Stripe Connect** en modo de prueba.

---

## 4. Instrucciones de Ejecución Local

> **Nota importante:**Manually installed skills don’t auto-update. Run npx skills update -y to get the latest versions.

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 5. Pruebas de Webhooks con Stripe CLI

Para recibir los eventos en tiempo real (especialmente `account.updated` cuando el anfitrión envía o aprueba sus documentos en México):

1. **Instala o inicia sesión en Stripe CLI**:
   ```bash
   stripe login
   ```

2. **Reenvía los webhooks a tu endpoint local**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. **Copia el secreto generado**:
   La terminal te mostrará algo como:
   `> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxx`
   Pega ese valor en tu archivo `.env.local` en la variable `STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx`.

4. **Monitorea los logs en la terminal de Next.js**:
   Cuando interactúes con el onboarding, el handler en `/api/webhooks/stripe` inspeccionará:
   - `charges_enabled` y `payouts_enabled`
   - Requisitos pendientes (`requirements.currently_due`)
   - Documentos oficiales de México (`individual.verification.document`, `individual.id_number`, CLABE interbancaria)

---

## 6. Guía de Pruebas KYC para México (Stripe Test Mode)

Al abrir [http://localhost:3000/dashboard/onboarding](http://localhost:3000/dashboard/onboarding):

1. Haz clic en **"Crear Nueva Cuenta Express (MX)"** para generar una cuenta conectada de prueba configurada con:
   - `country: 'MX'`
   - `type: 'express'`
   - `business_type: 'individual'`
   - `capabilities: { card_payments: { requested: true }, transfers: { requested: true } }`

2. Se montará automáticamente el componente embebido `<stripe-account-onboarding>`.

3. **Valores de prueba sugeridos para el formulario de México**:
   - **Teléfono**: Cualquier número de 10 dígitos (ej. `55 1234 5678`) y código SMS de prueba `000 000`.
   - **Nombre**: Cualquier nombre (ej. `Sofía Hernández`).
   - **RFC**: `XAXX010101000` (o cualquier RFC válido de 13 dígitos para persona física con homoclave).
   - **CURP**: `AAAA000000HDFRR00` (18 caracteres alfanuméricos válidos).
   - **Dirección**:
     - Calle y número: `Av. Reforma 222`
     - Código Postal: `06600`
     - Ciudad / Municipio: `Cuauhtémoc`
     - Estado: `Ciudad de México (CDMX)`
   - **Cuenta Bancaria (CLABE)**:
     - Ingresa los 18 dígitos: `012180001234567897` (BBVA Bancomer de prueba).
   - **Documento Oficial (INE o Pasaporte)**:
     - Sube cualquier imagen JPG/PNG. En modo test, Stripe la aceptará y marcará como verificada.

4. **Verificación del Estado**:
   - Haz clic en **"Refrescar Estado"** en el panel o sal del onboarding.
   - Observa cómo el indicador visual cambia de **"Requiere Verificación"** a **"Cuenta Verificada"**.
