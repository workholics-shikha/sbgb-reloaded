import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail, Phone, Facebook, Youtube, Instagram, Twitter, Menu, X, HandHeart,
} from "lucide-react";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/activities", label: "Activities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/media", label: "Media" },
  { to: "/spgbp", label: "SPGBP" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden md:block bg-primary text-primary-foreground text-xs">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="mailto:sbgbteam@gmail.com" className="flex items-center gap-2 hover:opacity-80"><Mail className="size-3.5"/>sbgbteam@gmail.com</a>
            <a href="tel:+919314408609" className="flex items-center gap-2 hover:opacity-80"><Phone className="size-3.5"/>+91 93144 08609</a>
          </div>
          <div className="flex items-center gap-3 opacity-90">
            <a href="#" aria-label="Facebook"><Facebook className="size-3.5"/></a>
            <a href="#" aria-label="Twitter"><Twitter className="size-3.5"/></a>
            <a href="#" aria-label="Instagram"><Instagram className="size-3.5"/></a>
            <a href="#" aria-label="YouTube"><Youtube className="size-3.5"/></a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-background/85 backdrop-blur border-b border-border" : "bg-background/60 backdrop-blur-sm"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display font-black text-lg">S</div>
            <div className="min-w-0">
              <div className="font-display font-black text-lg leading-tight truncate">SBGBT</div>
              <div className="text-[11px] text-muted-foreground leading-tight truncate">Soch Badlo · Gaon Badlo</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="text-foreground/75 hover:text-primary transition-colors"
              >{l.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/donate" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-95 transition">
              <HandHeart className="size-4"/> Donate
            </Link>
            <button onClick={() => setMenuOpen(v=>!v)} className="lg:hidden grid place-items-center size-10 rounded-full border border-border" aria-label="Menu">
              {menuOpen ? <X className="size-5"/> : <Menu className="size-5"/>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col">
              {navLinks.map(l => (
                <Link key={l.to} to={l.to} onClick={()=>setMenuOpen(false)} className="py-2.5 text-sm font-medium border-b border-border/60 last:border-0">{l.label}</Link>
              ))}
              <Link to="/donate" onClick={()=>setMenuOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground">
                <HandHeart className="size-4"/> Donate
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
