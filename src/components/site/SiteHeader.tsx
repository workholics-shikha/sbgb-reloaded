import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Facebook,
  HandHeart,
  Instagram,
  Mail,
  Menu,
  Phone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import sbgbLogo from "@/assets/sbgb-logo.png";

export const navLinks = [
  { to: "/", label: "होम" },
  { to: "/about", label: "हमारे बारे में" },
  { to: "/activities", label: "हमारे कार्य" },
  { to: "/gallery", label: "गैलरी" },
  { to: "/media", label: "मीडिया" },
  { to: "/spgbp", label: "एसपीजीबीपी" },
  { to: "/contact", label: "संपर्क" },
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
      <div className="hidden bg-primary text-xs text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-5">
            <a href="mailto:sbgbteam@gmail.com" className="flex items-center gap-2 hover:opacity-80">
              <Mail className="size-3.5" />
              sbgbteam@gmail.com
            </a>
            <a href="tel:+919314408609" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="size-3.5" />
              +91 93144 08609
            </a>
          </div>
          <div className="flex items-center gap-3 opacity-90">
            <a href="#" aria-label="Facebook">
              <Facebook className="size-3.5" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="size-3.5" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="size-3.5" />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur"
            : "bg-background/60 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={sbgbLogo}
              alt="SBGBT logo"
              width={52}
              height={52}
              className="size-12 shrink-0 rounded-full object-contain bg-card p-1 shadow-sm"
            />
            <div className="min-w-0">
              <div className="truncate font-display text-lg leading-tight font-black">SBGBT</div>
              <div className="truncate text-[11px] leading-tight text-muted-foreground">
                Soch Badlo · Gaon Badlo
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="text-foreground/75 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/donate"
              className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:brightness-95 sm:inline-flex"
            >
              <HandHeart className="size-4" />
              दान करें
            </Link>
            <button
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-10 place-items-center rounded-full border border-border lg:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border/60 py-2.5 text-sm font-medium last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
              to="/donate"
              onClick={() => setMenuOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground"
            >
              <HandHeart className="size-4" />
              दान करें
            </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
