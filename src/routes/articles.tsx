import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";
import art1 from "@/assets/art1.jpg";
import art2 from "@/assets/art2.jpg";
import art3 from "@/assets/art3.jpg";
import art4 from "@/assets/art4.jpg";
import art5 from "@/assets/art5.jpg";
import art6 from "@/assets/art6.jpg";
import art7 from "@/assets/art7.jpg";
import art8 from "@/assets/art8.jpg";
import art9 from "@/assets/art9.jpg";
import art10 from "@/assets/art10.jpg";
import art11 from "@/assets/art11.jpg";
import galAwards from "@/assets/gallery-awards.jpg";
import galEnv from "@/assets/gallery-environment.jpg";
import galHealth from "@/assets/gallery-health.jpg";
import galLib from "@/assets/gallery-library.jpg";
import galVillage from "@/assets/gallery-village.jpg";
import galWomen from "@/assets/gallery-women.jpg";

import ecoNeedsLogo from "@/assets/econeeds-logo.png";
import workholicsLogo from "@/assets/workholicslogo.png";
import heroHeartSprade from "@/assets/hero-heart-sprade.png";
import blogBgPaper from "@/assets/blog-bg-paper.png";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "जागरूकता लेख | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT की फोटो गैलरी जिसमें शिक्षा, महिला सशक्तिकरण, पर्यावरण, स्वास्थ्य और ग्राम विकास से जुड़े प्रमुख क्षण शामिल हैं।",
      },
    ],
  }),
  component: Gallery,
});

const categories = [
  "सभी",
  "सोच बदलो गांव बदलो यात्रा",
  "शिक्षा - सशक्तीकरण का सूत्र",
  "प्रेरणादायक व्यक्तित्व",
  "जागरूकता - मानव अस्तित्व का आधार",
  "पर्यावरण - लेखन पीढ़ियों का भविष्य",
] as const;

type Category = (typeof categories)[number];

type GalleryItem = {
  src: string;
  title: string;
  category: Category;
  description: string;
  slug: string;
  year: Exclude<Year, "सभी वर्ष">;
};

