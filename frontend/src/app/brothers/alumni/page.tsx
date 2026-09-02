"use client";

import { useState } from "react";

type Alum = {
  name: string;
  title: string;
  company: string;
  pledgeClass: string;
};

type FeaturedAlum = Alum & {
  year: string;
  quote: string;
};

const ALUMNI: Record<string, Alum[]> = {
  "2018": [
    { name: "Priya Nadkarni", title: "Senior Product Manager", company: "Stripe", pledgeClass: "Γ" },
    { name: "Marcus Whitfield", title: "Attorney", company: "Cravath, Swaine & Moore", pledgeClass: "Β" },
    { name: "Elena Torres", title: "Resident Physician", company: "Mass General Brigham", pledgeClass: "Γ" },
    { name: "Devon Park", title: "Structural Engineer", company: "Arup", pledgeClass: "Α" },
    { name: "Grace Achebe", title: "Founder", company: "Lumen Analytics", pledgeClass: "Δ" },
    { name: "Sam Okafor", title: "Data Scientist", company: "Spotify", pledgeClass: "Β" },
  ],
  "2019": [
    { name: "Wei Chen", title: "Software Engineer", company: "Google", pledgeClass: "Ε" },
    { name: "Isabelle Duval", title: "Curator", company: "The Whitney Museum", pledgeClass: "Δ" },
    { name: "Nathan Brooks", title: "Investment Associate", company: "Blackstone", pledgeClass: "Ε" },
    { name: "Aisha Rahman", title: "UX Design Lead", company: "Figma", pledgeClass: "Ζ" },
    { name: "Tomás Rivera", title: "High School Teacher", company: "KIPP Public Schools", pledgeClass: "Δ" },
    { name: "Lauren Kessler", title: "Research Scientist", company: "Genentech", pledgeClass: "Ε" },
  ],
  "2020": [
    { name: "Jordan Ellis", title: "Backend Engineer", company: "Shopify", pledgeClass: "Ζ" },
    { name: "Nia Simmons", title: "Policy Analyst", company: "Brookings Institution", pledgeClass: "Η" },
    { name: "Felix Adler", title: "Architect", company: "Bjarke Ingels Group", pledgeClass: "Ζ" },
    { name: "Chloe Bennett", title: "Consultant", company: "McKinsey & Company", pledgeClass: "Θ" },
    { name: "Ravi Subramaniam", title: "ML Engineer", company: "OpenAI", pledgeClass: "Η" },
    { name: "Maya Lindqvist", title: "Documentary Producer", company: "Freelance", pledgeClass: "Ζ" },
  ],
  "2021": [
    { name: "Ben Tucker", title: "Civil Engineer", company: "AECOM", pledgeClass: "Θ" },
    { name: "Sofia Marchetti", title: "Brand Strategist", company: "Wieden+Kennedy", pledgeClass: "Ι" },
    { name: "Owen Malick", title: "Associate", company: "Goldman Sachs", pledgeClass: "Θ" },
    { name: "Hana Kobayashi", title: "Product Designer", company: "Notion", pledgeClass: "Κ" },
    { name: "Diego Fuentes", title: "Nonprofit Director", company: "Teach For America", pledgeClass: "Ι" },
    { name: "Zara Ahmed", title: "Clinical Researcher", company: "NIH", pledgeClass: "Θ" },
  ],
  "2022": [
    { name: "Colin Marsh", title: "Software Engineer", company: "Airbnb", pledgeClass: "Λ" },
    { name: "Fatima Siddiqui", title: "Journalist", company: "The Atlantic", pledgeClass: "Κ" },
    { name: "Ethan Wu", title: "Quant Analyst", company: "Jane Street", pledgeClass: "Λ" },
    { name: "Ruth Osei", title: "Environmental Scientist", company: "NOAA", pledgeClass: "Μ" },
    { name: "Liam Foster", title: "Chef & Co-owner", company: "Fern Restaurant", pledgeClass: "Κ" },
    { name: "Ana Beatriz Souza", title: "Growth Marketer", company: "Duolingo", pledgeClass: "Λ" },
  ],
  "2023": [
    { name: "Julian Reyes", title: "Software Engineer", company: "Anthropic", pledgeClass: "Ν" },
    { name: "Noor Haddad", title: "Legal Associate", company: "Skadden Arps", pledgeClass: "Μ" },
    { name: "Ingrid Solberg", title: "Industrial Designer", company: "Herman Miller", pledgeClass: "Ν" },
    { name: "Marcus Deng", title: "Analyst", company: "Bridgewater Associates", pledgeClass: "Ξ" },
    { name: "Camille Fontaine", title: "Graduate Researcher", company: "MIT Media Lab", pledgeClass: "Μ" },
    { name: "Theo Nakamura", title: "Founding Engineer", company: "Ramp", pledgeClass: "Ν" },
  ],
  "2024": [
    { name: "Aiden Sharma", title: "Software Engineer", company: "Meta", pledgeClass: "Ο" },
    { name: "Bianca Moreau", title: "Fashion Buyer", company: "Net-a-Porter", pledgeClass: "Ξ" },
    { name: "Kwame Asante", title: "Product Analyst", company: "DoorDash", pledgeClass: "Ο" },
    { name: "Sylvie Laurent", title: "Teach First Fellow", company: "Teach First UK", pledgeClass: "Π" },
    { name: "Victor Ionescu", title: "Robotics Engineer", company: "Boston Dynamics", pledgeClass: "Ξ" },
    { name: "Rina Watanabe", title: "Associate Editor", company: "Condé Nast", pledgeClass: "Ο" },
  ],
  "2025": [
    { name: "Miles Carter", title: "Software Engineer", company: "Databricks", pledgeClass: "Ρ" },
    { name: "Yasmin El-Amin", title: "Policy Fellow", company: "U.S. Department of State", pledgeClass: "Π" },
    { name: "Oscar Lindgren", title: "Financial Analyst", company: "Morgan Stanley", pledgeClass: "Ρ" },
    { name: "Peyton Marsh", title: "Research Assistant", company: "Broad Institute", pledgeClass: "Σ" },
    { name: "Aditi Rao", title: "Product Designer", company: "Linear", pledgeClass: "Π" },
    { name: "Gabriel Costa", title: "Field Organizer", company: "Sunrise Movement", pledgeClass: "Ρ" },
  ],
  "2026": [
    { name: "Nora Kim", title: "Incoming Software Engineer", company: "Microsoft", pledgeClass: "Τ" },
    { name: "Elias Vogel", title: "Incoming Analyst", company: "Evercore", pledgeClass: "Σ" },
    { name: "Simone Dubois", title: "Research Fellow", company: "Institut Pasteur", pledgeClass: "Τ" },
    { name: "Tariq Hassan", title: "Incoming Consultant", company: "Bain & Company", pledgeClass: "Υ" },
    { name: "Willa Jennings", title: "Studio Assistant", company: "MoMA PS1", pledgeClass: "Σ" },
    { name: "Andres Villanueva", title: "Incoming Engineer", company: "SpaceX", pledgeClass: "Τ" },
  ],
};

