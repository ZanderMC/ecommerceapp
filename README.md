# Zandev

**Live Demo:** [e-commerceapp-zdr.vercel.app](https://e-commerceapp-zdr.vercel.app/)

## English

ecommerceapp is a full-stack fashion e-commerce application. Users can create an
account, browse products by category, view product details, add items to a
shopping cart, save favorites, and complete one-time payments through Stripe
Checkout. The application also includes authentication, checkout result pages,
and server-side payment status tracking through Stripe webhooks.

The project is designed for deployment with Vercel and uses Supabase for
authentication, data persistence, and product management.

### Features

- User registration, login, and session management with Supabase Auth.
- Product catalog with categories, images, sizes, descriptions, and offers.
- Product detail pages and responsive shopping experience.
- Shopping cart with product quantities and selected sizes.
- Favorites for authenticated users.
- Stripe Checkout integration for one-time payments in PEN.
- Secure server-side price validation before creating a checkout session.
- Checkout success, cancellation, and payment status pages.
- Stripe webhook processing for completed, failed, asynchronous, and expired payments.
- Supabase Row Level Security support for application data.
- Responsive layout for desktop and mobile devices.

### Tech stack

- Next.js 16 with the App Router and Turbopack.
- React 19 and TypeScript.
- Tailwind CSS 4.
- Supabase Auth and Supabase PostgreSQL.
- Supabase SSR for browser and server clients.
- Stripe Checkout and Stripe webhooks.
- React Hot Toast for notifications.
- Vercel for deployment.

### Environment variables

Create a `.env.local` file for local development. In production, configure
these values in the hosting provider's environment settings:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=...
```

Only variables with the `NEXT_PUBLIC_` prefix are exposed to the browser.
Never expose or commit `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, or
`SUPABASE_SERVICE_ROLE_KEY`.

### Local development

```bash
npm install
npm run dev
```

For local Stripe webhook testing:

```bash
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed,checkout.session.expired --forward-to localhost:3000/api/stripe/webhook
```

---

## Español

ecommerce es una aplicación full-stack de comercio electrónico de moda. Los
usuarios pueden crear una cuenta, explorar productos por categoría, consultar
el detalle de cada producto, agregar artículos al carrito, guardar favoritos y
realizar pagos únicos mediante Stripe Checkout. La aplicación también incluye
autenticación, páginas de resultado del checkout y seguimiento del estado de
los pagos mediante webhooks de Stripe.

El proyecto está preparado para desplegarse en Vercel y utiliza Supabase para
la autenticación, la persistencia de datos y la gestión del catálogo.

### Funcionalidades

- Registro, inicio de sesión y gestión de sesiones con Supabase Auth.
- Catálogo de productos con categorías, imágenes, tallas, descripciones y ofertas.
- Páginas de detalle de producto y experiencia de compra responsive.
- Carrito de compras con cantidades y tallas seleccionadas.
- Sistema de favoritos para usuarios autenticados.
- Integración con Stripe Checkout para pagos únicos en PEN.
- Validación segura del precio en el servidor antes de crear el checkout.
- Páginas de checkout exitoso, cancelado y estado del pago.
- Procesamiento de webhooks de Stripe para pagos completados, fallidos,
  asíncronos y sesiones expiradas.
- Soporte para Row Level Security de Supabase.
- Diseño responsive para dispositivos móviles y escritorio.

### Tecnologías utilizadas

- Next.js 16 con App Router y Turbopack.
- React 19 y TypeScript.
- Tailwind CSS 4.
- Supabase Auth y Supabase PostgreSQL.
- Supabase SSR para clientes de navegador y servidor.
- Stripe Checkout y webhooks de Stripe.
- React Hot Toast para notificaciones.
- Vercel para el despliegue.

### Variables de entorno

Crea un archivo `.env.local` para el desarrollo local. En producción,
configura estos valores como variables de entorno privadas en el proveedor de
hosting:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=...
```

Solo las variables con el prefijo `NEXT_PUBLIC_` se exponen al navegador.
Nunca expongas ni subas al repositorio `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET` o `SUPABASE_SERVICE_ROLE_KEY`.

### Desarrollo local

```bash
npm install
npm run dev
```

Para probar los webhooks de Stripe localmente:

```bash
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed,checkout.session.expired --forward-to localhost:3000/api/stripe/webhook
```
