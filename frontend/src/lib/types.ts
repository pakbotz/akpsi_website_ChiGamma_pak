// Shared row shapes for the tables the admin dashboard reads/writes.
// Keeping these in one place means every tab's editor imports the same
// definition instead of re-declaring a slightly-different inline type.

export type PledgeClass = {
  id: string;
  greek_letter: string;
  name: string;
  sort_order: number;
};

export type Brother = {
  id: string;
  name: string;
  grade: string | null;
  major: string | null;
  minor: string | null;
  class_id: string | null;
  position_title: string | null;
  past_positions: string[] | null;
  is_executive: boolean;
  is_board: boolean;
  active: boolean;
  linkedin_url: string | null;
  email: string | null;
  bio: string | null;
  cloudinary_public_id: string | null;
  sort_order: number;
  grad_year : number | null;
};

export type CareerBrother = {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  year: string | null;
  sort_order: number;
};

export type JobSpotlight = {
  id: number;
  name: string | null;
  company: string | null;
  position: string | null;
  class: string | null;
  message: string | null;
  cloudinary_public_id: string | null;
  company_logo_public_id: string | null;
};

export type GalleryImage = {
  id: string;
  cloudinary_public_id: string;
  created_at: string;
};

// The curated, captioned "Events" carousel on the public Gallery page —
// deliberately a separate table from GalleryImage above. The plain photo
// grid just needs images; this needs a caption and an explicit display
// order per row, which is why it's not the same shape re-used.
export type GalleryEvent = {
  id: string;
  cloudinary_public_id: string | null;
  caption: string;
  sort_order: number;
  created_at: string;
};

export type HomepageImageSlot = {
  slot_key: string;
  cloudinary_public_id: string | null;
};

export type RushCarouselSlide = {
  id: string;
  cloudinary_public_id: string | null;
  caption: string;
  location: string | null;
  event_datetime: string | null;
 instagram_post_url: string | null;
};