// Phase 1 — placeholder portfolio data.
// Promoted to the Prisma `Project` model in a later phase (admin CRUD).
// Keep entries deterministic so prerendering stays stable.

export const DISCIPLINES = [
  { slug: "2d-3d", label: "2D & 3D" },
  { slug: "interiors-architecture", label: "Interiors & Architecture" },
  { slug: "events-activations", label: "Events & Activations" },
  { slug: "engineering", label: "Engineering" },
] as const;

export type DisciplineSlug = (typeof DISCIPLINES)[number]["slug"];

export type Project = {
  slug: string;
  title: string;
  discipline: DisciplineSlug;
  location: string;
  year: number;
  summary: string;
  body: string[];
  /** Per-project role line for the case-study meta strip. Hidden when unset. */
  role?: string;
  /** Scope chip strip on the case study. Hidden when unset. */
  scopeTags?: string[];
  /** Tailwind gradient used as a hero/card placeholder until real imagery lands. */
  gradient: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "lumen-pavilion",
    title: "Lumen Pavilion",
    discipline: "events-activations",
    location: "Dubai",
    year: 2025,
    summary:
      "A temporary cor-ten and translucent-PETG pavilion for the Dubai Design District opening week.",
    body: [
      "Lumen was a three-week temporary structure threading three exhibitor zones with a single continuous bench. We worked from concept through fabrication, partnering with a local steel shop and a translucent-panel supplier in Sharjah.",
      "The pavilion drew 12,000 visitors across nine evenings and became the signature image of the d3 opening week press kit.",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #7a1a0a 55%, #1c1715 100%)",
    featured: true,
  },
  {
    slug: "stratum-house",
    title: "Stratum House",
    discipline: "interiors-architecture",
    location: "Abu Dhabi",
    year: 2024,
    summary:
      "A 540 m² private residence organised around a vertical lava-rock spine and shaded courtyards.",
    body: [
      "Stratum House layers a heavy lava-stone core against light, lifted living volumes. The plan reads as four stacked horizons; the materials read as compressed time.",
      "We led architecture, interior design and FF&E selection, working with a structural engineer in Abu Dhabi and a stone supplier in Oman.",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #7a1a0a 60%, #14100e 100%)",
    featured: true,
  },
  {
    slug: "magma-type-system",
    title: "Magma Type System",
    discipline: "2d-3d",
    location: "Dubai",
    year: 2025,
    summary:
      "A variable display typeface and identity system developed for a UAE-based mineral water brand.",
    body: [
      "Magma is a single-axis variable font that compresses from a humanist sans into a dense industrial display. We designed the typeface, the wordmark, the bottle label system and the launch campaign.",
      "It ships across 11 SKUs and an eight-language packaging matrix.",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #f5b04b 60%, #14100e 100%)",
    featured: true,
  },
  {
    slug: "forge-engine-mount",
    title: "Forge Engine Mount",
    discipline: "engineering",
    location: "Sharjah",
    year: 2024,
    summary:
      "A vibration-damping engine mount cast in two alloys, designed for a regional electric mobility startup.",
    body: [
      "Forge replaced a four-part welded assembly with a single bi-metal casting that absorbs 38% more high-frequency vibration. We owned the mechanical design, FEA simulation and supplier qualification across two casting houses.",
      "Now shipping on the startup's first 600 production units.",
    ],
    gradient:
      "linear-gradient(135deg, #8c7f78 0%, #2a221f 50%, #14100e 100%)",
  },
  {
    slug: "veil-identity",
    title: "Veil Identity",
    discipline: "2d-3d",
    location: "Dubai",
    year: 2024,
    summary:
      "Brand identity, packaging and direct-mail program for an Emirati skincare house.",
    body: [
      "Veil reframes a 20-year-old apothecary brand for a new generation of customers. We rebuilt the logotype, the entire SKU system and the unboxing experience around a single recurring veiling gesture.",
      "Press kit, in-store signage and seasonal capsules all run on the same modular system.",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 50%, #7a1a0a 100%)",
  },
  {
    slug: "embers-restaurant",
    title: "Embers Restaurant",
    discipline: "interiors-architecture",
    location: "Dubai",
    year: 2025,
    summary:
      "A 1,200 m² flame-fired dining concept anchored by an open kitchen and a 14 m basalt counter.",
    body: [
      "Embers is built around the heat of the kitchen. We led interiors, lighting, custom millwork and the open-kitchen choreography with the executive chef.",
      "The dining room and the bar share a single material palette: blackened steel, lava stone and tumbled brass.",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #1c1715 100%)",
  },
  {
    slug: "solstice-activation",
    title: "Solstice Activation",
    discipline: "events-activations",
    location: "Riyadh",
    year: 2025,
    summary:
      "A three-night brand activation for a global luxury maison during the Riyadh winter season.",
    body: [
      "Solstice ran across three nights with a programme of live performance, ticketed dinner and a private gallery moment. We led creative direction, set design and on-site production.",
      "Total audience: 4,200 across the three nights.",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 40%, #14100e 100%)",
  },
  {
    slug: "private-residence-tx-2023",
    title: "Private Residence — Full MEP Design",
    discipline: "engineering",
    location: "Texas, USA",
    year: 2023,
    summary:
      "Complete mechanical, electrical, and plumbing engineering for a luxury single-family estate — a 30+ room residence with golf simulator, wine room, dual master suites, pool, spa, and outdoor living.",
    body: [
      "Lava Design delivered the full MEP engineering package for a large private residence in Texas, producing permit-ready construction documents coordinated across every building system. The home spans more than thirty conditioned spaces — from a golf simulator room, wine room, and gym to dual master suites, guest wings, and extensive outdoor living, pool, and spa areas.",
      "On the mechanical side, the design coordinated four air-handling units and multiple heat pumps with a fully sized supply, return, and exhaust duct network, plus ventilation for specialty spaces like the wine room. The electrical design carried a 600-amp service with a 24kW standby generator, complete lighting and power layouts, panel schedules, and over 200 fixtures specified.",
      "Plumbing scope covered drainage and venting to a septic system, a multi-manifold PEX water-supply distribution with hot-water recirculation, and a propane gas network serving water heaters, ranges, fireplaces, the pool heater, and the outdoor kitchen — each sized to code.",
    ],
    scopeTags: [
      "Mechanical / HVAC",
      "Electrical & Low Voltage",
      "Plumbing & Drainage",
      "Gas Distribution",
      "Construction Documents",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #8c7f78 50%, #1c1715 100%)",
    featured: true,
  },
  {
    slug: "glass-and-ash",
    title: "Glass & Ash Storefront",
    discipline: "interiors-architecture",
    location: "Dubai",
    year: 2024,
    summary:
      "A 90 m² flagship retail interior for a contemporary ceramics studio.",
    body: [
      "Glass & Ash uses a single material gesture — sand-cast glass shelving — to display 80+ pieces of small-batch ceramics. The rest of the room recedes.",
      "We led interiors, custom shelving fabrication and the in-store lighting design.",
    ],
    gradient:
      "linear-gradient(135deg, #f4ede5 0%, #8c7f78 40%, #14100e 100%)",
  },
  {
    slug: "halo-packaging",
    title: "Halo Packaging Series",
    discipline: "2d-3d",
    location: "Dubai",
    year: 2025,
    summary:
      "Limited-edition packaging for a four-piece collaboration between a coffee brand and a perfumer.",
    body: [
      "Halo is a four-piece capsule with a single recurring optical motif: a ring of negative space that reads as both halo and aperture. We designed the structural packaging, the surface graphics and the launch shorts.",
      "Sold out in 11 days across the GCC.",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 60%, #2a221f 100%)",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectsByDiscipline(
  discipline: DisciplineSlug | null,
): Project[] {
  if (!discipline) return PROJECTS;
  return PROJECTS.filter((p) => p.discipline === discipline);
}

export function getDisciplineLabel(slug: DisciplineSlug): string {
  return DISCIPLINES.find((d) => d.slug === slug)!.label;
}

export function isDisciplineSlug(value: string): value is DisciplineSlug {
  return DISCIPLINES.some((d) => d.slug === value);
}
