import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

const coachingOrganizations = [
  "उत्थान कोचिंग संस्थान - सरमथुरा",
  "उत्थान कोचिंग संस्थान - बाड़ी",
  "उत्थान कोचिंग संस्थान - नादौती",
  "उत्थान कोचिंग संस्थान - करौली",
] as const;

export const Route = createFileRoute("/utthan-coaching-registration")({
  validateSearch: z.object({
    organization: z.enum(coachingOrganizations).optional(),
  }),
  head: () => ({
    meta: [
      { title: "उत्थान कोचिंग रजिस्ट्रेशन | SBGBT" },
      {
        name: "description",
        content:
          "उत्थान कोचिंग संस्थान में विद्यार्थी पंजीकरण के लिए आवेदन फॉर्म।",
      },
      { property: "og:title", content: "उत्थान कोचिंग रजिस्ट्रेशन | SBGBT" },
      {
        property: "og:description",
        content:
          "उत्थान कोचिंग संस्थान के लिए विद्यार्थी आवेदन, संस्था चयन और पंजीकरण विवरण।",
      },
    ],
  }),
  component: UtthanCoachingRegistrationPage,
});

function UtthanCoachingRegistrationPage() {
  const [sent, setSent] = useState(false);
  const search = Route.useSearch();
  const [selectedOrganization, setSelectedOrganization] = useState(
    search.organization ?? "",
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="उत्थान कोचिंग रजिस्ट्रेशन" />

      <section className="border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6 rounded-3xl bg-card p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-primary">फॉर्म भरें</h2>

            <div className="grid gap-6 lg:grid-cols-3">
              <div>
                <label className="mb-2 block font-medium">
                  कोचिंग संस्था का नाम <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  value={selectedOrganization}
                  onChange={(event) => setSelectedOrganization(event.target.value)}
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                >
                  <option value="">संस्था चुनें</option>
                  {coachingOrganizations.map((organization) => (
                    <option key={organization} value={organization}>
                      {organization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  विद्यार्थी का नाम <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="नाम"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  लिंग <span className="text-red-500">*</span>
                </label>

                <div className="mt-3 flex gap-8">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" />
                    पुरुष
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" />
                    महिला
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  जन्म दिनांक <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  योग्यता <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="योग्यता"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  मोबाइल <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  placeholder="मोबाइल"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  ई-मेल आईडी <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  placeholder="ईमेल आईडी"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  विद्यार्थी का पहचान पत्र नं. <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="UID / DL / Ration Card"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">पहचान पत्र का फोटो</label>

                <input
                  type="file"
                  className="block w-full rounded-full border bg-white px-4 py-2"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  पिता का नाम <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="पिता का नाम"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">पिता का पहचान पत्र नं.</label>

                <input
                  type="text"
                  placeholder="UID / DL / Ration Card"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  पिता के पहचान पत्र का फोटो
                </label>

                <input
                  type="file"
                  className="block w-full rounded-full border bg-white px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                वर्ग (Category) <span className="text-red-500">*</span>
              </label>

              <select
                required
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              >
                <option>वर्ग चुनें</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>EWS</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                वर्तमान पता <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="वर्तमान पता"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                स्थायी पता <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="स्थायी पता"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                राज्य <span className="text-red-500">*</span>
              </label>

              <select
                required
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              >
                <option>राज्य चुनें</option>
                <option>Rajasthan</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Gujarat</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                शहर <span className="text-red-500">*</span>
              </label>

              <select
                required
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              >
                <option>शहर चुनें</option>
                <option>करौली</option>
                <option>धौलपुर</option>
                <option>नादौती</option>
                <option>बाड़ी</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                कोर्स का नाम <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="कोर्स का नाम"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                कोर्स प्रवेश तिथि <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                कोर्स प्रवेश का वर्ष <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                placeholder="2026"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                कोर्स अवधि <span className="text-red-500">*</span>
              </label>

              <select
                required
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              >
                <option>कोर्स अवधि</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
                <option>2 Years</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                विद्यार्थी का फोटो <span className="text-red-500">*</span>
              </label>

              <input
                type="file"
                className="block w-full rounded-full border bg-white px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">ब्लड ग्रुप</label>

              <select className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary">
                <option>ब्लड ग्रुप चुनें</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">आधार नंबर</label>

              <input
                type="text"
                maxLength={12}
                placeholder="आधार नंबर"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-primary">नियम एवं शर्तें</h3>

              <ul className="list-disc space-y-3 pl-6 text-sm leading-7 text-gray-700">
                <li>विद्यार्थी द्वारा दी गई सभी जानकारी सत्य एवं सही होना अनिवार्य है।</li>
                <li>
                  प्रवेश के समय आवश्यक दस्तावेजों की स्वप्रमाणित प्रतियां जमा करना अनिवार्य
                  होगा।
                </li>
                <li>
                  संस्था द्वारा मांगे जाने पर मूल दस्तावेज प्रस्तुत करना आवश्यक होगा।
                </li>
                <li>गलत जानकारी पाए जाने पर प्रवेश निरस्त किया जा सकता है।</li>
                <li>
                  संस्था के सभी नियमों एवं अनुशासन का पालन करना अनिवार्य होगा।
                </li>
                <li>
                  संस्था द्वारा निर्धारित समय पर कक्षाओं में उपस्थित रहना आवश्यक होगा।
                </li>
                <li>संस्था का निर्णय अंतिम एवं सर्वमान्य होगा।</li>
              </ul>

              <label className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-5 w-5 accent-green-600"
                />

                <span className="text-sm leading-6">
                  मैं घोषणा करता/करती हूं कि मेरे द्वारा दी गई सभी जानकारी सत्य एवं सही है।
                  मैंने संस्था के सभी नियम एवं शर्तें पढ़ ली हैं तथा मैं उनका पालन करने के लिए
                  सहमत हूं।
                </span>
              </label>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-primary px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                आवेदन सबमिट करें
              </button>
            </div>

            {sent && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                <p className="font-semibold text-green-700">
                  आपका आवेदन सफलतापूर्वक जमा हो गया है।
                </p>

                <p className="mt-1 text-sm text-green-600">
                  हमारी टीम जल्द ही आपसे संपर्क करेगी।
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
