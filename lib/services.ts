// Phase 1.6 — services catalog.
// Mirrors lib/projects.ts: keep content here so /services pages stay layout-only.
// No pricing / commerce fields yet; those land in the Stripe phase.

export type ServiceCategory = "engineering" | "design";

export const SERVICE_CATEGORIES: {
  key: ServiceCategory;
  label: string;
  blurb: string;
}[] = [
  {
    key: "engineering",
    label: "Engineering & Architecture",
    blurb:
      "The core of the practice. Permit-ready documentation across every building system, coordinated under one roof — so what gets drawn is what gets built.",
  },
  {
    key: "design",
    label: "Design Services",
    blurb:
      "A distinct practice for the brand, web, packaging, and print work that surrounds the buildings. Built on the same material discipline as the engineering side.",
  },
];

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  tagline: string;
  summary: string;
  body: string[];
  capabilities: string[];
  /** Public-folder path. Falls back to gradient via ImageSlot when unset. */
  heroImage?: string;
  /** Atmospheric gradient used as the ImageSlot fallback. */
  gradient: string;
};

export const SERVICES: Service[] = [
  // ─── Engineering & Architecture ─────────────────────────────────────────
  {
    slug: "architectural-design",
    title: "Architectural Design",
    category: "engineering",
    tagline: "Creativity and functionality, brought into form.",
    summary:
      "We turn ideas into tangible structures that inspire — whether a new build or a renovation.",
    body: [
      "Our architectural design service combines creativity and functionality to bring your vision to life. We work from conceptual planning through to permit-ready documentation, coordinating closely with structural and MEP disciplines so the design is buildable from day one.",
    ],
    capabilities: [
      "Conceptual Planning",
      "Structural Coordination",
      "Building-Permit Assistance",
      "Construction Documentation",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #7a1a0a 55%, #14100e 100%)",
  },
  {
    slug: "structural-engineering",
    title: "Structural Engineering",
    category: "engineering",
    tagline: "The framework everything stands on.",
    summary:
      "Building, foundation, and framing design with full seismic analysis.",
    body: [
      "Our structural engineering covers building design, foundation design, CMU and wood-frame design, and steel-structure design with seismic analysis — delivered as permit-ready, contractor-biddable construction documents.",
    ],
    capabilities: [
      "Building Design",
      "Foundation Design",
      "CMU & Wood-Frame",
      "Steel Structure & Seismic Analysis",
    ],
    gradient:
      "linear-gradient(135deg, #8c7f78 0%, #2a221f 50%, #14100e 100%)",
  },
  {
    slug: "mechanical-plumbing",
    title: "Mechanical & Plumbing Engineering",
    category: "engineering",
    tagline: "Comfort and systems, choreographed.",
    summary:
      "HVAC, plumbing, and process systems sized and documented to code.",
    body: [
      "We design heat-load calculations and HVAC systems, refrigeration, complete plumbing and water-supply systems, industrial process MP, and energy-compliance and control systems — coordinated across the full building.",
    ],
    capabilities: [
      "Heat-Load & HVAC",
      "Plumbing & Water Supply",
      "Refrigeration",
      "Energy Compliance",
      "Control Systems",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 50%, #7a1a0a 100%)",
  },
  {
    slug: "electrical-engineering",
    title: "Electrical Engineering",
    category: "engineering",
    tagline: "Power and light, by design.",
    summary:
      "Distribution, lighting, and low-current systems engineered to code.",
    body: [
      "Our electrical design covers power distribution, interior and exterior lighting design, photometric study, renewable-energy solutions, energy-code compliance calculations, and low-current systems.",
    ],
    capabilities: [
      "Power Distribution",
      "Lighting Design",
      "Photometric Study",
      "Energy-Code Compliance",
      "Low-Current Systems",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #8c7f78 50%, #1c1715 100%)",
  },
  {
    slug: "civil-engineering",
    title: "Civil Engineering",
    category: "engineering",
    tagline: "Everything that meets the ground.",
    summary:
      "Site development, grading, drainage, and utilities — fully documented.",
    body: [
      "We handle site development and layout, paving and grading plans, drainage and utility plans, storm-sewer details, and erosion control (SWPPP) — from dimensional control through public connections.",
    ],
    capabilities: [
      "Site Development",
      "Grading & Paving",
      "Drainage & Utilities",
      "Storm Sewer",
      "Erosion Control (SWPPP)",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #1c1715 100%)",
  },
  {
    slug: "interior-design",
    title: "Interior Design & Renovation",
    category: "engineering",
    tagline: "Spaces designed to be lived in.",
    summary:
      "From space planning to full remodels, blending modern and classic.",
    body: [
      "Elevate your space with our interior design expertise — space planning, material and lighting selection, custom millwork, and energy-efficient upgrades — for both new interiors and full renovations.",
    ],
    capabilities: [
      "Space Planning",
      "Material Selection",
      "Lighting Design",
      "Custom Millwork",
      "Energy-Efficient Upgrades",
    ],
    gradient:
      "linear-gradient(135deg, #f4ede5 0%, #8c7f78 40%, #14100e 100%)",
  },

  // ─── Design Services ────────────────────────────────────────────────────
  {
    slug: "web-design",
    title: "Web Design & Development",
    category: "design",
    tagline: "Distinct, high-performing digital identities.",
    summary:
      "Websites that attract customers, provoke engagement, and inspire growth.",
    body: [
      "We build professional, elegant websites and themes that captivate your audience and communicate your business message in the most attractive way possible. We integrate your site with your domain and tailor the color scheme and typography to your brand identity, delivering seamless user experiences across all devices.",
    ],
    capabilities: [
      "Custom Web Design",
      "Development",
      "Responsive / All-Device",
      "Brand-Matched Theming",
      "Domain Integration",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 40%, #7a1a0a 100%)",
  },
  {
    slug: "branding-identity",
    title: "Logos & Branding",
    category: "design",
    tagline: "Start the journey toward your brand identity.",
    summary:
      "Custom-design a new identity, or refresh an existing one.",
    body: [
      "A logo is the first thing customers see when they meet your brand — and it's worth a thousand words. With our brand consultants and skilled designers, you can custom-design a new company logo or refresh your existing one. A strong identity goes far beyond a name and a mark: the perfect logo is memorable, simple, and unique, and we build it into a consistent system that tells your audience who you are across every touchpoint.",
    ],
    capabilities: [
      "Logo Design",
      "Brand Identity Systems",
      "Brand Refresh",
      "Print Collateral",
      "Social Media Kit",
      "Brand Consultation",
    ],
    gradient:
      "linear-gradient(135deg, #ff4d1c 0%, #f5b04b 60%, #2a221f 100%)",
  },
  {
    slug: "artworking",
    title: "Artworking",
    category: "design",
    tagline: "Your art-production partner.",
    summary:
      "Specialized art-production support that extends the capacity of creative teams and agencies.",
    body: [
      "We act as an extension of your team, handling the technical execution so your creatives stay focused on creating. Our artworking designers adapt your designs for print and digital — Arabizing and localizing, professional layout and artworking, vectorization, ready-to-print file preparation, 2D art, and magazine digitization — with font finesse, correct CMYK/RGB color, crop marks, resolution, and careful proofing. Available as flexible hourly packages for one-off needs, or as monthly retainers for agencies that want dedicated, on-call resources with priority turnaround.",
    ],
    capabilities: [
      "Arabizing & Localizing",
      "Layout & Artworking",
      "Vectorization",
      "Ready-to-Print",
      "2D Art",
      "Magazine Digitization",
      "Hourly Packages & Monthly Retainers",
    ],
    // Cooler, more technical gradient than packaging — fits a precision
    // art-production / retainer service rather than shelf goods.
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #8c7f78 50%, #2a221f 100%)",
  },
  {
    slug: "marketing-materials",
    title: "Marketing Materials",
    category: "design",
    tagline: "High-impact materials that get results.",
    summary:
      "Flyers, brochures, menus, and collateral that build recognition.",
    body: [
      "We combine creative design with advanced print production to produce marketing materials that look great and get results — flyers, brochures, leaflets, menus, and more, designed to enhance brand recognition and customer engagement.",
    ],
    capabilities: [
      "Flyers & Leaflets",
      "Brochures",
      "Menus",
      "Promotional Collateral",
      "Print Production",
    ],
    gradient:
      "linear-gradient(135deg, #f5b04b 0%, #ff4d1c 50%, #14100e 100%)",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === category);
}

/** Adjacent services within the same category for prev/next nav on detail pages. */
export function getCategoryNeighbors(slug: string): {
  prev: Service | null;
  next: Service | null;
} {
  const current = getService(slug);
  if (!current) return { prev: null, next: null };
  const group = getServicesByCategory(current.category);
  const idx = group.findIndex((s) => s.slug === slug);
  return {
    prev: idx > 0 ? group[idx - 1] : null,
    next: idx < group.length - 1 ? group[idx + 1] : null,
  };
}

export function getCategoryMeta(category: ServiceCategory) {
  return SERVICE_CATEGORIES.find((c) => c.key === category)!;
}
