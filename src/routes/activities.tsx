import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  Megaphone,
  Sprout,
  Users2,
  Wallet,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "हमारे कार्य | SBGBT" },
      {
        name: "description",
        content:
          "शिक्षा, महिला सशक्तिकरण, पंचायत सुदृढ़ीकरण, पर्यावरण संरक्षण, जन स्वास्थ्य और ग्राम विकास से जुड़े SBGBT के प्रमुख कार्यों की जानकारी।",
      },
      { property: "og:title", content: "हमारे कार्य | SBGBT" },
      {
        property: "og:description",
        content:
          "गांवों में सकारात्मक बदलाव लाने के लिए SBGBT द्वारा चलाए जा रहे प्रमुख कार्यक्रमों और पहलों को जानें।",
      },
    ],
  }),
  component: Activities,
});

const activities = [
  {
    icon: Megaphone,
    title: "जन जागरूकता अभियान",
    subtitle: "सूचना से सहभागिता तक",
    desc: "केंद्र, राज्य और NABARD जैसी योजनाओं की जानकारी स्वयं सहायता समूहों, किसान समूहों, महिला मंडलों और युवाओं तक पहुंचाई जाती है।",
  },
  {
    icon: GraduationCap,
    title: "ग्रामीण शिक्षा सशक्तिकरण",
    subtitle: "SPGBP छात्रवृत्ति पहल",
    desc: "शिक्षा पाओ, ज्ञान बढ़ाओ प्रतियोगिता ग्रामीण प्रतिभाओं की पहचान करती है, उन्हें मार्गदर्शन देती है और छात्रवृत्ति से जोड़ती है।",
  },
  {
    icon: BookOpen,
    title: "उत्थान भवन और अध्ययन केंद्र",
    subtitle: "लाइब्रेरी और कोचिंग सहयोग",
    desc: "सरमथुरा में अध्ययन केंद्र, पुस्तकालय और कोचिंग सुविधाओं के माध्यम से युवाओं को बेहतर भविष्य के लिए तैयार किया जाता है।",
  },
  {
    icon: Users2,
    title: "महिला सशक्तिकरण",
    subtitle: "स्वावलंबन और नेतृत्व",
    desc: "बालिका शिक्षा, मार्गदर्शन, आजीविका, स्वास्थ्य और स्वच्छता से जुड़े प्रयासों के माध्यम से ग्रामीण महिलाओं को आगे बढ़ाया जाता है।",
  },
  {
    icon: Landmark,
    title: "स्मार्ट विलेज योजना",
    subtitle: "संगठित ग्राम विकास",
    desc: "गांवों में जिम्मेदारी, अधिकार और स्थानीय भागीदारी की भावना विकसित कर स्थायी सामाजिक बदलाव की दिशा में काम किया जाता है।",
  },
  {
    icon: Building2,
    title: "पंचायती राज सुदृढ़ीकरण",
    subtitle: "स्थानीय शासन को मजबूती",
    desc: "ग्रामीण नागरिकों को सरकारी योजनाओं और पंचायत प्रक्रिया की जानकारी देकर उन्हें विकास कार्यक्रमों में सक्रिय भागीदार बनाया जाता है।",
  },
  {
    icon: Wallet,
    title: "आत्मनिर्भर और समृद्ध गांव",
    subtitle: "वित्तीय साक्षरता पहल",
    desc: "बैंकिंग, क्रेडिट, बचत और औपचारिक वित्तीय सेवाओं की समझ देकर गांवों में आर्थिक सशक्तिकरण को बढ़ावा दिया जाता है।",
  },
  {
    icon: Leaf,
    title: "पर्यावरण संरक्षण",
    subtitle: "ग्रीन विलेज, क्लीन विलेज",
    desc: "वृक्षारोपण, जल संरक्षण और स्वच्छता को जन-अभियान बनाकर गांव स्तर पर पर्यावरण चेतना मजबूत की जाती है।",
  },
  {
    icon: HeartPulse,
    title: "जन स्वास्थ्य अभियान",
    subtitle: "स्वास्थ्य जागरूकता और सेवा",
    desc: "रक्तदान शिविर, स्वास्थ्य जांच और सामुदायिक जागरूकता कार्यक्रमों के माध्यम से स्वस्थ गांव का लक्ष्य साधा जाता है।",
  },
  {
    icon: Sprout,
    title: "समाज व राष्ट्र निर्माण",
    subtitle: "स्थानीय समाधान, स्थायी असर",
    desc: "स्थानीय समस्याओं को समझकर स्थानीय समाधान विकसित किए जाते हैं, ताकि गांव विकास समितियों के साथ मिलकर बदलाव की गति बनी रहे।",
  },
];

function Activities() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="हमारे कार्य" />

      <section className="festive-band border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-primary/15 bg-card/80 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary">
              ग्रामीण विकास की दिशा में
            </div>
            <h2 className="mt-4 font-display text-3xl font-black text-earth sm:text-4xl">
              शिक्षा, सहभागिता और स्वावलंबन को जोड़ते हमारे प्रमुख कार्यक्रम
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              SBGBT का हर कार्यक्रम गांव की वास्तविक ज़रूरतों को समझकर तैयार किया गया है, ताकि परिवर्तन केवल नारा न रहे बल्कि ज़मीन पर दिखने वाला परिणाम बने।
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <article
                key={activity.title}
                className="group relative rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-xl sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <activity.icon className="size-6" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-hi text-xl font-bold text-earth">{activity.title}</h3>
                <div className="mt-1 text-sm font-semibold text-primary">{activity.subtitle}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activity.desc}</p>
                <Link
                  to="/gallery"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-3"
                >
                  कार्य की झलक देखें <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1fr_auto]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-accent">सहयोग करें</div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
              किसी कार्यक्रम को समर्थन दें, विद्यार्थियों का मार्गदर्शन करें या गांव के विकास में भागीदार बनें।
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
            >
              दान करें
            </Link>
            <Link
              to="/spgbp"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold"
            >
              SPGBP 2025–26
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
