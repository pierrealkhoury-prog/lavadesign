// Phase 1 — portfolio data.
// Promoted to the Prisma `Project` model in a later phase (admin CRUD).
// Keep entries deterministic so prerendering stays stable.
//
// Privacy: NO client names, NO street addresses, NO firm license numbers.
// Identify projects by sector + discipline + state + year (and city where
// useful at the city level — never a street address).

export const DISCIPLINES = [
  { slug: "2d-3d", label: "2D & 3D" },
  { slug: "interiors-architecture", label: "Interiors & Architecture" },
  { slug: "events-activations", label: "Events & Activations" },
  { slug: "engineering", label: "Engineering" },
] as const;

export type DisciplineSlug = (typeof DISCIPLINES)[number]["slug"];

export type GalleryItem = { src: string; caption: string };

export type Project = {
  slug: string;
  title: string;
  discipline: DisciplineSlug;
  location: string;
  year: number;
  summary: string;
  body: string[];
  /** Sector label (Education, Healthcare, etc.) — shown in case-study meta. */
  sector?: string;
  /** Per-project role line for the case-study meta strip. Hidden when unset. */
  role?: string;
  /** Scope chip strip on the case study. Hidden when unset. */
  scopeTags?: string[];
  /**
   * Hero banner variants for the case study <picture> element.
   * Desktop is 16:9, mobile is 4:5 — supplied as separate assets so
   * each viewport gets art-directed crop rather than a single image
   * forced into both aspect ratios.
   * Falls back to the gradient block when both are unset.
   */
  heroDesktop?: string;
  heroMobile?: string;
  /** Square (1:1) thumbnail used on WorkCard grids. Falls back to gradient. */
  thumb?: string;
  /** Public-folder paths + atmospheric captions. Falls back to gradient blocks when unset. */
  gallery?: GalleryItem[];
  /** Tailwind gradient used as a hero/card placeholder until real imagery lands. */
  gradient: string;
  featured?: boolean;
  /**
   * Light entry — renders a card on the /work grid but does NOT generate a
   * /work/[slug] detail page. Use for portfolio breadth without writing a
   * full case study. Light entries should set `caption` for the one-line
   * description rendered under the card meta.
   */
  noDetail?: boolean;
  /** One-line caption for light entries (rendered under the card meta). */
  caption?: string;
};

