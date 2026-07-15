import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, GraduationCap, Sprout, HeartPulse, Users2, Landmark, BookOpen,
  Megaphone, Wallet, Leaf, Building2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities — SBGBT programs across rural India" },
      { name: "description", content: "SPGBP scholarships, Utthan Bhavan, Smart Village, Women Empowerment, Green Village, Public Health and more — SBGBT's on-the-ground programs." },
      { property: "og:title", content: "SBGBT Activities — Programs transforming villages" },
      { property: "og:description", content: "Education, empowerment, environment, health, panchayati raj — the pillars of the SBGBT movement." },
    ],
  }),
  component: Activities,
});

const activities = [
  {
    icon: Megaphone, title: "जन जागरूकता", en: "Public Awareness",
    desc: "Bridging government schemes (Centre / State / NABARD) with village beneficiaries through SHGs, farmer collectives, mahila mandals, youth groups and chaupals.",
  },
  {
    icon: GraduationCap, title: "ग्रामीण शिक्षा सबलीकरण", en: "SPGBP — Rural Education",
    desc: "The annual Shiksha Pao Gyan Badhao Pratiyogita identifies rural talent, mentors students, and funds scholarships for the deserving and needy.",
  },
  {
    icon: BookOpen, title: "SBGBT उत्थान संकल्पना", en: "Utthan Bhavan, Library & Coaching",
    desc: "Free study halls, libraries and coaching institutes at Sarmathura shaping youth into the nation's 'rich human resource'.",
  },
  {
    icon: Users2, title: "महिला सशक्तिकरण", en: "Women Empowerment",
    desc: "Girl-child education, mentorship, self-reliance, and rural women's livelihood opportunities alongside hygiene and health awareness.",
  },
  {
    icon: Landmark, title: "स्मार्ट विलेज योजना", en: "Smart Village Yojana",
    desc: "Positive thought and constructive action in villages — awareness of rights and responsibilities so citizens become part of the development process.",
  },
  {
    icon: Building2, title: "पंचायती राज सुदृढ़ीकरण", en: "Strengthening Panchayati Raj",
    desc: "Making villagers aware of government schemes and development programs, and assisting agencies in reaching beneficiaries.",
  },
  {
    icon: Wallet, title: "आत्मनिर्भर व समृद्ध गांव", en: "Self-reliant & Prosperous Village",
    desc: "Financial literacy programs so villagers understand inclusion, KCC / GCC / ACC credit tools, and the psychology of formal finance.",
  },
  {
    icon: Leaf, title: "पर्यावरण संरक्षण", en: "Green Village – Clean Village",
    desc: "Village-level coordinators drive plantation, sanitation and water conservation. Environmental stewardship as civic dignity.",
  },
  {
    icon: HeartPulse, title: "जन स्वस्थ – राष्ट्र स्वस्थ", en: "Public Health Drives",
    desc: "Blood donation camps, screening drives and health awareness — no life should be lost for want of care.",
  },
  {
    icon: Sprout, title: "समाज व राष्ट्र निर्माण", en: "Society & Nation Building",
    desc: "Studying local village problems and finding local solutions; forming Village Development Committees to accelerate change.",
  },
];

function Activities() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="Our work"
        title="Ten programs. One thread — dignity for rural India."
        hi="हमारी गतिविधियाँ"
        sub="Every SBGBT program is designed with the village, led by local coordinators, and sustained by long-term partnerships."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {activities.map((a, i) => (
            <article key={a.en} className="group relative rounded-3xl border border-border bg-card p-6 sm:p-7 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <a.icon className="size-6"/>
                </div>
                <span className="text-xs font-mono text-muted-foreground">0{i+1}</span>
              </div>
              <h3 className="mt-5 font-hi text-xl font-bold text-earth">{a.title}</h3>
              <div className="mt-1 font-display text-base font-black">{a.en}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              <Link to="/gallery" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                See in action <ArrowRight className="size-4"/>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Get involved</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black">Sponsor a program, mentor a student, or fund a village.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold">Donate</Link>
            <Link to="/spgbp" className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold">SPGBP 2025–26</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
