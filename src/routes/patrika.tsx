import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import patrikaCover from "@/assets/patrika-cover.jpg";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter } from "@/components/site/SiteFooter";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

type PatrikaItem = {
  id: string;
  patrika_name: string;
  patrika_year: string;
  patrika_file: string;
  status?: number;
  is_active?: boolean;
};

export const Route = createFileRoute("/patrika")({
  head: () => ({
    meta: [
      { title: "उत्थान पत्रिका | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT द्वारा प्रकाशित उत्थान पत्रिका के सभी उपलब्ध अंक, प्रकाशन और डाउनलोड लिंक यहाँ उपलब्ध हैं।",
      },
      { property: "og:title", content: "उत्थान पत्रिका | SBGBT" },
      {
        property: "og:description",
        content:
          "शिक्षा, सामाजिक परिवर्तन, ग्राम विकास और प्रेरणादायक पहलों से जुड़ी उत्थान पत्रिका के अंक देखें और डाउनलोड करें।",
      },
    ],
  }),
  component: PatrikaPage,
});

function PatrikaPage() {
  const [docs, setDocs] = useState<PatrikaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPatrika() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE_URL}/patrika`);
        if (!response.ok) {
          throw new Error("पत्रिका सूची लोड नहीं हो पाई।");
        }

        const result = (await response.json()) as PatrikaItem[];
        if (!isMounted) return;

        setDocs(result.filter((item) => item.is_active || item.status === 1));
      } catch (loadError) {
        if (!isMounted) return;
        setDocs([]);
        setError(loadError instanceof Error ? loadError.message : "पत्रिका सूची लोड नहीं हो पाई।");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPatrika();

    return () => {
      isMounted = false;
    };
  }, []);

  const latestDoc = useMemo(() => docs[0] ?? null, [docs]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="उत्थान पत्रिका" />

      <section>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              डाउनलोड केंद्र
            </div>

            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">
              उत्थान पत्रिका एवं प्रकाशन
            </h2>

            <p className="mt-4 max-w-xl text-muted-foreground">
              SBGBT द्वारा प्रकाशित उत्थान पत्रिका के सभी उपलब्ध अंक यहाँ से डाउनलोड करें।
              इनमें शिक्षा, ग्राम विकास, सामाजिक जागरूकता और प्रेरणादायक पहलों से जुड़ी
              महत्वपूर्ण सामग्री उपलब्ध है।
            </p>

            <div className="mt-8 space-y-4">
              {loading ? (
                <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                  पत्रिका सूची लोड हो रही है...
                </div>
              ) : null}

              {!loading && error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {!loading && !error && docs.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                  अभी कोई सक्रिय पत्रिका उपलब्ध नहीं है।
                </div>
              ) : null}

              {!loading && !error
                ? docs.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.patrika_file}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                    >
                      <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                        <FileText className="size-5" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{doc.patrika_name}</h3>
                        <p className="text-sm text-muted-foreground">{doc.patrika_year}</p>
                      </div>

                      <Download className="size-5 text-muted-foreground transition group-hover:text-primary" />
                    </a>
                  ))
                : null}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-5 -left-5 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-xl">
              <motion.img
                src={patrikaCover}
                alt="उत्थान पत्रिका"
                className="mx-auto w-full max-w-xs rounded-xl shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="mt-6 text-center">
                <h3 className="font-display text-2xl font-bold">उत्थान पत्रिका</h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  शिक्षा, सामाजिक परिवर्तन, ग्राम विकास और प्रेरणादायक कहानियों का वार्षिक
                  प्रकाशन।
                </p>

                {latestDoc ? (
                  <a
                    href={latestDoc.patrika_file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
                  >
                    <Download className="size-4" />
                    नवीनतम अंक डाउनलोड करें
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}
