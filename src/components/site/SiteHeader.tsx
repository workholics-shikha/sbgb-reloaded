import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Facebook,
  HandHeart,
  Headset,
  Instagram,
  Mail,
  Menu,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import sbgbLogo from "@/assets/sbgb-logo.png";

const desktopNavLinks = [
  { to: "/", label: "होम", hasMenu: false },
  { to: "/about", label: "हमारे बारे में", hasMenu: false },
  { to: "/activities", label: "हमारे कार्य", hasMenu: false },
  { to: "/media", label: "उत्थान पत्रिका", hasMenu: false },
  { to: "/gallery", label: "गैलरी", hasMenu: false },
  { to: "/media", label: "मीडिया कॉर्नर", hasMenu: true },
  { to: "/contact", label: "संपर्क", hasMenu: true },
  {
    to: "https://www.sbgbteam.com/sbgbp-registration",
    label: "रजिस्ट्रेशन",
    hasMenu: true,
    external: true,
  },
  { to: "#", label: "लॉगिन करें", hasMenu: true, external: true },
] as const;

export const navLinks = [
  { to: "/", label: "होम" },
  { to: "/about", label: "हमारे बारे में" },
  { to: "/activities", label: "हमारे कार्य" },
  { to: "/gallery", label: "गैलरी" },
  { to: "/media", label: "उत्थान पत्रिका" },
  { to: "/media", label: "मीडिया कॉर्नर" },
  { to: "/contact", label: "संपर्क" },
  { to: "https://www.sbgbteam.com/sbgbp-registration", label: "रजिस्ट्रेशन" },
  { to: "#", label: "लॉगिन करें" },
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
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 hidden px-5 md:block lg:px-8"
      >
        <motion.div
          animate={{
            boxShadow: scrolled
              ? "0 14px 32px -22px rgba(7,24,20,0.95)"
              : "0 10px 28px -22px rgba(7,24,20,0.9)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto flex h-[52px] max-w-[1650px] items-center justify-between rounded-b-[20px] bg-[#143c35] px-8 text-sm text-white"
        >
          <div className="flex items-center gap-8 font-medium">
            <a
              href="mailto:sbgbteam@gmail.com"
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
            >
              <Mail className="size-4 text-[#f1bd1a]" />
              sbgbteam@gmail.com
            </a>
            <a
              href="tel:+919314408609"
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
            >
              <Phone className="size-4 text-[#f1bd1a]" />
              +91 93144 08609
            </a>
          </div>

          <motion.div
            animate={{ opacity: scrolled ? 0.96 : 1, y: scrolled ? -1 : 0 }}
            transition={{ duration: 0.25 }}
            className="hidden items-center gap-2 text-[15px] font-semibold xl:flex"
          >
            <HandHeart className="size-4 text-[#f1bd1a]" />
            <span>शिक्षा, जागरूकता और ग्राम उत्थान के लिए SBGBT के साथ जुड़ें</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-5 text-sm font-medium xl:flex">
              <button className="flex items-center gap-1.5 transition-opacity duration-300 hover:opacity-80">
                USD
                <ChevronDown className="size-3.5" />
              </button>
              <button className="flex items-center gap-1.5 transition-opacity duration-300 hover:opacity-80">
                English
                <ChevronDown className="size-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="https://www.facebook.com/sbgbteam/"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="grid size-8 place-items-center rounded-full transition-colors duration-300 hover:bg-white/10"
              >
                <Facebook className="size-3.5" />
              </a>
              <a
                href="https://www.instagram.com/sbgbteam/"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="grid size-8 place-items-center rounded-full transition-colors duration-300 hover:bg-white/10"
              >
                <Instagram className="size-3.5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCOQAQS7J5cKft2mlwjpZn-A"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
                className="grid size-8 place-items-center rounded-full transition-colors duration-300 hover:bg-white/10"
              >
                <Youtube className="size-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.header
        animate={{
          backgroundColor: scrolled ? "rgba(245, 240, 223, 0.95)" : "rgba(245, 240, 223, 1)",
          boxShadow: scrolled
            ? "0 18px 40px -30px rgba(20,60,53,0.35)"
            : "0 0 0 rgba(20,60,53,0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="sticky top-[53px] z-40 backdrop-blur-md"
      >
        <div className="relative">
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-[1650px] items-center gap-5 px-5 py-4 sm:px-6 lg:px-8"
          >
            <Link to="/" className="flex shrink-0 items-center gap-3 lg:gap-4">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="grid size-[58px] shrink-0 place-items-center rounded-full bg-white shadow-[0_16px_30px_-24px_rgba(0,0,0,0.5)] ring-1 ring-[#143c35]/10"
              >
                <img
                  src={sbgbLogo}
                  alt="SBGBT logo"
                  width={42}
                  height={42}
                  className="size-[42px] object-contain"
                />
              </motion.div>

              <div className="min-w-0">
                <div className="truncate font-display text-[26px] font-black leading-none text-[#2b2017]">
                  SBGBT
                </div>
                <div className="truncate pt-1 text-[14px] leading-none text-[#7d6e5f]">
                  Soch Badlo · Gaon Badlo
                </div>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <motion.div
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
                className="relative flex h-[56px] w-fit max-w-[940px] shrink items-center justify-center overflow-hidden rounded-full px-12"
              >
                <nav className="flex items-center gap-5 pl-3 text-[16px] font-bold text-[#111111] xl:gap-6 xl:pl-4 xl:text-[16px]">
                  {desktopNavLinks.map((link) =>
                    link.external ? (
                      <a
                        key={`${link.label}-${link.to}`}
                        href={link.to}
                        target={link.to.startsWith("http") ? "_blank" : undefined}
                        rel={link.to.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center gap-1 whitespace-nowrap transition-transform duration-300 hover:-translate-y-0.5 hover:text-[#143c35]"
                      >
                        {link.label}
                        {link.hasMenu ? <ChevronDown className="size-3.5" /> : null}
                      </a>
                    ) : (
                      <Link
                        key={`${link.label}-${link.to}`}
                        to={link.to}
                        activeOptions={{ exact: link.to === "/" }}
                        activeProps={{ className: "text-[#143c35]" }}
                        className="flex items-center gap-1 whitespace-nowrap transition-transform duration-300 hover:-translate-y-0.5 hover:text-[#143c35]"
                      >
                        {link.label}
                        {link.hasMenu ? <ChevronDown className="size-3.5" /> : null}
                      </Link>
                    ),
                  )}
                </nav>
              </motion.div>
            </div>

            <div className="hidden shrink-0 lg:flex">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  to="/donate"
                  className="group inline-flex h-[56px] items-center gap-3 rounded-full bg-[linear-gradient(135deg,#f8c62f_0%,#efb116_100%)] px-5 pr-4 text-[14px] font-bold text-[#111111] shadow-[0_18px_30px_-24px_rgba(241,189,26,0.95)] ring-1 ring-[#d79d00]/15 transition-all duration-300 hover:brightness-105"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-white/28 ring-1 ring-white/35 transition-transform duration-300 group-hover:scale-105">
                    <HandHeart className="size-4 text-[#143c35]" />
                  </span>
                  <span>दान करें</span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5"></span>
                </Link>
              </motion.div>
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <Link
                to="/donate"
                className="hidden items-center gap-2 rounded-full bg-[linear-gradient(135deg,#f8c62f_0%,#efb116_100%)] px-3.5 py-2.5 text-sm font-bold text-[#111111] shadow-[0_16px_26px_-22px_rgba(241,189,26,0.95)] ring-1 ring-[#d79d00]/15 sm:inline-flex"
              >
                <span className="grid size-7 place-items-center rounded-full bg-white/30">
                  <HandHeart className="size-3.5 text-[#143c35]" />
                </span>
                <span>दान करें</span>
              </Link>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setMenuOpen((value) => !value)}
                className="grid size-11 place-items-center rounded-full border border-[#143c35]/10 bg-white text-[#143c35] shadow-sm transition-all duration-300 hover:bg-[#fff6d5]"
                aria-label="Menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.button>
            </div>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-[#fbf8ef] lg:hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="px-4 pb-5 sm:px-6"
              >
                <div className="rounded-[28px] bg-[#f1bd1a] p-3 shadow-[0_20px_36px_-26px_rgba(241,189,26,0.95)]">
                  <div className="mb-3 rounded-[22px] bg-[#efb914]/70 p-4 text-[#111111]">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-white/40">
                        <Headset className="size-5 text-[#143c35]" />
                      </div>
                      <div>
                        <div className="text-xs font-medium">Call Us Now</div>
                        <div className="text-sm font-extrabold">(+91)-93144-08609</div>
                      </div>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-1.5">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={`${link.label}-${link.to}-${index}`}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -6, opacity: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                      >
                        {link.to.startsWith("http") || link.to === "#" ? (
                          <a
                            href={link.to}
                            target={link.to.startsWith("http") ? "_blank" : undefined}
                            rel={link.to.startsWith("http") ? "noreferrer" : undefined}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#111111] transition-colors duration-300 hover:bg-white/35"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            activeOptions={{ exact: link.to === "/" }}
                            activeProps={{ className: "bg-white/55 text-[#143c35]" }}
                            className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#111111] transition-colors duration-300 hover:bg-white/35"
                          >
                            {link.label}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>

                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      to="/donate"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f8c62f_0%,#f39a0a_100%)] px-4 py-3 text-sm font-bold text-[#111111] ring-1 ring-[#d79d00]/15"
                    >
                      <span className="grid size-7 place-items-center rounded-full bg-white/30">
                        <HandHeart className="size-3.5 text-[#143c35]" />
                      </span>
                      <span>दान करें</span>
                      <span className="text-base">↗</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
