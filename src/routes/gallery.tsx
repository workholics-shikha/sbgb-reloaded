import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import galEnv from "@/assets/gallery-environment.jpg";
import galWomen from "@/assets/gallery-women.jpg";
import galLib from "@/assets/gallery-library.jpg";
import galHealth from "@/assets/gallery-health.jpg";
import galAwards from "@/assets/gallery-awards.jpg";
import galVillage from "@/assets/gallery-village.jpg";
import galleryHeroReal from "@/assets/gallery-hero-real.jpg";
import workholicsLogo from "@/assets/workholicslogo.png";
import ecoNeedsLogo from "@/assets/econeeds-logo.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "गैलरी | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT की फोटो गैलरी जिसमें सोच बदलो गांव बदलो यात्रा, शिक्षा, महिला सशक्तिकरण, क्लीन विलेज और ग्रामीण विकास के दृश्य शामिल हैं।",
      },
    ],
  }),
  component: Gallery,
});

const categories = [
  "सब",
  "सोच बदलो गांव बदलो यात्रा",
  "आओ पढ़ो-आगे बढ़ाओ",
  "क्लीन विलेज-ग्रीन विलेज",
  "उत्थान कोचिंग संस्थान",
  "शिक्षा पाओ-ज्ञान बढ़ाओ",
  "महिला सशक्तिकरण",
  "आधुनिक खेती-हमारा प्रयास",
] as const;

const years = ["सभी वर्ष", "2019", "2018", "2017"] as const;

type Category = (typeof categories)[number];
type Year = (typeof years)[number];

type GalleryItem = {
  src: string;
  title: string;
  category: Category;
  year: Exclude<Year, "सभी वर्ष">;
};

const galleryItems: GalleryItem[] = [
  {
    src: galVillage,
    title: "सोच बदलो गांव बदलो यात्रा-भवनपुरा",
    category: "सोच बदलो गांव बदलो यात्रा",
    year: "2018",
  },
  {
    src: galLib,
    title: "आओ पढ़े-आगे बढ़े",
    category: "आओ पढ़ो-आगे बढ़ाओ",
    year: "2018",
  },
  {
    src: galAwards,
    title: "शिक्षा पाओ-ज्ञान बढ़ाओ 'धनौरा विकास समिति'",
    category: "शिक्षा पाओ-ज्ञान बढ़ाओ",
    year: "2018",
  },
  {
    src: galHealth,
    title: "ब्लड की कमी से किसी की जान नहीं जा सकेगी",
    category: "महिला सशक्तिकरण",
    year: "2018",
  },
  {
    src: galWomen,
    title: "बालिका शिक्षा ही महिला सशक्तिकरण का आधार है।",
    category: "महिला सशक्तिकरण",
    year: "2017",
  },
  {
    src: galEnv,
    title: "Journey 1",
    category: "क्लीन विलेज-ग्रीन विलेज",
    year: "2018",
  },
  {
    src: galWomen,
    title: "Journey 2",
    category: "महिला सशक्तिकरण",
    year: "2018",
  },
  {
    src: galAwards,
    title: "Journey 4",
    category: "शिक्षा पाओ-ज्ञान बढ़ाओ",
    year: "2018",
  },
  {
    src: galVillage,
    title: "समाजिक क्रांति_ पार्टी गांव स्मार्ट सोच",
    category: "सोच बदलो गांव बदलो यात्रा",
    year: "2018",
  },
  {
    src: galLib,
    title: "शिक्षा पाओ-ज्ञान बढ़ाओ 'हमीरा विकास समिति' 0",
    category: "शिक्षा पाओ-ज्ञान बढ़ाओ",
    year: "2018",
  },
  {
    src: galHealth,
    title: "फिर एक गर्भवती महिला के जीवन को बचाया",
    category: "महिला सशक्तिकरण",
    year: "2019",
  },
  {
    src: galEnv,
    title: "क्लीन विलेज-ग्रीन विलेज",
    category: "क्लीन विलेज-ग्रीन विलेज",
    year: "2018",
  },
  {
    src: galVillage,
    title: "उत्थान कोचिंग संस्थान (3)",
    category: "उत्थान कोचिंग संस्थान",
    year: "2019",
  },
  {
    src: galAwards,
    title: "On event gallery",
    category: "सोच बदलो गांव बदलो यात्रा",
    year: "2017",
  },
  {
    src: galEnv,
    title: "आधुनिक खेती-हमारा प्रयास",
    category: "आधुनिक खेती-हमारा प्रयास",
    year: "2018",
  },
];

const pageSize = 6;

