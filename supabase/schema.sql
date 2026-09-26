create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  images text[] not null default '{}',
  category text not null check (category in ('Lingerie', 'Nightwear', 'Bodies', 'Robes', 'Sets', 'Accessories')),
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  world text not null,
  occasion text[] not null default '{}',
  tags text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  "inStock" boolean not null default true check ("inStock" = (stock > 0)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

grant select on public.products to anon, authenticated;
grant all on public.products to service_role;

drop policy if exists "Products are visible to everyone" on public.products;
create policy "Products are visible to everyone"
  on public.products
  for select
  to anon, authenticated
  using (true);

create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row
  execute function public.set_products_updated_at();