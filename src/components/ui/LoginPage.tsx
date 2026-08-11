import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import sideImage from "../../assets/Login-green.png";
import leaf from "../../assets/leaf.png";
import logo from "../../assets/sbgb-logo.png";
import blogBgPaper from "@/assets/blog-bg-paper.png";
import AdminLoginForm from "@/components/ui/AdminLoginForm";
import { type AuthUser, type LoginType } from "@/lib/auth";

type LoginPageProps = {
  heading: string;
  subtitle: string;
  buttonText: string;
  loginType: LoginType;
  emailPlaceholder?: string;
  loggedInUser?: AuthUser | null;
  dashboardLabel?: string;
  onSuccess?: (user: AuthUser) => void;
};

export default function LoginPage({
  heading,
  subtitle,
  buttonText,
  loginType,
  emailPlaceholder,
  loggedInUser,
  dashboardLabel,
  onSuccess,
}: LoginPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-screen overflow-hidden bg-[#F8F4E8]">
        <div
          className="absolute inset-0 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${blogBgPaper})` }}
        >
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#256053]/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#F1BD1A]/10 blur-[140px]" />
          <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#256053]/5 blur-[120px]" />
        </div>

        <motion.img src={leaf} className="absolute left-16 top-10 w-10 opacity-80" animate={{ y: [0, -20, 0], rotate: [0, 15, -10, 0] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.img src={leaf} className="absolute right-24 top-24 w-8 opacity-70" animate={{ y: [0, 20, 0], rotate: [0, -20, 15, 0] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.img src={leaf} className="absolute bottom-16 left-8 w-12 opacity-70" animate={{ y: [0, -18, 0], rotate: [0, 20, -15, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.img src={leaf} className="absolute bottom-20 right-10 w-9 opacity-70" animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 7, repeat: Infinity }} />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 pt-4 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SBGBT Logo" className="h-14 w-14 rounded-full border border-[#E8DFC9] md:h-14 md:w-14" />
              <div>
                <h2 className="text-3xl font-extrabold leading-none text-[#2D241B]">SBGBT</h2>
                <p className="mt-1 text-sm text-[#8A6A4A]">Soch Badlo · Gaon Badlo</p>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 rounded-full bg-[#256053] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#1F4F45]"
            >
              <span className="pb-1 text-lg">⌂</span> वेबसाइट पर जाएँ
            </Link>
          </div>

          <div className="grid flex-1 items-center gap-8 pt-6 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative hidden items-center justify-center lg:flex">
              <motion.div className="absolute h-[550px] w-[550px] rounded-full bg-white/30 blur-3xl" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity }} />
              <motion.img
                src={sideImage}
                alt="SBGBT"
                className="relative z-10 w-full max-w-[600px] object-contain xl:max-w-[690px]"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
              />
            </motion.div>

            <div className="flex justify-center">
              {loggedInUser ? (
                <div className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-[30px] border border-[#E8DFC9] bg-white/90 p-10 shadow-[0_20px_50px_rgba(37,96,83,.15)] backdrop-blur-xl">
                  <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#256053]/5 blur-[90px]" />
                  <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#F1BD1A]/10 blur-[100px]" />

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h2 className="mt-5 text-center text-3xl font-black text-[#2D241B]">Session Active</h2>
                  <p className="mt-2 text-center text-gray-500">
                    {dashboardLabel || heading} ke liye login ho chuka hai.
                  </p>

                  <div className="mt-8 rounded-[24px] border border-[#E8DFC9] bg-[#F8F4E8] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#256053]/70">Logged in user</p>
                    <p className="mt-3 text-xl font-bold text-[#2D241B]">{loggedInUser.name}</p>
                    <p className="mt-1 text-sm text-[#8A6A4A]">{loggedInUser.email}</p>
                    <p className="mt-4 text-sm text-[#4E5A52]">Login type: {loggedInUser.loginType}</p>
                  </div>
                </div>
              ) : (
                <AdminLoginForm
                  heading={heading}
                  subtitle={subtitle}
                  buttonText={buttonText}
                  loginType={loginType}
                  emailPlaceholder={emailPlaceholder}
                  onSuccess={onSuccess}
                />
              )}
            </div>
          </div>

          <footer className="mt-auto w-full rounded-t-[30px] bg-[#256053] py-2">
            <p className="text-center text-xs font-medium text-white md:text-sm">
              © {new Date().getFullYear()} <span className="font-bold">SBGBT</span>. All Rights Reserved.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
