import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  HeartPulse,
  Landmark,
  Leaf,
  Megaphone,
  Sprout,
  Users2,
  Wallet,
} from "lucide-react";

import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter } from "@/components/site/SiteFooter";
import { fetchPublicEvents, getPlainEventText } from "@/lib/public-events";

export const Route = createFileRoute("/activities")({
  loader: async () => {
    try {
      const rows = await fetchPublicEvents();
      return { rows };
    } catch {
      return { rows: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "हमारे कार्य | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT के प्रमुख कार्यक्रम, आयोजन और सामाजिक प्रयासों की जानकारी देखें।",
      },
      { property: "og:title", content: "हमारे कार्य | SBGBT" },
      {
        property: "og:description",
        content:
          "गांवों में सकारात्मक बदलाव के लिए SBGBT द्वारा आयोजित प्रमुख कार्यक्रमों और पहलों को जानें।",
      },
    ],
  }),
  component: Activities,
});

const fallbackEvents = [
  {
    icon: Megaphone,
    title: "जन जागरूकता अभियान",
    subtitle: "सामुदायिक भागीदारी",
    desc: "सरकारी योजनाओं, शिक्षा और सामाजिक चेतना से जुड़े सामुदायिक कार्यक्रम।",
  },
  {
    icon: CalendarDays,
    title: "शैक्षिक आयोजन",
    subtitle: "प्रतिभा और मार्गदर्शन",
    desc: "छात्रों के लिए प्रेरक प्रतियोगिताएं, सम्मान समारोह और मार्गदर्शन कार्यक्रम।",
  },
  {
    icon: BookOpen,
    title: "उत्थान सहयोग कार्यक्रम",
    subtitle: "अध्ययन और अवसर",
    desc: "युवाओं को अध्ययन, कोचिंग और विकास के अवसरों से जोड़ने वाली पहलें।",
  },
  {
    icon: Users2,
    title: "महिला सशक्तिकरण कार्यक्रम",
    subtitle: "स्वावलंबन और नेतृत्व",
    desc: "महिलाओं और बालिकाओं के लिए जागरूकता, शिक्षा और आत्मविश्वास से जुड़े कार्यक्रम।",
  },
  {
    icon: Landmark,
    title: "ग्राम विकास पहल",
    subtitle: "स्थानीय सहभागिता",
    desc: "गांव स्तर पर संगठन, जिम्मेदारी और विकासोन्मुख सोच को बढ़ावा देने वाले आयोजन।",
  },
  {
    icon: Building2,
    title: "पंचायती राज सुदृढ़ीकरण",
    subtitle: "स्थानीय प्रशासन सहयोग",
    desc: "ग्राम स्तर पर योजनाओं और अधिकारों की जानकारी से जुड़ी गतिविधियां।",
  },
  {
    icon: Wallet,
    title: "आर्थिक सशक्तिकरण",
    subtitle: "वित्तीय जागरूकता",
    desc: "आत्मनिर्भरता, बचत और वित्तीय जानकारी से जुड़े सार्वजनिक कार्यक्रम।",
  },
  {
    icon: Leaf,
    title: "पर्यावरण संरक्षण",
    subtitle: "ग्रीन विलेज अभियान",
    desc: "स्वच्छता, वृक्षारोपण और पर्यावरण चेतना को बढ़ाने वाले आयोजन।",
  },
  {
    icon: HeartPulse,
    title: "जन स्वास्थ्य अभियान",
    subtitle: "स्वास्थ्य और सेवा",
    desc: "स्वास्थ्य शिविर, रक्तदान और सामुदायिक स्वास्थ्य कार्यक्रम।",
  },
  {
    icon: Sprout,
    title: "समाज निर्माण प्रयास",
    subtitle: "स्थायी परिवर्तन",
    desc: "स्थानीय समस्याओं के समाधान और समाज निर्माण से जुड़े कार्यक्रम।",
  },
] as const;

type ActivityCard = {
  id?: string;
  icon: typeof Megaphone;
  title: string;
  subtitle: string;
  desc: string;
};

function getEventSubtitle(
  fromDate?: string | null,
  toDate?: string | null,
  category?: string | null,
  fallback?: string,
) {
  const dateRange = [fromDate, toDate].filter(Boolean).join(" - ");

  if (dateRange) {
    return dateRange;
  }

  if (category) {
    return category;
  }

  return fallback || "SBGBT Event";
}

function Activities() {
  const { rows } = Route.useLoaderData();

  const activityCards: ActivityCard[] =
    rows.length > 0
      ? rows.map((row, index) => ({
          id: row.id,
          icon: fallbackEvents[index % fallbackEvents.length]?.icon || Megaphone,
          title: row.title,
          subtitle: getEventSubtitle(
            row.from_date,
            row.to_date,
            row.category,
            fallbackEvents[index % fallbackEvents.length]?.subtitle,
          ),
          desc:
            getPlainEventText(row.description) ||
            fallbackEvents[index % fallbackEvents.length]?.desc ||
            "",
        }))
      : [...fallbackEvents];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="हमारे कार्य" />

      <section className="border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-primary/15 bg-card/80 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary">
              ग्रामीण विकास की दिशा में
            </div>
            <h2 className="mt-4 font-display text-3xl font-black text-earth sm:text-4xl">
              SBGBT के प्रमुख कार्यक्रम और सामाजिक आयोजन
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              यहां SBGBT के वे कार्यक्रम और आयोजन दिखाए गए हैं जो समुदाय, शिक्षा, स्वास्थ्य, पर्यावरण
              और ग्राम विकास से सीधे जुड़े हैं।
            </p>
          </div>

          <motion.div
            className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {activityCards.map((activity, index) => (
              <article
                key={`${activity.id || activity.title}-${index}`}
                className="group relative flex h-full flex-col rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-xl sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <activity.icon className="size-6" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 min-h-[3.9rem] pb-1 font-hi text-xl font-bold leading-[1.45] text-earth">
                  {activity.title}
                </h3>
                <div className="mt-1 text-sm font-semibold text-primary">{activity.subtitle}</div>
                <p className="mt-3 min-h-[8.5rem] pb-1 text-sm leading-7 text-muted-foreground [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
                  {activity.desc}
                </p>
                {activity.id ? (
                  <Link
                    to="/activities/$activityId"
                    params={{ activityId: String(activity.id) }}
                    className="mt-auto inline-flex items-center gap-1.5 pb-1 text-sm font-semibold leading-6 text-primary transition-all group-hover:gap-3"
                  >
                    विस्तार से देखें <ArrowRight className="size-4" />
                  </Link>
                ) : null}
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
      <SiteFooter />
    </div>
  );
}