export const PROJECTS: Project[] = [
  // ─── Full case studies ─────────────────────────────────────────────────
  {
    slug: "charter-school-tx-2025",
    title: "Charter School — Full MEP & Site Electrical",
    discipline: "engineering",
    location: "Magnolia, Texas",
    year: 2025,
    sector: "Education / Institutional",
    role: "MEP & site electrical engineering of record",
    summary:
      "A ground-up charter school campus — full building MEP plus the site-wide electrical infrastructure that powers everything beyond the walls.",
    body: [
      "A complete educational campus engineered from the ground up: classrooms, flex-classrooms, leasing suites, lobby, and support spaces, each served by its own heat-pump and air-handling zone for room-by-room control and quiet, efficient operation. We designed the full mechanical, electrical, and plumbing systems alongside fire-rated penetrations and code-driven smoke and safety controls throughout.",
      "Beyond the building, the project's reach is what makes it a campus. We engineered the site electrical distribution — a multi-meter service arrangement for the school, leasing, and house loads off a single secondary tap — together with provisions for an electric gate, a lift station, dual EV charging stations, and underground feeds staged for a diesel fire-pump and for football-field lighting. Outdoor pole lighting on photocells completes a site built to grow.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Site Electrical",
      "Solar-Ready",
      "EV Charging",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #f5b04b 55%, #14100e 100%)",
    featured: true,
  },
  {
    slug: "recycling-facility-ny-2024",
    title: "Recycling Facility — MEP & Solar PV",
    discipline: "engineering",
    location: "New York",
    year: 2024,
    sector: "Industrial",
    role: "MEP & solar PV engineering",
    summary:
      "A working recycling facility ventilated for heavy industrial air change — and topped with a grid-tied solar array that feeds power back through a supply-side connection.",
    body: [
      "Industrial process spaces breathe differently. This recycling facility required high-volume mechanical ventilation — wall-mounted cabinet exhaust fans moving thirteen thousand CFM against large intake louvers — to keep air turning over at the rate a working recycle building demands.",
      "The electrical scope paired a conventional panel with a 15 kW rooftop solar array: twenty-seven modules on power optimizers feeding a string inverter, connected to the grid via a supply-side tap with its own lockable AC disconnect and PV load center. The result is a facility that handles its industrial workload while offsetting its own demand with on-site renewable generation.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Solar PV",
      "Renewable Energy",
    ],
    gradient:
      "linear-gradient(135deg, #8c7f78 0%, #7a1a0a 55%, #14100e 100%)",
    featured: true,
  },
  {
    slug: "dental-clinic-tx-2024",
    title: "Dental Clinic — Full MEP",
    discipline: "engineering",
    location: "Texas",
    year: 2024,
    sector: "Healthcare",
    role: "Full MEP engineering",
    summary:
      "A multi-operatory dental clinic where every treatment room, sterilization suite, and medical-gas line had to be engineered to healthcare standards.",
    body: [
      "Healthcare interiors carry requirements an ordinary office never sees. This dental clinic was designed around a long row of treatment and hygiene rooms, each with its own conditioned supply and carefully placed exhaust, plus a sterilization suite, lab, and surgery — all balanced for clean, controlled airflow and tankless gas water heating sized for continuous demand.",
      "The plumbing scope handled twelve dental lavatories with their dedicated fixtures alongside standard sanitary loads, vacuum and compressor connections, and provisional stub-outs for future tenant build-out. Specialized exhaust, medical-gas storage, and door-transfer grilles were coordinated tightly with the dental-equipment supplier so the engineering and the operatory fit-out moved as one.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Medical Gas",
      "Specialized Exhaust",
    ],
    gradient:
      "linear-gradient(135deg, #f4ede5 0%, #8c7f78 50%, #14100e 100%)",
  },
  {
    slug: "retail-buildout-tx-2024",
    title: "Retail Build-Out — MEP",
    discipline: "engineering",
    location: "Houston, Texas",
    year: 2024,
    sector: "Retail",
    role: "MEP engineering for interior build-out",
    summary:
      "A retail interior build-out spanning a customer shopping floor and a back-of-house warehouse — two very different environments under one roof.",
    body: [
      "A retail tenant build-out has to serve the showroom and the stockroom at once. We engineered rooftop packaged units distributing conditioned air across an open shopping floor through a balanced network of ceiling diffusers, with a separate treatment for the warehouse zone behind it — each space sized to its own occupancy and use.",
      "The electrical and plumbing scope tied the new fit-out back to the building's existing service: a pad-mounted transformer and panel arrangement for lighting and receptacles, restroom and break-room plumbing, and rooftop-unit condensate handling, all coordinated to a clean, contractor-biddable set.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Rooftop HVAC",
      "Tenant Build-Out",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 60%, #2a221f 100%)",
  },
  {
    slug: "office-fitout-fl-2025",
    title: "Office Fit-Out — MEP",
    discipline: "engineering",
    location: "Florida",
    year: 2025,
    sector: "Commercial Office",
    role: "Full MEP engineering for office fit-out",
    summary:
      "A full commercial office fit-out — open work areas, private offices, conference and break rooms — engineered around quiet split-system comfort and a clean power-and-data layout.",
    body: [
      "An office lives or dies on comfort and flexibility. This fit-out paired multiple condensing units with matched air handlers, each serving its own zone — lobby, conference, private offices, locker and break rooms — with thermostats set up for setback scheduling and occupant override so the building only conditions what's in use.",
      "The power plan laid out distributed receptacles, ceiling and floor data outlets, and dedicated circuits for the IT room and equipment, while the plumbing scope covered restrooms, break-room fixtures, water heating, and condensate handling for every air handler. The whole package was built around a new 208/120V three-phase service feeding a cleanly scheduled panel.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Split-System HVAC",
      "Data/Low-Voltage",
    ],
    gradient:
      "linear-gradient(135deg, #f4ede5 0%, #f5b04b 40%, #2a221f 100%)",
  },
  {
    slug: "restaurant-tx-2025",
    title: "Restaurant — MEP & Kitchen Ventilation",
    discipline: "engineering",
    location: "Texas",
    year: 2025,
    sector: "Hospitality / Food Service",
    role: "Full MEP engineering",
    summary:
      "A full-service restaurant where the commercial kitchen drove everything — hood exhaust, make-up air, gas, grease waste, and the dining-room comfort wrapped around it.",
    body: [
      "A restaurant is really a commercial kitchen with a dining room attached, and the engineering follows the kitchen. We designed the kitchen exhaust hood and its make-up air to balance thousands of CFM of cooking exhaust against tempered replacement air, kept the building under correct net pressure, and routed the gas service to ranges, fryers, and water heaters with the shut-offs and sediment traps each appliance demands.",
      "On the dining side, packaged rooftop and make-up-air units carry comfort across the seating and bar, while the plumbing scope handles a grease interceptor, floor sinks with proper air gaps for every appliance, three-compartment and prep sinks, and the full sanitary and grease-waste networks. The electrical package ties the kitchen equipment schedule — ovens, coolers, ice machines, espresso — into a coordinated power layout with emergency shut-off.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Kitchen Hood",
      "Make-Up Air",
      "Grease Waste",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #7a1a0a 60%, #14100e 100%)",
    featured: true,
  },

  // ─── Existing full case study (Phase 1) ────────────────────────────────
  {
    slug: "private-residence-tx-2023",
    title: "Private Residence — Full MEP Design",
    discipline: "engineering",
    location: "Texas, USA",
    year: 2023,
    sector: "Residential",
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
    heroDesktop: "/work/private-residence-tx-2023/hero-desktop.png",
    heroMobile: "/work/private-residence-tx-2023/hero-mobile.png",
    thumb: "/work/private-residence-tx-2023/thumb.png",
    gallery: [
      {
        src: "/work/private-residence-tx-2023/plan-01.png",
        caption: "Where the air begins.",
      },
      {
        src: "/work/private-residence-tx-2023/plan-02.png",
        caption: "Lines beneath the floor.",
      },
      {
        src: "/work/private-residence-tx-2023/plan-03.png",
        caption: "Heat, light, water — choreographed.",
      },
      {
        src: "/work/private-residence-tx-2023/plan-04.png",
        caption: "Every room, served in silence.",
      },
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #8c7f78 50%, #1c1715 100%)",
    featured: true,
  },

  // ─── Projects 7–11 (upgraded from light entries to full case studies) ──
  {
    slug: "restaurant-remodel-fl-2024",
    title: "Restaurant Remodel — MEP & Kitchen Ventilation",
    discipline: "engineering",
    location: "Florida",
    year: 2024,
    sector: "Hospitality / Food Service",
    role: "Full MEP engineering for restaurant remodel",
    summary:
      "An existing restaurant brought up to current standards — kitchen exhaust, make-up air, and dining comfort re-engineered around a working commercial kitchen.",
    body: [
      "Remodels are their own discipline: you engineer around what's already there. For this restaurant we reworked the commercial kitchen ventilation — exhaust hood, make-up air, and the pressure balance between them — so the space cleared cooking heat and odor while staying comfortable for guests, all tied back into the building's existing systems where it made sense to keep them.",
      "The plumbing scope carried a grease interceptor, floor sinks with proper air gaps for kitchen equipment, and the sanitary and grease-waste lines that a food-service remodel demands. The electrical package re-coordinated the kitchen equipment loads, lighting, and receptacles into a clean, code-current layout — the kind of unglamorous, exacting work that makes a remodel pass inspection and run for years.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Kitchen Exhaust",
      "Make-Up Air",
      "Grease Waste",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #7a1a0a 60%, #14100e 100%)",
  },
  {
    slug: "restaurant-tx-2024",
    title: "Restaurant — Full MEP",
    discipline: "engineering",
    location: "Texas",
    year: 2024,
    sector: "Hospitality / Food Service",
    role: "Full MEP engineering",
    summary:
      "A ground-up restaurant engineered end to end — kitchen, dining, and bar — with the commercial kitchen setting the pace for the whole building.",
    body: [
      "A from-scratch restaurant lets the engineering be done right from the first line. We designed the full mechanical, electrical, and plumbing systems around the commercial kitchen — exhaust hood and tempered make-up air balanced for correct building pressure, gas distribution to the cooking line and water heaters, and rooftop HVAC carrying comfort across the dining room and bar.",
      "The plumbing scope handled the grease interceptor, floor sinks and floor drains, prep and three-compartment sinks, and the full sanitary and grease-waste networks. The electrical design tied the kitchen equipment schedule into a coordinated power layout with the required shut-offs — a complete set of systems built to open a restaurant and keep it running.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Kitchen Ventilation",
      "Gas",
      "Rooftop HVAC",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 50%, #2a221f 100%)",
  },
  {
    slug: "bakery-tx-2025",
    title: "Bakery — Full MEP",
    discipline: "engineering",
    location: "Texas",
    year: 2025,
    sector: "Food Service / Retail",
    role: "Full MEP engineering",
    summary:
      "A working bakery where baking heat, refrigeration, and food-service plumbing all had to coexist in one tightly-planned space.",
    body: [
      "A bakery is a balancing act between hot and cold. We engineered the ventilation to clear oven heat and keep the production area workable, while coordinating the refrigeration and display equipment loads so the cold side held steady against the baking heat just feet away.",
      "The plumbing scope covered the food-service fixtures, floor sinks with proper air gaps, and the sanitary lines a working kitchen needs, with water heating sized for continuous demand. The electrical package laid out the equipment circuits — ovens, mixers, refrigeration, display cases — alongside lighting and receptacles in a layout coordinated to the equipment schedule and built to code.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Oven Exhaust",
      "Refrigeration",
      "Food-Service",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #f4ede5 40%, #8c7f78 100%)",
  },
  {
    slug: "barber-shop-tx-2025",
    title: "Barber Shop — MEP Renovation",
    discipline: "engineering",
    location: "Texas",
    year: 2025,
    sector: "Retail / Personal Care",
    role: "Full MEP engineering for tenant renovation",
    summary:
      "A compact barber-shop fit-out engineered with the same rigor as a far larger job — zoned ventilation, anti-scald shampoo plumbing, and a complete code-current electrical layout.",
    body: [
      "Small spaces don't mean small engineering. This barber-shop renovation packed a surprising amount into a tight tenant footprint: a packaged rooftop unit with an economizer and weather hood balancing outside air, and carefully zoned exhaust drawn from the wash, shampoo, restroom, and work areas so the space stayed fresh through a full day of service.",
      "The plumbing scope ran cold and hot water to lavatories and shampoo stations, each protected by thermostatic anti-scald mixing valves, with floor-sink indirect-waste connections, a private water sub-meter, and proper venting throughout. The electrical design covered the equipment and exhaust-fan circuits, occupancy-sensor and timed lighting controls, emergency lighting and exit signage with battery backup, and smoke/CO detection — a complete, inspection-ready package in a small but exacting space.",
    ],
    scopeTags: [
      "Mechanical",
      "Electrical",
      "Plumbing",
      "Zoned Exhaust",
      "Anti-Scald Plumbing",
      "Economizer",
    ],
    gradient:
      "linear-gradient(135deg, #f4ede5 0%, #8c7f78 50%, #2a221f 100%)",
  },
  {
    slug: "fire-sprinklers-ny-2024",
    title: "Residential Fire Sprinklers",
    discipline: "engineering",
    location: "New York",
    year: 2024,
    sector: "Residential / Life Safety",
    role: "Residential fire-sprinkler system design",
    summary:
      "A multi-level home fitted with a residential fire-sprinkler system, designed zone by zone off a single street connection for life safety throughout.",
    body: [
      "Life-safety engineering is quiet until the moment it matters. For this multi-level residence we designed a residential fire-sprinkler system covering the living spaces across every floor — sprinkler heads laid out room by room and sized to the home's layout, fed through CPVC risers with zone control sets so each level can be isolated for service.",
      "The system ties into a 1½-inch main water connection from the street through a backflow preventer and pressure-reducing valve, with a test-and-drain arrangement at the riser for code-required maintenance and inspection. It's a system designed to disappear into the house — present in every room, visible almost nowhere, ready if it's ever needed.",
    ],
    scopeTags: [
      "Fire Protection",
      "Residential Sprinklers",
      "Zone Control",
      "Backflow Prevention",
      "CPVC",
    ],
    gradient:
      "linear-gradient(135deg, #8c7f78 0%, #2a221f 50%, #7a1a0a 100%)",
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

/** Only projects that render a /work/[slug] detail page (excludes light entries). */
export function getProjectsWithDetail(): Project[] {
  return PROJECTS.filter((p) => !p.noDetail);
}

export function getDisciplineLabel(slug: DisciplineSlug): string {
  return DISCIPLINES.find((d) => d.slug === slug)!.label;
}

export function isDisciplineSlug(value: string): value is DisciplineSlug {
  return DISCIPLINES.some((d) => d.slug === value);
}
