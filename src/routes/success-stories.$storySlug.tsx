import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";
import socialPostTataPower from "@/assets/activities-hero-real.jpg";
import {
  buildStorySlug,
  fetchPublicStories,
  getPlainStoryText,
  getStoryHtml,
  resolveStoryImage,
} from "@/lib/public-stories";

export const Route = createFileRoute("/success-stories/$storySlug")({
  loader: async ({ params }) => {
    let stories = [] as Awaited<ReturnType<typeof fetchPublicStories>>;

    try {
      stories = await fetchPublicStories();
    } catch {
      stories = [];
    }

    const story = stories.find((item) => buildStorySlug(item) === params.storySlug) || null;

    if (!story) {
      throw notFound();
    }

    return { story, stories };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.story.title} | SBGBT` },
      {
        name: "description",
        content: getPlainStoryText(loaderData.story.description).slice(0, 160),
      },
    ],
  }),
  component: SuccessStoryDetailPage,
});

function SuccessStoryDetailPage() {
  const { story, stories } = Route.useLoaderData();
  const latestStories = stories.filter((item) => item.id !== story.id).slice(0, 5);
  const storyHtml = getStoryHtml(story.description);
  const storyExcerpt = getPlainStoryText(story.description);

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
                  src={resolveStoryImage(story.image) || socialPostTataPower}
                  alt={story.title}
                  className="w-full object-cover"
                />
              </div>

              <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(18,65,74,0.25)] sm:p-8">
                <div className="flex flex-col gap-3 text-sm text-[#274f57] sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" />
                    {story.story_date || "-"}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    {story.story_place || "-"}
                  </span>
                </div>

                <h1 className="mt-5 font-hi text-3xl font-bold leading-tight text-[#955606] sm:text-4xl">
                  {story.title}
                </h1>

                {storyExcerpt ? (
                  <p className="mt-6 text-lg leading-9 text-[#143840]">{storyExcerpt}</p>
                ) : null}

                {storyHtml ? (
                  <div
                    className="prose prose-neutral mt-6 max-w-none text-lg leading-9 text-[#143840] prose-headings:font-hi prose-headings:text-[#955606] prose-p:leading-9"
                    dangerouslySetInnerHTML={{ __html: storyHtml }}
                  />
                ) : null}
              </div>
            </div>

            <aside className="border-l border-white/70 pl-0 xl:pl-8">
              <h2 className="mb-6 font-hi text-3xl font-bold text-[#955606]">नवीनतम घटनायाँ</h2>
              <div className="space-y-6">
                {latestStories.map((item) => (
                  <Link
                    key={item.id}
                    to="/success-stories/$storySlug"
                    params={{ storySlug: buildStorySlug(item) }}
                    className="flex gap-4 rounded-[1.4rem] bg-white p-5 shadow-[0_18px_40px_-32px_rgba(17,56,61,0.45)] transition hover:-translate-y-1"
                  >
                    <img
                      src={resolveStoryImage(item.image) || socialPostTataPower}
                      alt={item.title}
                      className="h-20 w-24 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <div className="line-clamp-2 font-hi text-xl font-medium leading-8 text-[#955606]">
                        {item.title}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 text-sm text-[#274f57]">
                        <CalendarDays className="size-4" />
                        {item.story_date || "-"}
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
