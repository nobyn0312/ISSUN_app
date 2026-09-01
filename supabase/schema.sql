-- ISSUN: 洋服アイテム / プロフィール / レビュー
-- Supabase ダッシュボードの SQL Editor で実行する

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'item_category') then
    create type item_category as enum ('outer', 'shirt', 'pants');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text,
  email text,
  age text,
  height integer,
  shape text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  price integer not null check (price >= 0),
  category item_category not null,
  detail text not null,
  image_url text,
  url text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_items_created_at on public.items (created_at desc);
create index if not exists idx_items_category on public.items (category);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id uuid not null references public.items (id) on delete cascade,
  username text,
  title text not null,
  rate integer not null check (rate between 1 and 5),
  size text not null,
  comment text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_reviews_item_id on public.reviews (item_id);

alter table public.profiles enable row level security;
alter table public.items enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "profiles are readable" on public.profiles;
create policy "profiles are readable"
  on public.profiles for select
  to anon, authenticated
  using (true);

drop policy if exists "users can insert own profile" on public.profiles;
create policy "users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "items are readable" on public.items;
create policy "items are readable"
  on public.items for select
  to anon, authenticated
  using (true);

drop policy if exists "authenticated can insert items" on public.items;
create policy "authenticated can insert items"
  on public.items for insert
  to authenticated
  with check (true);

drop policy if exists "reviews are readable" on public.reviews;
create policy "reviews are readable"
  on public.reviews for select
  to anon, authenticated
  using (true);

drop policy if exists "authenticated can insert reviews" on public.reviews;
create policy "authenticated can insert reviews"
  on public.reviews for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "users can update own reviews" on public.reviews;
create policy "users can update own reviews"
  on public.reviews for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "users can delete own reviews" on public.reviews;
create policy "users can delete own reviews"
  on public.reviews for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, username)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'username',
      new.raw_user_meta_data->>'full_name',
      split_part(new.email, '@', 1)
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into storage.buckets (id, name, public)
values ('item-images', 'item-images', true)
on conflict (id) do nothing;

drop policy if exists "item images are publicly readable" on storage.objects;
create policy "item images are publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'item-images');

drop policy if exists "authenticated can upload item images" on storage.objects;
create policy "authenticated can upload item images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'item-images');
