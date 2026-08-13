// ─── Rush terms config ─────────────────────────────────────────────
// Single source of truth for the Rush dropdown (FullscreenMenu), the
// /rush index page, and the /rush/[term] dynamic route. Add a new
// term here and it shows up everywhere automatically — no backend
// wired yet (see README), so this is static until Supabase lands.

export type RushEvent = {
  name: string; // "Info Night"
  date: string; // "3/30" — display string, TBA until chapter confirms
  time?: string;
  location?: string;
  description?: string;
};

// Each term can carry its own visual identity — 'default' is the clean
// light theme, everything else maps to a bespoke themed view component
// (see RushTermPage). Add a new theme by adding both a value here and a
// matching view component.
export type RushTermTheme = 'default' | 'arcteryx';

export type RushTerm = {
  slug: string;
  label: string; // "Fall 2026"
  status: 'active' | 'archived';
  theme?: RushTermTheme;
  blurb: string;
  applyBy: string;
  applyUrl: string;
  interestFormUrl: string;
  events: RushEvent[];
};

// Recurring rush-week traditions — used as placeholders for terms whose
// exact schedule isn't locked in yet.
const DEFAULT_EVENTS: RushEvent[] = [
  {
    name: 'Info Night',
    date: 'TBA',
    description:
      'An open house introduction to Alpha Kappa Psi — meet the brothers, learn about our mission, and get an overview of the recruitment process.',
  },
  {
    name: 'Meet the Chapter',
    date: 'TBA',
    description:
      'A casual, conversational event where you can talk one-on-one with brothers and get a feel for chapter culture.',
  },
  {
    name: 'LinkedIn Workshop / Alumni Panel',
    date: 'TBA',
    description:
      'A professional development session covering resume and LinkedIn best practices, followed by a Q&A panel with AKPsi alumni about their career paths.',
  },
  {
    name: 'Beach Cleanup',
    date: 'TBA',
    description:
      'A philanthropy event where prospective members join brothers in giving back to the Santa Cruz community.',
  },
  {
    name: 'Slug Tank',
    date: 'TBA',
    description:
      'Our Shark-Tank-style pitch event, where prospective members work in teams to present a business idea to a panel of brothers.',
  },
];

export const RUSH_TERMS: RushTerm[] = [
  {
    slug: 'fall-2026',
    label: 'Fall 2026',
    status: 'active',
    blurb: 'Our current recruitment cycle. Dates below are placeholders until the chapter confirms the schedule.',
    applyBy: 'TBA',
    applyUrl: '#',
    interestFormUrl: '#',
    events: DEFAULT_EVENTS,
  },
  {
    slug: 'spring-2026',
    label: 'Spring 2026',
    status: 'archived',
    theme: 'arcteryx',
    blurb: 'A past recruitment cycle, kept here for reference.',
    applyBy: 'Closed',
    applyUrl: '#',
    interestFormUrl: '#',
    events: [
      {
        name: 'Info Night',
        date: '3/30',
        description:
          'An open house introduction to Alpha Kappa Psi — meet the brothers, learn about our mission, and get an overview of the recruitment process.',
      },
      {
        name: 'Meet the Chapter',
        date: '3/31',
        description:
          'A casual, conversational event where you can talk one-on-one with brothers and get a feel for chapter culture.',
      },
      {
        name: 'LinkedIn Workshop / Alumni Panel',
        date: '4/1',
        description:
          'A professional development session covering resume and LinkedIn best practices, followed by a Q&A panel with AKPsi alumni about their career paths.',
      },
      {
        name: 'Beach Cleanup',
        date: '4/2',
        description:
          'A philanthropy event where prospective members join brothers in giving back to the Santa Cruz community.',
      },
      {
        name: 'Slug Tank',
        date: '4/4',
        description:
          'Our Shark-Tank-style pitch event, where prospective members work in teams to present a business idea to a panel of brothers.',
      },
    ],
  },
  {
    slug: 'fall-2025',
    label: 'Fall 2025',
    status: 'archived',
    blurb: 'A past recruitment cycle, kept here for reference.',
    applyBy: 'Closed',
    applyUrl: '#',
    interestFormUrl: '#',
    events: DEFAULT_EVENTS,
  },
  {
    slug: 'spring-2025',
    label: 'Spring 2025',
    status: 'archived',
    blurb: 'A past recruitment cycle, kept here for reference.',
    applyBy: 'Closed',
    applyUrl: '#',
    interestFormUrl: '#',
    events: DEFAULT_EVENTS,
  },
];

export function getRushTerm(slug: string): RushTerm | undefined {
  return RUSH_TERMS.find((t) => t.slug === slug);
}
