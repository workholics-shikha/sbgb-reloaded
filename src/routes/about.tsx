import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Flag,
  HeartHandshake,
  Sparkles,
  Target,
  Users2,
  Users,
  BadgeCheck,
  MapPinned,
  GraduationCap,
  Sprout,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter, CTASection } from "@/components/site/SiteFooter";
import heroEducation from "@/assets/hero-education.jpg";
import galVillage from "@/assets/gallery-village.jpg";
import sbgbtTeam from "@/assets/hamr-bare-me-left.jpg";
import aboutHeroRealOne from "@/assets/about-user-signs.jpg";
import aboutHeroRealTwo from "@/assets/about-user-volunteers.jpg";
import { motion } from "framer-motion";


import villageImg from "@/assets/village.png";
import youthImg from "@/assets/youth.png";
import educationImg from "@/assets/education.png";
import campaignImg from "@/assets/campaign.png";


const sectionRevealProps = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "हमारे बारे में | SBGBT" },
      {
        name: "description",
        content:
          "सोच बदलो गांव बदलो टीम की उत्पत्ति, उद्देश्य, कार्यदिशा और ग्रामीण विकास के लिए चलाए जा रहे अभियान।",
      },
      { property: "og:title", content: "हमारे बारे में | SBGBT" },
      {
        property: "og:description",
        content:
          "जनजागरूकता, शिक्षा, महिला सशक्तिकरण, पर्यावरण और ग्राम विकास के लिए समर्पित SBGBT की कहानी।",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Flag,
    title: "जनजागरूकता",
    desc: "गांवों में सकारात्मक सोच, सक्रिय जनसहभागिता और विकास के प्रति जनचेतना पैदा करना।",
  },
  {
    icon: HeartHandshake,
    title: "गांव के साथ, गांव के लिए",
    desc: "स्थानीय लोगों, ग्राम पंचायत, युवाओं और महिलाओं की भागीदारी से विकास का मॉडल बनाना।",
  },
  {
    icon: Sparkles,
    title: "युवा ऊर्जा को दिशा",
    desc: "नई पीढ़ी को रचनात्मक कार्यों, नेतृत्व और राष्ट्र निर्माण से जोड़ना।",
  },
  {
    icon: Target,
    title: "जमीन से जुड़ा असर",
    desc: "शिक्षा, स्वास्थ्य, पर्यावरण, स्वावलंबन और सामाजिक सुधार को एक साथ आगे बढ़ाना।",
  },
];

const objectives = [
  "गांवों में सकारात्मक सोच, रचनात्मक कार्य और विकास के लिए जनजागरूकता पैदा करना।",
  "स्थानीय समस्याओं पर गांव स्तर पर मंथन कर समाधान खोजने की संस्कृति को मजबूत करना।",
  "युवाओं का मार्गदर्शन कर उनकी ऊर्जा को समाज और राष्ट्र निर्माण की दिशा देना।",
  "बच्चों में नैतिक, मानवीय और शैक्षिक मूल्यों का विकास करना।",
  "प्रतिभाशाली और जरूरतमंद विद्यार्थियों को सम्मान, मार्गदर्शन और सहयोग प्रदान करना।",
  "सरकारी योजनाओं, वित्तीय साक्षरता, पर्यावरण संरक्षण और सामाजिक सुधार के लिए ग्रामीणों को जागरूक करना।",
];

