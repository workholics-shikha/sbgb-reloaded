import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSignInAlt } from "react-icons/fa";

import { loginWithCredentials, type AuthUser, type LoginType } from "@/lib/auth";

type AdminLoginFormProps = {
  heading: string;
  subtitle: string;
  buttonText: string;
  loginType: LoginType;
  emailPlaceholder?: string;
  onSuccess?: (user: AuthUser) => void;
};

export default function AdminLoginForm({
  heading,
  subtitle,
  buttonText,
  loginType,
  emailPlaceholder,
  onSuccess,
}: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
          const session = await loginWithCredentials({
            email: email.trim(),
            password,
            loginType,
          });
          setSent(true);
          onSuccess?.(session.user);
        } catch (loginError) {
          setSent(false);
          setError(loginError instanceof Error ? loginError.message : "Login failed");
        } finally {
          setIsSubmitting(false);
        }
      }}
      className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-[30px] border border-[#E8DFC9] bg-white/90 p-10 shadow-[0_20px_50px_rgba(37,96,83,.15)] backdrop-blur-xl"
    >
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#256053]/5 blur-[90px]" />
      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#F1BD1A]/10 blur-[100px]" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-center text-3xl font-black text-[#2D241B]">{heading}</h2>
        <p className="mt-2 text-center text-gray-500">{subtitle}</p>
      </motion.div>

      <div className="mt-8 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label className="mb-3 flex items-center gap-2 font-semibold text-[#256053]">
            <FaEnvelope />
            <span>ईमेल</span>
          </label>

          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={emailPlaceholder || "admin@sbgbt.org"}
            className="w-full rounded-2xl border border-[#E8DFC9] bg-[#F8F4E8] px-6 py-3 outline-none transition-all duration-300 focus:scale-[1.02] focus:border-[#F1BD1A] focus:ring-4 focus:ring-[#F1BD1A]/20"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <label className="mb-3 flex items-center gap-2 font-semibold text-[#256053]">
            <FaLock />
            <span>पासवर्ड</span>
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-[#E8DFC9] bg-[#F8F4E8] px-6 py-3 pr-14 outline-none transition-all duration-300 focus:scale-[1.02] focus:border-[#F1BD1A] focus:ring-4 focus:ring-[#F1BD1A]/20"
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#256053] to-[#2F7B68] py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_20px_40px_rgba(37,96,83,.35)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FaSignInAlt className="text-lg" />
          <span>{isSubmitting ? "लॉगिन हो रहा है..." : buttonText}</span>
        </motion.button>

        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
            <p className="font-medium text-red-700">{error}</p>
          </motion.div>
        )}

        {sent && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center">
            <p className="font-medium text-green-700">लॉगिन सफल हुआ।</p>
            <p className="mt-1 text-sm text-green-600">आपकी session अब active है।</p>
          </motion.div>
        )}
      </div>
    </motion.form>
  );
}
