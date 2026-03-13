create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  brand text not null,
  price integer not null,
  category text not null,
  material text not null,
  in_stock integer not null default 0,
  lumens integer,
  image text not null,
  description text not null,
  specs jsonb not null default '{}'::jsonb,
  lemon_variant_id integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  lemon_order_id text unique not null,
  order_number integer not null,
  total integer not null,
  customer_email text not null,
  raw_payload jsonb not null,
  created_at timestamptz not null default now()
);

create or replace function public.decrement_inventory_by_variant(p_variant_id integer, p_qty integer)
returns void
language plpgsql
security definer
as $$
begin
  update public.products
  set in_stock = greatest(in_stock - p_qty, 0)
  where lemon_variant_id = p_variant_id;
end;
$$;