function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("सब");
  const [activeYear, setActiveYear] = useState<Year>("सभी वर्ष");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory = activeCategory === "सब" || item.category === activeCategory;
      const matchesYear = activeYear === "सभी वर्ष" || item.year === activeYear;
      return matchesCategory && matchesYear;
    });
  }, [activeCategory, activeYear]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedItems = filteredItems.slice((safePage - 1) * pageSize, safePage * pageSize);

  const changeCategory = (category: Category) => {
    setActiveCategory(category);
    setPage(1);
  };

  const changeYear = (year: Year) => {
    setActiveYear(year);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <PageHero
        eyebrow="Photo gallery"
        title="गांवों से आए वे दृश्य जो अभियान को जीवंत बनाते हैं।"
        hi="फोटो गैलरी"
        sub="पुरानी gallery के वही अभियान, categories और फोटो titles अब SBGBT की current visual theme में, ताकि page बाकी site ke साथ naturally blend करे।"
        imageSrc={galleryHeroReal}
        imageAlt="SBGBT photo gallery"
      />

      <section className="festive-band relative overflow-hidden border-y border-border">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -left-10 top-20 size-52 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 top-32 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="vibrant-panel rounded-[2rem] border border-border p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Images className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Filters</div>
                  <div className="mt-1 font-display text-xl font-black">Gallery Paths</div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => changeCategory(category)}
                    className={`w-full rounded-[1.25rem] border px-4 py-3 text-left font-hi text-base transition ${
                      activeCategory === category
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-card/80 text-foreground hover:border-primary/30 hover:bg-card"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </aside>

            <div>
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <Sparkles className="size-3.5" />
                    Curated Moments
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-black text-balance sm:text-4xl">
                    {activeCategory}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    पुरानी gallery content ko उसी category structure में रखा गया है, बस presentation ko current SBGBT homepage aur inner pages की theme के हिसाब से refresh किया गया है।
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-border bg-card/85 p-4 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    Filter By Year
                  </div>
                  <select
                    value={activeYear}
                    onChange={(e) => changeYear(e.target.value as Year)}
                    className="mt-3 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary sm:min-w-[180px]"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year === "सभी वर्ष" ? "Select Year" : year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {paginatedItems.map((item, index) => (
                  <button
                    key={`${item.title}-${item.year}`}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className={`group relative overflow-hidden rounded-[1.9rem] border border-border bg-card text-left shadow-sm transition hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-xl ${
                      index % 3 === 1 ? "xl:-translate-y-3" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 transition group-hover:opacity-100 group-hover:from-primary/10 group-hover:to-accent/10" />
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent px-5 py-5 text-cream">
                      <div className="inline-flex rounded-full bg-cream/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/85">
                        {item.year}
                      </div>
                      <div className="mt-3 font-hi text-xl leading-snug">{item.title}</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-cream/70">{item.category}</div>
                    </div>
                  </button>
                ))}
              </div>

              {paginatedItems.length === 0 && (
                <div className="mt-8 rounded-[1.75rem] border border-border bg-card/85 px-6 py-10 text-center text-muted-foreground shadow-sm">
                  इस filter में अभी कोई gallery item उपलब्ध नहीं है।
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={safePage === 1}
                  className="grid size-11 place-items-center rounded-full border border-primary/30 bg-card text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-5" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`grid size-11 place-items-center rounded-full border text-sm font-semibold transition ${
                      safePage === pageNumber
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-card text-foreground hover:border-primary/35 hover:text-primary"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={safePage === totalPages}
                  className="grid size-11 place-items-center rounded-full border border-primary/30 bg-card text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Supporters</div>
            <h3 className="mt-3 font-display text-3xl font-black sm:text-4xl">हमारे समर्थक</h3>
            <p className="mt-4 max-w-xl text-muted-foreground">
              जिन सहयोगियों ने गांव, शिक्षा और जन-जागरूकता से जुड़े हमारे प्रयासों को मजबूती दी, उन्हें gallery experience का हिस्सा बनाकर रखा गया है।
            </p>
          </div>

          <div className="vibrant-panel rounded-[2rem] border border-border p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-card/90 px-6 py-8 text-center shadow-sm">
                <img
                  src={ecoNeedsLogo}
                  alt="Eco Needs Foundation"
                  className="mx-auto h-20 w-auto object-contain sm:h-24"
                />
              </div>
              <div className="rounded-[1.5rem] border border-border bg-card/90 px-6 py-8 text-center shadow-sm">
                <img
                  src={workholicsLogo}
                  alt="Workholics"
                  className="mx-auto h-24 w-auto object-contain sm:h-28"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-ink/85 p-4 backdrop-blur"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedItem(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
              setSelectedItem(null);
            }
          }}
        >
          <div
            className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div>
                <div className="font-hi text-xl font-semibold text-earth">{selectedItem.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {selectedItem.category} · {selectedItem.year}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-full border border-border px-4 py-2 text-sm transition hover:border-primary/35 hover:bg-secondary"
              >
                Close
              </button>
            </div>
            <img
              src={selectedItem.src}
              alt={selectedItem.title}
              className="max-h-[75vh] w-full object-contain bg-black/5"
            />
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
