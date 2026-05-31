import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

const PAGE_DESCRIPTION =
  "Tell us about your project. We reply to every serious enquiry within two working days.";

export const metadata: Metadata = {
  title: "Contact",
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Contact",
    description: PAGE_DESCRIPTION,
    url: "/contact",
    images: ["/opengraph-image"],
  },
  twitter: {
    title: "Contact",
    description: PAGE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 sm:px-10 md:grid-cols-12 md:py-32">
      <div className="md:col-span-5">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-ember">
          Contact
        </p>
        <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-ash sm:text-6xl">
          Start a
          <span className="block font-serif text-4xl font-normal italic tracking-normal text-ember sm:text-5xl">
            conversation.
          </span>
        </h1>
        <p className="mt-8 font-serif text-lg leading-relaxed text-smoke">
          Tell us about the project — what you&rsquo;re making, who it&rsquo;s
          for, and when you need it. We reply to every serious enquiry within
          two working days.
        </p>
        <dl className="mt-12 space-y-8">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
              Direct
            </dt>
            <dd className="mt-2 space-y-1 font-serif text-base text-ash">
              <p>
                <a
                  href="mailto:info@lavadesign.us"
                  className="transition-colors hover:text-ember"
                >
                  info@lavadesign.us
                </a>
              </p>
              <p>
                <a
                  href="tel:+13212701208"
                  className="transition-colors hover:text-ember"
                >
                  +1 321 270 1208
                </a>
              </p>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
              Houston Studio
            </dt>
            <dd className="mt-2 whitespace-pre-line font-serif text-base leading-relaxed text-ash">
              {"12500 Barker Cypress Rd #18205\nCypress, TX 77429"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
              Orlando Studio
            </dt>
            <dd className="mt-2 whitespace-pre-line font-serif text-base leading-relaxed text-ash">
              {"268 Foxtail Loop\nDavenport, FL 33837"}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">
              Hours
            </dt>
            <dd className="mt-2 font-serif text-base text-ash">
              Mon–Sat · 9–5
            </dd>
          </div>
        </dl>
      </div>

      <div className="md:col-span-6 md:col-start-7">
        <ContactForm />
      </div>
    </section>
  );
}
