import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import sbgbLogo from "@/assets/sbgb-logo.png";
import { navLinks } from "./SiteHeader";
import { motion } from "framer-motion";
import ecoNeedsLogo from "@/assets/econeeds-logo.png";
import workholicsLogo from "@/assets/workholicslogo.png";
import blogBgPaper from "@/assets/blog-bg-paper.png";
import heroHeartSprade from "@/assets/hero-heart-sprade.png";

const sectionRevealProps = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
};

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
                <div className="font-display text-[2rem] font-black leading-none text-white">SBGBT</div>
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

        <div className="grid gap-8 border-b border-white/8 py-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
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
  title,
  bottomWave = false,
  subtitle = "सोच बदलो, गांव बदलो टीम",
}: {
  title: string;
  subtitle?: string;
  bottomWave?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-[#155447] text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,210,92,0.08),transparent_18%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.07),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
        <div className="absolute -left-16 top-20 size-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-6 size-56 rounded-full bg-white/6 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 sm:pb-16 sm:pt-24">
          <div className="flex min-h-[130px] items-center justify-center text-center sm:min-h-[180px]">
            <div className="flex flex-col items-center">
              <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.04] text-balance text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <span className="mt-4 h-[4px] w-20 rounded-full bg-accent shadow-[0_8px_18px_-10px_rgba(241,189,26,0.9)] sm:w-24" />
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/78 sm:text-xs">
               {subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[-2px] h-[80px]" aria-hidden="true">
          <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0,96 C140,28 260,160 420,110 C600,40 720,176 900,112 C1080,42 1240,162 1440,92 L1440,180 L0,180 Z"
              fill="#f5f0df"
            />
          </svg>
        </div>
      </section>
  );
}

// === CTS section
export function CTASection() {
  return (
    <motion.section
        {...sectionRevealProps}
        id="donate"
        className="relative overflow-hidden bg-[#fbf7ef] text-[#143c35]"
      >
        <div
          className="absolute inset-0 bg-repeat opacity-[0.82]"
          style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.12))]" />
        <div className="absolute left-[4%] top-1/2 hidden -translate-y-1/2 xl:block">
          <img
            src={heroHeartSprade}
            alt=""
            aria-hidden="true"
            className="hero-heartbeat h-48 w-48 object-contain opacity-30"
            width={192}
            height={192}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <img
              src={heroHeartSprade}
              alt=""
              aria-hidden="true"
              className="hero-heartbeat h-5 w-5 object-contain opacity-70"
              width={20}
              height={20}
            />
            हमारे सहयोगी
          </span>
          <h2 className="mt-5 font-display text-2xl font-black text-balance text-[#143c35] sm:text-5xl lg:text-6xl">
            सहयोग से मजबूत होती यात्रा
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#35544c]/82">
            जिन साथियों और संस्थाओं ने शिक्षा, ग्राम विकास और जन-जागरूकता से जुड़े हमारे प्रयासों को मजबूती दी, उन्हें यहां सम्मानपूर्वक स्थान दिया गया है।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }} >
                  <img
                    src={ecoNeedsLogo}
                    alt="Eco Needs Foundation"
                    className="mx-auto h-20 w-auto object-contain sm:h-24"

                  />
                </div>
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}>
                  <img
                    src={workholicsLogo}
                    alt="Workholics"
                    className="mx-auto h-24 w-auto object-contain sm:h-28"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.section>
  );
}