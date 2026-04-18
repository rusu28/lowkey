-- Run this in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  first_name text not null default '',
  username text not null unique,
  bio text,
  avatar_url text,
  kaggle_username text,
  role text not null default 'user' check (role in ('admin', 'user')),
  is_email_subscribed boolean not null default true,
  unsubscribe_token text not null default encode(gen_random_bytes(24), 'hex'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, username, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(
      nullif(new.raw_user_meta_data->>'username', ''),
      'user_' || substr(new.id::text, 1, 8)
    ),
    case
      when lower(coalesce(new.email, '')) = 'lowkaiofficial@gmail.com' then 'admin'
      else 'user'
    end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.launch_settings (
  id int primary key default 1,
  is_launched boolean not null default false,
  launch_date timestamptz not null default '2026-06-07T00:00:00Z',
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

insert into public.launch_settings (id, is_launched)
values (1, false)
on conflict (id) do nothing;

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_subscribed boolean not null default true,
  unsubscribe_token text not null unique default encode(gen_random_bytes(24), 'hex'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.launch_settings enable row level security;
alter table public.newsletter_subscriptions enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Profiles are editable by owner" on public.profiles;
create policy "Profiles are editable by owner"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Launch settings are public readable" on public.launch_settings;
create policy "Launch settings are public readable"
on public.launch_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Only admins can update launch settings" on public.launch_settings;
create policy "Only admins can update launch settings"
on public.launch_settings
for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

drop policy if exists "Anyone can insert newsletter subscription" on public.newsletter_subscriptions;
create policy "Anyone can insert newsletter subscription"
on public.newsletter_subscriptions
for insert
to anon, authenticated
with check (true);

drop policy if exists "Anyone can update newsletter by token via RPC/backend" on public.newsletter_subscriptions;
create policy "Anyone can update newsletter by token via RPC/backend"
on public.newsletter_subscriptions
for update
to anon, authenticated
using (true)
with check (true);
