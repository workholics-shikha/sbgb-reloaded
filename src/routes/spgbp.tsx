import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Download, FileText, GraduationCap, Sparkles, Trophy, UserCheck } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import spgbpHeroReal from "@/assets/spgbp-hero-real.jpg";

export const Route = createFileRoute("/spgbp")({
  head: () => ({
    meta: [
      { title: "SPGBP 2025–26 — Shiksha Pao, Gyan Badhao" },
      { name: "description", content: "SBGBT's annual rural scholarship competition for classes 5 to 12. Registrations open for 2025–26. Download notification and annexures." },
      { property: "og:title", content: "SPGBP 2025–26 Registration Open" },
      { property: "og:description", content: "The Shiksha Pao Gyan Badhao Pratiyogita — SBGBT's flagship scholarship for rural students." },
    ],
  }),
  component: SPGBP,
});

const steps = [
  { icon: FileText, t: "Read the notification", d: "Download SPGBP 2025–26 notification and both annexures below." },
  { icon: UserCheck, t: "Register online", d: "Fill the registration form with school details and required photograph." },
  { icon: CalendarClock, t: "Download admit card", d: "Admit cards will be released ahead of the examination date." },
  { icon: Trophy, t: "Compete & win", d: "Top performers receive SBGBT scholarships, mentorship and public recognition." },
];

const docs = [
  { name: "SPGBP 2025–26 Notification", href: "https://www.sbgbteam.com/public/adminassets/SPGBP2025-26Notification-1.pdf" },
  { name: "Annexure I — Instructions", href: "https://www.sbgbteam.com/public/adminassets/Annexure-I-doc.pdf" },
  { name: "Annexure II — Photo Sample", href: "https://www.sbgbteam.com/public/adminassets/Annexure-II_photo.pdf" },
];

function SPGBP() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="SPGBP 2025–26"
        title="Shiksha Pao — Gyan Badhao Pratiyogita."
        hi="शिक्षा पाओ — ज्ञान बढ़ाओ प्रतियोगिता"
        sub="An annual rural competition that finds hidden talent in remote villages, mentors them, and funds their journey. Registration for 2025–26 is now open."
        imageSrc={spgbpHeroReal}
        imageAlt="SBGBT students and school community"
      />

      {/* CTA row */}
      <section className="border-y border-border bg-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="size-5"/>
            </div>
            <p className="font-hi text-base sm:text-lg leading-snug">
              SPGBP 2025–26 रजिस्ट्रेशन प्रारंभ हो चुका है। अंतिम तिथि से पहले पंजीकरण करें।
            </p>
          </div>
          <a href="https://www.sbgbteam.com/sbgbp-registration" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-bold hover:brightness-110 transition shadow-lg">
            Register now <ArrowRight className="size-4"/>
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">How it works</div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black">Four steps from registration to scholarship.</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.t} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="size-5"/></div>
                <span className="font-display font-black text-3xl text-muted-foreground/30">0{i+1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-black">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Downloads + details */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-[1fr_1fr] gap-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Downloads</div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black">Notification &amp; annexures</h2>
            <div className="mt-6 space-y-3">
              {docs.map(d => (
                <a key={d.name} href={d.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-md transition group">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><FileText className="size-5"/></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm sm:text-base truncate">{d.name}</div>
                    <div className="text-xs text-muted-foreground">PDF · Official document</div>
                  </div>
                  <Download className="size-5 text-muted-foreground group-hover:text-primary transition"/>
                </a>
              ))}
              <a href="https://www.sbgbteam.com/sbgbp-registration-admit-card" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-md transition">
                <div className="grid size-11 place-items-center rounded-xl bg-accent/20 text-earth shrink-0"><GraduationCap className="size-5"/></div>
                <div className="font-semibold text-sm sm:text-base">Download Admit Card</div>
                <ArrowRight className="size-4 ml-auto text-primary"/>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-card border border-border p-8 sm:p-10">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">About SPGBP</div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black">Why this competition matters.</h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed text-sm">
              <p>SPGBP is SBGBT's flagship rural education initiative — an annual competition that identifies talent, encourages healthy competition, provides mentorship and funds scholarships for the deserving and needy.</p>
              <p className="font-hi text-earth">इसका उद्देश्य ग्रामीण बच्चों में स्वस्थ प्रतिस्पर्धा और आत्मविश्वास पैदा करना, प्रतिभाओं को निखारना और गरीब व जरूरतमंद विद्यार्थियों को आर्थिक सहयोग प्रदान करना है।</p>
              <p>Since inception, thousands of students across Rajasthan and Madhya Pradesh have participated — and hundreds have been supported through college and competitive-exam preparation.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-bold">Sponsor a scholarship</Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Ask a question</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
