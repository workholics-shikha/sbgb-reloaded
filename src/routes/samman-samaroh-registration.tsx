import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {  Send } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader"; 
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/samman-samaroh-registration")({
  head: () => ({
    meta: [
      { title: "प्रतिभाशाली विद्यार्थी- आवेदन फॉर्म | SBGBT" },
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
      <PageHero title="प्रतिभाशाली विद्यार्थी- आवेदन फॉर्म" />

      <section className=" border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.6fr]">

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-lg sm:p-8"
          >
            <h2 className="font-display text-3xl font-bold text-primary">
              प्रतिभाशाली विद्यार्थी- आवेदन फॉर्म
            </h2>

            <p className="mt-2 text-muted-foreground">
              Join hands with SBGBT to create a positive social impact.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">

              {/* 1. Name */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Name"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* 2. Father's Name */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Father's Name <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Father's Name"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* 3. Permanent Address */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Permanent Address <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Permanent Address"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Village / City */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Village / City <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Village / City"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Tehsil */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Tehsil <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Tehsil"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* District */}
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

              {/* Aadhaar */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Aadhaar Number <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Aadhaar Number"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Mobile */}
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

              {/* Email */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Email ID
                </span>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Academic Session */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Academic Session <span className="text-red-500">*</span>
                </span>
                <select
                  required
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                >
                  <option>Select Academic Session</option>
                  <option>2025-26</option>
                  <option>2026-27</option>
                </select>
              </label>

              {/* Class */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Class / Course / Degree <span className="text-red-500">*</span>
                </span>
                <select
                  required
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                >
                  <option>Choose</option>
                  <option>10th</option>
                  <option>12th</option>
                  <option>UG</option>
                  <option>PG</option>
                </select>
              </label>

              {/* Marks */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Marks Percentage % <span className="text-red-500">*</span>
                </span>
                <input
                  type="number"
                  placeholder="Enter Marks Percentage"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Roll Number */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Roll Number <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Roll Number"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Board */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Board / University <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter Board / University"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* School */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Name of School / Institution
                </span>
                <input
                  type="text"
                  placeholder="Enter School / Institution"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* School Address */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  School / Institution Address
                </span>
                <input
                  type="text"
                  placeholder="Enter School Address"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Current Study */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Current Study Details
                </span>
                <input
                  type="text"
                  placeholder="Enter Current Study Details"
                  className="w-full rounded-full border border-border px-5 py-3 outline-none focus:border-primary"
                />
              </label>

              {/* Upload */}
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Upload Original Marksheet / Result Document{" "}
                  <span className="text-red-500">*</span>
                </span>
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full rounded-full border border-border px-4 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Max File Size: 1 MB
                </p>
              </label>

            </div>

               <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-primary">
                स्व-प्रमाणित घोषणा-पत्र:-<span>*</span>
              </h3>
  
              <label className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-5 w-5 accent-green-600"
                />

                <span className="text-sm leading-6">
                  मैं यह प्रमाणित करते हुए घोषणा करता / करती हूँ कि आवेदन पत्र में दिए गए विवरण एवं तथ्य मेरी व्यक्तिगत जानकारी और विश्वास में सही और सत्य हैं। मैं आवेदन में गलत विवरणों / तथ्यों को देने के परिणामों से भली-भांति अवगत हूँ। यदि आवेदन पत्र में दिया गया विवरण मिथ्या या असत्य पाया जाता है तो संस्था को मेरा आवेदन निरस्त करने का पूर्ण अधिकार है; जिसके लिए मैं स्वयं जिम्मेदार रहूँगा / रहूँगी।
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-white font-semibold shadow-lg transition hover:scale-[1.02]"
            >
              <Send className="h-5 w-5" />
              Submit Request
            </button>

            {sent && (
              <p className="mt-4 text-center text-green-600 font-medium">
                ✅ Thank you! Your प्रतिभाशाली विद्यार्थी- आवेदन फॉर्म request has been submitted successfully.
              </p>
            )}
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
