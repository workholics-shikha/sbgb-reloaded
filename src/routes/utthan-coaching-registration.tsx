import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn , Send } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import sideImage from "@/assets/Login-green.png";
import { PageHero, SiteFooter  } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/utthan-coaching-registration")({
  head: () => ({
    meta: [
      { title: "SBGBT सदस्य लॉगिन करें | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT टीम से ईमेल, फोन या कार्यालय पते के माध्यम से जुड़ें। स्वयंसेवा, साझेदारी, मीडिया और कार्यक्रमों से जुड़े प्रश्न यहां भेजें।",
      },
      { property: "og:title", content: "संपर्क करें | SBGBT" },
      {
        property: "og:description",
        content:
          "स्वयंसेवा, साझेदारी, मीडिया या छात्रवृत्ति कार्यक्रमों के लिए SBGBT टीम से सीधे संपर्क करें।",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="SBGBT सदस्य लॉगिन करें" />

      <section className=" border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
            <div>
            <img
              src={sideImage}
              alt="SBGBT students and rural education"
              className="rounded-[2rem] "
            />
             
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-sm sm:p-8"
          >
            <h2 className="font-display text-2xl font-black sm:text-3xl">अपने एडमिन खाते में लॉगिन करें। </h2>
           
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
               
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">ईमेल</span>
                <input
                  required
                  type="email"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="you@example.com"
                />
              </label>
              
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">पासवर्ड<span>*</span></span>
                <input
                  type="password"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  placeholder="पासवर्ड"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
            >
              <LogIn className="size-4" /> लॉगिन करें 
            </button>

            {sent && (
              <p className="mt-4 text-sm font-semibold text-primary">
                लॉगिन सफल हुआ। आपको डैशबोर्ड पर भेजा जा रहा है...
              </p>
            )}
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
