import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Youtube, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import contactHeroReal from "@/assets/contact-hero-real.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SBGBT — Reach the team" },
      { name: "description", content: "Get in touch with Soch Badlo Gaon Badlo Team — email, phone, office address in Sarmathura, Dholpur, Rajasthan." },
      { property: "og:title", content: "Contact SBGBT" },
      { property: "og:description", content: "Reach the SBGBT team for volunteering, partnerships, media or programs." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="Get in touch"
        title="Write to us. We answer every message."
        hi="संपर्क करें"
        sub="Partnerships, volunteering, media enquiries, or a question about SPGBP — the SBGBT team is one message away."
        imageSrc={contactHeroReal}
        imageAlt="SBGBT community meeting"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "sbgbteam@gmail.com", href: "mailto:sbgbteam@gmail.com" },
            { icon: Phone, label: "Phone", value: "+91 93144 08609", href: "tel:+919314408609" },
            { icon: MapPin, label: "Office", value: "Utthan Bhavan, Sarmathura, Dholpur, Rajasthan — 328024" },
            { icon: Clock, label: "Hours", value: "Mon – Sat · 10:00 – 18:00 IST" },
          ].map(x => (
            <a key={x.label} href={x.href ?? "#"} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition">
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                <x.icon className="size-5"/>
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{x.label}</div>
                <div className="mt-1 font-semibold text-foreground break-words">{x.value}</div>
              </div>
            </a>
          ))}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Follow</div>
            <div className="mt-3 flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
                <a key={i} href="#" className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition">
                  <I className="size-4"/>
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-black">Send a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">We usually reply within 48 hours.</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Name</span>
              <input required className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Your name"/>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</span>
              <input required type="email" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="you@example.com"/>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Subject</span>
              <input className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Volunteering, partnership, media…"/>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</span>
              <textarea required rows={5} className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary resize-none" placeholder="Tell us how you'd like to get involved."/>
            </label>
          </div>

          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:brightness-110 transition shadow-lg">
            <Send className="size-4"/> Send message
          </button>
          {sent && (
            <p className="mt-4 text-sm text-primary font-semibold">✓ Thank you — your message has been recorded.</p>
          )}
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}
