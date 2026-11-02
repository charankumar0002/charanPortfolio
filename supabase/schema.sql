-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- The site uses the public (anon/publishable) key, so Row Level Security decides
-- what visitors can do: they can send messages and bump the view counter, nothing else.

-- ─── Contact form messages ──────────────────────────────────────────────────
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(name) between 1 and 100),
  email      text not null check (char_length(email) between 3 and 200 and email like '%@%'),
  message    text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Visitors may insert, but not read, edit or delete. You read them in the dashboard.
drop policy if exists "Anyone can send a message" on public.messages;
create policy "Anyone can send a message"
  on public.messages for insert
  to anon, authenticated
  with check (true);

-- ─── Page view counter ──────────────────────────────────────────────────────
create table if not exists public.page_views (
  slug  text primary key,
  views bigint not null default 0
);

alter table public.page_views enable row level security;
-- No policies: visitors can't touch the table directly, only through the functions below.

-- Adds one view and returns the new total.
create or replace function public.increment_page_view(page_slug text default 'home')
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into page_views (slug, views) values (page_slug, 1)
  on conflict (slug) do update set views = page_views.views + 1
  returning views;
$$;

-- Returns the total without counting a new view.
create or replace function public.get_page_views(page_slug text default 'home')
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select views from page_views where slug = page_slug), 0);
$$;

grant execute on function public.increment_page_view(text) to anon, authenticated;
grant execute on function public.get_page_views(text) to anon, authenticated;

-- Make the API pick up the new tables and functions right away.
notify pgrst, 'reload schema';
