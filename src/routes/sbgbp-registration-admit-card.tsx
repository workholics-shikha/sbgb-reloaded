import { createFileRoute } from "@tanstack/react-router";
import { Search, Download } from "lucide-react";
import { useState } from "react";

import ecoNeedsLogo from "@/assets/econeeds-logo.png";
import sbgbLogo from "@/assets/sbgb-logo.png";
import workholicsLogo from "@/assets/workholicslogo.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/sbgbp-registration-admit-card")({
  head: () => ({
    meta: [
      { title: "SPGBP Admit Card | SBGBT" },
      {
        name: "description",
        content:
          "शिक्षा पाओ ज्ञान बढ़ाओ प्रतियोगिता के लिए विद्यार्थी अपने रजिस्ट्रेशन नंबर से एडमिट कार्ड खोज और डाउनलोड कर सकते हैं।",
      },
    ],
  }),
  component: SbgbpRegistrationAdmitCardPage,
});

function SbgbpRegistrationAdmitCardPage() {
  const [registrationNo, setRegistrationNo] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!registrationNo.trim()) {
      setMessage("कृपया रजिस्ट्रेशन नंबर दर्ज करें।");
      return;
    }

    setMessage("एडमिट कार्ड खोज सुविधा का backend integration अभी बाकी है।");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="bg-[linear-gradient(180deg,#d9f8ff_0%,#d8f6fb_42%,#ffffff_100%)]">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6">
          <div className="flex justify-center">
            <div className="rounded-full border border-primary/15 bg-white p-3 shadow-lg">
              <img src={sbgbLogo} alt="SBGBT" className="h-24 w-24 rounded-full object-contain" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="font-display text-3xl font-black text-earth sm:text-4xl">
              शिक्षा पाओ ज्ञान बढ़ाओ प्रतियोगिता - Admit Card
            </h1>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 max-w-2xl rounded-[2rem] bg-white/70 px-6 py-8 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.28)] backdrop-blur"
            >
              <label className="block text-base font-medium text-foreground">
                Student Registration No.<span className="text-red-500">*</span>
              </label>

              <div className="mt-4 flex flex-col items-center gap-5">
                <input
                  type="text"
                  value={registrationNo}
                  onChange={(event) => {
                    setRegistrationNo(event.target.value);
                    if (message) setMessage("");
                  }}
                  placeholder="Registration No"
                  className="w-full rounded-full border border-white bg-white px-6 py-4 text-center text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-earth px-10 py-3 text-sm font-bold text-white shadow-[0_16px_24px_-16px_rgba(126,71,8,0.9)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  <Search className="h-4 w-4" />
                  Submit
                </button>
              </div>

              {message ? (
                <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-primary">
                  {message}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[linear-gradient(180deg,#d8f8ff_0%,#ecfcff_100%)] px-6 py-10 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.22)]">
          <h2 className="text-center font-display text-3xl font-black text-earth">हमारे समर्थक</h2>

          <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <div className="flex justify-center rounded-[1.5rem] bg-white/70 p-6">
              <img src={ecoNeedsLogo} alt="Eco Needs Foundation" className="h-16 w-auto object-contain sm:h-20" />
            </div>
            <div className="flex justify-center rounded-[1.5rem] bg-white/70 p-6">
              <img src={workholicsLogo} alt="Workholics" className="h-14 w-auto object-contain sm:h-16" />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-muted-foreground"
            >
              <Download className="h-4 w-4" />
              Admit Card Download backend pending
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