const timeline = [
  {
    y: "धनौरा",
    t: "विचार की उत्पत्ति",
    d: "राजस्थान के धौलपुर जिले के धनौरा गांव से ग्रामीण विकास, जनसहभागिता और नई सोच की यह दिशा उभरी।",
  },
  {
    y: "यात्रा",
    t: "अभियान की शुरुआत",
    d: "सक्रिय युवाओं को साथ लेकर सोच बदलो गांव बदलो यात्रा के माध्यम से अनेक गांवों तक विकासवादी सोच पहुंचाई गई।",
  },
  {
    y: "जागरूकता",
    t: "स्थानीय संगठित प्रयास",
    d: "गांव समन्वयकों, मुख्य समन्वयकों और क्षेत्रीय टीमों के माध्यम से जनजागरूकता और संगठन निर्माण को गति मिली।",
  },
  {
    y: "कार्यक्रम",
    t: "संस्थागत विस्तार",
    d: "शिक्षा, पुस्तकालय, महिला सशक्तिकरण, पर्यावरण, रक्तदान, खेती और ग्राम विकास से जुड़े कार्यक्रम नियमित रूप से संचालित होने लगे।",
  },
  {
    y: "आज",
    t: "विस्तृत जनअभियान",
    d: "SBGBT ग्रामीण युवाओं, विद्यार्थियों, महिलाओं और सामाजिक कार्यकर्ताओं के लिए प्रेरक मंच के रूप में विकसित हो चुका है।",
  },
];

const programs = [
  "सोच बदलो-गांव बदलो यात्रा",
  "क्लीन विलेज-ग्रीन विलेज",
  "आओ पढ़ें-आगे बढ़ें",
  "शिक्षा पाओ-ज्ञान बढ़ाओ प्रतियोगिता",
  "उत्थान पुस्तकालय और उत्थान कोचिंग संस्थान",
  "महिला सशक्तिकरण और रक्तदान-महादान अभियान",
];

const highlights = [
  {
    value: "100+",
    label: "गांवों तक पहुंच",
    description: "राजस्थान के अनेक गांवों में सामाजिक सेवा।",
    icon: MapPinned,
    image: villageImg,
  },
  {
    value: "युवा",
    label: "सक्रिय जनभागीदारी",
    description: "हजारों युवा समाज सेवा से जुड़े।",
    icon: Users,
    image: youthImg,
  },
  {
    value: "शिक्षा",
    label: "जागरूकता से विकास",
    description: "शिक्षा एवं जागरूकता के माध्यम से परिवर्तन।",
    icon: GraduationCap,
    image: educationImg,
  },
  {
    value: "सतत",
    label: "रचनात्मक अभियान",
    description: "समाज हित में निरंतर अभियान।",
    icon: Sprout,
    image: campaignImg,
  },
];

const journeyNotes = [
  {
    title: "शुरुआत",
    desc: "गांव की समस्याओं को समझकर वहीं से समाधान की सोच बनी।",
  },
  {
    title: "सहभागिता",
    desc: "युवा, महिलाएं और विद्यार्थियों ने इसे एक साझा अभियान बनाया।",
  },
  {
    title: "विस्तार",
    desc: "शिक्षा, स्वास्थ्य, पर्यावरण और जागरूकता तक इसका दायरा बढ़ा।",
  },
];

