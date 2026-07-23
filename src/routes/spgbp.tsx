import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  Download,
  FileText,
  GraduationCap,
  Sparkles,
  Trophy,
  UserCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/spgbp")({
  head: () => ({
    meta: [
      { title: "SPGBP 2025–26 | SBGBT" },
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

const steps = [
  {
    icon: FileText,
    title: "नोटिफिकेशन पढ़ें",
    desc: "नीचे दिए गए SPGBP 2025–26 नोटिफिकेशन और परिशिष्टों को ध्यान से पढ़ें और आवश्यक जानकारी समझें।",
  },
  {
    icon: UserCheck,
    title: "ऑनलाइन पंजीकरण करें",
    desc: "विद्यालय विवरण, छात्र जानकारी और आवश्यक फोटो के साथ पंजीकरण फॉर्म सावधानीपूर्वक भरें।",
  },
  {
    icon: CalendarClock,
    title: "एडमिट कार्ड डाउनलोड करें",
    desc: "परीक्षा तिथि से पहले जारी किए गए एडमिट कार्ड को समय पर डाउनलोड कर सुरक्षित रखें।",
  },
  {
    icon: Trophy,
    title: "प्रतियोगिता में भाग लें",
    desc: "श्रेष्ठ प्रतिभागियों को छात्रवृत्ति, मार्गदर्शन और सम्मान के साथ आगे बढ़ने का अवसर दिया जाएगा।",
  },
];

const docs = [
  {
    name: "SPGBP 2025–26 नोटिफिकेशन",
    href: "https://www.sbgbteam.com/public/adminassets/SPGBP2025-26Notification-1.pdf",
  },
  {
    name: "परिशिष्ट I – निर्देश",
    href: "https://www.sbgbteam.com/public/adminassets/Annexure-I-doc.pdf",
  },
  {
    name: "परिशिष्ट II – फोटो नमूना",
    href: "https://www.sbgbteam.com/public/adminassets/Annexure-II_photo.pdf",
  },
];

function SPGBP() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="SPGBP 2025–26" />

      <section className="border-y border-border bg-accent/10">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Sparkles className="size-5" />
            </div>
            <p className="font-hi text-base leading-snug sm:text-lg">
              SPGBP 2025–26 पंजीकरण प्रारंभ हो चुका है। अंतिम तिथि से पहले आवेदन कर अपनी प्रतिभा को अगले चरण तक पहुंचाएं।
            </p>
          </div>
          <a
            href="https://www.sbgbteam.com/sbgbp-registration"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110"
          >
            अभी पंजीकरण करें <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">प्रक्रिया</div>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
            पंजीकरण से छात्रवृत्ति तक के चार सरल चरण
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </div>
                <span className="font-display text-3xl font-black text-muted-foreground/30">0{index + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">डाउनलोड</div>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">नोटिफिकेशन और परिशिष्ट</h2>
            <div className="mt-6 space-y-3">
              {docs.map((doc) => (
                <a
                  key={doc.name}
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-md"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold sm:text-base">{doc.name}</div>
                    <div className="text-xs text-muted-foreground">PDF · आधिकारिक दस्तावेज़</div>
                  </div>
                  <Download className="size-5 text-muted-foreground transition group-hover:text-primary" />
                </a>
              ))}

              <a
                href="https://www.sbgbteam.com/sbgbp-registration-admit-card"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/20 text-earth">
                  <GraduationCap className="size-5" />
                </div>
                <div className="font-semibold text-sm sm:text-base">एडमिट कार्ड डाउनलोड करें</div>
                <ArrowRight className="ml-auto size-4 text-primary" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">SPGBP के बारे में</div>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">
              यह प्रतियोगिता क्यों महत्वपूर्ण है
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                SPGBP, SBGBT की प्रमुख ग्रामीण शिक्षा पहल है। यह वार्षिक प्रतियोगिता प्रतिभाओं की पहचान करती है, स्वस्थ प्रतिस्पर्धा को प्रोत्साहित करती है और योग्य विद्यार्थियों को आगे बढ़ने का अवसर देती है।
              </p>
              <p className="font-hi text-earth">
                इसका उद्देश्य ग्रामीण बच्चों में आत्मविश्वास जगाना, उनकी प्रतिभा को निखारना और आर्थिक रूप से ज़रूरतमंद विद्यार्थियों को शैक्षिक सहयोग देना है।
              </p>
              <p>
                राजस्थान और मध्य प्रदेश के हजारों विद्यार्थी इस पहल से जुड़ चुके हैं, और सैकड़ों विद्यार्थियों को आगे की पढ़ाई तथा प्रतियोगी परीक्षाओं की तैयारी में सहयोग प्राप्त हुआ है।
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground"
              >
                छात्रवृत्ति प्रायोजित करें
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
              >
                प्रश्न पूछें
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
