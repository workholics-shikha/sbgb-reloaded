import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Send } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import sideImage from "@/assets/Login-green.png";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

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
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          {/* Form start from here */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6 rounded-3xl bg-card p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-primary">
              फॉर्म भरें
            </h2>

            <div className="grid gap-6 lg:grid-cols-3">

              {/* Coaching Institute */}
              <div>
                <label className="mb-2 block font-medium">
                  कोचिंग संस्था का नाम <span className="text-red-500">*</span>
                </label>

                <select
                  required
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                >
                  <option>संस्था चुनें</option>
                  <option>उत्थान कोचिंग संस्था - बाड़ी</option>
                  <option>उत्थान कोचिंग संस्था - इन्दौर</option>
                  <option>उत्थान कोचिंग संस्था - भोपाल</option>
                </select>
              </div>

              {/* Student Name */}
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

              {/* Gender */}
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

              {/* DOB */}
              <div>
                <label className="mb-2 block font-medium">
                  जन्म दिनांक <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              {/* Qualification */}
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

              {/* Mobile */}
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

              {/* Email */}
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

              {/* Student ID */}
              <div>
                <label className="mb-2 block font-medium">
                  विद्यार्थी का पहचान पत्र नं.
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="UID / DL / Ration Card"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              {/* Student ID Photo */}
              <div>
                <label className="mb-2 block font-medium">
                  पहचान पत्र का फोटो
                </label>

                <input
                  type="file"
                  className="block w-full rounded-full border bg-white px-4 py-2"
                />
              </div>

              {/* Father's Name */}
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

              {/* Father's ID */}
              <div>
                <label className="mb-2 block font-medium">
                  पिता का पहचान पत्र नं.
                </label>

                <input
                  type="text"
                  placeholder="UID / DL / Ration Card"
                  className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
                />
              </div>

              {/* Father's ID Photo */}
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
            {/* Category */}
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

            {/* Current Address */}
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

            {/* Permanent Address */}
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

            {/* State */}
            <div>
              <label className="mb-2 block font-medium">
                राज्य <span className="text-red-500">*</span>
              </label>

              <select
                required
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              >
                <option>राज्य चुनें</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Rajasthan</option>
                <option>Gujarat</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block font-medium">
                शहर <span className="text-red-500">*</span>
              </label>

              <select
                required
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              >
                <option>शहर चुनें</option>
                <option>Indore</option>
                <option>Bhopal</option>
                <option>Ujjain</option>
                <option>Dewas</option>
              </select>
            </div>

            {/* Course Name */}
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

            {/* Admission Date */}
            <div>
              <label className="mb-2 block font-medium">
                कोर्स प्रवेश तिथि <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* Admission Year */}
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

            {/* Course Duration */}
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

            {/* Student Photo */}
            <div>
              <label className="mb-2 block font-medium">
                विद्यार्थी का फोटो <span className="text-red-500">*</span>
              </label>

              <input
                type="file"
                className="block w-full rounded-full border bg-white px-4 py-2"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="mb-2 block font-medium">
                ब्लड ग्रुप
              </label>

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

            {/* Aadhaar Number */}
            <div>
              <label className="mb-2 block font-medium">
                आधार नंबर
              </label>

              <input
                type="text"
                maxLength={12}
                placeholder="आधार नंबर"
                className="w-full rounded-full border px-5 py-3 outline-none focus:border-primary"
              />
            </div>


            {/* Rules & Conditions */}
            <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-primary">
                नियम एवं शर्तें
              </h3>

              <ul className="list-disc space-y-3 pl-6 text-sm leading-7 text-gray-700">
                <li>
                  विद्यार्थी द्वारा दी गई सभी जानकारी सत्य एवं सही होना अनिवार्य है।
                </li>

                <li>
                  प्रवेश के समय आवश्यक दस्तावेजों की स्वप्रमाणित प्रतियाँ जमा करना अनिवार्य होगा।
                </li>

                <li>
                  संस्था द्वारा मांगे जाने पर मूल दस्तावेज प्रस्तुत करना आवश्यक होगा।
                </li>

                <li>
                  गलत जानकारी पाए जाने पर प्रवेश निरस्त किया जा सकता है।
                </li>

                <li>
                  संस्था के सभी नियमों एवं अनुशासन का पालन करना अनिवार्य होगा।
                </li>

                <li>
                  संस्था द्वारा निर्धारित समय पर कक्षाओं में उपस्थित रहना आवश्यक होगा।
                </li>

                <li>
                  संस्था का निर्णय अंतिम एवं सर्वमान्य होगा।
                </li>
              </ul>

              <label className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-5 w-5 accent-green-600"
                />

                <span className="text-sm leading-6">
                  मैं घोषणा करता/करती हूँ कि मेरे द्वारा दी गई सभी जानकारी सत्य एवं सही है।
                  मैंने संस्था के सभी नियम एवं शर्तें पढ़ ली हैं तथा मैं उनका पालन करने के
                  लिए सहमत हूँ।
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-primary px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                आवेदन सबमिट करें
              </button>
            </div>

            {/* Success Message */}
            {sent && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                <p className="font-semibold text-green-700">
                  ✅ आपका आवेदन सफलतापूर्वक जमा हो गया है।
                </p>

                <p className="mt-1 text-sm text-green-600">
                  हमारी टीम जल्द ही आपसे संपर्क करेगी।
                </p>
              </div>
            )}
          </form>
          {/* Form ends here */}

        </div>
      </section >

      <SiteFooter />
    </div >
  );
}
