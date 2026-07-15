import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Flag, HeartHandshake, Sparkles, Target, Users2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import heroEducation from "@/assets/hero-education.jpg";
import galVillage from "@/assets/gallery-village.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SBGBT — Soch Badlo, Gaon Badlo" },
      { name: "description", content: "The origin, vision, mission and people behind the Soch Badlo Gaon Badlo movement transforming rural India." },
      { property: "og:title", content: "About SBGBT — the story of a grassroots movement" },
      { property: "og:description", content: "From the Chambal ravines to 150+ villages: how SBGBT is rebuilding rural India." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Flag, title: "Dignity first", desc: "Every intervention begins with respect for the village's own agency and wisdom." },
  { icon: HeartHandshake, title: "With, not for", desc: "Villages co-design programs. Local coordinators lead. We support and sustain." },
  { icon: Sparkles, title: "Long horizons", desc: "18+ years of showing up — because rural transformation is generational." },
  { icon: Target, title: "Field-first spend", desc: "Every rupee is tracked to a classroom, a sapling, a scholarship, a life." },
];

const timeline = [
  { y: "2007", t: "Foundation", d: "SBGBT begins in Sarmathura, Dholpur with a vision to change thought before villages." },
  { y: "2011", t: "First Utthan Bhavan", d: "A free study hall opens for first-generation learners preparing for exams." },
  { y: "2015", t: "SPGBP launched", d: "The annual Shiksha Pao Gyan Badhao competition finds hidden rural talent." },
  { y: "2018", t: "Model Village", d: "Dhanora is nationally recognized as a model village; Chambal's story travels far." },
  { y: "2021", t: "Green Village", d: "Village coordinators lead plantation, sanitation, and water conservation drives." },
  { y: "2025", t: "150+ villages", d: "SPGBP 2025–26 opens across Rajasthan and Madhya Pradesh." },
];

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="About the movement"
        title="From a village in the Chambal ravines, a quiet revolution."
        hi="सोच बदलो · गाँव बदलो"
        sub="Soch Badlo Gaon Badlo Team (SBGBT) began with one conviction — dignified development starts in the mind, spreads through the classroom, and arrives in the streets, farms and homes of a village."
      />

      {/* Vision / Mission */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24 grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm">
          <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Compass className="size-6"/></div>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl font-black">Our vision</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            An India where every village decides its own future — with informed citizens,
            educated children, empowered women, and a healthy, sustainable environment.
          </p>
          <p className="mt-3 font-hi text-earth">"मानवता की सेवा ही ईश्वर की सेवा है।"</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm">
          <div className="grid size-12 place-items-center rounded-2xl bg-accent/20 text-earth"><Target className="size-6"/></div>
          <h2 className="mt-5 font-display text-2xl sm:text-3xl font-black">Our mission</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            To awaken thought and action in rural India through education, women empowerment,
            environmental stewardship, public health, and strengthened panchayati raj.
          </p>
          <Link to="/activities" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            See what we do <ArrowRight className="size-4"/>
          </Link>
        </div>
      </section>

      {/* Story with photo */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Our story</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-balance">
              A movement written from the villages up.
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>Founded in 2007 in the ravines of the Chambal, SBGBT grew from a small circle of village elders and youth into a movement spanning seven districts.</p>
              <p>Today, across Rajasthan and Madhya Pradesh, SBGBT runs education programs, women's collectives, sanitation drives, health camps and civic training centres.</p>
              <p>Every rupee, every volunteer hour, every partnership is directed at one outcome: <span className="text-foreground font-semibold">villages that decide their own future.</span></p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-primary/20 blur-2xl"/>
            <img src={heroEducation} alt="Rural students" className="relative aspect-[4/5] w-full object-cover rounded-[2rem] border border-border shadow-2xl"/>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Values</div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black">What guides every decision.</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(v => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition">
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><v.icon className="size-5"/></div>
              <h3 className="mt-4 font-display text-lg font-black">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">Journey</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black">18 years, one direction.</h2>
          </div>
          <ol className="mt-12 relative border-l border-cream/15 ml-4 space-y-8">
            {timeline.map(t => (
              <li key={t.y} className="pl-8 relative">
                <span className="absolute -left-[9px] top-1 grid size-4 place-items-center rounded-full bg-accent"><span className="size-1.5 rounded-full bg-ink"/></span>
                <div className="font-display text-2xl font-black text-accent">{t.y}</div>
                <div className="mt-1 font-semibold">{t.t}</div>
                <p className="mt-1 text-sm text-cream/70 max-w-2xl">{t.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-leaf text-primary-foreground p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 grain-bg"/>
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-80">Volunteers &amp; team</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-balance max-w-2xl">
                Built by 480+ volunteers across seven districts.
              </h2>
              <p className="mt-4 max-w-2xl opacity-90">Coordinators, mentors, engineers, doctors and farmers — every skill finds a role.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold hover:brightness-95 transition shadow-xl">
                <Users2 className="size-4"/> Join us
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-cream/10 backdrop-blur px-6 py-3 text-sm font-semibold hover:bg-cream/20 transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <img src={galVillage} alt="" className="hidden"/>
      <SiteFooter />
    </div>
  );
}
