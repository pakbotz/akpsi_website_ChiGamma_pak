-- Team member cards and "What You'll Accomplish" checklist for a
-- sub-organization's dedicated page. This replaces the old two-photo-frame
-- feature (sub_organization_media rows of type 'photo'), which no longer
-- renders anywhere once this ships — those rows are cleaned up below.
-- Mission/About stay exactly as they are (sub_organization_media rows of
-- type 'text_block', distinguished by `title`); no change needed there.

create table if not exists sub_org_team_members (
  id uuid primary key default gen_random_uuid(),
  sub_organization_id uuid not null references sub_organizations(id) on delete cascade,
  name text not null,
  position text,
  bio text,
  photo_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sub_org_checklist_items (
  id uuid primary key default gen_random_uuid(),
  sub_organization_id uuid not null references sub_organizations(id) on delete cascade,
  title text not null,
  description text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sub_org_team_members_sub_organization_id_idx
  on sub_org_team_members (sub_organization_id, display_order);

create index if not exists sub_org_checklist_items_sub_organization_id_idx
  on sub_org_checklist_items (sub_organization_id, display_order);

alter table sub_org_team_members enable row level security;
alter table sub_org_checklist_items enable row level security;

create policy "Public can read sub_org_team_members"
  on sub_org_team_members for select using (true);
create policy "Public can read sub_org_checklist_items"
  on sub_org_checklist_items for select using (true);

create policy "Authenticated users can manage sub_org_team_members"
  on sub_org_team_members for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated users can manage sub_org_checklist_items"
  on sub_org_checklist_items for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Seed placeholder data for psi-tech.
insert into sub_org_team_members (sub_organization_id, name, position, bio, display_order)
select id, 'Name', 'Position', 'Placeholder bio goes here.', 0 from sub_organizations where slug = 'psi-tech'
union all
select id, 'Name', 'Position', 'Placeholder bio goes here.', 1 from sub_organizations where slug = 'psi-tech';

insert into sub_org_checklist_items (sub_organization_id, title, description, display_order)
select id, 'Placeholder Skill', 'Placeholder description of what this covers.', 0 from sub_organizations where slug = 'psi-tech'
union all
select id, 'Placeholder Skill', 'Placeholder description of what this covers.', 1 from sub_organizations where slug = 'psi-tech'
union all
select id, 'Placeholder Skill', 'Placeholder description of what this covers.', 2 from sub_organizations where slug = 'psi-tech';

-- The old two-photo-frame feature is fully superseded by sub_org_team_members;
-- these rows would otherwise be orphaned since nothing renders them anymore.
delete from sub_organization_media where type = 'photo';
