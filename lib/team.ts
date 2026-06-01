// Phase 1 — team / studio structure data.
// Photo + bio version with PLACEHOLDER names/bios/faces. The shape is
// production-ready: swap the placeholder strings for real values without
// touching the page layout. Photos point at i.pravatar.cc by stable id
// so each card stays visually consistent across renders.
//
// Voice note: bios are written in the studio's editorial tone (short,
// material, slightly literary). Word counts intentionally clustered
// 23–30 words so the grid sits even across cards.

export type Office = "Houston" | "Orlando" | "Dubai";

export type TeamMember = {
  /** Placeholder until real names land. */
  name: string;
  role: string;
  office: Office;
  /** 1–2 sentences, ~25-30 words. Replace verbatim when real bios land. */
  bio: string;
  /** Square headshot URL. Local /team/<slug>.jpg paths will work too. */
  photo: string;
};

export type DisciplineGroup = {
  key: string;
  label: string;
  /** Optional one-line description rendered under the group eyebrow. */
  description?: string;
  members: TeamMember[];
};

// Stable pravatar id helper — each member gets a fixed face by id so the
// grid never shuffles between renders. https://i.pravatar.cc/{w}?img={n}
const face = (id: number) => `https://i.pravatar.cc/400?img=${id}`;

export const TEAM: DisciplineGroup[] = [
  {
    key: "leadership",
    label: "Leadership",
    description: "Senior direction across both regions.",
    members: [
      {
        name: "Pierre Alkhoury",
        role: "Group Creative Director · Managing Director, Dubai",
        office: "Dubai",
        bio: "Pierre brings over 20 years in creative and production across the region's leading agencies and branding firms — from artworking and press production to digital and Arabic copywriting — having learned the craft from the studio floor up. As Group Creative Director, he sets the creative direction across Lava Design's studios in the US and Dubai, and as Managing Director of the Dubai studio he leads its 2D, 3D, branding, and activation work. His hands-on background lets him take a project from first strategy through final delivery.",
        photo: "/team/pierre-alkhoury.webp",
      },
      {
        name: "Rached Alkhoury",
        role: "Managing Director, US · Group Civil Engineering Lead",
        office: "Houston",
        bio: "Rached Alkhoury leads Lava Design's US practice as Managing Director and serves as the group's Civil Engineering lead. A construction management professional with over 20 years delivering complex projects across commercial, industrial, infrastructure, oil & gas, and heavy civil sectors, he holds a bachelor's degree in civil engineering and specializes in end-to-end project delivery — planning, scheduling, procurement, cost control, and field operations. From mid- and high-rise buildings to water infrastructure, medical fit-outs, and large-scale developments, he keeps owner, contractor, and vendor coordination tight and projects on budget and on time. He anchors the studio's engineering delivery across Houston and Orlando.",
        photo: "/team/rached-alkhoury.webp",
      },
    ],
  },
  {
    key: "engineering-architecture",
    label: "Engineering & Architecture",
    description:
      "Our US practice — permit-ready building systems, structural, and civil design.",
    members: [
      {
        name: "David Park",
        role: "Engineering Lead / Engineer of Record",
        office: "Houston",
        bio: "Stamps the drawings that go to permit. Twenty years between large consulting practices before joining the studio in 2018, on the strength of a single complicated job.",
        photo: face(5),
      },
      {
        name: "Sarah Beaumont",
        role: "Mechanical Engineer (MEP)",
        office: "Houston",
        bio: "Sizes the air for healthcare suites, restaurant kitchens, and everything in between. Believes a quiet building is a well-designed one, and chases that quietness without exception.",
        photo: face(7),
      },
      {
        name: "Tomás Carvalho",
        role: "Electrical Engineer",
        office: "Houston",
        bio: "Plans the power, the lighting, and the spaces in between — from main switchgear down to the receptacle by the bed. Detail follows the same logic at every scale.",
        photo: face(8),
      },
      {
        name: "Anita Frye",
        role: "Plumbing Engineer",
        office: "Orlando",
        bio: "Routes water, gas, and waste with the patience of someone who knows the consequences of getting it wrong. Likes nothing better than a clean isometric.",
        photo: face(11),
      },
      {
        name: "Kenji Aoki",
        role: "Structural Engineer",
        office: "Orlando",
        bio: "Calculates loads in steel, concrete, and timber. Carries a moment-frame argument into lunch and out the other side. Originally trained as a bridge engineer.",
        photo: face(12),
      },
      {
        name: "Renata Olivares",
        role: "Civil Engineer",
        office: "Houston",
        bio: "Engineers the site — grading, drainage, the way a building meets the land. Background in municipal water utilities before going private, and it shows in her detentions.",
        photo: face(13),
      },
      {
        name: "Idris Mahfouz",
        role: "Architectural Designer",
        office: "Orlando",
        bio: "Lays out the plan, sections, and elevations. Trained at a small firm in Beirut before settling in Florida, and brings that early-career rigor to every set.",
        photo: face(14),
      },
      {
        name: "Janelle Pierce",
        role: "Permit & Code Coordinator",
        office: "Houston",
        bio: "Reads the International Building Code the way most people read novels. Has walked drawings through more AHJs than she can count, and remembers each one's quirks.",
        photo: face(15),
      },
    ],
  },
  {
    key: "2d-3d-design",
    label: "2D & 3D Design",
    description:
      "Brand, graphic, and visualization work, anchored in our Dubai studio.",
    members: [
      {
        name: "Yara Mansour",
        role: "Design Lead / Creative Director",
        office: "Dubai",
        bio: "Leads the brand and visualization side of the practice. Started in editorial print, moved into spatial and environmental design, and brings the same rigor to both.",
        photo: face(16),
      },
      {
        name: "Omar Faisal",
        role: "Graphic Designer",
        office: "Dubai",
        bio: "Wordmarks, layouts, and the small typographic decisions that hold a brand together. Quietly opinionated about kerning, and slightly less quiet about the right use of a hyphen.",
        photo: face(17),
      },
      {
        name: "Priya Iyer",
        role: "3D Visualization Artist",
        office: "Dubai",
        bio: "Renders spaces before they're built — light, material, atmosphere. An architecture training that turned toward the camera somewhere between the third and fourth year.",
        photo: face(20),
      },
      {
        name: "Adel Sayed",
        role: "Artworking / Production Designer",
        office: "Dubai",
        bio: "Production files, print specs, and the unglamorous craft that turns a design file into a thing the printer can actually output. The studio's quiet backbone.",
        photo: face(22),
      },
    ],
  },
  {
    key: "interiors-architecture",
    label: "Interiors & Architecture",
    description: "Spatial design and space planning across both regions.",
    members: [
      {
        name: "Layla Nassar",
        role: "Interior Designer",
        office: "Dubai",
        bio: "Resolves the inside of a space — material, finish, and the way a room is actually used. Cares as much about a door handle as a hero wall.",
        photo: face(23),
      },
      {
        name: "Marco Vélez",
        role: "Architectural / Space Planner",
        office: "Orlando",
        bio: "Plans how a space works at the scale of its occupants. A background in retail design before broadening into hospitality and corporate, and the layouts show it.",
        photo: face(24),
      },
    ],
  },
  {
    key: "events-activations",
    label: "Events & Activations",
    description: "Live brand experiences, from concept to build.",
    members: [
      {
        name: "Hala Khouri",
        role: "Events & Activations Lead",
        office: "Dubai",
        bio: "Designs live brand experiences from first idea through final load-out, and is generally backstage on the night. Started in theatrical production design before crossing over.",
        photo: face(26),
      },
      {
        name: "Reza Mirzadeh",
        role: "Production / Fabrication Coordinator",
        office: "Dubai",
        bio: "Sources the materials and the trades that turn a render into a thing you can stand inside. Knows every fabricator in the region by first name.",
        photo: face(28),
      },
    ],
  },
  {
    key: "studio-operations",
    label: "Studio Operations",
    description: "The people who keep projects moving.",
    members: [
      {
        name: "Camille Whitley",
        role: "Project Manager",
        office: "Houston",
        bio: "Keeps schedules honest and budgets in sight from kickoff through closeout. The reason a project that starts well also ends well, and on time.",
        photo: face(30),
      },
      {
        name: "Khalid Bishara",
        role: "Client / Account Manager",
        office: "Dubai",
        bio: "First point of contact for new work and ongoing accounts. Translates a brief into a scope the studio can actually deliver against, line item by line item.",
        photo: face(33),
      },
    ],
  },
];
