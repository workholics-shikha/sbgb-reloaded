import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, GraduationCap, HandHeart, HeartPulse, Landmark, Sprout, Users2, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, PageHero } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate to SBGBT — Fund rural change" },
      { name: "description", content: "Support Soch Badlo Gaon Badlo Team. Sponsor a scholarship, plant a forest, fund a health camp — 100% field-deployed." },
      { property: "og:title", content: "Donate — Soch Badlo, Gaon Badlo" },
      { property: "og:description", content: "Your contribution builds a classroom, plants a forest, saves a life." },
    ],
  }),
  component: Donate,
});

const amounts = [500, 1500, 5000, 15000];
const causes = [
  { icon: GraduationCap, k: "education", label: "SPGBP Scholarship" },
  { icon: Sprout, k: "environment", label: "Green Village" },
  { icon: HeartPulse, k: "health", label: "Health Camp" },
  { icon: Users2, k: "women", label: "Women SHG" },
  { icon: Landmark, k: "smart", label: "Smart Village" },
  { icon: Building2, k: "utthan", label: "Utthan Bhavan" },
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
        eyebrow="Join the movement"
        title="Your contribution builds a classroom, plants a forest, saves a life."
        hi="दान करें · SBGBT सदस्य बनें"
        sub="100% of donations are field-deployed. SBGBT is a registered non-profit — donations are eligible for tax exemption under Section 80G."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-10">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-2xl sm:text-3xl font-black">Make a contribution</h2>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Frequency</div>
            <div className="inline-flex rounded-full border border-border bg-background p-1">
              {(["once","monthly"] as const).map(f => (
                <button key={f} onClick={()=>setFreq(f)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${freq===f ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
                  {f === "once" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Amount (INR)</div>
            <div className="grid grid-cols-4 gap-2">
              {amounts.map(a => (
                <button key={a} onClick={()=>{setAmount(a); setCustom("");}}
                  className={`rounded-xl border px-3 py-3 font-display font-black text-lg transition ${
                    !custom && amount===a ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40"
                  }`}>
                  ₹{a.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <input
              value={custom}
              onChange={(e)=>setCustom(e.target.value.replace(/[^0-9]/g,""))}
              placeholder="Or enter custom amount"
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              inputMode="numeric"
            />
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Direct to</div>
            <div className="grid sm:grid-cols-3 gap-2">
              {causes.map(c => (
                <button key={c.k} onClick={()=>setCause(c.k)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition text-left ${
                    cause===c.k ? "bg-accent/20 border-accent text-earth" : "bg-background border-border hover:border-primary/40"
                  }`}>
                  <c.icon className="size-4"/> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-secondary/60 border border-border p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-muted-foreground">You are contributing</div>
              <div className="font-display text-2xl font-black">₹{(final || 0).toLocaleString("en-IN")} <span className="text-sm font-sans text-muted-foreground">{freq === "monthly" ? "/ month" : "one-time"}</span></div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-bold hover:brightness-110 transition shadow-lg">
              <HandHeart className="size-4"/> Donate now
            </button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Payments are processed via secure gateway. You'll receive an 80G-eligible receipt by email.
          </p>
        </div>

        {/* Right column: impact + membership */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-leaf text-primary-foreground p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 grain-bg"/>
            <div className="relative">
              <div className="text-xs uppercase tracking-widest opacity-80">Your impact</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3"><BadgeCheck className="size-5 shrink-0 mt-0.5 text-accent"/><span><b>₹500</b> — one child's stationery for a full year at Utthan Library.</span></li>
                <li className="flex gap-3"><BadgeCheck className="size-5 shrink-0 mt-0.5 text-accent"/><span><b>₹1,500</b> — 30 saplings planted &amp; nurtured under the Green Village drive.</span></li>
                <li className="flex gap-3"><BadgeCheck className="size-5 shrink-0 mt-0.5 text-accent"/><span><b>₹5,000</b> — one full SPGBP scholarship for a rural student.</span></li>
                <li className="flex gap-3"><BadgeCheck className="size-5 shrink-0 mt-0.5 text-accent"/><span><b>₹15,000</b> — a village health camp for 200+ beneficiaries.</span></li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Become a member</div>
            <h3 className="mt-2 font-display text-2xl font-black">SBGBT सदस्य बनें</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Members receive quarterly field reports, invitations to annual events, and voting rights in the general body meeting.
            </p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary text-primary px-5 py-2.5 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition">
              Membership enquiry
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Bank transfer</div>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1.5 font-mono">
              <li>A/c Name: Soch Badlo Gaon Badlo Team</li>
              <li>A/c No.: XXXX XXXX XXXX</li>
              <li>IFSC: XXXX0000000</li>
              <li>UPI: sbgbteam@upi</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Contact us to confirm updated bank details before transfer.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
