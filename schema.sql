
-- Minimal tables for Nex Link (Supabase/Postgres)
create table if not exists profiles (
  id uuid primary key,
  username text unique,
  avatar_url text,
  bio text,
  trading_style text,
  created_at timestamp with time zone default now()
);

create table if not exists chats (
  id uuid primary key default gen_random_uuid(),
  kind text check (kind in ('dm','channel','server')) default 'channel',
  name text not null,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

create table if not exists messages (
  id bigserial primary key,
  chat_id uuid references chats(id) on delete cascade,
  author uuid references profiles(id),
  content text not null,
  created_at timestamp with time zone default now()
);

create index if not exists idx_messages_chat_id_created_at on messages(chat_id, created_at desc);
