import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, Newspaper, PlayCircle, Ticket } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter, CTASection } from "@/components/site/SiteFooter";
import {
  fetchPublicMedias,
  normalizeMediaType,
  resolveMediaImage,
  type MediaTabType,
} from "@/lib/public-medias";

export const Route = createFileRoute("/media")({
  loader: async () => {
    try {
      const medias = await fetchPublicMedias();
      return { medias };
    } catch {
      return { medias: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "मीडिया कवरेज | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT की मीडिया कवरेज, प्रेस रिपोर्ट, विशेष लेख और वीडियो दस्तावेज़ जो हमारे ग्रामीण विकास कार्यों की झलक प्रस्तुत करते हैं।",
      },
      { property: "og:title", content: "मीडिया कवरेज | SBGBT" },
      {
        property: "og:description",
        content:
          "प्रेस कवरेज, डॉक्यूमेंट्री और वीडियो कहानियों के माध्यम से SBGBT के कार्यों और प्रभाव को जानें।",
      },
    ],
  }),
  component: Media,
});

const tabs: MediaTabType[] = ["सभी", "प्रिंट मीडिया", "इलेक्ट्रॉनिक मीडिया"];

const videos = [
  { id: "Mqw26LHHR9E", title: "शिक्षा का मंदिर – उत्थान भवन, सरमथुरा" },
  { id: "kUMosORZmOo", title: "मानवता की सेवा ही ईश्वर की सेवा" },
  { id: "3RjwYoCyWrI", title: "सोच बदलो गाँव बदलो यात्रा" },
  { id: "mycj-BJ08Wk", title: "स्थापना दिवस की शुभकामनाएँ और प्रेरक संदेश" },
  { id: "DH3KPEHgAA4", title: "स्मार्ट विलेज कॉन्सेप्ट और उपलब्धियाँ" },
  { id: "wy3rBd3F-hg", title: "ऐसा जीवन जियो जो दूसरों के लिए प्रेरणा बने" },
];

function Media() {
  const { medias } = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState<MediaTabType>("सभी");

  const filteredPress = useMemo(() => {
    if (activeTab === "सभी") {
      return medias;
    }

    return medias.filter((item) => normalizeMediaType(item.type) === activeTab);
  }, [activeTab, medias]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="मीडिया कवरेज" />

      <section className="border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-wrap gap-7 border-b border-primary/15 pb-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-lg font-semibold transition ${
                  activeTab === tab
                    ? "border-b-4 border-earth text-earth"
                    : "text-primary/80 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {filteredPress.map((item) => (
              <Dialog key={`${item.id}-${item.title}`}>
                <article className="overflow-hidden rounded-[1.6rem] border border-primary/10 bg-card shadow-[0_18px_35px_-20px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.4)]">
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="block aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted text-left"
                      aria-label={`${item.title} image preview`}
                    >
                      <img
                        src={resolveMediaImage(item.image)}
                        alt={item.title}
                        className="size-full object-cover transition duration-700 hover:scale-105"
                        width={1200}
                        height={800}
                      />
                    </button>
                  </DialogTrigger>
                  <div className="p-5">
                    <h3 className="font-hi text-lg font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <div className="mt-4 space-y-2 text-sm text-foreground/80">
                      <div className="flex items-start gap-2">
                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item.published_date || "-"}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Newspaper className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item.publisher_name || "-"}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Ticket className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item.category || normalizeMediaType(item.type)}</span>
                      </div>
                    </div>
                  </div>
                </article>

                <DialogContent className="max-w-5xl border-border bg-background p-3 sm:p-4">
                  <DialogHeader>
                    <DialogTitle className="pr-8 font-hi text-base sm:text-lg">
                      {item.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={resolveMediaImage(item.image)}
                      alt={item.title}
                      className="max-h-[82vh] w-full object-contain"
                      width={1600}
                      height={2200}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredPress.length === 0 ? (
            <div className="mt-8 rounded-[1.6rem] border border-primary/10 bg-card px-6 py-10 text-center text-muted-foreground shadow-sm">
              इस श्रेणी में अभी कोई मीडिया कवरेज उपलब्ध नहीं है।
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-center gap-3">
          <PlayCircle className="size-5 text-primary" />
          <h2 className="font-display text-2xl font-black sm:text-3xl">वीडियो</h2>
        </div>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          डॉक्यूमेंट्री, प्रेरक कहानियाँ और अभियान वीडियो जो SBGBT के कार्यों को जीवंत रूप में सामने लाते हैं।
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Dialog key={video.id}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-ink text-left shadow-xl"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="aspect-video w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    width={1280}
                    height={720}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid size-16 place-items-center rounded-full bg-cream/95 text-primary shadow-2xl transition group-hover:scale-110">
                      <PlayCircle className="size-8" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
                    <div className="font-hi text-base font-semibold">{video.title}</div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl border-border bg-background p-3 sm:p-4">
                <DialogHeader>
                  <DialogTitle className="pr-8 font-hi text-base sm:text-lg">
                    {video.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="overflow-hidden rounded-2xl bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}