const FEATURED: FeaturedAlum[] = [
  {
    name: "Priya Nadkarni",
    title: "Senior Product Manager",
    company: "Stripe",
    pledgeClass: "Γ",
    year: "2018",
    quote:
      "Lorem ipsum dolor sit amet, AKPsi consectetur adipiscing elit — the brotherhood taught me more about leadership than any classroom ever did.",
  },
  {
    name: "Wei Chen",
    title: "Software Engineer",
    company: "Google",
    pledgeClass: "Ε",
    year: "2019",
    quote:
      "Sed do eiusmod tempor incididunt ut labore — I found my closest friends and my first mentors all in one chapter room.",
  },
  {
    name: "Ravi Subramaniam",
    title: "ML Engineer",
    company: "OpenAI",
    pledgeClass: "Η",
    year: "2020",
    quote:
      "Ut enim ad minim veniam, quis nostrud exercitation — AKPsi gave me the confidence to take risks I never would have taken alone.",
  },
  {
    name: "Julian Reyes",
    title: "Software Engineer",
    company: "Anthropic",
    pledgeClass: "Ν",
    year: "2023",
    quote:
      "Duis aute irure dolor in reprehenderit — every late-night professional dev session was somehow also one of my favorite memories.",
  },
  {
    name: "Miles Carter",
    title: "Software Engineer",
    company: "Databricks",
    pledgeClass: "Ρ",
    year: "2025",
    quote:
      "Excepteur sint occaecat cupidatat non proident — this chapter is the reason I know what real brotherhood looks like.",
  },
];

