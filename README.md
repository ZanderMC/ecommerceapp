 este e smi esquema de la base de datos :


CREATE TABLE public.profiles (
  id uuid NOT NULL,
  name text NOT NULL,
  role text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.category (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  CONSTRAINT category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.product (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  image_url text,
  sizes ARRAY NOT NULL DEFAULT '{}'::text[],
  details jsonb,
  is_discounted boolean NOT NULL DEFAULT false,
  category_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT product_pkey PRIMARY KEY (id),
  CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id)
);
CREATE TABLE public.customer_order (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customer_order_pkey PRIMARY KEY (id),
  CONSTRAINT customer_order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.order_item (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  product_id bigint NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0::numeric),
  CONSTRAINT order_item_pkey PRIMARY KEY (id),
  CONSTRAINT order_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.customer_order(id),
  CONSTRAINT order_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id)
);
CREATE TABLE public.payment (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  stripe_checkout_session_id text UNIQUE,
  stripe_payment_intent_id text UNIQUE,
  amount numeric NOT NULL CHECK (amount > 0::numeric),
  currency text NOT NULL DEFAULT 'pen'::text CHECK (currency = ANY (ARRAY['pen'::text, 'usd'::text])),
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text, 'refunded'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  paid_at timestamp with time zone,
  CONSTRAINT payment_pkey PRIMARY KEY (id),
  CONSTRAINT payment_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.customer_order(id)
);
CREATE TABLE public.favorite (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  product_id bigint NOT NULL,
  CONSTRAINT favorite_pkey PRIMARY KEY (id),
  CONSTRAINT favorite_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT favorite_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id)
);
CREATE TABLE public.review (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  product_id bigint NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT review_pkey PRIMARY KEY (id),
  CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT review_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id)
);
## Pagos con Stripe

El checkout usa Stripe Checkout para pagos únicos en PEN. El servidor valida cada
producto y su precio contra Supabase antes de crear la sesión; el navegador no
puede definir el importe final.

Variables requeridas en el entorno del servidor:

```env
STRIPE_SECRET_KEY=rk_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

La clave restringida de Stripe (`rk_...`) debe tener únicamente los permisos
necesarios para Checkout. Nunca la expongas al cliente ni la guardes en el
repositorio.

Configura en Stripe el endpoint `POST /api/stripe/webhook` y habilita al menos
estos eventos:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

El webhook verifica la firma y actualiza `payment.status`; la página de éxito
no confirma pagos por sí sola. Para desarrollo local, Stripe CLI puede reenviar
eventos al endpoint:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```