-- Lets a sub_organization_media 'text_block' row carry a heading (e.g.
-- "Mission" / "About"), so a sub-org page can show more than one named
-- text section instead of a single unlabeled block.
alter table sub_organization_media add column if not exists title text;
