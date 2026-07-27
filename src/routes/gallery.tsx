import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter, CTASection} from "@/components/site/SiteFooter";
import galAwards from "@/assets/gallery-awards.jpg";
import galEnv from "@/assets/gallery-environment.jpg";
import galHealth from "@/assets/gallery-health.jpg";
import galLib from "@/assets/gallery-library.jpg";
import galVillage from "@/assets/gallery-village.jpg";
import galWomen from "@/assets/gallery-women.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "गैलरी | SBGBT" },
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
  "आओ पढ़ो आगे बढ़ो",
  "क्लीन विलेज ग्रीन विलेज",
  "उत्थान कोचिंग संस्थान",
  "शिक्षा पाओ ज्ञान बढ़ाओ",
  "महिला सशक्तिकरण",
  "आधुनिक खेती हमारा प्रयास",
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
  { src: galVillage, title: "सोच बदलो गांव बदलो यात्रा – भवनपुरा", category: "सोच बदलो गांव बदलो यात्रा", year: "2018" },
  { src: galLib, title: "आओ पढ़ो आगे बढ़ो अभियान", category: "आओ पढ़ो आगे बढ़ो", year: "2018" },
  { src: galAwards, title: "धनौरा विकास समिति सम्मान समारोह", category: "शिक्षा पाओ ज्ञान बढ़ाओ", year: "2018" },
  { src: galHealth, title: "एनीमिया जागरूकता और स्वास्थ्य सहयोग", category: "महिला सशक्तिकरण", year: "2018" },
  { src: galWomen, title: "बालिका शिक्षा ही सशक्तिकरण का आधार", category: "महिला सशक्तिकरण", year: "2017" },
  { src: galEnv, title: "वृक्षारोपण और हरित ग्राम पहल", category: "क्लीन विलेज ग्रीन विलेज", year: "2018" },
  { src: galWomen, title: "सामुदायिक सहभागिता के प्रेरक पल", category: "महिला सशक्तिकरण", year: "2018" },
  { src: galAwards, title: "प्रतिभा सम्मान और प्रेरणा समारोह", category: "शिक्षा पाओ ज्ञान बढ़ाओ", year: "2018" },
  { src: galVillage, title: "सामाजिक चेतना और ग्राम संगठन", category: "सोच बदलो गांव बदलो यात्रा", year: "2018" },
  { src: galLib, title: "हमीरा विकास समिति की छात्र पहल", category: "शिक्षा पाओ ज्ञान बढ़ाओ", year: "2018" },
  { src: galHealth, title: "गर्भवती महिलाओं के लिए स्वास्थ्य सहयोग", category: "महिला सशक्तिकरण", year: "2019" },
  { src: galEnv, title: "स्वच्छता और हरियाली अभियान", category: "क्लीन विलेज ग्रीन विलेज", year: "2018" },
  { src: galVillage, title: "उत्थान कोचिंग संस्थान के अध्ययन क्षण", category: "उत्थान कोचिंग संस्थान", year: "2019" },
  { src: galAwards, title: "कार्यक्रम के यादगार दृश्य", category: "सोच बदलो गांव बदलो यात्रा", year: "2017" },
  { src: galEnv, title: "आधुनिक खेती और आजीविका प्रयास", category: "आधुनिक खेती हमारा प्रयास", year: "2018" },
];

const pageSize = 6;
  
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

      <PageHero title="गैलरी" />

      <section className="border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-[2rem] border border-border bg-card/90 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Images className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">फ़िल्टर</div>
                  <div className="mt-1 font-display text-xl font-black">गैलरी श्रेणियां</div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setPage(1);
                    }}
                    className={`w-full rounded-[1.25rem] border px-4 py-3 text-left font-hi text-base transition ${
                      activeCategory === category
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-background/70 text-foreground hover:border-primary/30 hover:bg-card"
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
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary">
                    <Sparkles className="size-3.5" />
                    चुने हुए क्षण
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-black text-balance sm:text-4xl">
                    {activeCategory}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">
                    यहां आप SBGBT की यात्राओं, कार्यक्रमों, सामुदायिक बैठकों और प्रेरक पहलों की दृश्य झलक देख सकते हैं।
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-border bg-card/85 p-4 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    वर्ष चुनें
                  </div>
                  <select
                    value={activeYear}
                    onChange={(event) => {
                      setActiveYear(event.target.value as Year);
                      setPage(1);
                    }}
                    className="mt-3 w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary sm:min-w-[180px]"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {paginatedItems.map((item) => (
                  <button
                    key={`${item.title}-${item.year}`}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="group relative overflow-hidden rounded-[1.9rem] border border-border bg-card text-left shadow-sm transition hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 transition group-hover:opacity-100 group-hover:from-primary/10 group-hover:to-accent/10" />
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent px-5 py-5 text-cream">
                      <div className="inline-flex rounded-full bg-cream/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-cream/85">
                        {item.year}
                      </div>
                      <div className="mt-3 font-hi text-xl leading-snug">{item.title}</div>
                      <div className="mt-2 text-xs tracking-[0.18em] text-cream/70">{item.category}</div>
                    </div>
                  </button>
                ))}
              </div>

              {paginatedItems.length === 0 && (
                <div className="mt-8 rounded-[1.75rem] border border-border bg-card/85 px-6 py-10 text-center text-muted-foreground shadow-sm">
                  इस फ़िल्टर में अभी कोई गैलरी आइटम उपलब्ध नहीं है।
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
                बंद करें
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
      
      {/* CTA */}
       <CTASection />
      {/* === */} 

      <SiteFooter />
    </div>
  );
}