const YEARS = Object.keys(ALUMNI);
const GOLD = "#c9ab6e";

export default function Page() {
  const [activeYear, setActiveYear] = useState<string>("all");

  const roster =
    activeYear === "all"
      ? YEARS.flatMap((year) =>
          ALUMNI[year].map((a) => ({ ...a, year }))
        )
      : ALUMNI[activeYear].map((a) => ({ ...a, year: activeYear }));

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] px-6 py-14 sm:px-14">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 260ms ease-out;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              The Chapter
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Our Alumni
            </h1>
          </div>

          {/* Class filter */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-white/40">
              Class
            </span>
            <div className="flex flex-wrap gap-1 rounded-lg border border-white/15 bg-white/[0.02] p-1">
              <button
                onClick={() => setActiveYear("all")}
                className={[
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  activeYear === "all"
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white",
                ].join(" ")}
              >
                All
              </button>
              {YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={[
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    activeYear === year
                      ? "bg-white text-black"
                      : "text-white/50 hover:text-white",
                  ].join(" ")}
                >
                  '{year.slice(2)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured alumni — only visible on "All" */}
        {activeYear === "all" && (
          <div key="featured" className="fade-in-up mb-14">
            <p
              className="mb-5 text-xs font-medium uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Spotlight
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {FEATURED.map((alum) => (
                <div
                  key={alum.name}
                  className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  {/* Placeholder photo */}
                  <div className="flex aspect-square items-center justify-center border-b border-white/10 bg-white/[0.04]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                      Placeholder Photo
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-medium text-white">
                        {alum.name}
                      </h3>
                      <span
                        className="shrink-0 text-lg leading-none"
                        style={{ color: GOLD }}
                        title={`Pledge Class ${alum.pledgeClass}`}
                      >
                        {alum.pledgeClass}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-white/60">
                      {alum.company}
                    </p>

                    <p className="mt-3 text-xs uppercase tracking-[0.15em] text-white/30">
                      Class of {alum.year}
                    </p>
                    <p
                      className="mt-1 text-xs font-medium uppercase tracking-[0.15em]"
                      style={{ color: GOLD }}
                    >
                      {alum.title}
                    </p>

                    <p className="mt-4 flex-1 border-t border-white/10 pt-4 text-sm italic leading-relaxed text-white/50">
                      “{alum.quote}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roster grid */}
        <div
          key={activeYear}
          className="fade-in-up grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {roster.map((alum) => (
            <div
              key={alum.name}
              className="rounded-xl border border-white/8 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-medium text-white">
                  {alum.name}
                </h3>
                <span
                  className="shrink-0 text-xl leading-none"
                  style={{ color: GOLD }}
                  title={`Pledge Class ${alum.pledgeClass}`}
                >
                  {alum.pledgeClass}
                </span>
              </div>

              <p className="mt-3 text-sm text-white/60">{alum.company}</p>

              <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/30">
                Class of {alum.year}
              </p>

              <p
                className="mt-1 text-xs font-medium uppercase tracking-[0.15em]"
                style={{ color: GOLD }}
              >
                {alum.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}