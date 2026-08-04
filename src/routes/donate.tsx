import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  HandCoins,
  Building2,
  CalendarDays,
  GraduationCap,
  HandHeart,
  HeartPulse,
  Landmark,
  Sprout,
  Users2,
} from "lucide-react";

import qrCode from "@/assets/qr-code.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CTASection, PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "दान करें | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT की शिक्षा, पर्यावरण, महिला सशक्तिकरण और जन स्वास्थ्य पहलों को सहयोग दें। आपका योगदान गांवों में वास्तविक बदलाव ला सकता है।",
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


function Donate() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f0de] text-[#1f1a14]">
      <SiteHeader />
      <PageHero title="दान करें" />

      <section className="pb-16 pt-8 sm:pb-20">
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
                  <p className="text-3xl font-bold text-primary"> Bank Name - ICICI Bank </p>
                  <p className="text-3xl font-bold text-primary"> Bank Account - 720801001079 </p>
                  <p className="text-3xl font-bold text-primary"> IFSC Code - ICIC0007208 </p>
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

          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.6fr]">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
              className="rounded-[2rem] border border-border bg-card/95 p-6 shadow-lg sm:p-8"
            >
              <h2 className="font-display text-3xl font-bold text-primary">दान करें</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    दानदाता का पूरा नाम (Name of Donor)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="दानदाता का पूरा नाम"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    मोबाइल नंबर (Mobile number)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    placeholder="मोबाइल नंबर"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    मेल ID<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    placeholder="Mail ID"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    गाँव या शहर (Village/City)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="गाँव या शहर (Village/City)"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    तहसील (Tehsil)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="तहसील (Tehsil)"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    जिला (District)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="जिला (District)"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    राज्य (State)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="राज्य (State)"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    Mode of Payment (भुगतान का माध्यम)
                  </span>
                  <select className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary">
                    <option>Select Mode of Payment</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>NEFT / RTGS</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    दान की राशि (Amount of Donation)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    inputMode="numeric"
                    placeholder="दान की राशि (Amount of Donation)"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    दान की दिनांक (Date of Donation)<span className="text-red-500">*</span>
                  </span>
                  <div className="relative">
                    <input
                      required
                      type="date"
                      className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                    />
                    <CalendarDays className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 text-[#343434]" />
                  </div>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    दान का उद्देश्य (Purpose of donation)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="दान का उद्देश्य (Purpose of donation)"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    पहचान पत्र - (Donor Aadhar or PAN Id)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    placeholder="पहचान पत्र - (Donor Aadhar or PAN Id)"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-3 block text-[1.05rem] font-medium text-[#1a202c]">
                    भुगतान रसीद (Payment Receipt)<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    type="file"
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a6b43] px-7 py-3 text-base font-bold text-white transition hover:brightness-105"
                >
                  <HandHeart className="size-4" />
                  फॉर्म सबमिट करें
                </button>
                {sent ? <span className="text-sm font-medium text-[#0a6b43]">फॉर्म सफलतापूर्वक जमा हो गया।</span> : null}
              </div>
            </form>
          </div>
        </div>
      </section >

      <CTASection />
      <SiteFooter />
    </div >
  );
}
