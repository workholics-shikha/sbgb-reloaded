import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { navLinks } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground font-display font-black">S</div>
            <div>
              <div className="font-display font-black text-xl">SBGBT</div>
              <div className="text-xs text-cream/60">Soch Badlo · Gaon Badlo</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-cream/70 max-w-md leading-relaxed">
            A grassroots non-profit rebuilding rural India through education, empowerment,
            health and sustainable development.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid size-9 place-items-center rounded-full bg-cream/10 hover:bg-accent hover:text-accent-foreground transition">
                <I className="size-4"/>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            {navLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Reach us</div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-accent shrink-0"/><a href="mailto:sbgbteam@gmail.com" className="hover:text-accent">sbgbteam@gmail.com</a></li>
            <li className="flex gap-3"><Phone className="size-4 mt-0.5 text-accent shrink-0"/><a href="tel:+919314408609" className="hover:text-accent">+91 93144 08609</a></li>
            <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-accent shrink-0"/><span>Sarmathura, Dholpur, Rajasthan</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-cream/50">
          <div>© {new Date().getFullYear()} Soch Badlo Gaon Badlo Team. All rights reserved.</div>
          <div>Made with intent, for rural India.</div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, hi, sub }: { eyebrow: string; title: string; hi?: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden grain-bg border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="size-1.5 rounded-full bg-accent"/> {eyebrow}
          </span>
          <h1 className="mt-5 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            {title}
          </h1>
          {hi && <p className="mt-3 font-hi text-xl sm:text-2xl text-earth">{hi}</p>}
          {sub && <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">{sub}</p>}
        </div>
      </div>
    </section>
  );
}
