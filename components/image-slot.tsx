import Image from "next/image";

type ImageSlotProps = {
  /** Public-folder path. When unset, falls back to the gradient. */
  src?: string;
  alt?: string;
  /** Fallback gradient when there's no real image yet. */
  gradient: string;
  /** Container aspect class — e.g. "aspect-[4/3]", "aspect-video". */
  aspect?: string;
  /** Extra classes on the outer wrapper. */
  className?: string;
  /** Forwarded to next/image for responsive sizing. */
  sizes?: string;
  priority?: boolean;
};

/**
 * Bordered image well with a molten gradient fallback. Used in spec'd home
 * sections where Pierre will drop real imagery in over time — the slot
 * looks intentional today and just swaps to a real photo later.
 */
export function ImageSlot({
  src,
  alt = "",
  gradient,
  aspect = "aspect-[4/3]",
  className = "",
  sizes,
  priority = false,
}: ImageSlotProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md border border-border bg-basalt ${aspect} ${className}`}
      style={src ? undefined : { background: gradient }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
