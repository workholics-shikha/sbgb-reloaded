import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import galEnv from "@/assets/gallery-environment.jpg";
import galWomen from "@/assets/gallery-women.jpg";
import galLib from "@/assets/gallery-library.jpg";
import galHealth from "@/assets/gallery-health.jpg";
import galAwards from "@/assets/gallery-awards.jpg";
import galVillage from "@/assets/gallery-village.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — SBGBT field moments" },
      { name: "description", content: "Photographs from SBGBT programs across rural Rajasthan and Madhya Pradesh — plantation drives, women's collectives, education, health camps and awards." },
      { property: "og:title", content: "SBGBT Photo Gallery" },
      { property: "og:description", content: "Moments from the ground: education, environment, health and empowerment." },
    ],
  }),
  component: Gallery,
});

type Item = { src: string; title: string; tag: string };

const items: Item[] = [
  { src: heroEducation, title: "आओ पढ़े, आगे बढ़े — Classroom, Sarmathura", tag: "Education" },
  { src: galEnv, title: "Plantation Drive, Dhanora", tag: "Environment" },
  { src: galWomen, title: "SHG Meeting, Sarmathura", tag: "Women" },
  { src: galLib, title: "Utthan Library Session", tag: "Education" },
  { src: galHealth, title: "Village Health Camp", tag: "Health" },
  { src: galAwards, title: "SPGBP Award Ceremony", tag: "Scholarship" },
  { src: galVillage, title: "Model Village Aerial — Dhanora", tag: "Smart Village" },
  { src: galEnv, title: "Green Village Campaign", tag: "Environment" },
  { src: galWomen, title: "Skills Training Workshop", tag: "Women" },
];

const tags = ["All", "Education", "Environment", "Women", "Health", "Scholarship", "Smart Village"] as const;

function Gallery() {
  const [active, setActive] = useState<(typeof tags)[number]>("All");
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const filtered = active === "All" ? items : items.filter(i => i.tag === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="Field gallery"
        title="Moments from the villages we serve."
        hi="फोटो गैलरी"
        sub="A living archive of SBGBT's on-the-ground work — filter by program or open any image full-screen."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition border ${
                active === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground/75 border-border hover:border-primary/40"
              }`}
            >{t}</button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {filtered.map((g, i) => (
            <figure
              key={i}
              onClick={() => setLightbox(g)}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-zoom-in"
            >
              <img src={g.src} alt={g.title} loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition"/>
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-cream opacity-0 group-hover:opacity-100 transition">
                <span className="inline-block rounded-full bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{g.tag}</span>
                <div className="mt-1.5 font-display text-sm font-bold">{g.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur grid place-items-center p-6 cursor-zoom-out"
        >
          <div className="max-w-5xl w-full">
            <img src={lightbox.src} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-2xl"/>
            <div className="mt-4 text-center text-cream">
              <span className="inline-block rounded-full bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{lightbox.tag}</span>
              <div className="mt-2 font-display text-lg font-bold">{lightbox.title}</div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
