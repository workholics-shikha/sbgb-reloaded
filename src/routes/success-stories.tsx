import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter } from "@/components/site/SiteFooter";
import {
  buildStorySlug,
  fetchPublicStories,
  getPlainStoryText,
  resolveStoryImage,
} from "@/lib/public-stories";
import socialPostTataPower from "@/assets/activities-hero-real.jpg";

export const Route = createFileRoute("/success-stories")({
  loader: async () => {
    try {
      const stories = await fetchPublicStories();
      return { stories };
    } catch {
      return { stories: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "सफलता की कहानी | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT की प्रेरक सफलता की कहानियां, ग्राम विकास के मॉडल, छात्र प्रेरणा और जनभागीदारी से जुड़े वास्तविक अनुभव पढ़ें।",
      },
    ],
  }),
  component: SuccessStoriesPage,
});

function SuccessStoriesPage() {
  const { stories } = Route.useLoaderData();
  const featuredStories = stories.slice(0, 3);
  const latestStories = stories.slice(3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="सफलता की कहानी" />

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-16">
          <div>
            <h2 className="font-hi text-3xl font-bold text-[#965100]">सफलता की कहानी</h2>

            <div className="mt-6 space-y-8">
              {featuredStories.map((story) => (
                <article
                  key={story.id}
                  className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_20px_45px_-28px_rgba(0,0,0,0.35)] md:grid md:grid-cols-[320px_minmax(0,1fr)]"
                >
                  <div className="h-full min-h-[260px] overflow-hidden bg-[#eef7f7]">
                    <img
                      src={resolveStoryImage(story.image) || socialPostTataPower}
                      alt={story.title}
                      className="h-full w-full object-cover"
                      width={900}
                      height={900}
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="flex flex-col gap-3 text-sm text-[#2f3a3a] sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4 text-[#1d2b2b]" />
                          <span>{story.story_date || "-"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-[#1d2b2b]" />
                          <span>{story.story_place || "-"}</span>
                        </div>
                      </div>

                      <h3 className="mt-6 font-hi text-3xl font-bold leading-tight text-[#965100]">
                        {story.title}
                      </h3>

                      <p className="mt-4 text-lg leading-8 text-[#1f2e2e]">
                        {getPlainStoryText(story.description).slice(0, 220)}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link
                        to="/success-stories/$storySlug"
                        params={{ storySlug: buildStorySlug(story) }}
                        className="inline-flex rounded-full border border-[#b96a22] px-5 py-2.5 font-semibold text-[#965100] transition hover:bg-[#b96a22] hover:text-white"
                      >
                        अधिक पढ़ें
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              {featuredStories.length === 0 ? (
                <div className="rounded-[1.6rem] bg-white p-8 text-center shadow-[0_20px_45px_-28px_rgba(0,0,0,0.18)]">
                  <p className="text-lg font-semibold text-earth">अभी कोई सफलता की कहानी उपलब्ध नहीं है।</p>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="border-l border-white/70 pl-0 lg:pl-6">
            <h2 className="font-hi text-3xl font-bold text-[#965100]">नवीनतम घटनायाँ</h2>

            <div className="mt-8 space-y-5">
              {latestStories.map((story) => (
                <Link
                  key={story.id}
                  to="/success-stories/$storySlug"
                  params={{ storySlug: buildStorySlug(story) }}
                  className="block rounded-[1.4rem] bg-white p-5 shadow-[0_16px_35px_-26px_rgba(0,0,0,0.34)] transition hover:-translate-y-1"
                >
                  <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-4">
                    <div className="overflow-hidden rounded-xl bg-[#eef7f7]">
                      <img
                        src={resolveStoryImage(story.image) || socialPostTataPower}
                        alt={story.title}
                        className="h-full w-full object-cover"
                        width={320}
                        height={220}
                      />
                    </div>

                    <div>
                      <h3 className="font-hi text-xl font-semibold leading-7 text-[#965100]">
                        {story.title}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-sm text-[#303c3c]">
                        <Calendar className="size-4 text-[#1d2b2b]" />
                        <span>{story.story_date || "-"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}
