import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaSignInAlt,
} from "react-icons/fa";

export default function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <motion.form
      initial={{
        opacity: 0,
        x: 80,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
        className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-[#E8DFC9] bg-white/90 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(37,96,83,.15)]"
        >
      {/* Glow */}

      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#256053]/5 blur-[90px]" />

      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#F1BD1A]/10 blur-[100px]" />

 <div className="mb-4 flex justify-start">
  <Link
    to="/"
    className="inline-flex items-center gap-2 rounded-full bg-[#256053] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1F4F45] hover:shadow-xl hover:scale-105"
  >
    ← वेबसाइट पर वापस जाएँ
  </Link>
</div>

      {/* Heading */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
      >
        <h2 className="text-center text-3xl font-black text-[#2D241B]">
          अपने एडमिन खाते में  लॉगिन करें
        </h2>

       

        <p className="mt-2 text-center text-gray-500">
          केवल अधिकृत प्रशासकों के लिए सुरक्षित प्रवेश।
        </p>


      </motion.div>

      {/* Inputs */}

      <div className="mt-8 space-y-4">
              {/* Email */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .3,
          }}
        >
          <label className="mb-3 flex items-center gap-2 font-semibold text-[#256053]">

            <FaEnvelope />

            <span>ईमेल</span>

          </label>

          <input
            required
            type="email"
            placeholder="admin@sgbgt.org"
            className="w-full rounded-2xl border border-[#E8DFC9] bg-[#F8F4E8] px-6 py-3 outline-none transition-all duration-300 focus:border-[#F1BD1A] focus:ring-4 focus:ring-[#F1BD1A]/20 focus:scale-[1.02]"
          />
        </motion.div>
                <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .4,
          }}
        >
          <label className="mb-3 flex items-center gap-2 font-semibold text-[#256053]">

            <FaLock />

            <span>पासवर्ड</span>

          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-[#E8DFC9] bg-[#F8F4E8] px-6 py-3 pr-14 outline-none transition-all duration-300 focus:border-[#F1BD1A] focus:ring-4 focus:ring-[#F1BD1A]/20 focus:scale-[1.02]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-500 transition hover:text-[#256053]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>
        </motion.div>
               

   

        {/* Login Button */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: .98,
          }}
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#256053] to-[#2F7B68] py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_20px_40px_rgba(37,96,83,.35)]"
        >
          <FaSignInAlt className="text-lg" />

          <span>लॉगिन करें</span>

        </motion.button>

        {/* Success Message */}

        {sent && (

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center"
          >
            <p className="font-medium text-green-700">
              ✅ लॉगिन सफल हुआ।
            </p>

            <p className="mt-1 text-sm text-green-600">
              आपको डैशबोर्ड पर भेजा जा रहा है...
            </p>

          </motion.div>

        )}

      </div>


      {/* Security Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: .6,
        }}
        className="mt-6 rounded-2xl border border-[#E8DFC9] bg-[#F8F4E8] p-4"
      >

        <div className="flex items-start gap-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#256053]/10">

            <FaShieldAlt className="text-xl text-[#256053]" />

          </div>

          <div>

            <h4 className="font-bold text-[#256053]">
              सुरक्षित प्रशासनिक पोर्टल
            </h4>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              तकनीक के माध्यम से ग्रामीण विकास का प्रभावी प्रबंधन।
            </p>

          </div>

        </div>

      </motion.div>

    </motion.form>
  );
}