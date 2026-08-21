"use client";

import { useState } from "react";

type Alum = {
  name: string;
  title: string;
  company: string;
};

const ALUMNI: Record<string, Alum[]> = {
  "2018": [
    { name: "Priya Nadkarni", title: "Senior Product Manager", company: "Stripe" },
    { name: "Marcus Whitfield", title: "Attorney", company: "Cravath, Swaine & Moore" },
    { name: "Elena Torres", title: "Resident Physician", company: "Mass General Brigham" },
    { name: "Devon Park", title: "Structural Engineer", company: "Arup" },
    { name: "Grace Achebe", title: "Founder", company: "Lumen Analytics" },
    { name: "Sam Okafor", title: "Data Scientist", company: "Spotify" },
  ],
  "2019": [
    { name: "Wei Chen", title: "Software Engineer", company: "Google" },
    { name: "Isabelle Duval", title: "Curator", company: "The Whitney Museum" },
    { name: "Nathan Brooks", title: "Investment Associate", company: "Blackstone" },
    { name: "Aisha Rahman", title: "UX Design Lead", company: "Figma" },
    { name: "Tomás Rivera", title: "High School Teacher", company: "KIPP Public Schools" },
    { name: "Lauren Kessler", title: "Research Scientist", company: "Genentech" },
  ],
  "2020": [
    { name: "Jordan Ellis", title: "Backend Engineer", company: "Shopify" },
    { name: "Nia Simmons", title: "Policy Analyst", company: "Brookings Institution" },
    { name: "Felix Adler", title: "Architect", company: "Bjarke Ingels Group" },
    { name: "Chloe Bennett", title: "Consultant", company: "McKinsey & Company" },
    { name: "Ravi Subramaniam", title: "ML Engineer", company: "OpenAI" },
    { name: "Maya Lindqvist", title: "Documentary Producer", company: "Freelance" },
  ],
  "2021": [
    { name: "Ben Tucker", title: "Civil Engineer", company: "AECOM" },
    { name: "Sofia Marchetti", title: "Brand Strategist", company: "Wieden+Kennedy" },
    { name: "Owen Malick", title: "Associate", company: "Goldman Sachs" },
    { name: "Hana Kobayashi", title: "Product Designer", company: "Notion" },
    { name: "Diego Fuentes", title: "Nonprofit Director", company: "Teach For America" },
    { name: "Zara Ahmed", title: "Clinical Researcher", company: "NIH" },
  ],
  "2022": [
    { name: "Colin Marsh", title: "Software Engineer", company: "Airbnb" },
    { name: "Fatima Siddiqui", title: "Journalist", company: "The Atlantic" },
    { name: "Ethan Wu", title: "Quant Analyst", company: "Jane Street" },
    { name: "Ruth Osei", title: "Environmental Scientist", company: "NOAA" },
    { name: "Liam Foster", title: "Chef & Co-owner", company: "Fern Restaurant" },
    { name: "Ana Beatriz Souza", title: "Growth Marketer", company: "Duolingo" },
  ],
  "2023": [
    { name: "Julian Reyes", title: "Software Engineer", company: "Anthropic" },
    { name: "Noor Haddad", title: "Legal Associate", company: "Skadden Arps" },
    { name: "Ingrid Solberg", title: "Industrial Designer", company: "Herman Miller" },
    { name: "Marcus Deng", title: "Analyst", company: "Bridgewater Associates" },
    { name: "Camille Fontaine", title: "Graduate Researcher", company: "MIT Media Lab" },
    { name: "Theo Nakamura", title: "Founding Engineer", company: "Ramp" },
  ],
  "2024": [
    { name: "Aiden Sharma", title: "Software Engineer", company: "Meta" },
    { name: "Bianca Moreau", title: "Fashion Buyer", company: "Net-a-Porter" },
    { name: "Kwame Asante", title: "Product Analyst", company: "DoorDash" },
    { name: "Sylvie Laurent", title: "Teach First Fellow", company: "Teach First UK" },
    { name: "Victor Ionescu", title: "Robotics Engineer", company: "Boston Dynamics" },
    { name: "Rina Watanabe", title: "Associate Editor", company: "Condé Nast" },
  ],
  "2025": [
    { name: "Miles Carter", title: "Software Engineer", company: "Databricks" },
    { name: "Yasmin El-Amin", title: "Policy Fellow", company: "U.S. Department of State" },
    { name: "Oscar Lindgren", title: "Financial Analyst", company: "Morgan Stanley" },
    { name: "Peyton Marsh", title: "Research Assistant", company: "Broad Institute" },
    { name: "Aditi Rao", title: "Product Designer", company: "Linear" },
    { name: "Gabriel Costa", title: "Field Organizer", company: "Sunrise Movement" },
  ],
  "2026": [
    { name: "Nora Kim", title: "Incoming Software Engineer", company: "Microsoft" },
    { name: "Elias Vogel", title: "Incoming Analyst", company: "Evercore" },
    { name: "Simone Dubois", title: "Research Fellow", company: "Institut Pasteur" },
    { name: "Tariq Hassan", title: "Incoming Consultant", company: "Bain & Company" },
    { name: "Willa Jennings", title: "Studio Assistant", company: "MoMA PS1" },
    { name: "Andres Villanueva", title: "Incoming Engineer", company: "SpaceX" },
  ],
};

const YEARS = Object.keys(ALUMNI);

export default function Page() {
  const [activeYear, setActiveYear] = useState(YEARS[YEARS.length - 1]);
  const roster = ALUMNI[activeYear];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50">
            Alumni Directory
          </p>
          <h1
            className="mt-2 text-3xl text-white sm:text-4xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Class of {activeYear}
          </h1>
          <p className="mt-1 text-sm text-white/40">
            {roster.length} graduate{roster.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Year tabs — ledger/folder-tab style */}
        <div className="flex flex-wrap gap-x-1 gap-y-0">
          {YEARS.map((year) => {
            const isActive = year === activeYear;
            return (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={[
                  "relative rounded-t-md px-4 py-2 text-sm tracking-wide transition-colors",
                  isActive
                    ? "bg-[#111111] text-[#c9a227]"
                    : "bg-transparent text-white/40 hover:text-white/70",
                ].join(" ")}
                style={
                  isActive
                    ? { boxShadow: "inset 0 1px 0 0 rgba(201,162,39,0.6)" }
                    : undefined
                }
              >
                '{year.slice(2)}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-[#111111]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Roster surface */}
        <div className="rounded-b-md rounded-tr-md border-t border-white/10 bg-[#111111]">
          <ul>
            {roster.map((alum, i) => (
              <li
                key={alum.name}
                className={[
                  "flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between",
                  i !== roster.length - 1 ? "border-b border-white/10" : "",
                ].join(" ")}
              >
                <span
                  className="text-lg text-white"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {alum.name}
                </span>
                <span className="text-sm text-white/50">
                  {alum.title}
                  <span className="text-white/25"> · </span>
                  <span className="text-[#c9a227]/80">{alum.company}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}