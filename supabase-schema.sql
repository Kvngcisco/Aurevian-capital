-- Aurevian Capital, phase 2 schema
-- Paste this whole file into Supabase: SQL Editor -> New query -> Run

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  kind text not null check (kind in ('loan','equity')),
  status text not null default 'submitted',
  email text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications(id) on delete cascade,
  path text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications(id) on delete cascade,
  status text not null,
  note text,
  created_by text not null default 'system',
  created_at timestamptz not null default now()
);

alter table applications enable row level security;
alter table application_documents enable row level security;
alter table application_events enable row level security;

-- applicants read their own rows; staff use the service key server-side
create policy "applicant reads own application" on applications
  for select using (auth.jwt() ->> 'email' = email);
create policy "applicant reads own documents" on application_documents
  for select using (exists (select 1 from applications a where a.id = application_id and auth.jwt() ->> 'email' = a.email));
create policy "applicant reads own events" on application_events
  for select using (exists (select 1 from applications a where a.id = application_id and auth.jwt() ->> 'email' = a.email));

insert into storage.buckets (id, name, public) values ('documents', 'documents', false) on conflict do nothing;