function About() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="हमारे बारे में" />

      {/* about start */}

      <motion.section
        {...sectionRevealProps}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="absolute left-[-4rem] top-12 size-44 rounded-full bg-accent/12 blur-3xl" />
        <div className="absolute right-[-5rem] bottom-10 size-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 xl:grid-cols-[1.02fr_1.08fr] xl:items-center">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[38rem] xl:mx-0"
            >
              <div className="relative min-h-[32rem] sm:min-h-[38rem]">
                <div className="absolute -left-4 top-8 h-28 w-28 rounded-full border border-white/30 bg-white/16 blur-2xl" />
                <div className="absolute right-8 top-4 h-24 w-24 rounded-full border border-accent/18 bg-accent/12 blur-2xl" />
                <motion.div
                  whileHover={{ scale: 1.015, y: -4 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="about-oval-reveal about-glass-shine absolute left-0 top-0 z-0 h-[26rem] w-[16.5rem] overflow-hidden rounded-[999px] bg-transparent p-0 shadow-[0_38px_74px_-34px_rgba(14,63,51,0.42)] sm:h-[36rem] sm:w-[21.5rem]"
                >
                  <img
                    src={aboutHeroRealOne}
                    alt="SBGBT community members together"
                    className="h-full w-full rounded-[999px] object-cover"
                    width={900}
                    height={1200}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -6 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="about-oval-reveal about-glass-shine about-oval-reveal-delayed absolute bottom-0 right-0 z-20 h-[19rem] w-[14rem] overflow-hidden rounded-[999px] border border-[#f6f0e0] bg-[#f6f0e0] pb-0 pl-1 pr-0 pt-1 shadow-[0_38px_74px_-34px_rgba(14,63,51,0.45)] sm:h-[28rem] sm:w-[19rem] sm:pl-[6px] sm:pt-[6px]"
                >
                  <img
                    src={aboutHeroRealTwo}
                    alt="SBGBT grassroots activity"
                    className="h-full w-full rounded-[999px] object-cover"
                    width={900}
                    height={900}
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-[10rem] top-[15rem] z-30 rounded-[1.25rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.34))] px-5 py-4 text-center text-primary shadow-[0_28px_48px_-24px_rgba(14,63,51,0.34)] backdrop-blur-xl sm:left-[13.5rem] sm:top-[26rem]"
                >
                  <div className="font-display text-4xl font-black leading-none">25+</div>
                  <div className="mt-2 text-sm font-semibold leading-snug">वर्षों का अनुभव</div>
                  <div className="mt-3 h-px bg-primary/12" />
                  <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-primary/68">Community Trust</div>
                </motion.div>
              </div>
            </motion.div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/65 px-4 py-2 text-sm font-semibold text-primary shadow-[0_16px_30px_-20px_rgba(14,63,51,0.32)] backdrop-blur-xl">
                <span className="size-2 rounded-full bg-accent" />
                हमारे बारे में
              </div>
              <h2 className="mt-5 max-w-3xl font-display text-[2.4rem] font-black leading-[1.14] text-primary text-balance sm:text-[3.2rem] lg:text-[2rem]">
                सेवा, सहभागिता और ग्राम उत्थान से
                <span className="block text-earth">आशा का मजबूत अभियान।</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                सोच बदलो गांव बदलो टीम ग्रामीण क्षेत्रों में शिक्षा, जन-जागरूकता, महिला सशक्तिकरण,
                पर्यावरण संरक्षण और सामुदायिक सहयोग के माध्यम से सकारात्मक बदलाव की निरंतर दिशा
                बना रही है।
              </p>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="mt-8 grid gap-5 rounded-[2rem] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.38))] p-5 shadow-[0_30px_70px_-38px_rgba(14,63,51,0.34)] backdrop-blur-xl sm:grid-cols-[1fr_15rem] sm:p-6"
              >
                <div className="relative">
                  <div className="absolute -right-4 top-4 h-20 w-20 rounded-full bg-accent/10 blur-2xl" />
                  <div className="grid size-14 place-items-center rounded-full bg-accent/90 text-accent-foreground shadow-[0_14px_26px_-14px_rgba(241,189,26,0.7)]">
                    <Users2 className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-black text-primary">समुदाय के साथ विकास</h3>
                  <div className="mt-4 h-px w-full bg-primary/10" />
                  <div className="mt-5 space-y-3 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-earth">
                        <BadgeCheck className="size-3.5" />
                      </span>
                      <p className="text-sm leading-relaxed sm:text-base">
                        स्थानीय ज़रूरतों को समझकर शिक्षा, संवाद और सहयोग आधारित पहलें चलाई जाती हैं।
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-earth">
                        <BadgeCheck className="size-3.5" />
                      </span>
                      <p className="text-sm leading-relaxed sm:text-base">
                        युवा, महिलाएं और ग्रामीण परिवार बदलाव की प्रक्रिया में सक्रिय भागीदार बनते हैं।
                      </p>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-[1.5rem] border border-white/40 bg-white/20 p-1.5 shadow-[0_24px_44px_-28px_rgba(14,63,51,0.38)] backdrop-blur">
                  <img
                    src={galVillage}
                    alt="SBGBT outreach in rural community"
                    className="h-full w-full rounded-[1.15rem] object-cover transition duration-500 hover:scale-[1.03]"
                    width={700}
                    height={900}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.section>

      {/* about end */}

<section
  id="about-highlights"
  className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6"
