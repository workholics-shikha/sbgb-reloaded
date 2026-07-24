import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/site/SiteHeader";
import sideImage from "../assets/Login-green.png";
import { PageHero, SiteFooter  } from "@/components/site/SiteFooter";
import { motion } from "framer-motion";
 import blogBgPaper from "@/assets/blog-bg-paper.png";
import {
  
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaShieldAlt,
} from "react-icons/fa";
import {
  HiShieldCheck,
  HiLockClosed,
  HiClock,
} from "react-icons/hi2";
import { BsDatabaseCheck } from "react-icons/bs";

export const Route = createFileRoute("/user-login")({
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      {/*<PageHero title="SBGBT सदस्य लॉगिन करें" />*/}
<div className="w-full bg-[#F1BD1A]">
  <div className="mx-auto max-w-7xl py-2 text-center">
    <span className="font-semibold text-[#1F4F45] tracking-wide">
      ग्रामीण विकास • शिक्षा • महिला सशक्तिकरण • स्वास्थ्य • पर्यावरण
    </span>
  </div>
</div>
<section className="border-border">
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

    <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.95fr]">

      {/* ================= LEFT SIDE ================= */}

      <div className="space-y-8">

        {/* Image */}

        <div className="flex justify-center">
          <motion.img
            src={sideImage}
            alt="SBGBT Admin"
            className="w-full max-w-[760px] -mt-8 object-contain"
                    animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
          />
        </div>

        {/* Feature Cards */}

        <div className="grid grid-cols-2 gap-1 lg:grid-cols-4">

          {/* Card 1 */}

          <div
            style={{
              backgroundImage: `url(${blogBgPaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="group rounded-3xl border border-[#e8dbc1] p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#256053]/10 transition group-hover:bg-[#256053]">
              <HiShieldCheck className="text-3xl text-[#256053] group-hover:text-white" />
            </div>

            <h4 className="text-base font-bold text-[#1f4d43]">
              सुरक्षित पोर्टल
            </h4>

            <p className="mt-2 text-sm text-gray-600">
              256-बिट एन्क्रिप्शन
            </p>
          </div>

          {/* Card 2 */}

          <div
            style={{
              backgroundImage: `url(${blogBgPaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="group rounded-3xl border border-[#e8dbc1] p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#256053]/10 transition group-hover:bg-[#256053]">
              <HiLockClosed className="text-3xl text-[#256053] group-hover:text-white" />
            </div>

            <h4 className="text-base font-bold text-[#1f4d43]">
              केवल अधिकृत
            </h4>

            <p className="mt-2 text-sm text-gray-600">
              सुरक्षित प्रशासनिक पहुँच
            </p>
          </div>

          {/* Card 3 */}

          <div
            style={{
              backgroundImage: `url(${blogBgPaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="group rounded-3xl border border-[#e8dbc1] p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#256053]/10 transition group-hover:bg-[#256053]">
              <HiClock className="text-3xl text-[#256053] group-hover:text-white" />
            </div>

            <h4 className="text-base font-bold text-[#1f4d43]">
              रियल टाइम
            </h4>

            <p className="mt-2 text-sm text-gray-600">
              लाइव अपडेट
            </p>
          </div>

          {/* Card 4 */}

          <div
            style={{
              backgroundImage: `url(${blogBgPaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="group rounded-3xl border border-[#e8dbc1] p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#256053]/10 transition group-hover:bg-[#256053]">
              <BsDatabaseCheck className="text-3xl text-[#256053] group-hover:text-white" />
            </div>

            <h4 className="text-base font-bold text-[#1f4d43]">
              डेटा सुरक्षा
            </h4>

            <p className="mt-2 text-sm text-gray-600">
              विश्वसनीय और सुरक्षित
            </p>
          </div>

        </div>
  </div>

      {/* ================= RIGHT SIDE ================= */}

            <form

  onSubmit={(event) => {

    event.preventDefault();

    setSent(true);

  }}

  className="rounded-[2rem] border border-[#E8DFC9] bg-white p-10 shadow-[0_20px_50px_rgba(37,96,83,.12)] sm:p-12"

>



    {/* Heading */}

  <h2 className="font-display text-3xl font-black text-[#2D241B]">

    अपने एडमिन खाते में लॉगिन करें

  </h2>



  <p className="mt-2 text-sm leading-6 text-gray-500">

    केवल अधिकृत प्रशासकों के लिए सुरक्षित प्रवेश।

   

  </p>



  {/* Inputs */}

  <div className="mt-8 space-y-5">



    {/* Email */}

    <div>

     <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#256053]">

  <FaEnvelope />

  <span>ईमेल</span>

</label>



      <input

        required

        type="email"

        placeholder="admin@sgbgt.org"

        className="w-full rounded-xl border border-[#E8DFC9] bg-[#F8F4E8] px-5 py-3.5 outline-none transition-all focus:border-[#F1BD1A] focus:ring-4 focus:ring-[#F1BD1A]/20"

      />

    </div>



    {/* Password */}

    <div>

<label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#256053]">

  <FaLock />

  <span>पासवर्ड</span>

</label>



      <div className="relative">

  <input

    type={showPassword ? "text" : "password"}

    placeholder="••••••••"

    className="w-full rounded-xl border border-[#E8DFC9] bg-[#F8F4E8] px-5 py-3 pr-12 outline-none focus:border-[#F1BD1A]"

  />



  <button

    type="button"

    onClick={() => setShowPassword(!showPassword)}

    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"

  >

    {showPassword ? <FaEyeSlash /> : <FaEye />}

  </button>

</div>

    </div>



    {/* Remember */}

   

  </div>



  {/* Login Button */}

  <button

  type="submit"

  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#256053] py-3.5 text-white font-semibold hover:bg-[#1F4F45]"

>

  <FaSignInAlt />

  लॉगिन करें

</button>



  {/* Success */}

  {sent && (

    <p className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">

      ✅ लॉगिन सफल हुआ। आपको डैशबोर्ड पर भेजा जा रहा है...

    </p>

  )}



  {/* Security */}

 <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E8DFC9] bg-[#F8F4E8] p-4">

  <FaShieldAlt className="mt-1 text-xl text-[#256053]" />



  <div>

    <h4 className="font-semibold text-[#256053]">

      सुरक्षित प्रशासनिक पोर्टल

    </h4>



    <p className="mt-1 text-sm text-gray-600">

       तकनीक के माध्यम से ग्रामीण विकास का प्रभावी प्रबंधन

    </p>

  </div>

</div>

  {/* Footer */}

 

</form>        


    </div>

  </div>
</section>

      <SiteFooter />
    </div>
  );
}
