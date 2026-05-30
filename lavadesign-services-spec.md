# Build Spec — Services Pages (Phase 1.6)

Goal: build the `/services` section — a main overview page plus individual service detail
pages. Engineering & architecture is the **focus**; design services (web, branding,
packaging, marketing materials) are a **distinct secondary section**. This also fixes the
home page "Our services" button, which should now point to `/services`.

All copy below is real (from lavadesign.us and Lava Prints). Use the existing molten design
tokens, fonts, ImageSlot component, Reveal component, nav, and footer. Content only — NO buy
buttons or pricing yet (those come in a later commerce phase). Every service detail page ends
with a "Start a project" CTA → /contact.

---

## Routes

- `/services` — overview page (all services, grouped)
- `/services/[slug]` — individual service detail pages

Put service data in a `lib/services.ts` file (mirroring lib/projects.ts) so content is easy
to edit without touching layout. Each service: `slug, title, category('engineering' |
'design'), tagline, summary, body[] (paragraphs), capabilities[] (bullet list), heroImage?`.

---

## `/services` overview page

### Hero band
Heading: **Comprehensive design solutions.**
Sub: We offer a wide range of engineering design services, alongside construction
administration for residential and commercial projects — from new builds and additions to
alterations, changes of occupancy, and renovations. Our strength is lead time and
communication: we keep you close to every detail of the job, leaving no vague points.

### Group 1 — Engineering & Architecture (THE FOCUS)
Intro line, then a grid linking to each detail page. Six services (data below).

### Group 2 — Design Services (DISTINCT SECONDARY SECTION)
Visually set apart (different background tone + ember divider). Intro line clarifying these
complement the engineering studio. Grid linking to each detail page. Four services (data below).

### Closing CTA
"Let's begin building your dream." → /contact

---

## Service detail pages — data (real copy)

### ENGINEERING & ARCHITECTURE

**1. architectural-design — Architectural Design**
Tagline: Creativity and functionality, brought into form.
Summary: We turn ideas into tangible structures that inspire — whether a new build or a
renovation.
Body: Our architectural design service combines creativity and functionality to bring your
vision to life. We work from conceptual planning through to permit-ready documentation,
coordinating closely with structural and MEP disciplines so the design is buildable from day
one.
Capabilities: Conceptual Planning · Structural Coordination · Building-Permit Assistance ·
Construction Documentation

**2. structural-engineering — Structural Engineering**
Tagline: The framework everything stands on.
Summary: Building, foundation, and framing design with full seismic analysis.
Body: Our structural engineering covers building design, foundation design, CMU and
wood-frame design, and steel-structure design with seismic analysis — delivered as
permit-ready, contractor-biddable construction documents.
Capabilities: Building Design · Foundation Design · CMU & Wood-Frame · Steel Structure &
Seismic Analysis

**3. mechanical-plumbing — Mechanical & Plumbing Engineering**
Tagline: Comfort and systems, choreographed.
Summary: HVAC, plumbing, and process systems sized and documented to code.
Body: We design heat-load calculations and HVAC systems, refrigeration, complete plumbing and
water-supply systems, industrial process MP, and energy-compliance and control systems —
coordinated across the full building.
Capabilities: Heat-Load & HVAC · Plumbing & Water Supply · Refrigeration · Energy Compliance
· Control Systems

**4. electrical-engineering — Electrical Engineering**
Tagline: Power and light, by design.
Summary: Distribution, lighting, and low-current systems engineered to code.
Body: Our electrical design covers power distribution, interior and exterior lighting design,
photometric study, renewable-energy solutions, energy-code compliance calculations, and
low-current systems.
Capabilities: Power Distribution · Lighting Design · Photometric Study · Energy-Code
Compliance · Low-Current Systems

**5. civil-engineering — Civil Engineering**
Tagline: Everything that meets the ground.
Summary: Site development, grading, drainage, and utilities — fully documented.
Body: We handle site development and layout, paving and grading plans, drainage and utility
plans, storm-sewer details, and erosion control (SWPPP) — from dimensional control through
public connections.
Capabilities: Site Development · Grading & Paving · Drainage & Utilities · Storm Sewer ·
Erosion Control (SWPPP)

**6. interior-design — Interior Design & Renovation**
Tagline: Spaces designed to be lived in.
Summary: From space planning to full remodels, blending modern and classic.
Body: Elevate your space with our interior design expertise — space planning, material and
lighting selection, custom millwork, and energy-efficient upgrades — for both new interiors
and full renovations.
Capabilities: Space Planning · Material Selection · Lighting Design · Custom Millwork ·
Energy-Efficient Upgrades

### DESIGN SERVICES

**7. web-design — Web Design & Development**
Tagline: Distinct, high-performing digital identities.
Summary: Websites that attract customers, provoke engagement, and inspire growth.
Body: We build professional, elegant websites and themes that captivate your audience and
communicate your business message in the most attractive way possible. We integrate your site
with your domain and tailor the color scheme and typography to your brand identity, delivering
seamless user experiences across all devices.
Capabilities: Custom Web Design · Development · Responsive / All-Device · Brand-Matched Theming
· Domain Integration

**8. branding-identity — Logos & Branding**
Tagline: Start the journey toward your brand identity.
Summary: Custom-design a new identity, or refresh an existing one.
Body: A logo is the first thing customers see when they meet your brand — and it's worth a
thousand words. With our brand consultants and skilled designers, you can custom-design a new
company logo or refresh your existing one. A strong identity goes far beyond a name and a mark:
the perfect logo is memorable, simple, and unique, and we build it into a consistent system that
tells your audience who you are across every touchpoint.
Capabilities: Logo Design · Brand Identity Systems · Brand Refresh · Print Collateral · Social
Media Kit · Brand Consultation

**9. artworking — Artworking**
Tagline: Your art-production partner.
Summary: Specialized art-production support that extends the capacity of creative teams and agencies.
Body: We act as an extension of your team, handling the technical execution so your creatives stay
focused on creating. Our artworking designers adapt your designs for print and digital — Arabizing
and localizing, professional layout and artworking, vectorization, ready-to-print file preparation,
2D art, and magazine digitization — with font finesse, correct CMYK/RGB color, crop marks,
resolution, and careful proofing. Available as flexible hourly packages for one-off needs, or as
monthly retainers for agencies that want dedicated, on-call resources with priority turnaround.
Capabilities: Arabizing & Localizing · Layout & Artworking · Vectorization · Ready-to-Print · 2D
Art · Magazine Digitization · Hourly Packages & Monthly Retainers
Note for build: this is a retainer/subscription-style service — when the commerce phase arrives,
this is the design-side service that maps to recurring billing (mirrors the engineering retainer
model). For now, content only; CTA → /contact.

**10. marketing-materials — Marketing Materials**
Tagline: High-impact materials that get results.
Summary: Flyers, brochures, menus, and collateral that build recognition.
Body: We combine creative design with advanced print production to produce marketing
materials that look great and get results — flyers, brochures, leaflets, menus, and more,
designed to enhance brand recognition and customer engagement.
Capabilities: Flyers & Leaflets · Brochures · Menus · Promotional Collateral · Print Production

---

## Implementation notes
- Update the home page hero "Our services" button to point at `/services`.
- Image slots use ImageSlot with gradient fallback; Pierre adds molten imagery per service later.
- Keep the engineering group visually dominant; design services clearly secondary but polished.
- Detail pages: hero (image slot + title + tagline) → summary → body → capabilities list →
  "Start a project" CTA. Reuse the case-study page rhythm where it fits.
- No commerce/pricing. Show in dev server before committing.
