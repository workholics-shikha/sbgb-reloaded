import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter, socialLinks } from "@/components/site/SiteFooter";
import contactHeroReal from "@/assets/contact-hero-real.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "संपर्क करें | SBGBT" },
      { name: "description", content: "सोच बदलो गांव बदलो टीम से संपर्क करें — ईमेल, फोन और कार्यालय पता, सरमथुरा, धौलपुर, राजस्थान।" },
      { property: "og:title", content: "संपर्क करें | SBGBT" },
      { property: "og:description", content: "स्वयंसेवा, साझेदारी, मीडिया या कार्यक्रमों के लिए SBGBT टीम से जुड़ें।" },
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
        eyebrow="संपर्क"
        title="हमें लिखें। हम हर संदेश का उत्तर देने का प्रयास करते हैं।"
        hi="संपर्क करें"
        sub="साझेदारी, स्वयंसेवा, मीडिया से जुड़ी जानकारी या SPGBP के बारे में प्रश्न — SBGBT टीम आपसे एक संदेश की दूरी पर है।"
        imageSrc={contactHeroReal}
        imageAlt="SBGBT community meeting"
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "ईमेल", value: "sbgbteam@gmail.com", href: "mailto:sbgbteam@gmail.com" },
            { icon: Phone, label: "फोन", value: "+91 93144 08609", href: "tel:+919314408609" },
            { icon: MapPin, label: "कार्यालय", value: "उत्थान भवन, सरमथुरा, धौलपुर, राजस्थान — 328024" },
            { icon: Clock, label: "समय", value: "सोमवार – शनिवार · 10:00 – 18:00 IST" },
          ].map((x) => (
            <a key={x.label} href={x.href ?? "#"} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <x.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{x.label}</div>
                <div className="mt-1 break-words font-semibold text-foreground">{x.value}</div>
              </div>
            </a>
          ))}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">जुड़ें</div>
            <div className="mt-3 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <h2 className="font-display text-2xl font-black sm:text-3xl">संदेश भेजें</h2>
          <p className="mt-2 text-sm text-muted-foreground">हम सामान्यतः 48 घंटों के भीतर उत्तर देते हैं।</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">नाम</span>
              <input required className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="अपना नाम लिखें" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">ईमेल</span>
              <input required type="email" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="you@example.com" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">विषय</span>
              <input className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="स्वयंसेवा, साझेदारी, मीडिया…" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">संदेश</span>
              <textarea required rows={5} className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" placeholder="हमें बताइए कि आप कैसे जुड़ना चाहते हैं।" />
            </label>
          </div>

          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110">
            <Send className="size-4" /> संदेश भेजें
          </button>
          {sent && (
            <p className="mt-4 text-sm font-semibold text-primary">✓ धन्यवाद — आपका संदेश दर्ज कर लिया गया है।</p>
          )}
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}