const galleryItems: GalleryItem[] = [
  {
    src: art1,
    title: "विकास प्रक्रिया में हमारी भागीदारी",
    category: "जागरूकता - मानव अस्तित्व का आधार",
    year: "2018",
    slug: "/articles/vikas-prakriya-me-hamari-bhagidari",
    description:
      "ग्रामीण विकास के विभिन्न सोपानों, ग्राम पंचायत, ग्राम सभा तथा आमजन की सक्रिय भागीदारी के माध्यम से समग्र विकास की दिशा में महत्वपूर्ण विचार।",
  },
  {
    src: art2,
    title: "जानकारी और जागरूकता - विकास की पहली आवश्यकता",
    category: "जागरूकता - मानव अस्तित्व का आधार",
    year: "2018",
    slug: "/articles/jankari-aur-jagrukta",
    description:
      "सरकारी योजनाओं, विकास कार्यक्रमों और उनके सही क्रियान्वयन की जानकारी ही विकास की पहली आवश्यकता है। जागरूक नागरिक ही परिवर्तन का आधार बनते हैं।",
  },
  {
    src: art3,
    title: "जानकारी और जागरूकता - समाज परिवर्तन का आधार",
    category: "जागरूकता - मानव अस्तित्व का आधार",
    year: "2018",
    slug: "/articles/samaj-parivartan",
    description:
      "समाज और राष्ट्र के विकास में अपनी जिम्मेदारी निभाने तथा सकारात्मक सोच के साथ समाज निर्माण में भागीदारी सुनिश्चित करने का संदेश।",
  },
  {
    src: art4,
    title: "सार्वजनिक वितरण प्रणाली (PDS)",
    category: "जागरूकता - मानव अस्तित्व का आधार",
    year: "2018",
    slug: "/articles/public-distribution-system",
    description:
      "सार्वजनिक वितरण प्रणाली, राशन व्यवस्था, पात्रता, लाभार्थियों के अधिकार और सरकारी योजनाओं की जानकारी सरल भाषा में।",
  },
  {
    src: art5,
    title: "ग्राम सभा पंचायतीराज व्यवस्था का मूल आधार",
    category: "जागरूकता - मानव अस्तित्व का आधार",
    year: "2018",
    slug: "/articles/gram-sabha",
    description:
      "ग्राम सभा लोकतांत्रिक विकेंद्रीकरण की सबसे महत्वपूर्ण इकाई है। गांव के विकास में इसकी भूमिका और नागरिकों की जिम्मेदारियाँ।",
  },
  {
    src: art6,
    title: "पूनम शर्मा, भारतीय राजस्व सेवा (IRS 2006)",
    category: "प्रेरणादायक व्यक्तित्व",
    year: "2018",
    slug: "/articles/poonam-sharma",
    description:
      "सरकारी विद्यालयों में शिक्षा सुधार और सामाजिक बदलाव के प्रेरणादायक प्रयासों से जुड़ी एक प्रेरक प्रशासनिक अधिकारी की कहानी।",
  },
  {
    src: art7,
    title: "कीर्ति चक्र सम्मानित श्री चेतन कुमार चीता",
    category: "प्रेरणादायक व्यक्तित्व",
    year: "2018",
    slug: "/articles/chetan-kumar-cheeta",
    description:
      "देश सेवा, साहस और समर्पण की मिसाल श्री चेतन कुमार चीता के जीवन से प्रेरणा लेने वाला विशेष लेख।",
  },
  {
    src: art8,
    title: "मोनिका राणा (भारतीय राजस्व सेवा)",
    category: "प्रेरणादायक व्यक्तित्व",
    year: "2018",
    slug: "/articles/monika-rana",
    description:
      "समाज के प्रति समर्पण और सरकारी विद्यालयों के विकास में उल्लेखनीय योगदान देने वाली प्रशासनिक अधिकारी की प्रेरक यात्रा।",
  },
  {
    src: art9,
    title: "पद्मश्री डॉ. जनक पल्टा मैकगिलिगन",
    category: "प्रेरणादायक व्यक्तित्व",
    year: "2018",
    slug: "/articles/janak-palta",
    description:
      "मानवीय मूल्यों, ग्रामीण विकास और समाज सेवा के लिए समर्पित पद्मश्री सम्मानित समाजसेवी के जीवन से प्रेरणा।",
  },
  {
    src: art10,
    title: "प्रो. प्रियानंद अगड़े",
    category: "प्रेरणादायक व्यक्तित्व",
    year: "2018",
    slug: "/articles/priyanand-agade",
    description:
      "ग्रामीण विकास, पर्यावरण संरक्षण और स्मार्ट विलेज की अवधारणा को आगे बढ़ाने वाले समाजसेवी एवं मार्गदर्शक का परिचय।",
  },
  {
    src: art11,
    title: "बालिका शिक्षा ही सशक्तिकरण का आधार",
    category: "शिक्षा - सशक्तीकरण का सूत्र",
    year: "2017",
    slug: "/articles/balika-shiksha",
    description:
      "ग्रामीण बालिकाओं की शिक्षा, आत्मनिर्भरता और समाज में समान अवसर सुनिश्चित करने की दिशा में महत्वपूर्ण पहल।",
  },
  {
    src: galLib,
    title: "आओ पढ़ें आगे बढ़ें",
    category: "शिक्षा - सशक्तीकरण का सूत्र",
    year: "2018",
    slug: "/articles/aao-padhe",
    description:
      "बच्चों में गुणवत्तापूर्ण शिक्षा, पुस्तकालय संस्कृति और अध्ययन के अनुकूल वातावरण विकसित करने का अभियान।",
  },
  {
    src: galVillage,
    title: "सोच बदलो गांव बदलो यात्रा",
    category: "सोच बदलो गांव बदलो यात्रा",
    year: "2018",
    slug: "/articles/soch-badlo",
    description:
      "गांव-गांव जाकर सकारात्मक सोच, जनजागरूकता और विकास की नई चेतना फैलाने वाली प्रेरक यात्रा की झलकियाँ।",
  },
  {
    src: galEnv,
    title: "पर्यावरण संरक्षण एवं हरित ग्राम",
    category: "पर्यावरण - लेखन पीढ़ियों का भविष्य",
    year: "2018",
    slug: "/articles/paryavaran",
    description:
      "वृक्षारोपण, जल संरक्षण, स्वच्छता और हरित ग्राम निर्माण के लिए जनभागीदारी पर आधारित अभियान।",
  },
  {
    src: galAwards,
    title: "आधुनिक खेती हमारा प्रयास",
    category: "पर्यावरण - लेखन पीढ़ियों का भविष्य",
    year: "2018",
    slug: "/articles/adhunik-kheti",
    description:
      "किसानों को आधुनिक कृषि तकनीकों, सरकारी योजनाओं और टिकाऊ खेती के माध्यम से आत्मनिर्भर बनाने का प्रयास।",
  },
];

