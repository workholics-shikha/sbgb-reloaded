import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, Clapperboard, Newspaper, PlayCircle, Ticket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import galAwards from "@/assets/gallery-awards.jpg";
import galEnv from "@/assets/gallery-environment.jpg";
import galVillage from "@/assets/gallery-village.jpg";
import galHealth from "@/assets/gallery-health.jpg";
import galWomen from "@/assets/gallery-women.jpg";
import galLib from "@/assets/gallery-library.jpg";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media & Press — SBGBT coverage" },
      {
        name: "description",
        content:
          "SBGBT की मीडिया कवरेज, डॉक्यूमेंट्री फिल्में और प्रिंट मीडिया में प्रकाशित खबरें।",
      },
      { property: "og:title", content: "SBGBT Media & Press" },
      {
        property: "og:description",
        content: "प्रेस कवरेज, डॉक्यूमेंट्री और खबरें जो SBGBT के कार्यों को सामने लाती हैं।",
      },
    ],
  }),
  component: Media,
});

const tabs = ["सब", "प्रिंट मीडिया", "इलेक्ट्रॉनिक मीडिया"] as const;

const press = [
  {
    date: "प्रकाशित तिथि: जुलाई 18 2018",
    publisher: "प्रकाशक: दैनिक भास्कर",
    category: "श्रेणी: सोच बदलो गांव बदलो यात्रा",
    type: "प्रिंट मीडिया" as const,
    cover: galEnv,
    title: "गांवों में पौधारोपण अभियान चलाया जाता है",
  },
  {
    date: "प्रकाशित तिथि: जुलाई 18 2018",
    publisher: "प्रकाशक: दैनिक भास्कर",
    category: "श्रेणी: ग्रामीण विकास: जागरूकता लेख",
    type: "प्रिंट मीडिया" as const,
    cover: galVillage,
    title: "चंबल के बीहड़ों से निकला देश का मॉडल विलेज प्रधानमंत्री ने दिल्ली में विज्ञान भवन में किया धौलपुर के धनौरा गांव को सम्मानित",
  },
  {
    date: "प्रकाशित तिथि: 20 जून 2018",
    publisher: "प्रकाशक: दैनिक भास्कर",
    category: "श्रेणी: सोच बदलो गांव बदलो यात्रा",
    type: "प्रिंट मीडिया" as const,
    cover: galLib,
    title: "हर गांव धनौरा की तरह आदर्श बने - नन्नूमल पहाड़िया",
  },
  {
    date: "प्रकाशित तिथि: जुलाई 18 2018",
    publisher: "प्रकाशक: हिंदुस्तान एक्सप्रेस",
    category: "श्रेणी: सोच बदलो गांव बदलो यात्रा",
    type: "प्रिंट मीडिया" as const,
    cover: galAwards,
    title: "सोच बदलो - गांव बदलो की जनजागृति ने दी स्मार्ट विलेज धनौरा को विकसित गांव की पहचान",
  },
  {
    date: "प्रकाशित तिथि: फरवरी 06 2025",
    publisher: "प्रकाशक: प्रेस फीचर",
    category: "श्रेणी: मीडिया कवरेज",
    type: "इलेक्ट्रॉनिक मीडिया" as const,
    cover: galWomen,
    title: "SBGBT featured for grassroots impact model in rural Rajasthan",
  },
  {
    date: "प्रकाशित तिथि: जून 20 2018",
    publisher: "प्रकाशक: विशेष रिपोर्ट",
    category: "श्रेणी: जन स्वास्थ्य",
    type: "इलेक्ट्रॉनिक मीडिया" as const,
    cover: galHealth,
    title: "जन स्वास्थ्य और सामुदायिक जागरूकता अभियानों ने गांवों में नई ऊर्जा भरी",
  },
];

const videos = [
  { id: "Mqw26LHHR9E", title: "शिक्षा का मंदिर — उत्थान भवन सरमथुरा" },
  { id: "kUMosORZmOo", title: "मानवता की सेवा ही ईश्वर की सेवा है" },
  { id: "3RjwYoCyWrI", title: "सोच बदलो गांव बदलो यात्रा" },
  { id: "mycj-BJ08Wk", title: "स्थापना दिवस की शुभकामनाएं व बधाइयां" },
  { id: "DH3KPEHgAA4", title: "स्मार्ट विलेज कॉन्सेप्ट एंड अचीवमेंट्स" },
  { id: "wy3rBd3F-hg", title: "ज़िंदगी को ऐसे जिया कि लोगों के लिए प्रेरणा बने" },
];

function Media() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("सब");

  const filteredPress = useMemo(() => {
    if (activeTab === "सब") return press;
    return press.filter((item) => item.type === activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-accent/10" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <Newspaper className="size-3.5" />
                मीडिया
              </span>
              <h1 className="mt-4 font-display text-4xl font-black sm:text-5xl lg:text-6xl">
                मीडिया कवरेज
              </h1>
              <p className="mt-4 max-w-2xl font-hi text-lg leading-relaxed text-earth sm:text-xl">
                प्रिंट मीडिया, इलेक्ट्रॉनिक मीडिया और प्रेरक वीडियो के माध्यम से SBGBT की
                यात्रा और प्रभाव।
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Newspaper, label: "प्रिंट मीडिया" },
                { icon: Clapperboard, label: "इलेक्ट्रॉनिक मीडिया" },
                { icon: PlayCircle, label: "वीडियो" },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-border bg-card/90 p-4 shadow-sm">
                  <item.icon className="size-5 text-primary" />
                  <div className="mt-3 text-sm font-semibold">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(173,228,235,0.7),rgba(213,245,247,0.9))]">
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
              <article
                key={`${item.type}-${item.title}`}
                className="overflow-hidden rounded-[1.6rem] border border-primary/10 bg-card shadow-[0_18px_35px_-20px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.4)]"
              >
                <div className="aspect-[16/9] overflow-hidden border-b border-border bg-muted">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="size-full object-cover transition duration-700 hover:scale-105"
                    width={1200}
                    height={800}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-hi text-lg font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <div className="mt-4 space-y-2 text-sm text-foreground/80">
                    <div className="flex items-start gap-2">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Newspaper className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item.publisher}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Ticket className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-center gap-3">
          <PlayCircle className="size-5 text-primary" />
          <h2 className="font-display text-2xl font-black sm:text-3xl">वीडियो</h2>
        </div>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          डॉक्यूमेंट्री, प्रेरक कहानियां और अभियान वीडियो जो SBGBT के कार्यों को जीवंत रूप
          से दिखाते हैं।
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
                  <DialogTitle className="pr-8 font-hi text-base sm:text-lg">{video.title}</DialogTitle>
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

      <SiteFooter />
    </div>
  );
}
