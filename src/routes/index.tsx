import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  BadgeCheck,
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
      { title: "SBGBT | सोच बदलो, गांव बदलो टीम" },
      {
        name: "description",
        content:
          "सोच बदलो, गांव बदलो टीम की ग्रामीण शिक्षा, महिला सशक्तिकरण, स्वास्थ्य, पर्यावरण और जन-जागरूकता पहलों की जानकारी।",
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
    desc: "शिक्षा, स्वास्थ्य, पौधारोपण और ग्रामीण विकास अभियानों को सार्थक सहयोग दें।",
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

const heroSlides = [
  {
    title: "महिला सशक्तिकरण",
    note: "शिक्षा, आत्मविश्वास और नेतृत्व से जुड़ी पहलें",
    accent: "नई दिशा",
    stat: "150+ गाँव",
    statNote: "प्रभावित",
    image: galWomen,
  },
  {
    title: "ग्रामीण शिक्षा",
    note: "प्रतिभा खोज, मार्गदर्शन और सतत सार्थक सहयोग",
    accent: "सतत अभियान",
    stat: "25+ पहल",
    statNote: "शैक्षिक केंद्र",
    image: heroEducation,
  },
  {
    title: "ग्रीन विलेज - क्लीन विलेज",
    note: "स्वच्छता, पर्यावरण और सामुदायिक भागीदारी",
    accent: "हरित संकल्प",
    stat: "1000+ पौधे",
    statNote: "संरक्षण अभियान",
    image: galEnv,
  },
] as const;

const initiatives = [
  {
    title: "जन जागरूकता",
    desc: "टीम सरकारी योजनाओं की जानकारी लोगों तक पहुंचाने, लाभार्थियों तक उनका लाभ पहुंचाने और समूह आधारित सामाजिक संगठन विकसित करने का कार्य करती है।",
    icon: Sparkles,
    accent: "from-accent/20 to-transparent",
  },
  {
    title: "ग्रामीण शिक्षा सबलीकरण",
    desc: "ग्रामीण प्रतिभाओं को निखारने, प्रोत्साहित करने, मार्गदर्शन देने और गरीब व जरूरतमंद विद्यार्थियों को आर्थिक सार्थक सहयोग प्रदान करने के उद्देश्य से प्रतियोगिताओं और शैक्षिक पहलों का संचालन किया जाता है।",
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
    desc: "स्वस्थ गांव और स्वस्थ समाज के लिए जागरूकता, सामुदायिक सार्थक सहयोग और जीवन रक्षा से जुड़े अभियानों का संचालन।",
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
  {
    title: "शिक्षा का मंदिर_ उत्थान भवन सरमथुरा",
    embedUrl: "https://www.youtube.com/embed/Mqw26LHHR9E?autoplay=1&rel=0",
    image: galLib,
    tag: "शैक्षिक पहल",
  },
  {
    title: "मानवता की सेवा ही ईश्वर की सेवा है",
    embedUrl: "https://www.youtube.com/embed/kUMosORZmOo?autoplay=1&rel=0",
    image: galHealth,
    tag: "समाजसेवा",
  },
  {
    title: "सोच बदलो गाँव बदलो यात्रा",
    embedUrl: "https://www.youtube.com/embed/3RjwYoCyWrI?autoplay=1&rel=0",
    image: galVillage,
    tag: "जनजागरूकता",
  },
  {
    title: "स्थापना दिवस की शुभकामनाएँ व बधाइयाँ।",
    embedUrl: "https://www.youtube.com/embed/mycj-BJ08Wk?autoplay=1&rel=0",
    image: galAwards,
    tag: "संस्था परिचय",
  },
  {
    title: "स्मार्ट विलेज कॉन्सेप्ट एंड अचीवमेंट्स",
    embedUrl: "https://www.youtube.com/embed/DH3KPEHgAA4?autoplay=1&rel=0",
    image: galEnv,
    tag: "ग्रीन विलेज",
  },
  {
    title: "ज़िंदगी को ऐसे जिया कि लोगों के लिए प्रेरणा बन गए",
    embedUrl: "https://www.youtube.com/embed/wy3rBd3F-hg?autoplay=1&rel=0",
    image: galWomen,
    tag: "महिला सशक्तिकरण",
  },
];
const mediaItems = [
  { date: "06/02/2025", title: "Testing Media 2", category: "सोच बदलो, गांव बदलो" },
  { date: "जुलाई 18 2018", title: "गांवों में पौधारोपण अभियान चलाया जाता है", category: "सोच बदलो, गांव बदलो" },
  { date: "जुलाई 18 2018", title: "चंबल के बीहड़ो से निकले देश का मॉडल विलेज...", category: "ग्रामीण विकास" },
  { date: "20 जून 2018", title: "हर गांव धनौरा की तरह आदर्श बने- नन्नूमल पह...", category: "सोच बदलो, गांव बदलो" },
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
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(2);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const currentHeroSlide = heroSlides[activeHeroSlide];


  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveVideoIndex((current) => (current + 1) % videos.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const getWrappedVideoIndex = (offset: number) => (activeVideoIndex + offset + videos.length) % videos.length;
  const visibleVideos = [
    { video: videos[getWrappedVideoIndex(-1)], offset: -1 },
    { video: videos[getWrappedVideoIndex(0)], offset: 0 },
    { video: videos[getWrappedVideoIndex(1)], offset: 1 },
  ] as const;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f0df_0%,#f1ecd7_28%,#f7f3e7_100%)] text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f463c_0%,#145446_48%,#193e34_100%)] text-cream">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%,rgba(0,0,0,0.12)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cream shadow-sm backdrop-blur">
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_18px_rgba(214,181,74,0.9)]" />
              सोच बदलो, गांव बदलो टीम
            </span>
            <h1 className="mt-5 font-display text-4xl font-black leading-[0.98] text-balance text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:text-5xl lg:text-7xl">
              शिक्षा, जनजागरूकता और
              <span className="block text-accent drop-shadow-[0_6px_18px_rgba(0,0,0,0.24)]">ग्राम उत्थान की सशक्त पहल।</span>
            </h1>
            <p className="mt-4 max-w-2xl font-hi text-xl leading-relaxed text-cream/85 sm:text-2xl">
              सोच बदलो, गांव बदलो
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/88 sm:text-lg">
              SBGBT शिक्षा, जन जागरूकता, महिला सशक्तिकरण, स्मार्ट विलेज, पर्यावरण संरक्षण,
              स्वास्थ्य और समाज व राष्ट्र निर्माण जैसे कार्यों के माध्यम से ग्रामीण समाज को
              मजबूत बनाने के लिए लगातार प्रयासरत है।
            </p>

            <div className="hidden">
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/6 p-3 shadow-[0_28px_55px_-34px_rgba(0,0,0,0.88)] backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.8rem]">
                  <img
                    src={currentHeroSlide.image}
                    alt={currentHeroSlide.title}
                    className="h-[360px] w-full object-cover transition duration-700"
                    width={900}
                    height={1200}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-white/10" />

                  <div className="absolute left-4 top-4 rounded-[1.35rem] bg-[#f8f3e7] px-4 py-3 text-ink shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                        <GraduationCap className="size-5" />
                      </div>
                      <div>
                        <div className="text-base font-black text-primary">SPGBP 2025-26</div>
                        <div className="text-xs text-ink/70">रजिस्ट्रेशन प्रारंभ</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 rounded-[1.35rem] bg-[#f8f3e7] px-4 py-3 text-ink shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                        <Leaf className="size-5" />
                      </div>
                      <div>
                        <div className="text-base font-black text-primary">{currentHeroSlide.stat}</div>
                        <div className="text-xs text-ink/70">{currentHeroSlide.statNote}</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
                      <BadgeCheck className="size-3.5 text-accent" />
                      {currentHeroSlide.accent}
                    </div>
                    <div className="mt-3 font-display text-3xl font-black">{currentHeroSlide.title}</div>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/92">
                      {currentHeroSlide.note}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 px-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveHeroSlide(index)}
                      aria-label={slide.title}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeHeroSlide ? "w-10 bg-cream" : "w-2.5 bg-cream/45 hover:bg-cream/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_18px_34px_-16px_rgba(214,181,74,0.92)] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                हमारे बारे में <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://www.sbgbteam.com/sbgbp-registration"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/18 bg-white/8 px-6 py-3 text-sm font-semibold text-cream shadow-sm backdrop-blur transition hover:border-accent/70 hover:bg-white/12"
              >
                SPGBP पंजीकरण
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {valueMoments.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-[1.5rem] border border-white/10 bg-white/8 p-4 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur ${
                    index === 1 ? "sm:-translate-y-4" : ""
                  }`}
                >
                  <div className="font-display text-2xl font-black text-accent">{item.label}</div>
                  <div className="mt-1 text-sm text-cream/72">{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/10 p-3 shadow-[0_38px_80px_-32px_rgba(0,0,0,0.95)]">
              <div className="relative overflow-hidden rounded-[2rem]">
                <img
                  src={currentHeroSlide.image}
                  alt={currentHeroSlide.title}
                  className="aspect-[4/5] w-full object-cover transition duration-700 sm:aspect-[5/6]"
                  width={1600}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream sm:p-6">
                  <div className="mt-3 font-display text-2xl font-black sm:text-3xl">
                    {currentHeroSlide.title}
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/92">
                    {currentHeroSlide.note}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 px-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveHeroSlide(index)}
                    aria-label={slide.title}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeHeroSlide ? "w-10 bg-cream" : "w-2.5 bg-cream/45 hover:bg-cream/70"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-transparent to-[#2f7a65]/30 blur-3xl" />
            <div className="hidden overflow-hidden rounded-[2.5rem] border border-white/12 bg-black/20 shadow-[0_38px_80px_-32px_rgba(0,0,0,0.95)]">
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
                <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/92">
                  ग्रामीण प्रतिभाओं को निखारने, उनको प्रोत्साहित करने, मार्गदर्शन देने और
                  जरूरतमंद विद्यार्थियों को सार्थक सहयोग प्रदान करने की सतत पहल।
                </p>
              </div>
            </div>

            <div className="hidden absolute -left-3 top-8 rounded-[1.5rem] border border-white/12 bg-[#f5efd9]/95 p-4 text-ink shadow-xl backdrop-blur sm:-left-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                विशेष सूचना
              </div>
              <div className="mt-1 font-display text-lg font-black text-primary">SPGBP 2025-26</div>
              <div className="text-sm text-muted-foreground">रजिस्ट्रेशन प्रारंभ</div>
            </div>

            {/* <div className="absolute -bottom-5 right-4 max-w-[220px] rounded-[1.5rem] bg-ink p-4 text-cream shadow-2xl sm:right-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-cream/60">प्रभाव</div>
              <p className="mt-2 font-hi text-base leading-relaxed">
                विचार बदलें, गांव बदलें, अवसर बढ़ाएं।
              </p>
            </div> */}
            <div className="hidden absolute bottom-8 right-4 rounded-[1.35rem] bg-[#f8f3e7] px-4 py-3 text-ink shadow-xl sm:right-6">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Leaf className="size-5" />
                </div>
                <div>
                  <div className="text-base font-black text-primary">{currentHeroSlide.stat}</div>
                  <div className="text-xs text-ink/70">{currentHeroSlide.statNote}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#255247]/20 bg-[linear-gradient(180deg,#f1ebd4_0%,#efe7cd_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="flex items-start gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-md">
                <Sparkles className="size-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-earth">महत्वपूर्ण सूचना</div>
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
                  className="rounded-full border border-primary/20 bg-white/80 px-3 py-2 text-xs font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
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
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">त्वरित पहुँच</div>
            <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl">
              सदस्यता, सार्थक सहयोग और पंजीकरण के प्रमुख विकल्प।
            </h2>
          </div>
          <div className="rounded-[2rem] border border-[#255247]/12 bg-[linear-gradient(145deg,rgba(255,251,239,0.96),rgba(243,235,210,0.96))] p-5 text-sm leading-relaxed text-earth shadow-[0_26px_50px_-38px_rgba(17,63,52,0.72)]">
            इन्हीं रास्तों से visitor action लेता है, इसलिए इन cards को थोड़ा ज्यादा bold,
            bright aur tactile बनाया गया है ताकि homepage static list जैसा न लगे।
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quickActions.map((item, index) => {
            const content = (
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#255247]/10 bg-gradient-to-br p-6 shadow-[0_24px_45px_-34px_rgba(17,63,52,0.65)] transition duration-300 hover:-translate-y-1 hover:shadow-xl ${item.tone} ${
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
                  विस्तार से जानें <ArrowRight className="size-4" />
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

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f0e8d0_0%,#f7f2e5_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute left-0 top-24 size-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 top-40 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">हमारी पहलें</div>
              <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl lg:text-5xl">
                SBGBT की प्रमुख विकास पहलें।
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
                  className={`rounded-[1.75rem] border border-[#255247]/10 bg-white/75 p-5 shadow-[0_18px_40px_-30px_rgba(17,63,52,0.52)] backdrop-blur ${
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

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#255247]/12 bg-[linear-gradient(145deg,rgba(255,251,242,0.98),rgba(242,236,216,0.98))] shadow-[0_30px_60px_-42px_rgba(14,57,48,0.8)]">
            <div className="grid gap-6 border-b border-border px-6 py-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="size-3.5" />
                  अभियान परिचय
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
                  className="group relative overflow-hidden rounded-[1.9rem] border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2"
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                        <item.icon className="size-5" />
                      </div>
                      <span className="font-display text-3xl font-black text-muted-foreground/20 transition duration-300 group-hover:text-primary/30">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-black transition duration-300 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-leaf transition duration-300 group-hover:brightness-110"
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
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">वीडियो गैलरी</div>
          <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl lg:text-5xl">
            SBGBT के प्रेरक वीडियो।
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            शिक्षा, समाजसेवा, महिला सशक्तिकरण और ग्राम विकास से जुड़ी हमारी पहलों की झलक इन वीडियो कहानियों में देखें।
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[2.8rem] border border-primary/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.86),rgba(244,237,217,0.92)_44%,rgba(239,232,214,0.98)_100%)] px-4 py-10 shadow-[0_34px_80px_-46px_rgba(19,67,56,0.38)] sm:px-6 lg:px-16 lg:py-14">
          <div className="absolute left-1/2 top-0 h-12 w-28 -translate-x-1/2 rounded-b-[2rem] bg-background/95" />
          <div className="absolute bottom-0 left-1/2 h-10 w-24 -translate-x-1/2 rounded-t-[2rem] bg-background/95" />

          <button
            type="button"
            onClick={() => setActiveVideoIndex((current) => (current - 1 + videos.length) % videos.length)}
            className="absolute left-2 top-1/2 z-20 hidden size-14 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_18px_40px_-22px_rgba(17,63,52,0.7)] transition hover:-translate-y-[52%] hover:brightness-110 lg:grid"
            aria-label="पिछला वीडियो"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setActiveVideoIndex((current) => (current + 1) % videos.length)}
            className="absolute right-2 top-1/2 z-20 hidden size-14 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_18px_40px_-22px_rgba(214,181,74,0.6)] transition hover:-translate-y-[52%] hover:brightness-95 lg:grid"
            aria-label="अगला वीडियो"
          >
            <ArrowRight className="size-5" />
          </button>

          <div className="space-y-5 lg:hidden">
            {visibleVideos.map(({ video, offset }) => {
              const isActive = offset === 0;
              const cardIndex = videos.findIndex((item) => item.title === video.title);

              return (
                <Dialog key={video.title}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setActiveVideoIndex(cardIndex)}
                      onFocus={() => setActiveVideoIndex(cardIndex)}
                      className={`group relative min-h-[320px] w-full overflow-hidden rounded-[2.4rem] border text-left transition-all duration-700 ${
                        isActive
                          ? "border-primary/20 shadow-[0_32px_70px_-34px_rgba(17,63,52,0.55)]"
                          : "border-primary/10 opacity-85 shadow-[0_20px_48px_-34px_rgba(17,63,52,0.32)]"
                      }`}
                    >
                      <img
                        src={video.image}
                        alt={video.title}
                        className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                          isActive ? "grayscale-0" : "grayscale"
                        }`}
                        width={1200}
                        height={900}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                      <div className="absolute inset-0 grid place-items-center">
                        <div
                          className={`grid place-items-center rounded-full transition duration-500 ${
                            isActive
                              ? "size-24 bg-primary text-primary-foreground shadow-[0_20px_44px_-18px_rgba(17,63,52,0.72)]"
                              : "size-14 bg-cream/90 text-primary"
                          }`}
                        >
                          <ArrowRight className={isActive ? "size-10 -rotate-45" : "size-6"} strokeWidth={2} />
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-cream">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-cream/70">{video.tag}</div>
                        <div className={`mt-3 font-display font-black leading-tight ${isActive ? "text-3xl" : "text-xl"}`}>
                          {video.title}
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl border-border bg-background p-3 sm:p-4">
                    <DialogHeader>
                      <DialogTitle className="pr-8 font-hi text-base sm:text-lg">{video.title}</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-hidden rounded-2xl bg-black">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="aspect-video w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

          <div className="relative hidden h-[32rem] lg:block">
            {visibleVideos.map(({ video, offset }) => {
              const isActive = offset === 0;
              const cardIndex = videos.findIndex((item) => item.title === video.title);

              return (
                <Dialog key={video.title}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setActiveVideoIndex(cardIndex)}
                      onFocus={() => setActiveVideoIndex(cardIndex)}
                      className={`group absolute top-1/2 overflow-hidden rounded-[2.5rem] border text-left transition-all duration-1000 ease-in-out ${
                        isActive
                          ? "left-1/2 z-20 h-[29rem] w-[36%] border-primary/20 shadow-[0_32px_70px_-34px_rgba(17,63,52,0.55)]"
                          : offset < 0
                            ? "left-[5%] z-10 h-[24rem] w-[28%] border-primary/10 opacity-85 shadow-[0_20px_48px_-34px_rgba(17,63,52,0.32)]"
                            : "right-[5%] z-10 h-[24rem] w-[28%] border-primary/10 opacity-85 shadow-[0_20px_48px_-34px_rgba(17,63,52,0.32)]"
                      }`}
                      style={{
                        transform: isActive
                          ? "translate(-50%, -50%) scale(1)"
                          : offset < 0
                            ? "translateY(-44%) rotate(-4deg) scale(0.94)"
                            : "translateY(-44%) rotate(4deg) scale(0.94)",
                      }}
                    >
                      <img
                        src={video.image}
                        alt={video.title}
                        className={`absolute inset-0 h-full w-full object-cover transition duration-1000 ${
                          isActive ? "grayscale-0" : "grayscale-[0.2]"
                        }`}
                        width={1200}
                        height={900}
                      />
                      <div className={`absolute inset-0 ${
                        isActive
                          ? "bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                          : "bg-gradient-to-t from-black/85 via-black/35 to-black/20"
                      }`} />

                      {isActive ? (
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="grid size-28 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_20px_44px_-18px_rgba(17,63,52,0.72)] transition duration-500 group-hover:scale-105">
                            <ArrowRight className="size-12 -rotate-45" strokeWidth={2.1} />
                          </div>
                        </div>
                      ) : (
                        <div className="absolute bottom-8 left-8 grid size-10 place-items-center rounded-full bg-primary/85 text-primary-foreground shadow-lg">
                          <span className="size-2 rounded-full bg-accent" />
                        </div>
                      )}

                      <div className={`absolute inset-x-0 bottom-0 z-10 p-6 text-cream ${isActive ? "text-center" : "text-left"}`}>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-cream/70">{video.tag}</div>
                        <div className={`mt-3 font-display font-black leading-tight ${isActive ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                          {video.title}
                        </div>
                        <div className="mt-2 text-sm text-cream/75">{isActive ? "वीडियो कहानी देखें" : "प्रेरक झलक"}</div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl border-border bg-background p-3 sm:p-4">
                    <DialogHeader>
                      <DialogTitle className="pr-8 font-hi text-base sm:text-lg">{video.title}</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-hidden rounded-2xl bg-black">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="aspect-video w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            {videos.map((video, index) => (
              <button
                key={video.title}
                type="button"
                onClick={() => setActiveVideoIndex(index)}
                aria-label={video.title}
                className={`rounded-full transition-all duration-500 ${
                  index === activeVideoIndex ? "h-2.5 w-12 bg-primary" : "h-2.5 w-2.5 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[linear-gradient(180deg,#f3ecd5_0%,#f7f2e6_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">मीडिया कवरेज</div>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">समाचारों और मीडिया उल्लेखों में SBGBT।</h2>
            </div>
            <Link to="/media" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3">
              सभी देखें <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {mediaItems.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[1.75rem] border border-[#255247]/10 bg-[linear-gradient(145deg,rgba(255,251,244,0.96),rgba(242,236,216,0.96))] p-6 transition hover:border-primary/35 hover:shadow-lg ${
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
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">मैदान से जुड़े प्रेरक दृश्य।</h2>
          </div>
          <div className="rounded-[2rem] bg-[linear-gradient(145deg,#103d34,#184a3d)] p-6 text-cream shadow-[0_30px_55px_-36px_rgba(0,0,0,0.9)]">
            <Quote className="size-5 text-accent" />
            <p className="mt-3 font-hi text-base leading-relaxed text-cream/92">
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
                  गैलरी
                </span>
                <div className="mt-2 font-hi text-sm sm:text-base">{item.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="donate" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0d3f36_0%,#0f5248_48%,#163a30_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(214,181,74,0.16),transparent_24%),radial-gradient(circle_at_84%_76%,rgba(62,150,119,0.2),transparent_30%)]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cream/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center text-primary-foreground sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
            <HandHeart className="size-3.5" />
            सार्थक सहयोग
          </span>
          <h2 className="mt-5 font-display text-4xl font-black text-balance sm:text-5xl lg:text-6xl">
            SBGBT से जुड़ें और परिवर्तन के भागीदार बनें।
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80">
            शिक्षा, पर्यावरण, महिला सशक्तिकरण, स्वास्थ्य और ग्रामीण जन-जागरूकता अभियानों को
            आपकी भागीदारी और सार्थक सहयोग की जरूरत है।
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

