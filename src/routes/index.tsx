import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Images,
  Landmark,
  Leaf,
  Newspaper,
  PlayCircle,
  Quote,
  Sparkles,
  Users2,
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
      { title: "SBGBT | सोच बदलो गांव बदलो टीम" },
      {
        name: "description",
        content:
          "सोच बदलो गांव बदलो टीम की ग्रामीण शिक्षा, महिला सशक्तिकरण, स्वास्थ्य, पर्यावरण और जन-जागरूकता पहलों की जानकारी।",
      },
    ],
  }),
  component: Home,
});

const noticeLinks = [
  {
    label: "SPGBP 2025-26 Notification",
    href: "https://www.sbgbteam.com/public/adminassets/SPGBP2025-26Notification-1.pdf",
  },
  {
    label: "Annexure-I (Instructions)",
    href: "https://www.sbgbteam.com/public/adminassets/Annexure-I-doc.pdf",
  },
  {
    label: "Annexure-II (Photo Sample)",
    href: "https://www.sbgbteam.com/public/adminassets/Annexure-II_photo.pdf",
  },
  {
    label: "Click for Registration",
    href: "https://www.sbgbteam.com/sbgbp-registration",
  },
];

const quickActions = [
  {
    title: "SBGBT सदस्य बनें",
    desc: "संस्था के मिशन से जुड़ें और गांवों में सकारात्मक बदलाव का हिस्सा बनें।",
    href: "/contact",
    icon: Users2,
    tone: "from-primary to-primary/85 text-primary-foreground",
    internal: true,
  },
  {
    title: "दान करें",
    desc: "शिक्षा, स्वास्थ्य, पौधारोपण और ग्रामीण विकास अभियानों को सहयोग दें।",
    href: "/donate",
    icon: HandHeart,
    tone: "from-accent to-saffron text-accent-foreground",
    internal: true,
  },
  {
    title: "Download Admit Card",
    desc: "शिक्षा पाओ-ज्ञान बढ़ाओ प्रतियोगिता के लिए एडमिट कार्ड डाउनलोड करें।",
    href: "https://www.sbgbteam.com/sbgbp-registration-admit-card",
    icon: Download,
    tone: "from-card to-secondary text-foreground",
  },
];

const heroTags = [
  "जन जागरूकता",
  "ग्रामीण शिक्षा",
  "महिला सशक्तिकरण",
  "ग्रीन विलेज - क्लीन विलेज",
];

const initiatives = [
  {
    title: "जन जागरूकता",
    desc: "टीम सरकारी योजनाओं की जानकारी लोगों तक पहुंचाने, लाभार्थियों तक उनका लाभ पहुंचाने और समूह आधारित सामाजिक संगठन विकसित करने का कार्य करती है।",
    icon: Sparkles,
    accent: "from-accent/20 to-transparent",
  },
  {
    title: "ग्रामीण शिक्षा सबलीकरण",
    desc: "ग्रामीण प्रतिभाओं को निखारने, प्रोत्साहित करने, मार्गदर्शन देने और गरीब व जरूरतमंद विद्यार्थियों को आर्थिक सहयोग प्रदान करने के उद्देश्य से प्रतियोगिताओं और शैक्षिक पहलों का संचालन किया जाता है।",
    icon: GraduationCap,
    accent: "from-primary/15 to-transparent",
  },
  {
    title: "SBGBT उत्थान संकल्पना",
    desc: "उत्थान भवन, उत्थान लाइब्रेरी और उत्थान कोचिंग संस्थान के माध्यम से युवाओं को राष्ट्र के समृद्ध मानव संसाधन के रूप में तैयार करने का सतत प्रयास।",
    icon: BookOpen,
    accent: "from-leaf/15 to-transparent",
  },
  {
    title: "महिला सशक्तिकरण",
    desc: "ग्रामीण क्षेत्र की प्रतिभाशाली बच्चियों और महिलाओं को शिक्षा, मार्गदर्शन, स्वावलंबन, आत्मविश्वास और स्वरोजगार के अवसरों से जोड़ना।",
    icon: Users2,
    accent: "from-earth/15 to-transparent",
  },
  {
    title: "स्मार्ट विलेज योजना",
    desc: "गांवों में सकारात्मक सोच, जन जागरूकता और विकास के लिए जनचेतना पैदा करना ताकि लोग अपने अधिकारों और कर्तव्यों के प्रति संवेदनशील बनें।",
    icon: Landmark,
    accent: "from-primary/15 to-transparent",
  },
  {
    title: "पंचायती राज सुदृढ़ीकरण प्रयास",
    desc: "ग्रामीणों को सरकारी योजनाओं और विकास कार्यक्रमों की जानकारी देना तथा सरकारी एजेंसियों के साथ समन्वय बनाकर लाभार्थियों तक योजनाओं का लाभ पहुंचाना।",
    icon: FileText,
    accent: "from-accent/15 to-transparent",
  },
  {
    title: "आत्मनिर्भर व समृद्ध गांव संकल्पना",
    desc: "वित्तीय समावेशन सुनिश्चित करने, वित्तीय साक्षरता बढ़ाने और क्रेडिट योजनाओं के महत्व के प्रति ग्रामीणों को जागरूक करने का अभियान।",
    icon: ArrowRight,
    accent: "from-leaf/15 to-transparent",
  },
  {
    title: "पर्यावरण संरक्षण व संवर्धन कार्यक्रम",
    desc: "\"ग्रीन विलेज - क्लीन विलेज\" अभियान के माध्यम से स्वच्छता और पर्यावरण संरक्षण के प्रति जन जागरूकता पैदा करना और गांव-गांव में अभियान को सक्रिय रखना।",
    icon: Leaf,
    accent: "from-leaf/20 to-transparent",
  },
  {
    title: "जन स्वस्थ - राष्ट्र स्वस्थ",
    desc: "स्वस्थ गांव और स्वस्थ समाज के लिए जागरूकता, सामुदायिक सहयोग और जीवन रक्षा से जुड़े अभियानों का संचालन।",
    icon: HeartPulse,
    accent: "from-accent/15 to-transparent",
  },
  {
    title: "समाज व राष्ट्र निर्माण प्रयास",
    desc: "गांवों की स्थानीय समस्याओं पर विचार करना, स्थानीय स्तर पर समाधान ढूंढना और गांव विकास समितियों का गठन कर विकास को गति देना।",
    icon: Users2,
    accent: "from-earth/15 to-transparent",
  },
];

