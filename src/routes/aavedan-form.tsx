import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, HandCoins } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";
import qrCode from "@/assets/qr-code.png";

export const Route = createFileRoute("/aavedan-form")({
  head: () => ({
    meta: [
      { title: "हमसे जुड़ने के लिए फॉर्म भरें | SBGBT" },
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
      <PageHero title="हमसे जुड़ने के लिए फॉर्म भरें" />

      <section className="pt-6 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-sky-50 via-cyan-50 to-sky-100 shadow-md">

            <div className="grid items-center gap-8 p-8 lg:grid-cols-[140px_1fr_300px]">

              {/* Left Icon */}

              <div className="flex justify-center">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-md">
                  <HandCoins
                    className="h-20 w-20 text-primary"
                  />
                </div>
              </div>

              {/* Center */}

              <div>

                <p className="text-xl font-semibold leading-relaxed text-foreground">
                  इस QR कोड को स्कैन करके आप SBGBT सदस्यता शुल्क जमा कर सकते हैं।
                  इसकी प्रति (स्क्रीनशॉट) रजिस्ट्रेशन करते समय अपलोड करें।
                </p>

                <div className="mt-6 space-y-3">

                  <p className="text-3xl font-bold text-primary">
                    Bank Name - ICICI Bank
                  </p>

                  <p className="text-3xl font-bold text-primary">
                    Bank Account - 720801001079
                  </p>

                  <p className="text-3xl font-bold text-primary">
                    IFSC Code - ICIC0007208
                  </p>

                </div>

              </div>

              {/* QR */}

              <div className="flex justify-center lg:justify-end">

                <div className="rounded-3xl bg-white p-3 shadow-xl">

                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="h-72 w-72 rounded-2xl object-cover"
                  />

                  <p className="mt-3 text-center text-lg font-bold">
                    UPI ID : 9314408609@icici
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

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
              हमसे जुड़ने के लिए फॉर्म भरें
            </h2>

            <p className="mt-2 text-muted-foreground">
              कृपया नीचे दिए गए सभी आवश्यक विवरण भरकर सदस्यता हेतु आवेदन करें।
            </p>

            <div className="grid mt-8 gap-5 md:grid-cols-2 xl:grid-cols-4">

              {/* form fields */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  पहला नाम <span className="text-red-500">*</span>
                </span>

                <input
                  required
                  placeholder="पहला नाम"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Middle Name */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  मध्य नाम
                </span>

                <input
                  placeholder="मध्य नाम"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Surname */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  उपनाम
                </span>

                <input
                  placeholder="उपनाम"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Gender */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  लिंग
                </span>

                <select className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary">

                  <option>चुनें</option>
                  <option>पुरुष</option>
                  <option>महिला</option>
                  <option>अन्य</option>

                </select>
              </label>
              {/* Tehsil */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  तहसील
                </span>

                <input
                  placeholder="तहसील"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Blood Group */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  ब्लड ग्रुप
                </span>

                <select className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary">

                  <option>Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>

                </select>
              </label>
              {/* Father / Husband Name */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  पिता / पति का नाम
                </span>

                <input
                  placeholder="पिता / पति का नाम"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Age */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  उम्र
                </span>

                <input
                  type="number"
                  placeholder="उम्र"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Date of Birth */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  जन्म तिथि
                </span>

                <input
                  type="date"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Qualification */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  योग्यता
                </span>

                <input
                  placeholder="योग्यता"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Occupation */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  व्यवसाय
                </span>

                <input
                  placeholder="व्यवसाय"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Permanent Address */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  स्थायी पता
                </span>

                <input
                  placeholder="स्थायी पता"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Correspondence Address */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  पत्राचार हेतु पता
                </span>

                <input
                  placeholder="पत्राचार हेतु पता"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Home / Office Phone */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  आवास / कार्यालय फोन
                </span>

                <input
                  placeholder="फोन नंबर"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Aadhaar */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  आधार नंबर
                </span>

                <input
                  placeholder="आधार नंबर"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Mobile */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  मोबाइल नंबर
                </span>

                <input
                  placeholder="मोबाइल नंबर"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Family Mobile */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  परिजन मोबाइल नंबर
                </span>

                <input
                  placeholder="परिजन मोबाइल नंबर"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Email */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  ईमेल आईडी
                </span>

                <input
                  type="email"
                  placeholder="ईमेल आईडी"
                  className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                />
              </label>
              {/* Upload Photo */}
              <label>
                <span className="mb-1 block text-sm text-muted-foreground">
                  फोटो
                </span>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="block w-full rounded-xl border border-border file:mr-4 file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
                />
              </label>
            </div>
            {/* form fields */}

            {/* ================= Membership ================= */}
            <div className="mt-10 rounded-[2rem] border border-border bg-card p-8 shadow-sm">

              <section className="mt-6">

                <h2 className="text-3xl font-black text-foreground"> सदस्यता का स्वरूप और सदस्यता राशि का विवरण </h2>
                <p className="mt-2 text-lg font-semibold text-red-600">
                  सदस्यता की श्रेणी (जो भी लागू हो टिक करें) <span className="text-red-500">*</span>
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2 max-w-3xl">

                  {/* Lifetime Membership */}
                  <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-border p-6 hover:border-primary hover:shadow-md">
                    <input
                      type="radio"
                      name="membership"
                      value="lifetime"
                      defaultChecked
                      className="h-5 w-5 accent-primary"
                    />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        आजीवन सदस्य
                      </p>

                      <h3 className="text-3xl font-bold text-primary">
                        ₹51,000
                      </h3>
                    </div>
                  </label>

                  {/* Annual Membership */}
                  <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-border p-6 hover:border-primary hover:shadow-md">
                    <input
                      type="radio"
                      name="membership"
                      value="annual"
                      className="h-5 w-5 accent-primary"
                    />

                    <div>
                      <p className="text-sm text-muted-foreground">
                        वार्षिक सदस्य
                      </p>

                      <h3 className="text-3xl font-bold text-primary">
                        ₹11,000
                      </h3>
                    </div>
                  </label>

                </div>

              </section>

              {/* ================= Payment ================= */}

              <div className="bg-card">
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  <label>
                    <span className="mb-2 block text-sm">
                      भुगतान की दिनांक
                    </span>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-border px-4 py-3"
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm"> भुगतान का माध्यम </span>

                    <select className="w-full rounded-xl border border-border px-4 py-3">
                      <option>चुनें</option>
                      <option>Cash</option>
                      <option>UPI</option>
                      <option>Cheque</option>
                      <option>RTGS</option>
                      <option>NEFT</option>
                      <option>Online</option>
                    </select>
                  </label>
                  <label>

                    <span className="mb-2 block text-sm"> बैंक का नाम </span>
                    <input
                      placeholder="Bank Name"
                      className="w-full rounded-xl border border-border px-4 py-3"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-sm"> Transaction ID </span>
                    <input
                      placeholder="Transaction ID"
                      className="w-full rounded-xl border border-border px-4 py-3"
                    />

                  </label>
                </div>
              </div>

              <div className="bg-card">
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm"> चेक / RTGS / NEFT / UPI Transaction Number </span>
                    <input
                      placeholder="Reference Number"
                      className="w-full rounded-xl border border-border px-4 py-3"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-sm"> भुगतान रसीद अपलोड करें </span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="block w-full rounded-xl border border-border file:mr-4 file:border-0 file:bg-primary file:px-5 file:py-2 file:text-white"
                    />
                  </label>
                </div>
              </div>

              {/* ================= Declaration ================= */}
              <section className="mt-2">
                <div className="bg-card">
                  <div className="mt-8 rounded-2xl bg-primary/5 p-6 leading-8">
                    <p>
                      योगदान कैसे करें: उपरोक्त श्रेणियों में से किसी एक श्रेणी में सदस्य बनने के इच्छुक व्यक्ति उपर्युक्त फॉर्म को भरें I एक नवीनतम फोटोग्राफ (पासपोर्ट आकार का) फॉर्म के साथ संलग्न (अपलोड) करें और वांछित श्रेणी के लिए निर्धारित सदस्यता राशि का चेक/डी डी या ऑनलाइन माध्यम भुगतान करें और आवेदन फॉर्म के साथ उसका विवरण संलग्न (अपलोड) करें। चेक/डी डी से भुगतान करने हेतु चेक/डी डी "सोच बदलो गाँव बदलो संस्था, बाड़ी; कार्यालय - गली नं॰ 5, हौद बाड़ी, जिला – धौलपुर, राजस्थान – 328021" के पक्ष में तैयार करें ।
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-black mt-6"> घोषणा </h2>
                <div className="mt-2 rounded-3xl border border-border bg-card p-8 leading-8">
                  <p> मैं घोषणा करता / करती हूँ कि इस आवेदन पत्र में मेरे द्वारा दी गई समस्त जानकारी मेरे ज्ञान एवं विश्वास के अनुसार सत्य एवं सही है। </p>
                  <p className="mt-2"> यदि मेरे द्वारा दी गई कोई भी जानकारी असत्य अथवा भ्रामक पाई जाती है, तो संस्था द्वारा मेरी सदस्यता निरस्त की जा सकती है। </p>
                  <p className="mt-2"> मैं संस्था के संविधान, नियमों एवं शर्तों का पालन करने हेतु सहमत हूँ। </p>
                </div>

                <div className="mt-6">
                  <label className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-5 w-5 accent-primary" />
                    <span className="leading-7">
                      मैं घोषणा करता / करती हूँ कि ऊपर दी गई समस्त जानकारी मेरे ज्ञान एवं विश्वास के अनुसार सत्य है।
                    </span>
                  </label>
                </div>
              </section>

              {/* ================= Terms ================= */}

              <section className="mt-16">

                <h2 className="text-3xl font-black"> संस्था की सदस्यता हेतु आवश्यक नियम एवं शर्तें </h2>
                <ol className="mt-8 list-decimal space-y-4 pl-6 leading-8 text-muted-foreground">
                  <li> संस्था के सभी सदस्य संस्था के संविधान, नियम एवं उपनियमों का पालन करेंगे। </li>
                  <li> सदस्यता शुल्क वापस नहीं किया जाएगा। </li>
                  <li> सदस्य संस्था की प्रतिष्ठा बनाए रखने हेतु उत्तरदायी होगा। </li>
                  <li> संस्था द्वारा लिए गए निर्णय सभी सदस्यों के लिए मान्य होंगे। </li>
                  <li> संस्था समाज सेवा एवं ग्रामीण विकास के उद्देश्य से कार्य करेगी। </li>
                  <li> सदस्य संस्था की किसी भी अवैधानिक गतिविधि में सम्मिलित नहीं होगा। </li>
                  <li> संस्था को सदस्यता निरस्त करने का अधिकार सुरक्षित रहेगा। </li>
                  <li> सदस्य संस्था की गोपनीय जानकारी का दुरुपयोग नहीं करेगा। </li>
                  <li> सभी विवाद संस्था के नियमों के अनुसार निपटाए जाएंगे। </li>
                  <li> आवेदन जमा करने का अर्थ है कि आवेदक सभी नियमों एवं शर्तों से सहमत है। </li>
                </ol>
              </section>

              {/* ================= Submit ================= */}
            </div>

            <button type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-white font-semibold shadow-lg transition hover:scale-[1.02]"
            > <Send className="h-5 w-5" /> Submit Request </button>

            {sent && (
              <p className="mt-4 text-center text-green-600 font-medium">
                ✅ Thank you! Your प्रतिभाशाली विद्यार्थी- आवेदन फॉर्म request has been submitted successfully.
              </p>
            )}
          </form>
        </div>
      </section>

      <SiteFooter />
    </div >
  );
}
