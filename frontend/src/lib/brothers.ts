// ─── Brother directory data ────────────────────────────────────────
// Placeholder dataset for the front-end design pass. Every value here
// is a stand-in — once the backend/CMS is wired up, swap this array
// for a fetch (e.g. `getBrothers()` in src/lib/api.ts) and delete the
// mock entries below. The shape of `Brother` is the real contract.

export interface Brother {
  id: string;
  name: string;
  photoUrl: string; // will eventually be a Cloudinary URL
  major: string;
  minor?: string;
  year: number; // expected graduation year, e.g. 2027
  pledgeClass: string; // Greek letter designation — see src/lib/greekAlphabet.ts for chronological order
  positions: string[]; // e.g. ["President", "Rush Chair"] — empty array if none
  isExecTeam: boolean; // derived from positions, stored explicitly for easy filtering
  isLowerBoard: boolean; // committee-chair tier, below exec — also derived from positions
  bio: string;
  linkedinUrl: string;
  email?: string;
}

export const brothers: Brother[] = [
  {
    id: '1',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    year: 2026,
    pledgeClass: 'Omicron',
    positions: ['President'],
    isExecTeam: true,
    isLowerBoard: false,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
    email: 'placeholder@ucsc.edu',
  },
  {
    id: '2',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    minor: 'Minor Placeholder',
    year: 2027,
    pledgeClass: 'Pi',
    positions: ['VP of Technology'],
    isExecTeam: true,
    isLowerBoard: false,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
  {
    id: '3',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    year: 2027,
    pledgeClass: 'Pi',
    positions: [],
    isExecTeam: false,
    isLowerBoard: false,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
  {
    id: '4',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    minor: 'Minor Placeholder',
    year: 2025,
    pledgeClass: 'Xi',
    positions: ['Rush Chair'],
    isExecTeam: false,
    isLowerBoard: true,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
  {
    id: '5',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    year: 2028,
    pledgeClass: 'Lambda',
    positions: [],
    isExecTeam: false,
    isLowerBoard: false,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
  {
    id: '6',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    year: 2026,
    pledgeClass: 'Omicron',
    positions: ['Social Chair'],
    isExecTeam: false,
    isLowerBoard: true,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
  {
    id: '7',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    year: 2025,
    pledgeClass: 'Xi',
    positions: [],
    isExecTeam: false,
    isLowerBoard: false,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
  {
    id: '8',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    minor: 'Minor Placeholder',
    year: 2028,
    pledgeClass: 'Lambda',
    positions: [],
    isExecTeam: false,
    isLowerBoard: false,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
  {
    id: '9',
    name: 'Brother Name',
    photoUrl: '',
    major: 'Major Placeholder',
    year: 2026,
    pledgeClass: 'Omicron',
    positions: ['Historian'],
    isExecTeam: false,
    isLowerBoard: true,
    bio: 'Placeholder bio copy goes here — a short paragraph about this brother.',
    linkedinUrl: '#',
  },
];