>
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    {highlights.map((item) => {
  

      return (
<div
  key={item.label}
  className="group relative overflow-hidden rounded-[24px] border border-[#256053]/10 bg-white shadow-[0_18px_40px_-25px_rgba(37,96,83,.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-25px_rgba(37,96,83,.28)]"
>
  {/* Background Image */}
  <img
    src={item.image}
    alt={item.label}
    className="absolute inset-0 h-full w-full object-cover opacity-[0.8] transition-all duration-500 group-hover:scale-105 group-hover:opacity-[0.24]"
  />

  {/* Green Gradient Overlay */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,.92) 10%, rgba(255,255,255,.82) 45%, rgba(37,96,83,.18) 100%)",
    }}
  />

  {/* Left Accent */}
  <div className="absolute left-0 top-0 h-full w-[6px] bg-gradient-to-b from-[#256053] to-[#F1BD1A]" />

  {/* Bottom Green Glow */}
  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#256053]/10 to-transparent" />

  {/* Content */}
  <div className="relative z-10 px-6 py-5">
    <p className="text-sm font-extrabold tracking-wider text-[#256053]">
      {item.value}
    </p>

    <div className="mt-1 h-[3px] w-10 rounded-full bg-[#F1BD1A]" />

    <h3 className="mt-3 text-[1.65rem] font-black leading-tight text-[#1B1B1B]">
      {item.label}
    </h3>

    <p className="mt-2 text-[15px] leading-6 text-gray-700">
      {item.description}
    </p>
  </div>
</div>
      );
    })}
  </div>
</section>

   <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
  <div className="grid gap-8 lg:grid-cols-3">

    {/* संस्था का परिचय */}
    <div className="group relative overflow-hidden rounded-[32px] border border-[#256053]/10 bg-white p-10 shadow-[0_20px_60px_rgba(37,96,83,.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(37,96,83,.15)]">

      {/* Decoration */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#256053]/5 blur-3xl" />
      <motion.div
  className="absolute right-4 top-4 opacity-20"
  animate={{
    rotate: 360,
  }}
  transition={{
    duration: 25,
    repeat: Infinity,
    ease: "linear",
  }}
>
   <img
    src="https://demo.awaikenthemes.com/aasha/wp-content/uploads/2026/03/our-approach-item-bg-shape-1.svg"
    alt=""
    className="w-28 h-28"
  />
    <path
      d="M100 10
         L115 70
         L180 70
         L128 110
         L145 180
         L100 140
         L55 180
         L72 110
         L20 70
         L85 70Z"
      fill="#256053"
      fillOpacity="0.15"
    />
 
</motion.div>

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1BD1A]">
        <Compass className="h-7 w-7 text-[#256053]" />
      </div>

      <h2 className="mt-8 text-4xl font-black text-[#143B34]">
        संस्था का परिचय
      </h2>

      <div className="mt-4 h-1 w-16 rounded-full bg-[#F1BD1A]" />

      <div className="mt-6 space-y-5 leading-8 text-gray-600">

        <p>
          सोच बदलो-गांव बदलो टीम का गठन इस उद्देश्य से किया गया कि ग्रामीण संस्कृति
          और परिवेश को बनाए रखते हुए गांवों को विकास और आधुनिकता से जोड़ा जा सके।
        </p>

        <p>
          टीम का मूल ध्येय है कि जनजागरूकता और सक्रिय जनसहभागिता के माध्यम से गांव
          विकास के लक्ष्य को प्राप्त किया जाए, ताकि शिक्षा, स्वास्थ्य, रोजगार,
          सरकारी योजनाओं और सामाजिक न्याय तक लोगों की पहुंच मजबूत हो।
        </p>

      </div>

      <div className="my-8 h-px bg-[#256053]/10" />

      <p className="italic font-semibold text-[#256053]">
        "मानवता की सेवा ही ईश्वर की सेवा है।"
      </p>

    </div>

    {/* कार्य की दिशा */}

    <div className="group relative overflow-hidden rounded-[32px] border border-[#256053]/10 bg-white p-10 shadow-[0_20px_60px_rgba(37,96,83,.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(37,96,83,.15)]">

      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#256053]/5 blur-3xl" />

   <motion.div
  className="absolute right-4 top-4 opacity-20"
  animate={{
    rotate: -360,
  }}
  transition={{
    duration: 30,
    repeat: Infinity,
    ease: "linear",
  }}
