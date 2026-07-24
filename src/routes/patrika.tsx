import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  FileText,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";
import patrikaCover from "@/assets/patrika-cover.jpg";
import { motion } from "framer-motion";

import ecoNeedsLogo from "@/assets/econeeds-logo.png";
import workholicsLogo from "@/assets/workholicslogo.png";
import heroHeartSprade from "@/assets/hero-heart-sprade.png";
import blogBgPaper from "@/assets/blog-bg-paper.png";

const sectionRevealProps = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
};

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

      <motion.section
        {...sectionRevealProps}
        id="donate"
        className="relative overflow-hidden bg-[#fbf7ef] text-[#143c35]"
      >
        <div
          className="absolute inset-0 bg-repeat opacity-[0.82]"
          style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.12))]" />
        <div className="absolute left-[4%] top-1/2 hidden -translate-y-1/2 xl:block">
          <img
            src={heroHeartSprade}
            alt=""
            aria-hidden="true"
            className="hero-heartbeat h-48 w-48 object-contain opacity-30"
            width={192}
            height={192}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <img
              src={heroHeartSprade}
              alt=""
              aria-hidden="true"
              className="hero-heartbeat h-5 w-5 object-contain opacity-70"
              width={20}
              height={20}
            />
            हमारे सहयोगी
          </span>
          <h2 className="mt-5 font-display text-2xl font-black text-balance text-[#143c35] sm:text-5xl lg:text-6xl">
            सहयोग से मजबूत होती यात्रा
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#35544c]/82">
            जिन साथियों और संस्थाओं ने शिक्षा, ग्राम विकास और जन-जागरूकता से जुड़े हमारे प्रयासों को मजबूती दी, उन्हें यहां सम्मानपूर्वक स्थान दिया गया है।
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }} >
                  <img
                    src={ecoNeedsLogo}
                    alt="Eco Needs Foundation"
                    className="mx-auto h-20 w-auto object-contain sm:h-24"

                  />
                </div>
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}>
                  <img
                    src={workholicsLogo}
                    alt="Workholics"
                    className="mx-auto h-24 w-auto object-contain sm:h-28"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* ========= */}
      <SiteFooter />
    </div>
  );
}
