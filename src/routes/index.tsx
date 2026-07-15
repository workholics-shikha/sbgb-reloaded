import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, GraduationCap, Sprout, HeartPulse, Users2, Landmark, Sparkles,
  PlayCircle, MapPin, Calendar, TrendingUp, BookOpen, HandHeart,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";


import heroEducation from "@/assets/hero-education.jpg";
import galEnv from "@/assets/gallery-environment.jpg";
import galWomen from "@/assets/gallery-women.jpg";
import galLib from "@/assets/gallery-library.jpg";
import galHealth from "@/assets/gallery-health.jpg";
import galAwards from "@/assets/gallery-awards.jpg";
import galVillage from "@/assets/gallery-village.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200" },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "150+", label: "Villages Reached", sub: "across Rajasthan & MP", icon: MapPin },
  { value: "12,400", label: "Students Mentored", sub: "since 2015", icon: GraduationCap },
  { value: "48,000", label: "Trees Planted", sub: "Green Village campaign", icon: Sprout },
  { value: "3,200", label: "Health Beneficiaries", sub: "camps & blood drives", icon: HeartPulse },
  { value: "620", label: "Women Empowered", sub: "SHGs & vocational training", icon: Users2 },
  { value: "18", label: "Years of Service", sub: "grassroots since 2007", icon: Sparkles },
];

const initiatives = [
  { icon: Landmark, title: "Smart Village Yojana",
    hi: "स्मार्ट विलेज योजना",
    desc: "Awareness, sanitation, roads and civic dignity — turning ordinary villages into models of self-governance." },
  { icon: GraduationCap, title: "Rural Education (SPGBP)",
    hi: "शिक्षा पाओ ज्ञान बढ़ाओ",
    desc: "An annual competition and scholarship program that finds hidden talent in remote villages and funds their journey." },
  { icon: BookOpen, title: "Utthan Bhavan & Library",
    hi: "उत्थान भवन",
    desc: "Free coaching centres and study halls where first-generation learners prepare for competitive exams." },
  { icon: Users2, title: "Women Empowerment",
    hi: "महिला सशक्तिकरण",
    desc: "Self-help groups, skills training and mentorship helping rural women build livelihoods and lead." },
  { icon: Sprout, title: "Green Village – Clean Village",
    hi: "पर्यावरण संरक्षण",
    desc: "Village-level coordinators driving plantation drives, waste management and water conservation." },
  { icon: HeartPulse, title: "Public Health Drives",
    hi: "जन स्वास्थ्य",
    desc: "Blood donation camps, screening and awareness — because no life should be lost for want of care." },
];

const gallery = [
  { src: galEnv, title: "Plantation Drive, Dhanora", tag: "Environment" },
  { src: galWomen, title: "SHG Meeting, Sarmathura", tag: "Women" },
  { src: galLib, title: "Utthan Library Session", tag: "Education" },
  { src: galHealth, title: "Village Health Camp", tag: "Health" },
  { src: galAwards, title: "SPGBP Award Ceremony", tag: "Scholarship" },
  { src: galVillage, title: "Model Village Aerial", tag: "Smart Village" },
];

