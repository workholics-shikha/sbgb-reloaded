import { createFileRoute } from "@tanstack/react-router";
import sideImage from "../../assets/Login-green.png";
import { Link } from "@tanstack/react-router";
import AdminLoginForm from "@/components/ui/AdminLoginForm";
import leaf from "../../assets/leaf.png";
import { motion } from "framer-motion";
import blogBgPaper from "@/assets/blog-bg-paper.png";
import logo from "../../assets/sbgb-logo.png";


type LoginPageProps = {
  heading: string;
  subtitle: string;
  buttonText: string;
};
export default function LoginPage({
  heading,
  subtitle,
  buttonText,
}: LoginPageProps) {
  

  return (
    <div className="min-h-screen bg-background text-foreground">

   <section className="relative min-h-screen overflow-hidden bg-[#F8F4E8] flex">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden bg-cover bg-center"     style={{ backgroundImage: `url(${blogBgPaper})` }}>

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
<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 lg:px-10 pt-4">
   <div className="flex flex-wrap items-center justify-between gap-4">
  {/* Logo */}
  <div className="flex items-center gap-3">
    <img
      src={logo}
      alt="SBGBT Logo"
      className="h-14 w-14 md:h-14 md:w-14 rounded-full border border-[#E8DFC9]"
    />

    <div>
      <h2 className="text-3xl font-extrabold leading-none text-[#2D241B]">
        SBGBT
      </h2>

      <p className="mt-1 text-sm text-[#8A6A4A]">
        Soch Badlo · Gaon Badlo
      </p>
    </div>
  </div>

  {/* Button */}
  <Link
    to="/"
    className="flex items-center gap-2 rounded-full bg-[#256053] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#1F4F45]"
  >
   <span className="text-lg pb-1"> 🏠 </span> वेबसाइट पर जाएँ
  </Link>
</div>

<div className="flex-1 grid items-center gap-8 pt-6 lg:grid-cols-[1.15fr_0.85fr]">

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
         className="relative hidden lg:flex items-center justify-center"
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

             className="relative z-10 w-full max-w-[600px] xl:max-w-[690px] object-contain"

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


        <div className="flex justify-center">
<AdminLoginForm
  heading={heading}
  subtitle={subtitle}
  buttonText={buttonText}
/>
          </div>

        </div>
    <footer className="mt-auto w-full rounded-t-[30px] bg-[#256053] py-2">
  <p className="text-center text-xs md:text-sm font-medium text-white">
    © {new Date().getFullYear()}{" "}
    <span className="font-bold">SBGBT</span>. All Rights Reserved.
  </p>
</footer>
      </div>
 
    </section>


    </div>
  );
}
