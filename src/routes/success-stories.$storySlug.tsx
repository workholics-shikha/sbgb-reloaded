import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";
import {
  getSuccessStoryBySlug,
  successStories,
} from "@/lib/success-stories-data";

export const Route = createFileRoute("/success-stories/$storySlug")({
  loader: ({ params }) => {
    const story = getSuccessStoryBySlug(params.storySlug);

    if (!story) {
      throw notFound();
    }

    return { story };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.story.title} | SBGBT` },
      { name: "description", content: loaderData.story.excerpt },
    ],
  }),
  component: SuccessStoryDetailPage,
});

function SuccessStoryDetailPage() {
  const { story } = Route.useLoaderData();
  const latestStories = successStories.filter((item) => item.slug !== story.slug).slice(0, 5);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="सफलता की कहानी" />

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_60px_-40px_rgba(18,65,74,0.45)]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full object-cover"
                />
              </div>

              <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(18,65,74,0.25)] sm:p-8">
                <div className="flex flex-col gap-3 text-sm text-[#274f57] sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    {story.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    {story.location}
                  </span>
                </div>

                <h1 className="mt-5 font-hi text-3xl font-bold leading-tight text-[#955606] sm:text-4xl">
                  {story.title}
                </h1>

                <div className="mt-6 space-y-5 text-lg leading-9 text-[#143840]">
                  {story.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-l border-white/70 pl-0 xl:pl-8">
              <h2 className="mb-6 font-hi text-3xl font-bold text-[#955606]">नवीनतम घटनायाँ</h2>
              <div className="space-y-6">
                {latestStories.map((item) => (
                  <Link
                    key={item.slug}
                    to="/success-stories/$storySlug"
                    params={{ storySlug: item.slug }}
                    className="flex gap-4 rounded-[1.4rem] bg-white p-5 shadow-[0_18px_40px_-32px_rgba(17,56,61,0.45)] transition hover:-translate-y-1"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-24 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <div className="line-clamp-2 font-hi text-xl font-medium leading-8 text-[#955606]">
                        {item.title}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 text-sm text-[#274f57]">
                        <CalendarDays className="size-4" />
                        {item.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/success-stories"
                  className="inline-flex items-center gap-2 text-base font-semibold text-primary"
                >
                  सभी कहानियाँ देखें
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