const initiativeHighlights = [
  {
    title: "गांव से शुरुआत",
    value: "10",
    note: "मुख्य अभियान जिन्हें homepage पर प्रमुख रूप से दिखाया गया है",
  },
  {
    title: "कार्य की दिशा",
    value: "360°",
    note: "शिक्षा, जागरूकता, स्वास्थ्य, पर्यावरण और नेतृत्व का संयुक्त प्रभाव",
  },
  {
    title: "मूल भाव",
    value: "सहभागिता",
    note: "हर पहल गांव के लोगों को साथ लेकर आगे बढ़ती है",
  },
];

const videos = [
  "शिक्षा का मंदिर_ उत्थान भवन सरमथुरा",
  "मानवता की सेवा ही ईश्वर की सेवा है",
  "सोच बदलो गाँव बदलो यात्रा",
  "स्थापना दिवस की शुभकामनाएँ व बधाइयाँ।",
  "स्मार्ट विलेज कॉन्सेप्ट एंड अचीवमेंट्स",
  "ज़िंदगी को ऐसे जिया कि लोगों के लिए प्रेरणा...",
];

const mediaItems = [
  { date: "06/02/2025", title: "Testing Media 2", category: "सोच बदलो गांव बदलो" },
  { date: "जुलाई 18 2018", title: "गांवों में पौधारोपण अभियान चलाया जाता है", category: "सोच बदलो गांव बदलो" },
  { date: "जुलाई 18 2018", title: "चंबल के बीहड़ो से निकले देश का मॉडल विलेज...", category: "ग्रामीण विकास" },
  { date: "20 जून 2018", title: "हर गांव धनौरा की तरह आदर्श बने- नन्नूमल पह...", category: "सोच बदलो गांव बदलो" },
];

const galleryItems = [
  { src: galVillage, title: "On event gallery" },
  { src: galLib, title: "आओ पढे-आगे बढे" },
  { src: galAwards, title: "Journey 4" },
  { src: galWomen, title: "Journey 2" },
  { src: galEnv, title: "Journey 1" },
  { src: galHealth, title: "ब्लड की कमी से किसी की जान नहीं जा सकेगी" },
];

