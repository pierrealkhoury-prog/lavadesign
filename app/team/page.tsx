import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TEAM, type DisciplineGroup, type TeamMember } from "@/lib/team";

const PAGE_DESCRIPTION =
  "The people and disciplines behind Lava Design — engineering, architecture, design, and events across our Houston, Orlando, and Dubai studios.";

export const metadata: Metadata = {
  title: "Team",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Team",
    description: PAGE_DESCRIPTION,
    url: "/team",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Team",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

/**
 * /team — the studio organized by discipline, now with named members,
 * placeholder bios, and placeholder pravatar headshots. The shape of
 * lib/team.ts is production-ready: swap the placeholder fields for real
 * values and the layout stays put.
 *
 * Tonal rhythm matches the home-page lighting pass: alternating obsidian /
 * basalt bands, ember hairlines at the top of every basalt band, Reveal
 * scroll-ins per group.
 */
export default function TeamPage() {
  return (
    <>
      <HeroIntro />
      {TEAM.map((group, i) => (
        <GroupSection
          key={group.key}
          group={group}
          band={i % 2 === 0 ? "basalt" : "obsidian"}
        />
      ))}
      <ClosingCta />
    </>
  );
}

function HeroIntro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
          Team
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-7xl md:text-8xl">
          One studio,
          <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl md:text-6xl">
            every discipline.
          </span>
        </h1>
        <p className="mt-10 max-w-3xl font-serif text-xl leading-relaxed text-smoke md:text-2xl">
          Lava Design is built as a single studio working across engineering,
          architecture, design, and events. Our teams are organized by
          discipline and spread across three studios — Houston, Orlando, and
          Dubai — but they operate as one practice, so every project draws on
          whatever mix of skills it needs.
        </p>
      </Reveal>
    </section>
  );
}

function GroupSection({
  group,
  band,
}: {
  group: DisciplineGroup;
  band: "basalt" | "obsidian";
}) {
  const isBasalt = band === "basalt";
  return (
    <section
      className={
        isBasalt
          ? "relative border-y border-border bg-basalt"
          : "relative"
      }
    >
      {isBasalt ? <EmberHairline /> : null}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 md:py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember text-glow-ember">
            {group.label}
          </p>
          {group.description ? (
            <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-smoke">
              {group.description}
            </p>
          ) : null}
          <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((m) => (
              <li key={m.name}>
                <MemberCard member={m} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-md border border-border bg-obsidian/40 p-5 transition-colors duration-300 hover:border-ember/40">
      {/* Square headshot — consistent crop across all cards. Placeholder
          faces come from pravatar.cc; using plain <img> until real local
          photos land in /public/team/*. width/height set to keep CLS=0. */}
      <div className="aspect-square w-full overflow-hidden rounded bg-charcoal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.photo}
          alt={member.name}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.01em] text-ash">
            {member.name}
          </h3>
          <span className="inline-flex shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-smoke">
            {member.office}
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
          {member.role}
        </p>
        <p className="font-serif text-sm leading-relaxed text-smoke">
          {member.bio}
        </p>
      </div>
    </article>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-md border border-border bg-basalt p-10 md:flex-row md:items-center md:justify-between md:p-16">
          <div>
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-[-0.01em] text-ash sm:text-5xl">
              Want to work
              <span className="block font-serif text-2xl font-normal italic tracking-normal text-ember sm:text-4xl">
                with us?
              </span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base text-smoke">
              We&rsquo;re always interested in talented people and ambitious
              projects.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-lava px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-ember"
            >
              Start a project →
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ash transition-colors hover:border-ash"
            >
              See our work →
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Ember-tinted hairline at the top of a tonal band — matches home page. */
function EmberHairline() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(245,176,75,0.45), transparent)",
      }}
    />
  );
}
