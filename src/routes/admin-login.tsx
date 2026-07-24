import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteHeader } from "@/components/site/SiteHeader";
import sideImage from "../assets/Login-green.png";
import AdminLoginForm from "../components/ui/AdminLoginForm";
import leaf from "../assets/leaf.png";
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

export const Route = createFileRoute("/admin-login")({
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
      {/*<SiteHeader />*/}
      {/*<PageHero title="SBGBT सदस्य लॉगिन करें" />*/}
{/*<div className="w-full bg-[#F1BD1A]">
  <div className="mx-auto max-w-7xl py-2 text-center">
    <span className="font-semibold text-[#1F4F45] tracking-wide">
      ग्रामीण विकास • शिक्षा • महिला सशक्तिकरण • स्वास्थ्य • पर्यावरण
    </span>
  </div>
</div>*/}

    <section className="relative min-h-screen overflow-hidden bg-[#F8F4E8]">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden"     style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}>

        {/* Glow 1 */}

        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#256053]/10 blur-[120px]" />

        {/* Glow 2 */}

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[#F1BD1A]/10 blur-[140px]" />

        {/* Glow 3 */}

        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#256053]/5 blur-[120px]" />
      </div>

      {/* ================= FLOATING LEAVES ================= */}

      <motion.img
        src={leaf}
        className="absolute left-16 top-10 w-10 opacity-80"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      <motion.img
        src={leaf}
        className="absolute right-24 top-24 w-8 opacity-70"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -20, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <motion.img
        src={leaf}
        className="absolute bottom-16 left-8 w-12 opacity-70"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 20, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.img
        src={leaf}
        className="absolute bottom-20 right-10 w-9 opacity-70"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      {/* ================= FLOATING PARTICLES ================= */}

      <motion.div
        className="absolute left-1/3 top-28 h-3 w-3 rounded-full bg-[#F1BD1A]"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute right-1/3 bottom-32 h-2 w-2 rounded-full bg-[#256053]"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* ================= CONTAINER ================= */}
<div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-center px-8">

      <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1.2fr]">

          {/* ================================================= */}
          {/* ================= LEFT SECTION ================== */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative flex justify-center"
          >
            {/* Floating Circle */}

            <motion.div
              className="absolute h-[550px] w-[550px] rounded-full bg-white/30 blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            />

            {/* Image */}

            <motion.img
              src={sideImage}
              alt="SBGBT"

             className="relative z-10 w-full max-w-[760px] xl:max-w-[900px] object-contain"

              animate={{
                y: [0, -12, 0],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              whileHover={{
                scale: 1.03,
              }}
            />
          </motion.div>

          {/* ================================================= */}
          {/* =========== RIGHT LOGIN FORM (NEXT PART) ========= */}
          {/* ================================================= */}

          <div className="hidden lg:block">
 <AdminLoginForm />
          </div>

        </div>
      </div>
    </section>
  

      {/* <SiteFooter /> */}
    </div>
  );
}