>
 <img
    src="https://demo.awaikenthemes.com/aasha/wp-content/uploads/2026/03/our-approach-item-bg-shape-2.svg"
    alt=""
    className="w-28 h-28"
  />
    <circle
      cx="100"
      cy="100"
      r="70"
      stroke="#256053"
      strokeWidth="8"
      strokeDasharray="12 12"
      opacity="0.4"
    />
  
</motion.div>

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1BD1A]">
        <Target className="h-7 w-7 text-[#256053]" />
      </div>

      <h2 className="mt-8 text-4xl font-black text-[#143B34]">
        कार्य की दिशा
      </h2>

      <div className="mt-4 h-1 w-16 rounded-full bg-[#F1BD1A]" />

      <div className="mt-6 space-y-5 leading-8 text-gray-600">

        <p>
          संस्था जमीनी स्तर पर जागरूकता, शिक्षा, महिला सशक्तिकरण, पर्यावरण संरक्षण,
          स्वास्थ्य, वित्तीय साक्षरता, खेती, पंचायत सहयोग और सामाजिक सुधार से जुड़े
          रचनात्मक कार्य करती है।
        </p>

        <p>
          इसका उद्देश्य केवल योजनाएं बताना नहीं, बल्कि गांवों को अपने विकास में
          सक्रिय भागीदार बनाना है।
        </p>

      </div>

      <div className="my-8 h-px bg-[#256053]/10" />

      <Link
        to="/activities"
        className="inline-flex items-center gap-2 font-semibold text-[#256053] transition-all duration-300 hover:gap-4"
      >
        हमारे कार्य देखें
        <ArrowRight className="h-5 w-5" />
      </Link>

    </div>
{/* हमारे मूल्य */}

