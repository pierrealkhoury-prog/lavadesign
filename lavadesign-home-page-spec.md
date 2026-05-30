# Build Spec — Rich Home Page (Phase 1.5)

Goal: replace the current skeletal home page with a full, image-driven studio home page.
Engineering & architecture is the **focus**; design services (web, branding, packaging)
appear as a **distinct secondary section**, not the lead. Use the existing molten design
tokens, fonts, and components. All copy below is real — use it, don't placeholder it.

Keep everything responsive. Reuse the WorkCard, nav, footer already built. Add atmosphere
and imagery between sections so the page never feels empty — section dividers, the molten
glow treatment, generous spacing, and image slots (gradient fallback where no asset yet).

---

## Section order (top to bottom)

### 1. Hero (keep / refine existing)
Headline: **We design across every dimension.**
Sub: From permit-ready engineering to brands, interiors, and live activations — Lava Design
is a multidisciplinary studio that carries an idea from the first sketch to the lights coming on.
Primary CTA: "See the Work" → /work · Secondary: "Our Services" → /services

### 2. Studio intro / story (NEW)
Short editorial band, large serif pull-quote feel. Real copy:
> Lava Design is a multidisciplinary engineering and design studio. We deliver comprehensive,
> permit-ready engineering — structural, mechanical, electrical, and civil — alongside
> architecture, interiors, and the brand and environmental design that brings a space to life.
> Two studios, Houston and Orlando, one team that thinks across disciplines.
Include a stat strip: 120+ Projects · 4 Engineering Disciplines · 2 US Studios · 15+ Years.

### 3. Engineering & Architecture — THE FOCUS (NEW, image-driven)
This is the hero capability block. Present the core engineering/architecture services with
real descriptions, each with an image slot (gradient fallback ok for now):

- **Architectural Design** — Creativity and functionality combined, from new builds to
  renovation. Conceptual planning, structural coordination, building-permit assistance.
- **Structural Engineering** — Building, foundation, CMU and wood-frame design, steel
  structure design and seismic analysis.
- **Mechanical & Plumbing** — Heat-load calculations, HVAC, refrigeration, plumbing and
  water-supply systems, energy compliance, control systems.
- **Electrical Engineering** — Power distribution, interior/exterior lighting design,
  photometric study, energy-code compliance, low-current systems.
- **Civil Engineering** — Site development, grading, drainage, paving, utilities, erosion
  control (SWPPP).
- **Interior Design & Renovation** — Space planning, material selection, lighting design,
  custom millwork, energy-efficient remodels.

Layout: a strong multi-column or alternating image/text grid. This section should feel like
the heart of the page.

### 4. Featured Work (keep existing featured grid)
Pull featured projects. Keep the 4-up grid just fixed. Heading: "Selected Work" · link to /work.

### 5. Design Services — DISTINCT SECONDARY SECTION (NEW)
Visually set apart (different background tone / divider) so it reads as a separate offering
from the engineering focus. Real copy:
- **Web Design & Development** — Distinct, high-performing digital identities that attract
  customers, provoke engagement, and inspire growth.
- **Branding & Identity** — Work with our brand consultants and designers to custom-design a
  new identity or refresh an existing one.
- **Artwork & Packaging** — Production-ready artwork and packaging design that makes products
  shelf-ready and on-brand.
Note (for later): these become purchasable in a future phase — for now they're descriptive,
with a "Start a project" / inquiry CTA, NOT a buy button yet.

### 6. Why Lava Design (NEW — from real site)
Four principles: **Innovation** (latest technologies and methodologies) · **Expertise**
(highly skilled, multi-disciplinary team) · **Quality** (highest standards on every project) ·
**Client-Centric** (tailored to each client's needs).

### 7. Studios / locations (NEW)
Two cards: **Houston, TX** — 12500 Barker Cypress Rd #18205, Cypress, TX 77429 · and
**Orlando, FL** — 268 Foxtail Loop, Davenport, FL 33837. Hours: Mon–Sat, 9–5.
Contact: info@lavadesign.us · +1 321 270 1208.

### 8. Contact CTA (keep existing)
"Let's build something worth seeing." → /contact

---

## Implementation notes
- Add image slots throughout (next/image with gradient fallback) so sections aren't bare;
  Pierre will supply molten imagery per section over time.
- Maintain the dark molten aesthetic, generous vertical rhythm, scroll-reveal on sections.
- Don't add login or commerce — content only. Buy buttons come in a later phase.
- Show the result in the dev server before committing.
