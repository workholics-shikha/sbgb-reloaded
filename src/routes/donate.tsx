import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, GraduationCap, HandHeart, HeartPulse, Landmark, Sprout, Users2, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";
import donateHeroReal from "@/assets/donate-hero-real.jpg";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "दान करें | SBGBT" },
      { name: "description", content: "सोच बदलो गांव बदलो टीम को सहयोग दें। छात्रवृत्ति, वृक्षारोपण और स्वास्थ्य शिविर जैसे अभियानों को समर्थन दें।" },
      { property: "og:title", content: "दान करें | SBGBT" },
      { property: "og:description", content: "आपका योगदान एक कक्षा बना सकता है, पेड़ लगा सकता है और किसी जीवन को सहारा दे सकता है।" },
    ],
  }),
  component: Donate,
});

const amounts = [500, 1500, 5000, 15000];
const causes = [
  { icon: GraduationCap, k: "education", label: "SPGBP छात्रवृत्ति" },
  { icon: Sprout, k: "environment", label: "ग्रीन विलेज" },
  { icon: HeartPulse, k: "health", label: "स्वास्थ्य शिविर" },
  { icon: Users2, k: "women", label: "महिला SHG" },
  { icon: Landmark, k: "smart", label: "स्मार्ट विलेज" },
  { icon: Building2, k: "utthan", label: "उत्थान भवन" },
];

function Donate() {
  const [amount, setAmount] = useState<number>(1500);
  const [custom, setCustom] = useState("");
  const [cause, setCause] = useState<string>("education");
  const [freq, setFreq] = useState<"once" | "monthly">("once");

  const final = custom ? Number(custom) : amount;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero
        eyebrow="अभियान से जुड़ें"
        title="आपका योगदान एक कक्षा बना सकता है, पेड़ लगा सकता है और किसी जीवन को सहारा दे सकता है।"
        hi="दान करें · SBGBT सदस्य बनें"
        sub="दान की राशि जमीनी कार्यों में लगाई जाती है। SBGBT एक पंजीकृत संस्था है और दान धारा 80G के अंतर्गत कर छूट के लिए पात्र हो सकता है।"
        imageSrc={donateHeroReal}
        imageAlt="SBGBT recognition and community support"
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-black sm:text-3xl">अपना योगदान दें</h2>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">आवृत्ति</div>
            <div className="inline-flex rounded-full border border-border bg-background p-1">
              {(["once", "monthly"] as const).map((f) => (
                <button key={f} onClick={() => setFreq(f)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${freq === f ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
                  {f === "once" ? "एक बार" : "मासिक"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">राशि (INR)</div>
            <div className="grid grid-cols-4 gap-2">
              {amounts.map((a) => (
                <button key={a} onClick={() => { setAmount(a); setCustom(""); }}
                  className={`rounded-xl border px-3 py-3 font-display text-lg font-black transition ${
                    !custom && amount === a ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"
                  }`}>
                  ₹{a.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="या अपनी राशि दर्ज करें"
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              inputMode="numeric"
            />
          </div>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">यह सहयोग किसके लिए</div>
            <div className="grid gap-2 sm:grid-cols-3">
              {causes.map((c) => (
                <button key={c.k} onClick={() => setCause(c.k)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                    cause === c.k ? "border-accent bg-accent/20 text-earth" : "border-border bg-background hover:border-primary/40"
                  }`}>
                  <c.icon className="size-4" /> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-4">
            <div>
              <div className="text-xs text-muted-foreground">आप योगदान दे रहे हैं</div>
              <div className="font-display text-2xl font-black">₹{(final || 0).toLocaleString("en-IN")} <span className="text-sm font-sans text-muted-foreground">{freq === "monthly" ? "/ माह" : "एक बार"}</span></div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110">
              <HandHeart className="size-4" /> अभी दान करें
            </button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            भुगतान सुरक्षित माध्यम से किया जाएगा। आपको ईमेल पर रसीद प्राप्त होगी।
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-leaf p-6 text-primary-foreground sm:p-8">
            <div className="absolute inset-0 opacity-30 grain-bg"/>
            <div className="relative">
              <div className="text-xs uppercase tracking-widest opacity-80">आपका प्रभाव</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent"/><span><b>₹500</b> — उत्थान लाइब्रेरी में एक बच्चे की वर्षभर की स्टेशनरी।</span></li>
                <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent"/><span><b>₹1,500</b> — ग्रीन विलेज अभियान के अंतर्गत 30 पौधों का रोपण और देखभाल।</span></li>
                <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent"/><span><b>₹5,000</b> — एक ग्रामीण विद्यार्थी के लिए पूर्ण SPGBP छात्रवृत्ति।</span></li>
                <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent"/><span><b>₹15,000</b> — 200+ लाभार्थियों के लिए एक स्वास्थ्य शिविर।</span></li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">सदस्य बनें</div>
            <h3 className="mt-2 font-display text-2xl font-black">SBGBT सदस्य बनें</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              सदस्यों को समय-समय पर फील्ड रिपोर्ट, वार्षिक कार्यक्रमों के आमंत्रण और सामान्य सभा में भागीदारी का अवसर मिलता है।
            </p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
              सदस्यता जानकारी
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">बैंक ट्रांसफर</div>
            <ul className="mt-3 space-y-1.5 font-mono text-sm text-muted-foreground">
              <li>खाता नाम: Soch Badlo Gaon Badlo Team</li>
              <li>खाता संख्या: XXXX XXXX XXXX</li>
              <li>IFSC: XXXX0000000</li>
              <li>UPI: sbgbteam@upi</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">ट्रांसफर से पहले अद्यतन बैंक विवरण की पुष्टि के लिए हमसे संपर्क करें।</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
