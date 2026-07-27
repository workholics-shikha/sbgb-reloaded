import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  FileText,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter, CTASection} from "@/components/site/SiteFooter";
import patrikaCover from "@/assets/patrika-cover.jpg";
import { motion } from "framer-motion";
 
export const Route = createFileRoute("/patrika")({
  head: () => ({
    meta: [
      { title: "उत्थान पत्रिका | SBGBT" },
      {
        name: "description",
        content:
          "कक्षा 5 से 12 तक के ग्रामीण विद्यार्थियों के लिए SBGBT की वार्षिक छात्रवृत्ति प्रतियोगिता। 2025–26 सत्र के लिए पंजीकरण, दस्तावेज़ और प्रक्रिया की जानकारी।",
      },
      { property: "og:title", content: "SPGBP 2025–26 | SBGBT" },
      {
        property: "og:description",
        content:
          "शिक्षा पाओ, ज्ञान बढ़ाओ प्रतियोगिता के माध्यम से ग्रामीण विद्यार्थियों को छात्रवृत्ति, मार्गदर्शन और प्रेरणा से जोड़ने की पहल।",
      },
    ],
  }),
  component: SPGBP,
});

const docs = [
  {
    name: "उत्थान पत्रिका अंक -4",
    year: "2022",
    href: "https://www.sbgbteam.com/public/patrika/file-05-18-2023_0251pm71457.pdf",
  },
  {
    name: "उत्थान पत्रिका अंक -3",
    year: "2020",
    href: "https://www.sbgbteam.com/public/patrika/file-07-20-2022_0242pm64367.pdf",
  },
  {
    name: "उत्थान पत्रिका अंक -2",
    year: "2019",
    href: "https://www.sbgbteam.com/public/patrika/file-02-16-2021_0520pm50118.pdf",
  },
  {
    name: "उत्थान पत्रिका अंक -1",
    year: "2018",
    href: "https://www.sbgbteam.com/public/patrika/file-02-16-2021_0521pm8106.pdf",
  },
];

function SPGBP() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="उत्थान पत्रिका" />

      <section>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_420px]">

          {/* Left */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              डाउनलोड केंद्र
            </div>

            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">
              उत्थान पत्रिका एवं प्रकाशन
            </h2>

            <p className="mt-4 max-w-xl text-muted-foreground">
              SBGBT द्वारा प्रकाशित उत्थान पत्रिका के सभी उपलब्ध अंक यहाँ से
              डाउनलोड करें। इनमें शिक्षा, ग्राम विकास, सामाजिक जागरूकता और
              प्रेरणादायक पहलों से जुड़ी महत्वपूर्ण सामग्री उपलब्ध है।
            </p>

            <div className="mt-8 space-y-4">
              {docs.map((doc) => (
                <a
                  key={doc.name}
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-5" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.year}</p>
                  </div>

                  <Download className="size-5 text-muted-foreground transition group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">

            <div className="absolute -top-5 -left-5 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-xl">

              <motion.img
                src={patrikaCover}
                alt="उत्थान पत्रिका"
                className="mx-auto w-full max-w-xs rounded-xl shadow-2xl"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="mt-6 text-center">
                <h3 className="font-display text-2xl font-bold">
                  उत्थान पत्रिका
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  शिक्षा, सामाजिक परिवर्तन, ग्राम विकास और प्रेरणादायक
                  कहानियों का वार्षिक प्रकाशन।
                </p>

                <a
                  href={docs[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  <Download className="size-4" />
                  नवीनतम अंक डाउनलोड करें
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      < CTASection />
      {/* === */}

      <SiteFooter />
    </div>
  );
}
