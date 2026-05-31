# Build Spec — Team / Studio Structure Page (/team)

A new standalone page at /team showing the studio's structure by discipline, with office labels.
PLACEHOLDER VERSION: roles only, clean typographic layout — no photos, no names yet. Designed so
it converts cleanly to a named/photo version later (each role becomes a person card).

## Routing & nav
- New route: app/team/page.tsx
- Add "Team" to the main nav (site-nav) and footer nav, between "Studio" and "Contact"
  (so order is: Work · Services · Studio · Team · Contact). Confirm placement looks balanced.
- Metadata: title "Team" (renders "Team · Lava Design" via the template). Description:
  "The people and disciplines behind Lava Design — engineering, architecture, design, and events
  across our Houston, Orlando, and Dubai studios."

## Page structure

### Hero / intro band
- Mono breadcrumb: TEAM
- H1 (display): "One studio,"  +  italic ember line: "every discipline."
- Intro paragraph (ash serif, max-w-3xl):
  "Lava Design is built as a single studio working across engineering, architecture, design, and
  events. Our teams are organized by discipline and spread across three studios — Houston,
  Orlando, and Dubai — but they operate as one practice, so every project draws on whatever mix of
  skills it needs."
- Subtle ember hairline divider below, consistent with the home-page lighting pass.

### Discipline groups
Render each group as a section with: a mono eyebrow label (with the ember text-glow used
elsewhere), an optional one-line description, and a list of roles. Each role shows the role title
and an office tag. Use the same tonal-variation rhythm as the home page (alternate obsidian /
basalt bands) and ember hairlines between groups.

Office tags: render as small mono uppercase chips — HOUSTON, ORLANDO, DUBAI. Where a role spans
offices, show the most relevant one (per below). Keep tags visually quiet (smoke/ash), not loud.

Layout per group: a clean two-column list on desktop (role left, office tag right), single column
on mobile. Roles-only — no avatars, no empty photo slots. Generous spacing, editorial feel.

---

**LEADERSHIP**
(no description line — or: "Senior direction across both regions.")
- Founder / Principal — Houston
- Managing Director — Houston

**ENGINEERING & ARCHITECTURE**
Description: "Our US practice — permit-ready building systems, structural, and civil design."
- Engineering Lead / Engineer of Record — Houston
- Mechanical Engineer (MEP) — Houston
- Electrical Engineer — Houston
- Plumbing Engineer — Orlando
- Structural Engineer — Orlando
- Civil Engineer — Houston
- Architectural Designer — Orlando
- Permit & Code Coordinator — Houston

**2D & 3D DESIGN**
Description: "Brand, graphic, and visualization work, anchored in our Dubai studio."
- Design Lead / Creative Director — Dubai
- Graphic Designer — Dubai
- 3D Visualization Artist — Dubai
- Artworking / Production Designer — Dubai

**INTERIORS & ARCHITECTURE**
Description: "Spatial design and space planning across both regions."
- Interior Designer — Dubai
- Architectural / Space Planner — Orlando

**EVENTS & ACTIVATIONS**
Description: "Live brand experiences, from concept to build."
- Events & Activations Lead — Dubai
- Production / Fabrication Coordinator — Dubai

**STUDIO OPERATIONS**
Description: "The people who keep projects moving."
- Project Manager — Houston
- Client / Account Manager — Dubai

---

### Closing CTA
Reuse the standard CTA pattern from other pages:
- H2 (display): "Want to work with us?"
- Sub: "We're always interested in talented people and ambitious projects."
- Two links: "Start a project → /contact"  and  "See our work → /work"

## Implementation notes
- Build the roles as a typed data array (e.g. lib/team.ts) grouped by discipline, so the page maps
  over it. Structure each entry as { role, office } under a discipline key. This makes the later
  swap to named people easy — just add name/photo/bio fields to each entry and the page upgrades.
- Match the site's existing type scale, fonts (Archivo Expanded display, Fraunces serif, Space
  Mono mono), and molten tokens. Reuse the Reveal component for scroll-in on each group.
- Keep it roles-only for now: NO photo placeholders, NO "Team Member" name slots — the typographic
  treatment is the point. Office tags are the only per-role adornment.
- Respect prefers-reduced-motion on any reveal animation.
- This is presented as the studio's disciplines and structure, not a headcount claim — the intro
  copy frames it that way intentionally; keep that framing.

## Show before commit
Show me /team at desktop (1440) and mobile (390) before committing.