const news = [
  { date: "Feb 06, 2025", cat: "Media", title: "SBGBT featured for grassroots impact model in rural Rajasthan." },
  { date: "Jul 18, 2018", cat: "Coverage", title: "गांवों में पौधारोपण अभियान — जनसहभागिता से हरित क्रांति।" },
  { date: "Jul 18, 2018", cat: "Feature", title: "चंबल के बीहड़ों से निकला देश का मॉडल विलेज।" },
  { date: "Jun 20, 2018", cat: "Report", title: "हर गांव धनौरा की तरह आदर्श बने — नन्नूमल पहाड़िया।" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />


      {/* Hero */}
      <section className="relative overflow-hidden grain-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent"/> SPGBP 2025–26 Registration Open
              </span>
              <h1 className="mt-5 font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Change the thought.<br/>
                <span className="text-primary">Change the village.</span>
              </h1>
              <p className="mt-3 font-hi text-xl sm:text-2xl text-earth">
                सोच बदलो · गाँव बदलो
              </p>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                A grassroots movement rebuilding rural India — one classroom, one plantation,
                one empowered woman, one healthy village at a time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#donate" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:brightness-110 transition shadow-[0_10px_30px_-10px_oklch(0.42_0.09_165_/_0.5)]">
                  Donate <ArrowRight className="size-4"/>
                </a>
                <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition">
                  Explore our work
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[{n:"18+", l:"Years"}, {n:"150+", l:"Villages"}, {n:"12K+", l:"Students"}].map(s => (
                  <div key={s.l}>
                    <div className="font-display font-black text-2xl sm:text-3xl text-primary">{s.n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-primary/20 blur-2xl"/>
              <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-[2rem] overflow-hidden border border-border shadow-2xl">
                <img src={heroEducation} alt="Rural students holding an EDUCATION chalkboard" width={1600} height={1200} className="size-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"/>
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-cream">
                  <div>
                    <div className="text-xs uppercase tracking-widest opacity-80">On the ground</div>
                    <div className="font-display text-lg">Sarmathura, Rajasthan</div>
                  </div>
                  <div className="rounded-full bg-cream/95 text-ink px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-leaf animate-pulse"/> Active
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 sm:-left-8 rounded-2xl bg-card border border-border shadow-xl p-4 flex items-center gap-3 max-w-[240px]">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/20 text-accent-foreground">
                  <TrendingUp className="size-5 text-primary"/>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">This quarter</div>
                  <div className="font-semibold text-sm">+1,240 new beneficiaries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPGBP Notice */}
      <section className="border-y border-border bg-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="flex items-start gap-3 min-w-0">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="size-5"/>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-earth">Announcement</div>
              <p className="font-hi text-base sm:text-lg leading-snug">
                शिक्षा पाओ – ज्ञान बढ़ाओ प्रतियोगिता (SPGBP) 2025–26 रजिस्ट्रेशन प्रारंभ हो चुका है।
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="#" className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition">Notification</a>
            <a href="#" className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition">Annexure I</a>
            <a href="#" className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition">Annexure II</a>
            <a href="#" className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">Register →</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">About the movement</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-balance">
              A quiet revolution written from the villages up.
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Soch Badlo Gaon Badlo Team (SBGBT) began in the ravines of the Chambal with a
              single conviction — that dignified development starts in the mind, spreads
              through the classroom, and finally arrives in the streets, farms and homes
              of a village.
            </p>
            <p>
              Today, across Rajasthan and Madhya Pradesh, SBGBT runs education programs,
              women's collectives, sanitation drives, health camps and civic training
              centres. Every rupee, every volunteer hour and every partnership is directed
              at one outcome: villages that decide their own future.
            </p>
            <a href="#work" className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">
              Read our story <ArrowRight className="size-4"/>
            </a>
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section id="impact" className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-accent font-semibold">Impact dashboard</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-balance">
                Numbers that are lives, not just tallies.
              </h2>
            </div>
            <div className="text-sm text-cream/60 flex items-center gap-2">
              <Calendar className="size-4"/> Updated Q1 2026
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="group relative rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 sm:p-6 hover:bg-cream/[0.06] hover:border-accent/40 transition">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-cream">
                      {s.value}
                    </div>
                    <div className="mt-2 font-semibold text-sm sm:text-base">{s.label}</div>
                    <div className="mt-0.5 text-xs text-cream/50">{s.sub}</div>
                  </div>
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                    <s.icon className="size-4"/>
                  </div>
                </div>
                <div className="mt-5 h-1 rounded-full bg-cream/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-leaf" style={{ width: `${60 + (s.label.length * 3) % 35}%` }}/>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { k: "Ongoing districts", v: "7", tone: "Chambal, Karauli, Dholpur…" },
              { k: "Active volunteers", v: "480+", tone: "Field, tech & mentors" },
              { k: "Partner schools", v: "62", tone: "Government & aided" },
            ].map(x => (
              <div key={x.k} className="rounded-2xl border border-cream/10 bg-gradient-to-br from-cream/[0.04] to-transparent p-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-cream/50">{x.k}</div>
                  <div className="font-display text-2xl font-black mt-1">{x.v}</div>
                </div>
                <div className="text-xs text-cream/60 text-right max-w-[140px]">{x.tone}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section id="work" className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Our work</div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-balance">
            Six pillars, one village at a time.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every initiative is designed with, not for, the community. Local coordinators
            lead. We support with structure, funding, and mentorship.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initiatives.map((it) => (
            <article key={it.title} className="group relative rounded-3xl border border-border bg-card p-6 sm:p-7 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <it.icon className="size-6"/>
              </div>
              <h3 className="mt-5 font-display text-xl font-black">{it.title}</h3>
              <p className="font-hi text-sm text-earth mt-1">{it.hi}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="size-4"/>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">Field gallery</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black">Moments from the field.</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              View full gallery <ArrowRight className="size-4"/>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
            {gallery.map((g, i) => {
              const span =
                i === 0 ? "col-span-2 row-span-2" :
                i === 3 ? "col-span-2" :
                i === 5 ? "md:col-span-2" : "";
              return (
                <figure key={g.title} className={`group relative overflow-hidden rounded-2xl ${span}`}>
                  <img src={g.src} alt={g.title} loading="lazy" width={1200} height={900}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-90"/>
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-cream">
                    <span className="inline-block rounded-full bg-accent/95 text-accent-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{g.tag}</span>
                    <div className="mt-1.5 font-display text-sm sm:text-base font-bold">{g.title}</div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-ink group cursor-pointer">
            <img src={galVillage} alt="Documentary preview" loading="lazy" width={1200} height={900}
              className="size-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"/>
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid size-20 place-items-center rounded-full bg-cream/95 text-primary shadow-2xl group-hover:scale-110 transition">
                <PlayCircle className="size-10" strokeWidth={1.5}/>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-cream">
              <div className="text-xs uppercase tracking-widest opacity-80">Documentary</div>
              <div className="font-display text-lg font-bold">Soch Badlo Gaon Badlo Yatra</div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Watch & listen</div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-balance">
              Stories that traveled from the ravines to the world.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the founding vision of "मानवता की सेवा ही ईश्वर की सेवा है" to Sarmathura's
              Utthan Bhavan — a series of films documenting the movement.
            </p>
            <div className="mt-6 space-y-3">
              {["शिक्षा का मंदिर — उत्थान भवन सरमथुरा",
                "स्थापना दिवस की शुभकामनाएँ व बधाइयाँ",
                "स्मार्ट विलेज कॉन्सेप्ट एंड अचीवमेंट्स"].map(t => (
                <a key={t} href="#" className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-primary/40 transition group">
                  <PlayCircle className="size-5 text-primary shrink-0"/>
                  <span className="font-hi text-sm sm:text-base truncate">{t}</span>
                  <ArrowRight className="size-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition"/>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media */}
      <section id="media" className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">In the press</div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black">Media coverage.</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              All coverage <ArrowRight className="size-4"/>
            </a>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {news.map(n => (
              <article key={n.title} className="group rounded-2xl bg-card border border-border p-5 sm:p-6 hover:border-primary/40 hover:shadow-lg transition">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/10 text-primary px-2.5 py-1 font-semibold">{n.cat}</span>
                  <span className="text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug group-hover:text-primary transition">{n.title}</h3>
                <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article <ArrowRight className="size-4"/>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section id="donate" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-leaf"/>
        <div className="absolute inset-0 opacity-30 grain-bg"/>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 text-primary-foreground text-center">
          <span className="inline-block rounded-full bg-cream/20 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Join the movement
          </span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-black text-balance">
            Your contribution builds a classroom, plants a forest,<br className="hidden sm:block"/>
            saves a life.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-primary-foreground/80">
            Become an SBGBT member, sponsor a scholarship, or fund a village campaign.
            100% of donations are field-deployed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-bold hover:brightness-95 transition shadow-xl">
              <HandHeart className="size-4"/> Donate now
            </a>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-cream/10 backdrop-blur px-6 py-3 text-sm font-semibold hover:bg-cream/20 transition">
              Become a member
            </a>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-ink text-cream">
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
              {navLinks.map(l => <li key={l.href}><a href={l.href} className="hover:text-accent transition">{l.label}</a></li>)}
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
    </div>
  );
}