<div className="group relative overflow-hidden rounded-[32px] border border-[#256053]/10 bg-white p-10 shadow-[0_20px_60px_rgba(37,96,83,.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(37,96,83,.15)]">

  {/* Decoration */}
  <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#256053]/5 blur-3xl" />

  <motion.div
    className="absolute right-4 top-4 opacity-20"
    animate={{
      rotate: 360,
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <img
      src="https://demo.awaikenthemes.com/aasha/wp-content/uploads/2026/03/our-approach-item-bg-shape-3.svg "
      alt="Mandala"
      className="h-28 w-28"
    />
  </motion.div>

  {/* Icon */}
  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1BD1A]">
    <HeartHandshake className="h-7 w-7 text-[#256053]" />
  </div>

  <h2 className="mt-8 text-4xl font-black text-[#143B34]">
    हमारे मूल्य
  </h2>

  <div className="mt-4 h-1 w-16 rounded-full bg-[#F1BD1A]" />

  <div className="mt-6 space-y-5 leading-8 text-gray-600">

    <p>
      हमारी संस्था सेवा, समर्पण, पारदर्शिता और सामाजिक उत्तरदायित्व के
      मूल्यों पर कार्य करती है। हमारा विश्वास है कि समाज में स्थायी परिवर्तन
      तभी संभव है जब प्रत्येक व्यक्ति समानता, सहयोग और मानवता की भावना के
      साथ आगे बढ़े।
    </p>

    <p>
      हम प्रत्येक कार्य में ईमानदारी, जनसहभागिता और सतत विकास को प्राथमिकता
      देते हैं, ताकि आने वाली पीढ़ियों के लिए एक सशक्त, शिक्षित और आत्मनिर्भर
      समाज का निर्माण किया जा सके।
    </p>

  </div>

  <div className="my-8 h-px bg-[#256053]/10" />

  <p className="italic font-semibold text-[#256053]">
    "सेवा • समर्पण • पारदर्शिता"
  </p>

</div>
  </div>
</section>
<section className="relative overflow-hidden bg-[#F5F0DF] py-24">

  {/* Background Glow */}
  <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#F1BD1A]/10 blur-3xl" />
  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#256053]/10 blur-3xl" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1fr_0.9fr]">

    {/* ================= LEFT ================= */}

    <div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-[#256053]/10 px-5 py-2 text-sm font-semibold text-[#256053]">
        🌿 हमारी यात्रा
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-5xl font-black leading-[1.05] text-[#256053] lg:text-6xl">
        गांव की सोच से
        <br />
        <span className="text-[#F1BD1A]">जनअभियान</span> तक।
      </h2>

      {/* Underline */}
      <div className="mt-5 flex items-center gap-3">
        <div className="h-[3px] w-34 rounded-full bg-[#F1BD1A]" />
        <div className="h-2 w-2 rounded-full bg-[#F1BD1A]" />
      </div>

      {/* Content */}
      <div className="mt-10 flex gap-8">

        {/* Timeline */}
        <div className="relative flex w-6 justify-center self-stretch">

  {/* Dot */}
  <div className="absolute top-0 h-2 w-2 rounded-full bg-[#256053]" />

  {/* Thin Line */}
  <div className="mt-5 h-[320px] w-[3px] bg-[#F1BD1A]" />

</div>

        {/* Paragraphs */}
        <div className="space-y-8 text-[18px] leading-9 text-neutral-700">

          <p>
            हमारा विश्वास है कि गांवों का वास्तविक विकास तभी संभव है
            जब प्रत्येक व्यक्ति अपने अधिकारों, जिम्मेदारियों और
            संभावनाओं के प्रति जागरूक हो।
          </p>

          <p>
            ग्रामीण युवाओं, महिलाओं, बुद्धिजीवियों और सामाजिक
            कार्यकर्ताओं को साथ जोड़कर हमने ऐसा वातावरण बनाया
            जहाँ समस्याओं का समाधान स्थानीय लोगों की भागीदारी
            से खोजा जा सके।
          </p>

          <p>
            शिक्षा, जनचेतना, संगठन निर्माण और सकारात्मक नेतृत्व
            हमारी यात्रा के चार प्रमुख स्तंभ हैं।
          </p>

        </div>

      </div>

    </div>

    {/* ================= RIGHT ================= */}

    <div className="relative flex justify-center">

      {/* Glow */}
      <div className="absolute -inset-10 rounded-full bg-[#F1BD1A]/20 blur-3xl" />

      {/* Image */}
  <div className="relative group w-full max-w-[430px] overflow-hidden rounded-[34px] shadow-[0_35px_80px_rgba(0,0,0,.18)] reveal-image">

  <img
    src={heroEducation}
    alt="SBGBT Rural Education"
    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
  />

  {/* Glass Shine */}
  <div className="glass-shine absolute inset-0 pointer-events-none" />

</div>
      {/* Quote Card */}
      <div className="absolute bottom-[-24px] left-4 z-20 w-[290px] rounded-3xl bg-[#256053] px-5 py-4 text-white shadow-[0_20px_50px_rgba(0,0,0,.25)]">

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1BD1A] text-2xl font-bold text-[#256053]">
            ❝
          </div>

          <div>

            <p className="text-lg font-medium leading-8">
              हमारा विश्वास है —
              <br />
              जब गांव जागेंगे,
              <br />
              तभी देश आगे बढ़ेगा।
            </p>

            <div className="mt-4 h-[3px] w-16 rounded-full bg-[#F1BD1A]" />

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">हमारी सोच</div>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
            हर निर्णय के पीछे यही आधार है।
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <value.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-black">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-background via-card to-secondary/60 p-8 shadow-sm sm:p-10">
              <div className="absolute right-0 top-0 size-40 rounded-full bg-primary/8 blur-3xl" />
              <div className="absolute bottom-0 left-0 size-32 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">उद्देश्य</div>
                <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
                  अभियान किन लक्ष्यों के साथ काम करता है।
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-primary/10 bg-background/85 p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-[0.18em] text-primary/80">मुख्य आधार</div>
                    <div className="mt-2 font-display text-2xl font-black">जनजागरूकता</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      सोच, सहभागिता और स्थानीय जिम्मेदारी को साथ लेकर गांव विकास की दिशा बनाना।
                    </p>
                  </div>
                  <div className="rounded-2xl border border-primary/10 bg-background/85 p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-[0.18em] text-primary/80">कार्य शैली</div>
                    <div className="mt-2 font-display text-2xl font-black">स्थानीय भागीदारी</div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      गांव, युवा, महिलाएं और पंचायत साथ आएं तो बदलाव टिकाऊ बनता है।
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-5">
                  <div className="text-sm font-semibold text-foreground">फोकस क्षेत्र</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    शिक्षा, नेतृत्व, सामाजिक सुधार, सरकारी योजनाओं की जानकारी, पर्यावरण संरक्षण और
                    प्रतिभाशाली विद्यार्थियों का समर्थन।
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {objectives.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:border-primary/20 hover:shadow-md"
                >
                  <div className="text-sm font-black text-primary">{String(index + 1).padStart(2, "0")}</div>
                  <p className="mt-2 leading-relaxed text-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#083a32_0%,#0d4b3e_48%,#08352d_100%)] text-cream">
          <div className="absolute inset-0 opacity-[0.22]">
        <div className="h-full w-full bg-[length:42px_24px] bg-[linear-gradient(135deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%),linear-gradient(225deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%)]" />
      </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="max-w-2xl">
                <div className="text-xs font-semibold uppercase tracking-widest text-accent">उद्भव</div>
                <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl lg:text-5xl">
                  धनौरा से शुरू हुई सोच, कई गांवों तक पहुंची।
                </h2>
              </div>

              <ol className="relative mt-12 ml-4 space-y-8 border-l border-cream/15">
                {timeline.map((item) => (
                  <li key={item.y} className="relative pl-8">
                    <span className="absolute -left-[9px] top-1 grid size-4 place-items-center rounded-full bg-accent">
                      <span className="size-1.5 rounded-full bg-ink" />
                    </span>
                    <div className="font-display text-2xl font-black text-accent">{item.y}</div>
                    <div className="mt-1 font-semibold">{item.t}</div>
                    <p className="mt-1 max-w-2xl text-sm text-cream/75">{item.d}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-5">
              <div className="relative overflow-hidden rounded-[2rem] border border-cream/10 bg-cream/5 p-3 shadow-2xl">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent/20 blur-3xl" />
                <img
                  src={sbgbtTeam}
                  alt="SBGBT village journey"
                  className="relative aspect-[4/3] w-full rounded-[1.5rem] object-cover"
                />
                <div className="relative mt-4 rounded-[1.5rem] bg-cream/8 p-5 backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.2em] text-accent/80">SBGBT Journey</div>
                  <div className="mt-2 font-display text-2xl font-black">विचार से अभियान तक</div>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    धनौरा की जमीन से उभरी यह सोच आज गांव, युवा और जनसहभागिता को एक सूत्र में जोड़ने
                    वाला मंच बन चुकी है।
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {journeyNotes.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-cream/10 bg-cream/6 p-5 shadow-lg backdrop-blur"
                  >
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{item.title}</div>
                    <p className="mt-3 text-sm leading-relaxed text-cream/75">{item.desc}</p>
                  </div>
                ))}
              </div>
 
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
         <div className="relative overflow-hidden rounded-[2rem] border border-border">
       <img
  src={galVillage}
  alt="SBGBT village development activities"
  className="aspect-[5/4] w-full object-cover"
/>
</div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">मुख्य कार्यक्रम</div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">
              संस्था इन पहलों के माध्यम से कार्य करती है।
            </h2>
            <div className="mt-6 grid gap-3">
              {programs.map((program) => (
                <div
                  key={program}
                  className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm"
                >
                  {program}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
      {/* === */} 

      <SiteFooter />
    </div>
  );
}
