import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Landmark,
  Sprout,
  Users2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "दान करें | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT के शिक्षा, पर्यावरण, महिला सशक्तिकरण और जन स्वास्थ्य अभियानों को सहयोग दें। आपका योगदान गांवों में वास्तविक बदलाव ला सकता है।",
      },
      { property: "og:title", content: "दान करें | SBGBT" },
      {
        property: "og:description",
        content:
          "आपका सहयोग एक छात्रवृत्ति, एक पौधारोपण अभियान या एक स्वास्थ्य शिविर को संभव बना सकता है।",
      },
    ],
  }),
  component: Donate,
});

const amounts = [500, 1500, 5000, 15000];

const causes = [
  { icon: GraduationCap, k: "education", label: "SPGBP छात्रवृत्ति" },
  { icon: Sprout, k: "environment", label: "ग्रीन विलेज अभियान" },
  { icon: HeartPulse, k: "health", label: "स्वास्थ्य शिविर" },
  { icon: Users2, k: "women", label: "महिला समूह सशक्तिकरण" },
  { icon: Landmark, k: "smart", label: "स्मार्ट विलेज पहल" },
  { icon: Building2, k: "utthan", label: "उत्थान भवन" },
] as const;

function Donate() {
  const [amount, setAmount] = useState<number>(1500);
  const [custom, setCustom] = useState("");
  const [cause, setCause] = useState<string>("education");
  const [freq, setFreq] = useState<"once" | "monthly">("once");

  const final = custom ? Number(custom) : amount;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="दान करें" />

      <section className="festive-band border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_1fr]">
          <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-black sm:text-3xl">अपना सहयोग चुनें</h2>

            <div className="mt-6">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">आवृत्ति</div>
              <div className="inline-flex rounded-full border border-border bg-background p-1">
                {(["once", "monthly"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFreq(item)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      freq === item ? "bg-primary text-primary-foreground" : "text-foreground/70"
                    }`}
                  >
                    {item === "once" ? "एक बार" : "मासिक"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                राशि (INR)
              </div>
              <div className="grid grid-cols-4 gap-2">
                {amounts.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setAmount(item);
                      setCustom("");
                    }}
                    className={`rounded-xl border px-3 py-3 font-display text-lg font-black transition ${
                      !custom && amount === item
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    ₹{item.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <input
                value={custom}
                onChange={(event) => setCustom(event.target.value.replace(/[^0-9]/g, ""))}
                placeholder="या अपनी राशि दर्ज करें"
                className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                inputMode="numeric"
              />
            </div>

            <div className="mt-6">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                यह सहयोग किस पहल के लिए है
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {causes.map((item) => (
                  <button
                    key={item.k}
                    onClick={() => setCause(item.k)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                      cause === item.k
                        ? "border-accent bg-accent/20 text-earth"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <item.icon className="size-4" /> {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-4">
              <div>
                <div className="text-xs text-muted-foreground">आपका चयनित योगदान</div>
                <div className="font-display text-2xl font-black">
                  ₹{(final || 0).toLocaleString("en-IN")}{" "}
                  <span className="text-sm font-sans text-muted-foreground">
                    {freq === "monthly" ? "/ माह" : "एक बार"}
                  </span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:brightness-110">
                <HandHeart className="size-4" /> अभी दान करें
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              भुगतान सुरक्षित माध्यम से किया जाएगा। आपके पंजीकृत ईमेल पर रसीद भेजी जाएगी।
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-leaf p-6 text-primary-foreground shadow-sm sm:p-8">
              <div className="absolute inset-0 opacity-30 grain-bg" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest opacity-80">आपके सहयोग का असर</div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex gap-3">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span>
                      <b>₹500</b> – उत्थान लाइब्रेरी में एक विद्यार्थी की अध्ययन सामग्री।
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span>
                      <b>₹1,500</b> – ग्रीन विलेज अभियान के अंतर्गत 30 पौधों का रोपण और देखभाल।
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span>
                      <b>₹5,000</b> – एक ग्रामीण विद्यार्थी के लिए पूर्ण SPGBP छात्रवृत्ति सहयोग।
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span>
                      <b>₹15,000</b> – 200+ लाभार्थियों के लिए एक सामुदायिक स्वास्थ्य शिविर।
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-sm sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">सदस्य बनें</div>
              <h3 className="mt-2 font-display text-2xl font-black">SBGBT परिवार से जुड़ें</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                सदस्यों को समय-समय पर फील्ड रिपोर्ट, वार्षिक कार्यक्रमों के आमंत्रण और सामान्य सभा में भागीदारी का अवसर मिलता है।
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                सदस्यता की जानकारी लें
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-sm sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">बैंक ट्रांसफर</div>
              <ul className="mt-3 space-y-1.5 font-mono text-sm text-muted-foreground">
                <li>खाता नाम: Soch Badlo Gaon Badlo Team</li>
                <li>खाता संख्या: XXXX XXXX XXXX</li>
                <li>IFSC: XXXX0000000</li>
                <li>UPI: sbgbteam@upi</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                बैंक ट्रांसफर से पहले अद्यतन बैंक विवरण की पुष्टि के लिए हमारी टीम से संपर्क करें।
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
