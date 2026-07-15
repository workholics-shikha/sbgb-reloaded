import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Newspaper, PlayCircle } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
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
      { name: "description", content: "SBGBT in the news, documentary films and press coverage from across India — grassroots impact stories from Chambal to Delhi." },
      { property: "og:title", content: "SBGBT Media & Press" },
      { property: "og:description", content: "Press coverage, documentaries and news featuring the Soch Badlo Gaon Badlo movement." },
    ],
  }),
  component: Media,
});

const press = [
  { date: "06 Feb 2025", cat: "Feature", cover: galAwards, title: "SBGBT featured for grassroots impact model in rural Rajasthan.", excerpt: "A national feature on the movement's scholarship pipeline and Utthan Bhavan model." },
  { date: "18 Jul 2018", cat: "Coverage", cover: galEnv, title: "गांवों में पौधारोपण अभियान — जनसहभागिता से हरित क्रांति।", excerpt: "Reporting from Dhanora on the tree-planting drive that turned residents into custodians." },
  { date: "18 Jul 2018", cat: "Feature", cover: galVillage, title: "चंबल के बीहड़ों से निकला देश का मॉडल विलेज।", excerpt: "How Dhanora became a national reference point for Smart Village implementation." },
  { date: "20 Jun 2018", cat: "Report", cover: galHealth, title: "हर गांव धनौरा की तरह आदर्श बने — नन्नूमल पहाड़िया।", excerpt: "A speech and its aftermath: the vision of one model village multiplying across districts." },
  { date: "18 Jul 2018", cat: "Coverage", cover: galWomen, title: "सोच बदलो — गाँव बदलो की जनजागृति ने दी स्मार्ट विलेज को गति।", excerpt: "Women-led collectives credited for accelerating civic momentum." },
  { date: "18 Jul 2018", cat: "Feature", cover: galLib, title: "न्यू इंडिया कॉन्क्लेव में भाग ले रहे धनौरा के प्रतिनिधि।", excerpt: "Village representatives at a national conclave — the ravines meet the podium." },
];

const videos = [
  { id: "Mqw26LHHR9E", title: "शिक्षा का मंदिर — उत्थान भवन सरमथुरा" },
  { id: "kUMosORZmOo", title: "मानवता की सेवा ही ईश्वर की सेवा है" },
  { id: "3RjwYoCyWrI", title: "सोच बदलो गाँव बदलो यात्रा" },
  { id: "mycj-BJ08Wk", title: "स्थापना दिवस की शुभकामनाएँ व बधाइयाँ" },
  { id: "DH3KPEHgAA4", title: "स्मार्ट विलेज कॉन्सेप्ट एंड अचीवमेंट्स" },
  { id: "wy3rBd3F-hg", title: "ज़िंदगी को ऐसे जिया कि लोगों के लिए प्रेरणा बने" },
];

function Media() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="Newsroom"
        title="Stories that traveled from the ravines to the world."
        hi="मीडिया कवरेज"
        sub="Press coverage, films and reports documenting SBGBT's impact across seven districts."
      />

      {/* Press grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="size-5 text-primary"/>
          <h2 className="font-display text-2xl sm:text-3xl font-black">In the press</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {press.map(p => (
            <article key={p.title} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl transition">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.cover} alt="" className="size-full object-cover group-hover:scale-105 transition-transform duration-700"/>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/10 text-primary px-2.5 py-1 font-semibold">{p.cat}</span>
                  <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="size-3"/> {p.date}</span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold leading-snug group-hover:text-primary transition">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article <ArrowRight className="size-4"/>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Videos */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-8">
            <PlayCircle className="size-5 text-primary"/>
            <h2 className="font-display text-2xl sm:text-3xl font-black">वीडियो — Documentary films</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map(v => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-ink block"
              >
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title}
                  className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"/>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid size-14 place-items-center rounded-full bg-cream/95 text-primary shadow-2xl group-hover:scale-110 transition">
                    <PlayCircle className="size-8" strokeWidth={1.5}/>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-ink/95 to-transparent">
                  <p className="font-hi text-sm sm:text-base text-cream font-semibold">{v.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
