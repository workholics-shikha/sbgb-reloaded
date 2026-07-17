import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import sbgbLogo from "@/assets/sbgb-logo.png";
import { navLinks } from "./SiteHeader";

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/sbgbteam/",
    icon: Facebook,
  },
  {
    label: "X",
    href: "https://twitter.com/sbgbteam",
    icon: Twitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sbgbteam/",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCOQAQS7J5cKft2mlwjpZn-A",
    icon: Youtube,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={sbgbLogo}
              alt="SBGBT logo"
              width={52}
              height={52}
              className="size-12 rounded-full bg-cream object-contain p-1"
            />
            <div>
              <div className="font-display text-xl font-black">SBGBT</div>
              <div className="text-xs text-cream/60">सोच बदलो · गांव बदलो</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
            ग्रामीण भारत में शिक्षा, सशक्तिकरण, स्वास्थ्य और सतत विकास के माध्यम से
            सकारात्मक बदलाव लाने वाला एक जमीनी सामाजिक अभियान।
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-full bg-cream/10 transition hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-widest text-cream/50">मेन्यू</div>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-widest text-cream/50">संपर्क</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href="mailto:sbgbteam@gmail.com" className="hover:text-accent">
                sbgbteam@gmail.com
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href="tel:+919314408609" className="hover:text-accent">
                +91 93144 08609
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>सरमथुरा, धौलपुर, राजस्थान</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-cream/50 sm:px-6">
          <div>© {new Date().getFullYear()} सोच बदलो गांव बदलो टीम। सर्वाधिकार सुरक्षित।</div>
          <div>ग्रामीण भारत के लिए समर्पित।</div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  hi,
  sub,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  hi?: string;
  sub?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="grain-bg relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,rgba(255,166,0,0.12),transparent_24%),radial-gradient(circle_at_70%_65%,rgba(24,122,92,0.08),transparent_22%),linear-gradient(135deg,rgba(255,247,232,0.98),rgba(249,245,235,0.97)_52%,rgba(244,249,245,0.98))]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[9%] top-12 h-28 w-28 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-[10%] top-16 h-36 w-36 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-8 left-[45%] h-24 w-24 rounded-full bg-leaf/8 blur-3xl" />
        <div className="absolute inset-y-0 right-[18%] hidden w-px bg-gradient-to-b from-transparent via-primary/8 to-transparent lg:block" />
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(115deg,transparent_0%,transparent_58%,rgba(255,255,255,0.22)_70%,transparent_82%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
        <div className={`relative grid items-center gap-10 ${imageSrc ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="size-1.5 rounded-full bg-accent" /> {eyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-black text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {hi && <p className="mt-3 font-hi text-xl text-earth sm:text-2xl">{hi}</p>}
            {sub && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {sub}
              </p>
            )}
          </div>

          {imageSrc && (
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <img
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  className="aspect-[5/3.8] w-full rounded-[1.4rem] object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
