-- Sub-organizations directory: content-managed replacement for the
-- hardcoded src/lib/subOrganizations.ts placeholder data.

create table if not exists sub_organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Photo frames / text blocks that make up a sub-org's dedicated page body
-- (e.g. the two photo frames + text box referenced for the detail page).
create table if not exists sub_organization_media (
  id uuid primary key default gen_random_uuid(),
  sub_organization_id uuid not null references sub_organizations(id) on delete cascade,
  type text not null check (type in ('photo', 'text_block')),
  cloudinary_public_id text,
  content text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sub_organization_media_sub_organization_id_idx
  on sub_organization_media (sub_organization_id, display_order);

-- Public pages read both tables anonymously (same as brothers/gallery_images/
-- homepage_images); writes go through the authenticated /admin dashboard.
alter table sub_organizations enable row level security;
alter table sub_organization_media enable row level security;

create policy "Public can read sub_organizations"
  on sub_organizations for select
  using (true);

create policy "Public can read sub_organization_media"
  on sub_organization_media for select
  using (true);

create policy "Authenticated users can manage sub_organizations"
  on sub_organizations for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can manage sub_organization_media"
  on sub_organization_media for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into sub_organizations (slug, name, description, logo_url)
values (
  'psi-tech',
  'Psi Tech',
  'Placeholder description copy goes here — a short blurb about this sub-organization.',
  null
)
on conflict (slug) do nothing;
