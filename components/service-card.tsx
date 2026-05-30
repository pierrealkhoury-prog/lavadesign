import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import type { Service } from "@/lib/services";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  /** Used for the small 01–10 tabular numeral above the title. */
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block focus:outline-none"
    >
      <div className="flex flex-col gap-6 transition-transform duration-300 group-hover:-translate-y-1">
        <ImageSlot
          src={service.heroImage}
          alt={service.title}
          gradient={service.gradient}
          aspect="aspect-[4/3]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="group-focus-visible:ring-2 group-focus-visible:ring-lava"
        />
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs tabular-nums text-ember">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl font-black uppercase tracking-[-0.01em] text-ash sm:text-3xl">
            {service.title}
          </h3>
        </div>
        <p className="font-serif text-lg italic leading-snug text-ember">
          {service.tagline}
        </p>
        <p className="font-serif text-base leading-relaxed text-smoke">
          {service.summary}
        </p>
        <span className="mt-2 inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors group-hover:text-ember">
          Explore service →
        </span>
      </div>
    </Link>
  );
}
