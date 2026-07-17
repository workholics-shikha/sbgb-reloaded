import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Download, FileText, GraduationCap, Sparkles, Trophy, UserCheck } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import spgbpHeroReal from "@/assets/spgbp-hero-real.jpg";

export const Route = createFileRoute("/spgbp")({
  head: () => ({
    meta: [
      { title: "SPGBP 2025–26 | शिक्षा पाओ, ज्ञान बढ़ाओ" },
      { name: "description", content: "कक्षा 5 से 12 तक के ग्रामीण विद्यार्थियों के लिए SBGBT की वार्षिक छात्रवृत्ति प्रतियोगिता। 2025–26 के लिए पंजीकरण खुले हैं।" },
      { property: "og:title", content: "SPGBP 2025–26 पंजीकरण प्रारंभ" },
      { property: "og:description", content: "शिक्षा पाओ ज्ञान बढ़ाओ प्रतियोगिता — ग्रामीण विद्यार्थियों के लिए SBGBT की प्रमुख छात्रवृत्ति पहल।" },
    ],
  }),
  component: SPGBP,
});

const steps = [
  { icon: FileText, t: "नोटिफिकेशन पढ़ें", d: "नीचे दिए गए SPGBP 2025–26 नोटिफिकेशन और दोनों परिशिष्ट डाउनलोड करें।" },
  { icon: UserCheck, t: "ऑनलाइन पंजीकरण करें", d: "विद्यालय विवरण और आवश्यक फोटो के साथ पंजीकरण फॉर्म भरें।" },
  { icon: CalendarClock, t: "एडमिट कार्ड डाउनलोड करें", d: "परीक्षा तिथि से पहले एडमिट कार्ड जारी किए जाएंगे।" },
  { icon: Trophy, t: "प्रतियोगिता में भाग लें", d: "श्रेष्ठ प्रतिभागियों को SBGBT छात्रवृत्ति, मार्गदर्शन और सम्मान मिलेगा।" },
];

const docs = [
  { name: "SPGBP 2025–26 नोटिफिकेशन", href: "https://www.sbgbteam.com/public/adminassets/SPGBP2025-26Notification-1.pdf" },
  { name: "परिशिष्ट I — निर्देश", href: "https://www.sbgbteam.com/public/adminassets/Annexure-I-doc.pdf" },
  { name: "परिशिष्ट II — फोटो नमूना", href: "https://www.sbgbteam.com/public/adminassets/Annexure-II_photo.pdf" },
];

function SPGBP() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="SPGBP 2025–26"
        title="शिक्षा पाओ — ज्ञान बढ़ाओ प्रतियोगिता"
        hi="शिक्षा पाओ — ज्ञान बढ़ाओ प्रतियोगिता"
        sub="यह वार्षिक ग्रामीण प्रतियोगिता दूरदराज के गांवों की प्रतिभाओं को पहचानती है, उन्हें मार्गदर्शन देती है और उनके शैक्षिक सफर को सहारा देती है। 2025–26 के लिए पंजीकरण अब खुले हैं।"
        imageSrc={spgbpHeroReal}
        imageAlt="SBGBT students and school community"
      />

      <section className="border-y border-border bg-accent/10">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="size-5"/>
            </div>
            <p className="font-hi text-base leading-snug sm:text-lg">
              SPGBP 2025–26 रजिस्ट्रेशन प्रारंभ हो चुका है। अंतिम तिथि से पहले पंजीकरण करें।
            </p>
          </div>
          <a href="https://www.sbgbteam.com/sbgbp-registration" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110">
            अभी पंजीकरण करें <ArrowRight className="size-4"/>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">प्रक्रिया</div>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">पंजीकरण से छात्रवृत्ति तक के चार चरण।</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><s.icon className="size-5"/></div>
                <span className="font-display text-3xl font-black text-muted-foreground/30">0{i+1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-black">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">डाउनलोड</div>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">नोटिफिकेशन और परिशिष्ट</h2>
            <div className="mt-6 space-y-3">
              {docs.map((d) => (
                <a key={d.name} href={d.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-md">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="size-5"/></div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold sm:text-base">{d.name}</div>
                    <div className="text-xs text-muted-foreground">PDF · आधिकारिक दस्तावेज</div>
                  </div>
                  <Download className="size-5 text-muted-foreground transition group-hover:text-primary"/>
                </a>
              ))}
              <a href="https://www.sbgbteam.com/sbgbp-registration-admit-card" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-md">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/20 text-earth"><GraduationCap className="size-5"/></div>
                <div className="font-semibold text-sm sm:text-base">एडमिट कार्ड डाउनलोड करें</div>
                <ArrowRight className="ml-auto size-4 text-primary"/>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">SPGBP के बारे में</div>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">यह प्रतियोगिता क्यों महत्वपूर्ण है।</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>SPGBP, SBGBT की प्रमुख ग्रामीण शिक्षा पहल है — यह वार्षिक प्रतियोगिता प्रतिभाओं को पहचानती है, स्वस्थ प्रतिस्पर्धा को प्रोत्साहित करती है, मार्गदर्शन देती है और जरूरतमंद व योग्य विद्यार्थियों को छात्रवृत्ति से सहारा देती है।</p>
              <p className="font-hi text-earth">इसका उद्देश्य ग्रामीण बच्चों में स्वस्थ प्रतिस्पर्धा और आत्मविश्वास पैदा करना, प्रतिभाओं को निखारना और गरीब व जरूरतमंद विद्यार्थियों को आर्थिक सहयोग प्रदान करना है।</p>
              <p>शुरुआत से अब तक राजस्थान और मध्य प्रदेश के हजारों विद्यार्थी इसमें भाग ले चुके हैं — और सैकड़ों विद्यार्थियों को आगे की शिक्षा और प्रतियोगी परीक्षाओं की तैयारी में सहयोग मिला है।</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground">छात्रवृत्ति प्रायोजित करें</Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold">प्रश्न पूछें</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
