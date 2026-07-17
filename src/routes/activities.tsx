import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, GraduationCap, Sprout, HeartPulse, Users2, Landmark, BookOpen,
  Megaphone, Wallet, Leaf, Building2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import activitiesHeroReal from "@/assets/activities-hero-real.jpg";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "गतिविधियाँ | SBGBT" },
      { name: "description", content: "SPGBP छात्रवृत्ति, उत्थान भवन, स्मार्ट विलेज, महिला सशक्तिकरण, ग्रीन विलेज, जन स्वास्थ्य और अन्य जमीनी कार्यक्रम।" },
      { property: "og:title", content: "SBGBT गतिविधियाँ | गांव बदलने वाले कार्यक्रम" },
      { property: "og:description", content: "शिक्षा, सशक्तिकरण, पर्यावरण, स्वास्थ्य और पंचायत सशक्तिकरण — SBGBT अभियान के मुख्य स्तंभ।" },
    ],
  }),
  component: Activities,
});

const activities = [
  {
    icon: Megaphone, title: "जन जागरूकता", en: "जन जागरूकता",
    desc: "केंद्र, राज्य और NABARD जैसी योजनाओं को SHG, किसान समूह, महिला मंडल, युवा समूह और चौपालों के माध्यम से लाभार्थियों तक पहुंचाना।",
  },
  {
    icon: GraduationCap, title: "ग्रामीण शिक्षा सबलीकरण", en: "SPGBP — ग्रामीण शिक्षा",
    desc: "शिक्षा पाओ ज्ञान बढ़ाओ प्रतियोगिता ग्रामीण प्रतिभाओं को पहचानती है, मार्गदर्शन देती है और योग्य व जरूरतमंद विद्यार्थियों को छात्रवृत्ति से जोड़ती है।",
  },
  {
    icon: BookOpen, title: "SBGBT उत्थान संकल्पना", en: "उत्थान भवन, लाइब्रेरी और कोचिंग",
    desc: "सरमथुरा में अध्ययन केंद्र, पुस्तकालय और कोचिंग संस्थान के माध्यम से युवाओं को समृद्ध मानव संसाधन के रूप में तैयार करना।",
  },
  {
    icon: Users2, title: "महिला सशक्तिकरण", en: "महिला सशक्तिकरण",
    desc: "बालिका शिक्षा, मार्गदर्शन, आत्मनिर्भरता, स्वच्छता और स्वास्थ्य जागरूकता के साथ ग्रामीण महिलाओं को अवसरों से जोड़ना।",
  },
  {
    icon: Landmark, title: "स्मार्ट विलेज योजना", en: "स्मार्ट विलेज योजना",
    desc: "गांवों में सकारात्मक सोच और रचनात्मक कार्यों के माध्यम से लोगों को अधिकारों और कर्तव्यों के प्रति सजग बनाना।",
  },
  {
    icon: Building2, title: "पंचायती राज सुदृढ़ीकरण", en: "पंचायती राज सुदृढ़ीकरण",
    desc: "ग्रामीणों को सरकारी योजनाओं और विकास कार्यक्रमों की जानकारी देना और एजेंसियों को लाभार्थियों तक पहुंचने में सहयोग करना।",
  },
  {
    icon: Wallet, title: "आत्मनिर्भर व समृद्ध गांव", en: "आत्मनिर्भर व समृद्ध गांव",
    desc: "वित्तीय साक्षरता कार्यक्रमों के माध्यम से ग्रामीणों को बैंकिंग, क्रेडिट और औपचारिक वित्तीय साधनों की समझ देना।",
  },
  {
    icon: Leaf, title: "पर्यावरण संरक्षण", en: "ग्रीन विलेज – क्लीन विलेज",
    desc: "गांव स्तर के समन्वयकों के माध्यम से वृक्षारोपण, स्वच्छता और जल संरक्षण को जन-अभियान बनाना।",
  },
  {
    icon: HeartPulse, title: "जन स्वास्थ्य – राष्ट्र स्वास्थ्य", en: "जन स्वास्थ्य अभियान",
    desc: "रक्तदान शिविर, स्क्रीनिंग और स्वास्थ्य जागरूकता अभियान ताकि उपचार के अभाव में कोई जीवन न छूटे।",
  },
  {
    icon: Sprout, title: "समाज व राष्ट्र निर्माण", en: "समाज व राष्ट्र निर्माण",
    desc: "स्थानीय समस्याओं को समझकर स्थानीय समाधान विकसित करना और गांव विकास समितियों के माध्यम से बदलाव को गति देना।",
  },
];

function Activities() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="हमारे कार्य"
        title="दस कार्यक्रम, एक ही सूत्र — ग्रामीण भारत की गरिमा और विकास।"
        hi="हमारी गतिविधियाँ"
        sub="SBGBT का हर कार्यक्रम गांव की ज़रूरतों को ध्यान में रखकर बनाया गया है, जिसे स्थानीय समन्वयक आगे बढ़ाते हैं और दीर्घकालिक सहयोग मज़बूत करता है।"
        imageSrc={activitiesHeroReal}
        imageAlt="SBGBT village activities"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {activities.map((a, i) => (
            <article key={a.en} className="group relative rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:p-7">
              <div className="flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="size-6"/>
                </div>
                <span className="text-xs font-mono text-muted-foreground">0{i+1}</span>
              </div>
              <h3 className="mt-5 font-hi text-xl font-bold text-earth">{a.title}</h3>
              <div className="mt-1 font-display text-base font-black">{a.en}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              <Link to="/gallery" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                कार्य देखें <ArrowRight className="size-4"/>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1fr_auto]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">जुड़ें</div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">किसी कार्यक्रम को सहयोग दें, विद्यार्थी का मार्गदर्शन करें या गांव के विकास में भागीदार बनें।</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground">दान करें</Link>
            <Link to="/spgbp" className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold">SPGBP 2025–26</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
