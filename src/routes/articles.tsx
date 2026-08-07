import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Images, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter } from "@/components/site/SiteFooter";
import {
  articleCategories,
  articles,
  type ArticleCategory,
} from "@/lib/articles-data";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "जागरूकता लेख | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT के जागरूकता लेख, प्रेरक व्यक्तित्व, शिक्षा, पर्यावरण और ग्राम विकास से जुड़े विस्तृत आलेख।",
      },
    ],
  }),
  component: ArticlesPage,
});

const pageSize = 6;

function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("सभी");
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    return articles.filter((item) => {
      return activeCategory === "सभी" || item.category === activeCategory;
    });
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedItems = filteredItems.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="जागरूकता लेख" />

      <section className="border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
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
                    <div className="font-display text-xl font-black">श्रेणियाँ</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {articleCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setPage(1);
                      }}
                      className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
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

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              जागरूकता लेख
            </div>

            <h2 className="mt-4 font-display text-3xl font-black text-balance sm:text-4xl">
              {activeCategory}
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              यहां आप SBGBT की प्रेरक पहलों, जनजागरूकता, शिक्षा, पर्यावरण और ग्राम विकास से
              जुड़े लेखों को विस्तार से पढ़ सकते हैं।
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-1">
            {paginatedItems.map((item) => (
              <article
                key={item.slug}
                className="group overflow-hidden rounded-[2rem] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm font-medium text-primary">श्रेणी: {item.category}</div>

                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                    {item.title}
                  </h3>

                  <div className="mt-2 text-sm text-muted-foreground">
                    {item.publishedAt} · {item.author}
                  </div>

                  <p className="mt-4 line-clamp-4 text-base leading-7 text-muted-foreground">
                    {item.excerpt}
                  </p>

                  <Link
                    to="/articles/$articleSlug"
                    params={{ articleSlug: item.slug }}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-lg font-bold text-primary transition hover:text-primary/80"
                  >
                    अधिक पढ़ें →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {paginatedItems.length === 0 && (
            <div className="mt-8 rounded-[1.75rem] border border-border bg-card/85 px-6 py-10 text-center text-muted-foreground shadow-sm">
              इस फ़िल्टर में अभी कोई लेख उपलब्ध नहीं है।
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
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}
