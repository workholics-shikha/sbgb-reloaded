import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, Facebook, Twitter, UserRound } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";
import { articles, getArticleBySlug } from "@/lib/articles-data";

export const Route = createFileRoute("/articles/$articleSlug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.articleSlug);

    if (!article) {
      throw notFound();
    }

    return { article };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.article.title} | SBGBT` },
      { name: "description", content: loaderData.article.excerpt },
    ],
  }),
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { article } = Route.useLoaderData();
  const relatedArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="जागरूकता लेख विस्तार से" />

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="mb-8 overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-40px_rgba(18,65,74,0.45)]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-[280px] w-full object-cover sm:h-[360px]"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-3 inline-flex rounded-full bg-[#955606] px-4 py-1.5 text-sm font-semibold text-white">
                    {article.category}
                  </div>

                  <h1 className="text-3xl font-black leading-tight text-[#955606] sm:text-4xl">
                    {article.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#274f57]">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      {article.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <UserRound className="size-4" />
                      लिखित द्वारा {article.author}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#18363d]">इस लेख का हिस्सा</h2>
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md bg-[#3b5998] px-4 py-2 text-sm font-semibold text-white"
                    >
                      <Facebook className="size-4" />
                      फेसबुक
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-md bg-[#1da1f2] px-4 py-2 text-sm font-semibold text-white"
                    >
                      <Twitter className="size-4" />
                      ट्विटर
                    </button>
                  </div>
                </div>

                <div className="space-y-5 text-lg leading-9 text-[#143840]">
                  {article.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <form className="border-t border-white/40 pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="पूरा नाम"
                      className="rounded-full border border-white bg-white px-6 py-4 outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder="ईमेल"
                      className="rounded-full border border-white bg-white px-6 py-4 outline-none focus:border-primary"
                    />
                  </div>
                  <textarea
                    placeholder="टिप्पणी करें"
                    rows={5}
                    className="mt-4 w-full rounded-[1.5rem] border border-white bg-white px-6 py-4 outline-none focus:border-primary"
                  />
                  <div className="mt-5 flex justify-center">
                    <button
                      type="submit"
                      className="rounded-full bg-[#955606] px-10 py-3 text-lg font-semibold text-white shadow-[0_16px_28px_-18px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5"
                    >
                      टिप्पणी
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <aside className="border-l border-white/70 pl-0 xl:pl-8">
              <h2 className="mb-6 text-3xl font-black text-[#955606]">हाल के लेख</h2>
              <div className="space-y-6">
                {relatedArticles.map((item) => (
                  <Link
                    key={item.slug}
                    to="/articles/$articleSlug"
                    params={{ articleSlug: item.slug }}
                    className="flex gap-4 rounded-[1.4rem] bg-white p-5 shadow-[0_18px_40px_-32px_rgba(17,56,61,0.45)] transition hover:-translate-y-1"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-24 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <div className="line-clamp-2 text-xl font-medium leading-8 text-[#955606]">
                        {item.title}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 text-sm text-[#274f57]">
                        <CalendarDays className="size-4" />
                        {item.publishedAt}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-2 text-base font-semibold text-primary"
                >
                  सभी लेख देखें
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
