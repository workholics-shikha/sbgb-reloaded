import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
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

const footerPrograms = [
  "ग्रामीण शिक्षा सशक्तिकरण",
  "महिला नेतृत्व पहल",
  "जन जागरूकता अभियान",
  "ग्रीन विलेज - क्लीन विलेज",
  "स्वास्थ्य एवं समाज सेवा",
] as const;

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-[linear-gradient(135deg,#083a32_0%,#0d4b3e_48%,#08352d_100%)] text-cream">
      <div className="absolute inset-0 opacity-[0.22]">
        <div className="h-full w-full bg-[length:42px_24px] bg-[linear-gradient(135deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%),linear-gradient(225deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_25%_0%,rgba(214,181,74,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
        <div className="grid gap-10 border-b border-white/8 pb-14 lg:grid-cols-[1.15fr_0.8fr_0.95fr_1fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_14px_30px_-14px_rgba(214,181,74,0.75)]">
                <img
                  src={sbgbLogo}
                  alt="SBGBT logo"
                  width={44}
                  height={44}
                  className="size-11 rounded-full bg-cream object-contain p-1"
                />
              </div>
              <div>
                <div className="font-display text-[2rem] font-black leading-none text-white">SBGBT.</div>
                <div className="mt-1 text-sm text-cream/68">सोच बदलो, गांव बदलो टीम</div>
              </div>
            </div>
            <p className="mt-7 text-base leading-8 text-cream/84">
              हमने ग्रामीण शिक्षा, महिला सशक्तिकरण, जनजागरूकता और समाज निर्माण से जुड़े अपने काम को
              लोगों तक सरल और प्रभावी रूप में पहुंचाने का संकल्प लिया है.
            </p>
          </div>

          <div>
            <h3 className="font-display text-3xl font-black text-white">Quick Links</h3>
            <ul className="mt-7 space-y-4 text-[17px] text-cream/88">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.to} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <Link to={link.to} className="transition hover:translate-x-1 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-3xl font-black text-white">Our Programs</h3>
            <ul className="mt-7 space-y-4 text-[17px] text-cream/88">
              {footerPrograms.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-3xl font-black text-white">Our Location</h3>
            <div className="mt-7 flex items-start gap-4 text-[17px] leading-8 text-cream/88">
              <div className="grid size-11 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/12 text-accent">
                <MapPin className="size-5" />
              </div>
              <p>सरमथुरा, धौलपुर, राजस्थान, भारत</p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-7">
              <div className="text-2xl font-black text-white">Follow Us On Socials:</div>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-white/12 bg-white/6 text-cream transition hover:-translate-y-1 hover:border-accent/45 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="size-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/8 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter Email Address*"
              className="h-14 min-w-0 flex-1 rounded-2xl border border-white/8 bg-white/10 px-5 text-base text-white outline-none placeholder:text-cream/55 focus:border-accent/40"
            />
            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#f1bd1a] px-7 text-base font-bold text-[#13362e] shadow-[0_18px_38px_-20px_rgba(240,200,75,0.85)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Subscribe <ArrowUpRight className="size-4" />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-4 border-white/8 sm:border-r sm:pr-5">
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Mail className="size-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">Email Address</div>
                <a href="mailto:sbgbteam@gmail.com" className="mt-1 block text-lg text-cream/82 transition hover:text-accent">
                  sbgbteam@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:pl-2">
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <Phone className="size-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">Phone Number</div>
                <a href="tel:+919314408609" className="mt-1 block text-lg text-cream/82 transition hover:text-accent">
                  +91 93144 08609
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-7 text-center text-sm text-cream/72">
          Copyright © {new Date().getFullYear()} SBGBT. All rights reserved.
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
            <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
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
