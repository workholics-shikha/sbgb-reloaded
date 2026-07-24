import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Send } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import sideImage from "@/assets/Login-green.png";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/csr-partnership")({
  head: () => ({
    meta: [
      { title: "CSR Partnership | SBGBT" },
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
      <PageHero title="CSR Partnership" />

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
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-lg sm:p-8"
          >
            <h2 className="font-display text-3xl font-bold text-primary">
              CSR Partnership
            </h2>

            <p className="mt-2 text-muted-foreground">
              Join hands with SBGBT to create a positive social impact.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <label>
                <span className="mb-2 block text-sm font-medium">
                  Company Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Company Name"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  Concern Person <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Contact Person"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  Mobile Number <span className="text-red-500">*</span>
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Enter Mobile Number"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  E-Mail ID <span className="text-red-500">*</span>
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter Email ID"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  City <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter City"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  Tehsil / Block <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Tehsil / Block"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  District <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter District"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  State <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter State"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-medium">
                  Address
                </span>
                <textarea
                  rows={4}
                  placeholder="Enter Office Address"
                  className="w-full rounded-3xl border border-border px-5 py-3 outline-none focus:border-primary resize-none"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-medium">
                  About Partnership
                </span>
                <textarea
                  rows={5}
                  placeholder="Tell us how you would like to collaborate with SBGBT..."
                  className="w-full rounded-3xl border border-border px-5 py-3 outline-none focus:border-primary resize-none"
                />
              </label>

            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-white font-semibold shadow-lg transition hover:scale-[1.02]"
            >
              <Send className="h-5 w-5" />
              Submit Partnership Request
            </button>

            {sent && (
              <p className="mt-4 text-center text-green-600 font-medium">
                ✅ Thank you! Your CSR partnership request has been submitted successfully.
              </p>
            )}
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