const valueMoments = [
  { label: "शिक्षा", note: "प्रतिभा खोज और मार्गदर्शन" },
  { label: "सशक्तिकरण", note: "महिला और युवा नेतृत्व" },
  { label: "जनसेवा", note: "स्वास्थ्य, पर्यावरण, जागरूकता" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="grain-bg absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent" />
        <div className="absolute -left-16 top-24 size-48 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -right-10 bottom-12 size-56 rounded-full bg-primary/15 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent" />
              सोच बदलो गांव बदलो टीम
            </span>
            <h1 className="mt-5 font-display text-4xl font-black leading-[0.98] text-balance sm:text-5xl lg:text-7xl">
              शिक्षा, जागरूकता और
              <span className="block text-primary">गांव उत्थान की पहल।</span>
            </h1>
            <p className="mt-4 max-w-2xl font-hi text-xl leading-relaxed text-earth sm:text-2xl">
              सोच बदलो गांव बदलो
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              SBGBT शिक्षा, जन जागरूकता, महिला सशक्तिकरण, स्मार्ट विलेज, पर्यावरण संरक्षण,
              स्वास्थ्य और समाज व राष्ट्र निर्माण जैसे कार्यों के माध्यम से ग्रामीण समाज को
              मजबूत बनाने के लिए लगातार प्रयासरत है।
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-12px_oklch(0.42_0.09_165_/_0.65)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                हमारे बारे में <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://www.sbgbteam.com/sbgbp-registration"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-primary/40 hover:bg-muted"
              >
                SPGBP रजिस्ट्रेशन
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {valueMoments.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-[1.5rem] border border-border bg-card/85 p-4 shadow-sm backdrop-blur ${
                    index === 1 ? "sm:-translate-y-4" : ""
                  }`}
                >
                  <div className="font-display text-2xl font-black text-primary">{item.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-transparent to-primary/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl">
              <img
                src={heroEducation}
                alt="SBGBT rural education initiative"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                width={1600}
                height={1200}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream sm:p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-cream/75">SBGBT</div>
                <div className="mt-2 font-display text-2xl font-black sm:text-3xl">
                  ग्रामीण शिक्षा सबलीकरण
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/80">
                  ग्रामीण प्रतिभाओं को निखारने, उनको प्रोत्साहित करने, मार्गदर्शन देने और
                  जरूरतमंद विद्यार्थियों को सहयोग प्रदान करने की सतत पहल।
                </p>
              </div>
            </div>

            <div className="absolute -left-3 top-8 rounded-[1.5rem] border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:-left-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Featured
              </div>
              <div className="mt-1 font-display text-lg font-black text-primary">SPGBP 2025-26</div>
              <div className="text-sm text-muted-foreground">रजिस्ट्रेशन प्रारंभ</div>
            </div>

            <div className="absolute -bottom-5 right-4 max-w-[220px] rounded-[1.5rem] bg-ink p-4 text-cream shadow-2xl sm:right-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-cream/60">Vision</div>
              <p className="mt-2 font-hi text-base leading-relaxed">
                विचार बदलें, गांव बदलें, अवसर बढ़ाएं।
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="festive-band border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="flex items-start gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-md">
                <Sparkles className="size-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-earth">Latest Notice</div>
                <p className="mt-1 font-hi text-base leading-relaxed sm:text-lg">
                  शिक्षा पाओ-ज्ञान बढ़ाओ प्रतियोगिता (SPGBP):2025-26 रजिस्ट्रेशन प्रारंभ -
                  अधिक जानकारी के लिए नीचे दिए गए नोटिफिकेशन और Annexures(परिशिष्ट)
                  डाउनलोड करें।
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {noticeLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary/20 bg-card px-3 py-2 text-xs font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">मुख्य लिंक</div>
            <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl">
              सदस्यता, सहयोग और प्रतियोगिता से जुड़े जरूरी विकल्प।
            </h2>
          </div>
          <div className="vibrant-panel rounded-[2rem] border border-border p-5 text-sm leading-relaxed text-muted-foreground shadow-sm">
            इन्हीं रास्तों से visitor action लेता है, इसलिए इन cards को थोड़ा ज्यादा bold,
            bright aur tactile बनाया गया है ताकि homepage static list जैसा न लगे।
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quickActions.map((item, index) => {
            const content = (
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${item.tone} ${
                  index === 1 ? "md:-translate-y-4" : ""
                }`}
              >
                <div className="absolute right-0 top-0 size-28 rounded-full bg-white/10 blur-2xl" />
                <div className="grid size-12 place-items-center rounded-2xl bg-black/10">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-black">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed opacity-85">{item.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  आगे बढ़ें <ArrowRight className="size-4" />
                </div>
              </div>
            );

            return item.internal ? (
              <Link key={item.title} to={item.href} className="block">
                {content}
              </Link>
            ) : (
              <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="block">
                {content}
              </a>
            );
          })}
        </div>
      </section>

      <section className="festive-band relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute left-0 top-24 size-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 top-40 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">हमारे कार्य</div>
              <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl lg:text-5xl">
                SBGBT homepage पर दिखाए गए प्रमुख अभियान।
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                जन जागरूकता से लेकर समाज व राष्ट्र निर्माण प्रयास तक, नीचे दिए गए सभी अभियान
                live homepage के मूल content पर आधारित हैं।
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {initiativeHighlights.map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-[1.75rem] border border-border bg-card/85 p-5 shadow-sm backdrop-blur ${
                    index === 1 ? "sm:-translate-y-4" : ""
                  }`}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {item.title}
                  </div>
                  <div className="mt-3 font-display text-3xl font-black text-primary">{item.value}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="vibrant-panel mt-10 overflow-hidden rounded-[2rem] border border-border shadow-sm">
            <div className="grid gap-6 border-b border-border px-6 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="size-3.5" />
                  Campaign Showcase
                </div>
                <p className="mt-4 font-hi text-lg leading-relaxed text-earth">
                  शिक्षा, सशक्तिकरण, पर्यावरण, जन-नेतृत्व और सामाजिक जागरूकता को एक साथ
                  लेकर चलने वाली पहलें।
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["जन जागरूकता", "ग्रामीण शिक्षा", "महिला सशक्तिकरण", "ग्रीन विलेज"].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm font-semibold text-foreground"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3 sm:p-6">
              {initiatives.map((item, index) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[1.9rem] border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition group-hover:opacity-100`} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <item.icon className="size-5" />
                      </div>
                      <span className="font-display text-3xl font-black text-muted-foreground/20">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-leaf"
                        style={{ width: `${58 + (index % 4) * 10}%` }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-ink">
            <img
              src={galVillage}
              alt="SBGBT documentary preview"
              width={1200}
              height={900}
              className="aspect-video w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid size-20 place-items-center rounded-full bg-cream/95 text-primary shadow-2xl transition duration-300 hover:scale-110">
                <PlayCircle className="size-10" strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-cream">
              <div className="text-xs uppercase tracking-[0.2em] text-cream/75">वीडियो</div>
              <div className="mt-2 font-display text-2xl font-black">सोच बदलो गाँव बदलो यात्रा</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">वीडियो</div>
            <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl">
              homepage में दिखाए गए वीडियो शीर्षक।
            </h2>
            <div className="mt-6 space-y-3">
              {videos.map((video, index) => (
                <a
                  key={video}
                  href="https://www.sbgbteam.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-md"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <PlayCircle className="size-4" />
                  </div>
                  <span className="font-hi min-w-0 flex-1 truncate text-sm sm:text-base">{video}</span>
                  <span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="festive-band">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">मीडिया कवरेज</div>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">समाचार और उल्लेख।</h2>
            </div>
            <Link to="/media" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3">
              सभी देखें <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {mediaItems.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[1.75rem] border border-border bg-card p-6 transition hover:border-primary/35 hover:shadow-lg ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                    <Newspaper className="size-3.5" />
                    {item.category}
                  </span>
                  <span className="text-muted-foreground">प्रकाशित तिथि: {item.date}</span>
                </div>
                <h3 className="mt-4 font-hi text-lg font-semibold leading-relaxed">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">फोटो गेलरी</div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">मैदान से कुछ दृश्य।</h2>
          </div>
          <div className="rounded-[2rem] bg-ink p-6 text-cream shadow-xl">
            <Quote className="size-5 text-accent" />
            <p className="mt-3 font-hi text-base leading-relaxed text-cream/80">
              “ग्रीन विलेज - क्लीन विलेज”, शिक्षा, स्वास्थ्य और सामुदायिक भागीदारी के
              दृश्य ही SBGBT की असली कहानी बताते हैं।
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <figure
              key={item.title}
              className={`${index === 0 ? "col-span-2 md:row-span-2" : ""} group relative overflow-hidden rounded-[1.75rem]`}
            >
              <img
                src={item.src}
                alt={item.title}
                width={1200}
                height={900}
                className="h-full min-h-[220px] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-cream">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
                  <Images className="size-3.5" />
                  Gallery
                </span>
                <div className="mt-2 font-hi text-sm sm:text-base">{item.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="donate" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-leaf" />
        <div className="grain-bg absolute inset-0 opacity-25" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cream/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center text-primary-foreground sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            <HandHeart className="size-3.5" />
            सहयोग
          </span>
          <h2 className="mt-5 font-display text-4xl font-black text-balance sm:text-5xl lg:text-6xl">
            SBGBT सदस्य बनें और दान करें।
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80">
            शिक्षा, पर्यावरण, महिला सशक्तिकरण, स्वास्थ्य और ग्रामीण जन-जागरूकता अभियानों को
            आपकी भागीदारी और सहयोग की जरूरत है।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-xl transition hover:-translate-y-0.5 hover:brightness-95"
            >
              <HandHeart className="size-4" />
              दान करें
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-cream/10 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-cream/20"
            >
              सदस्य बनें
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
