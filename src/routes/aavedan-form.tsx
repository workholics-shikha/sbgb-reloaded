import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter, socialLinks, CTASection} from "@/components/site/SiteFooter";

export const Route = createFileRoute("/aavedan-form")({
  head: () => ({
    meta: [
      { title: "सदस्यता फॉर्म | SBGBT" },
      {
        name: "description",
        content:
          "सदस्यता फॉर्म",
      },
      { property: "og:title", content: "संपर्क करें | SBGBT" },
       
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="सदस्यता फॉर्म" />

      <section className="border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
         
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-sm sm:p-8"
          >
            <h2 className="font-display text-2xl font-black sm:text-3xl">संदेश भेजें</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              हम सामान्यतः 48 घंटों के भीतर उत्तर देने का प्रयास करते हैं।
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">नाम</span>
                <input
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="अपना नाम लिखें"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">ईमेल</span>
                <input
                  required
                  type="email"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">विषय</span>
                <input
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="स्वयंसेवा, साझेदारी, मीडिया, छात्रवृत्ति..."
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">संदेश</span>
                <textarea
                  required
                  rows={5}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="हमें बताइए कि आप कैसे जुड़ना चाहते हैं।"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
            >
              <Send className="size-4" /> संदेश भेजें
            </button>

            {sent && (
              <p className="mt-4 text-sm font-semibold text-primary">
                आपका संदेश दर्ज कर लिया गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।
              </p>
            )}
          </form>
        </div>
      </section>
      {/* CTA */}
       <CTASection />
      {/* === */} 
      <SiteFooter />
    </div>
  );
}