const pageSize = 6;

const sectionRevealProps = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
};

function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("सभी");
  const [activeYear, setActiveYear] = useState<Year>("सभी वर्ष");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory = activeCategory === "सभी" || item.category === activeCategory;
      const matchesYear = activeYear === "सभी वर्ष" || item.year === activeYear;
      return matchesCategory && matchesYear;
    });
  }, [activeCategory, activeYear]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedItems = filteredItems.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <PageHero title="जागरूकता लेख" />

      <section className="border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">

          {/* Top Filter */}
          <div className="mb-10 rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Images className="size-5" />
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      फ़िल्टर
                    </div>
                    <div className="font-display text-xl font-black">
                      श्रेणियाँ
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setPage(1);
                      }}
                      className={`rounded-full border px-5 py-2.5 font-hi text-sm font-medium transition-all duration-300 ${activeCategory === category
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-background hover:border-primary hover:bg-primary/10"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              जागरूकता लेख
            </div>

            <h2 className="mt-4 font-display text-3xl font-black text-balance sm:text-4xl">
              {activeCategory}
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              यहां आप SBGBT की यात्राओं, कार्यक्रमों, सामुदायिक बैठकों और प्रेरक पहलों की दृश्य झलक देख सकते हैं।
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 lg:grid-cols-1">
            {paginatedItems.map((item) => (
              <article
                key={`${item.title}-${item.year}`}
                className="group overflow-hidden rounded-[2rem]   shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-primary font-medium">
                    श्रेणी: {item.category}
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                    {item.title}
                  </h3>

                  <div className="mt-2 text-sm text-muted-foreground">
                    {item.year}
                  </div>

                  <p className="mt-4 line-clamp-4 text-base leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <Link
                    to={item.slug}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border-primary px-5 py-2.5 text-l font-bold text-primary transition hover:bg-primary hover:text-white"
                  >
                    अधिक पढ़ें →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {paginatedItems.length === 0 && (
            <div className="mt-8 rounded-[1.75rem] border border-border bg-card/85 px-6 py-10 text-center text-muted-foreground shadow-sm">
              इस फ़िल्टर में अभी कोई आइटम उपलब्ध नहीं है।
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={safePage === 1}
              className="grid size-11 place-items-center rounded-full border border-primary/30 bg-card text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`grid size-11 place-items-center rounded-full border text-sm font-semibold transition ${safePage === pageNumber
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-card text-foreground hover:border-primary/35 hover:text-primary"
                    }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={safePage === totalPages}
              className="grid size-11 place-items-center rounded-full border border-primary/30 bg-card text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        {...sectionRevealProps}
        id="donate"
        className="relative overflow-hidden bg-[#fbf7ef] text-[#143c35]"
      >
        <div
          className="absolute inset-0 bg-repeat opacity-[0.82]"
          style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.12))]" />
        <div className="absolute left-[4%] top-1/2 hidden -translate-y-1/2 xl:block">
          <img
            src={heroHeartSprade}
            alt=""
            aria-hidden="true"
            className="hero-heartbeat h-48 w-48 object-contain opacity-30"
            width={192}
            height={192}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <img
              src={heroHeartSprade}
              alt=""
              aria-hidden="true"
              className="hero-heartbeat h-5 w-5 object-contain opacity-70"
              width={20}
              height={20}
            />
            हमारे सहयोगी
          </span>
          <h2 className="mt-5 font-display text-2xl font-black text-balance text-[#143c35] sm:text-5xl lg:text-6xl">
            सहयोग से मजबूत होती यात्रा
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#35544c]/82">
            जिन साथियों और संस्थाओं ने शिक्षा, ग्राम विकास और जन-जागरूकता से जुड़े हमारे प्रयासों को मजबूती दी, उन्हें यहां सम्मानपूर्वक स्थान दिया गया है।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }} >
                  <img
                    src={ecoNeedsLogo}
                    alt="Eco Needs Foundation"
                    className="mx-auto h-20 w-auto object-contain sm:h-24"

                  />
                </div>
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}>
                  <img
                    src={workholicsLogo}
                    alt="Workholics"
                    className="mx-auto h-24 w-auto object-contain sm:h-28"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* ========= */}

      <SiteFooter />
    </div>
  );
}
