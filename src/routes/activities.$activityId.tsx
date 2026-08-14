import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";
import blogBgPaper from "@/assets/blog-bg-paper.png";
import socialPostTataPower from "@/assets/activities-hero-real.jpg";
import {
  fetchPublicEvents,
  getEventHtml,
  getPlainEventText,
  resolveEventImage,
} from "@/lib/public-events";

export const Route = createFileRoute("/activities/$activityId")({
  loader: async ({ params }) => {
    let activities = [] as Awaited<ReturnType<typeof fetchPublicEvents>>;

    try {
      activities = await fetchPublicEvents();
    } catch {
      activities = [];
    }

    const activity =
      activities.find((item) => String(item.id) === String(params.activityId)) || null;

    return { activities, activity };
  },
  head: ({ loaderData }) => {
    const activity = loaderData?.activity;
    const title = activity ? `${activity.title} | SBGBT` : "कार्य विवरण | SBGBT";
    const description =
      getPlainEventText(activity?.description).slice(0, 160) ||
      "SBGBT के कार्यक्रमों और सामाजिक आयोजनों का विस्तृत विवरण।";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ActivityDetailPage,
});

function ActivityDetailPage() {
  const { activityId } = Route.useParams();
  const { activity, activities } = Route.useLoaderData();

  if (!activity) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <PageHero title="कार्य विवरण" />
        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="rounded-[2rem] border border-border bg-card/90 p-10 shadow-sm">
            <h2 className="font-display text-3xl font-black text-earth">कार्य उपलब्ध नहीं है</h2>
            <p className="mt-4 text-muted-foreground">
              चुना गया कार्यक्रम उपलब्ध नहीं है या हटाया जा चुका है।
            </p>
            <Link
              to="/activities"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <ArrowLeft className="size-4" />
              सभी कार्य देखें
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const relatedActivities = activities.filter((item) => String(item.id) !== String(activityId));
  const heroImage = resolveEventImage(activity.image) || socialPostTataPower;
  const plainDescription = getPlainEventText(activity.description);
  const htmlDescription = getEventHtml(activity.description);
  const detailMeta = [
    activity.category ? { label: "श्रेणी", value: activity.category } : null,
    activity.from_date ? { label: "प्रारंभ तिथि", value: activity.from_date } : null,
    activity.to_date ? { label: "समापन तिथि", value: activity.to_date } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title={activity.title} />

      <section className="border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/80 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-card"
            >
              <ArrowLeft className="size-4" />
              सभी कार्य
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" />
              SBGBT Event
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_360px]">
            <article className="overflow-hidden rounded-[2.25rem] border border-border bg-card/95 shadow-[0_26px_60px_-38px_rgba(20,60,53,0.42)]">
              <div className="relative h-[260px] overflow-hidden sm:h-[340px] lg:h-[420px]">
                <img
                  src={heroImage}
                  alt={activity.title}
                  className="h-full w-full object-cover"
                  width={1600}
                  height={900}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,60,53,0.06),rgba(20,60,53,0.65))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    कार्य विवरण
                  </div>
                  <h1 className="mt-4 max-w-3xl font-display text-3xl font-black text-white sm:text-4xl">
                    {activity.title}
                  </h1>
                </div>
              </div>

              <div className="relative overflow-hidden px-6 py-8 sm:px-8">
                <div className="absolute inset-0" />
                <div className="relative">
                  {detailMeta.length > 0 ? (
                    <div className="mb-6 grid gap-3 sm:grid-cols-3">
                      {detailMeta.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.4rem] border border-[#d7dfd8] bg-white/85 px-4 py-3 shadow-sm"
                        >
                          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
                            {item.label}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-earth">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {plainDescription ? (
                    <p className="mb-5 text-base leading-8 text-[#4f605a]">{plainDescription}</p>
                  ) : null}

                  {htmlDescription ? (
                    <div
                      className="prose prose-neutral max-w-none text-[#23463d] prose-headings:font-display prose-headings:text-earth prose-p:leading-8"
                      dangerouslySetInnerHTML={{ __html: htmlDescription }}
                    />
                  ) : null}
                </div>
              </div>
            </article>

            <aside className="rounded-[2.25rem] border border-[#d8cfb8] bg-card/90 p-5 shadow-[0_24px_50px_-40px_rgba(20,60,53,0.32)]">
              <h2 className="border-l-2 border-primary/30 pl-4 font-display text-3xl font-black text-earth">
                हमारे कार्य
              </h2>

              <div className="mt-6 space-y-4">
                {[activity, ...relatedActivities].slice(0, 6).map((item) => {
                  const itemImage = resolveEventImage(item.image) || socialPostTataPower;
                  const excerpt = getPlainEventText(item.description);

                  return (
                    <Link
                      key={item.id}
                      to="/activities/$activityId"
                      params={{ activityId: String(item.id) }}
                      className={`flex items-start gap-4 rounded-[1.4rem] border px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-md ${
                        String(item.id) === String(activityId)
                          ? "border-primary/20 bg-[linear-gradient(180deg,#fffdfa_0%,#f7efe0_100%)] shadow-[0_18px_30px_-24px_rgba(20,60,53,0.28)]"
                          : "border-[#eadfc9] bg-background/70"
                      }`}
                    >
                      <img
                        src={itemImage}
                        alt={item.title}
                        className="h-16 w-20 rounded-2xl object-cover"
                        width={160}
                        height={120}
                      />
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold leading-6 text-earth">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#4f605a] [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                          {excerpt}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <Link
                to="/activities"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
              >
                सभी कार्य देखें
                <ArrowRight className="size-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
