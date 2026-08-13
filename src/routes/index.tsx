import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
} from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  FileText,
  GraduationCap,
  HeartPulse,
  Images,
  Landmark,
  Leaf,
  Newspaper,
  Quote,
  Sparkles,
  Users2,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

import {
  fetchPublicActivities,
  getPlainActivityText,
} from "@/lib/public-activities";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import blogBgPaper from "@/assets/blog-bg-paper.png";
import heroDividerRough from "@/assets/hero-divider-rough.png";
import heroHeartSprade from "@/assets/hero-heart-sprade.png";

// galWomen, heroEducation, galEnv - hero slider

// import heroEducation from "@/assets/hero-education.jpg";
// import galWomen from "@/assets/gallery-women.jpg";
// import galEnv from "@/assets/gallery-environment.jpg";

import heroEducation from "@/assets/hero-education.jpg";
import galWomen from "@/assets/gallery-women.jpg";
import galEnv from "@/assets/gallery-environment.jpg";

// hero sliders
import heroSlide2 from "@/assets/1-smart-village.png";
import heroSlide6 from "@/assets/2-panchayati-raj.png";
import heroSlide3 from "@/assets/3-atmanirbhar-gaon.png";
import heroSlide4 from "@/assets/4-paryavaran-sanrakshan.png";
import heroSlide5 from "@/assets/5-jan-swasthya.png";
import heroSlide1 from "@/assets/6-samaj-rashtra-nirman.png";

// gallery
import greenVillage from "@/assets/plants.jpg";
import womenEmpowermentGallery from "@/assets/mahila-sakhaktikaran.jpg";
import humanServiceGallery from "@/assets/manavta-seva.jpg";
import educationDriveGallery from "@/assets/siksha-pao.jpg";
import socialRevolutionGallery from "@/assets/samajik-kranti.jpg";
import thoughtChangeGallery from "@/assets/soch-badlo.jpg";
import awarenessGallery from "@/assets/soch2.jpg";

import galLib from "@/assets/gallery-library.jpg";
import galHealth from "@/assets/gallery-health.jpg";
import galAwards from "@/assets/gallery-awards.jpg";
import galVillage from "@/assets/gallery-village.jpg";
import initiativeBgOne from "@/assets/initiative-bg-one.png";
import initiativeBgTwo from "@/assets/initiative-bg-two.png";
import initiativeBgThree from "@/assets/initiative-bg-three.png";
import mediaSbgb01 from "@/assets/media-sbgb-01.jpg";
import mediaSbgb02 from "@/assets/media-sbgb-02.jpg";
import mediaSbgb03 from "@/assets/media-sbgb-03.jpg";
import mediaSbgb04 from "@/assets/media-sbgb-04.jpg";
import ecoNeedsLogo from "@/assets/econeeds-logo.png";
import workholicsLogo from "@/assets/workholicslogo.png";
import socialPostHulaspura from "@/assets/news1.jpg";
import socialPostTataPower from "@/assets/activities-hero-real.jpg";
import socialPostTuZindaHai from "@/assets/news2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SBGBT | सोच बदलो, गांव बदलो टीम" },
      {
        name: "description",
        content:
          "सोच बदलो, गांव बदलो टीम की ग्रामीण शिक्षा, महिला सशक्तिकरण, स्वास्थ्य, पर्यावरण और जन-जागरूकता पहलों की जानकारी।",
      },
    ],
  }),
  component: Home,
});

const noticeLinks = [
  {
    label: "SPGBP 2025-26 Notification",
    href: "https://www.sbgbteam.com/public/adminassets/SPGBP2025-26Notification-1.pdf",
  },
  {
    label: "Annexure-I (Instructions)",
    href: "https://www.sbgbteam.com/public/adminassets/Annexure-I-doc.pdf",
  },
  {
    label: "Annexure-II (Photo Sample)",
    href: "https://www.sbgbteam.com/public/adminassets/Annexure-II_photo.pdf",
  },
  {
    label: "Click for Registration",
    href: "https://www.sbgbteam.com/sbgbp-registration",
  },
  {
    label: "Download Admit Card",
    href: "/sbgbp-registration-admit-card",
  },
];

const getNoticeMeta = (label: string) => {
  if (label.includes("Registration")) {
    return { tag: "Apply", icon: GraduationCap, featured: true };
  }

  if (label.includes("Admit Card")) {
    return { tag: "Download", icon: FileText, featured: true };
  }

  if (label.includes("Notification")) {
    return { tag: "New", icon: Sparkles, featured: false };
  }

  if (label.includes("Annexure-I")) {
    return { tag: "Guide", icon: FileText, featured: false };
  }

  return { tag: "Sample", icon: Images, featured: false };
};

const sectionRevealProps = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
};

function getYouTubeThumbnail(embedUrl: string) {
  const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
  const videoId = match?.[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
}

const heroSlides = [
  {
    title: "",
    note: "शिक्षा, आत्मविश्वास और नेतृत्व से जुड़ी पहलें",
    accent: "नई दिशा",
    stat: "150+ गाँव",
    statNote: "प्रभावित",
    image: heroSlide1,
  },
  {
    title: "",
    note: "प्रतिभा खोज, मार्गदर्शन और सतत सार्थक सहयोग",
    accent: "सतत अभियान",
    stat: "25+ पहल",
    statNote: "शैक्षिक केंद्र",
    image: heroSlide2,
  },
  {
    title: "",
    note: "स्वच्छता, पर्यावरण और सामुदायिक भागीदारी",
    accent: "हरित संकल्प",
    stat: "1000+ पौधे",
    statNote: "संरक्षण अभियान",
    image: heroSlide3,
  }, {
    title: "",
    note: "शिक्षा, आत्मविश्वास और नेतृत्व से जुड़ी पहलें",
    accent: "नई दिशा",
    stat: "150+ गाँव",
    statNote: "प्रभावित",
    image: heroSlide4,
  },
  {
    title: "",
    note: "प्रतिभा खोज, मार्गदर्शन और सतत सार्थक सहयोग",
    accent: "सतत अभियान",
    stat: "25+ पहल",
    statNote: "शैक्षिक केंद्र",
    image: heroSlide5,
  },
  {
    title: "",
    note: "स्वच्छता, पर्यावरण और सामुदायिक भागीदारी",
    accent: "हरित संकल्प",
    stat: "1000+ पौधे",
    statNote: "संरक्षण अभियान",
    image: heroSlide6,
  },
] as const;

const initiatives = [
  {
    title: "जन जागरूकता",
    desc: "टीम सरकारी योजनाओं की जानकारी लोगों तक पहुंचाने, लाभार्थियों तक उनका लाभ पहुंचाने और समूह आधारित सामाजिक संगठन विकसित करने का कार्य करती है।",
    icon: Sparkles,
    accent: "from-accent/20 to-transparent",
  },
  {
    title: "ग्रामीण शिक्षा सबलीकरण",
    desc: "ग्रामीण प्रतिभाओं को निखारने, प्रोत्साहित करने, मार्गदर्शन देने और गरीब व जरूरतमंद विद्यार्थियों को आर्थिक सार्थक सहयोग प्रदान करने के उद्देश्य से प्रतियोगिताओं और शैक्षिक पहलों का संचालन किया जाता है।",
    icon: GraduationCap,
    accent: "from-primary/15 to-transparent",
  },
  {
    title: "SBGBT उत्थान संकल्पना",
    desc: "उत्थान भवन, उत्थान लाइब्रेरी और उत्थान कोचिंग संस्थान के माध्यम से युवाओं को राष्ट्र के समृद्ध मानव संसाधन के रूप में तैयार करने का सतत प्रयास।",
    icon: BookOpen,
    accent: "from-leaf/15 to-transparent",
  },
  {
    title: "महिला सशक्तिकरण",
    desc: "ग्रामीण क्षेत्र की प्रतिभाशाली बच्चियों और महिलाओं को शिक्षा, मार्गदर्शन, स्वावलंबन, आत्मविश्वास और स्वरोजगार के अवसरों से जोड़ना।",
    icon: Users2,
    accent: "from-earth/15 to-transparent",
  },
  {
    title: "स्मार्ट विलेज योजना",
    desc: "गांवों में सकारात्मक सोच, जन जागरूकता और विकास के लिए जनचेतना पैदा करना ताकि लोग अपने अधिकारों और कर्तव्यों के प्रति संवेदनशील बनें।",
    icon: Landmark,
    accent: "from-primary/15 to-transparent",
  },
  {
    title: "पंचायती राज सुदृढ़ीकरण प्रयास",
    desc: "ग्रामीणों को सरकारी योजनाओं और विकास कार्यक्रमों की जानकारी देना तथा सरकारी एजेंसियों के साथ समन्वय बनाकर लाभार्थियों तक योजनाओं का लाभ पहुंचाना।",
    icon: FileText,
    accent: "from-accent/15 to-transparent",
  },
  {
    title: "आत्मनिर्भर व समृद्ध गांव संकल्पना",
    desc: "वित्तीय समावेशन सुनिश्चित करने, वित्तीय साक्षरता बढ़ाने और क्रेडिट योजनाओं के महत्व के प्रति ग्रामीणों को जागरूक करने का अभियान।",
    icon: ArrowRight,
    accent: "from-leaf/15 to-transparent",
  },
  {
    title: "पर्यावरण संरक्षण व संवर्धन कार्यक्रम",
    desc: "\"ग्रीन विलेज - क्लीन विलेज\" अभियान के माध्यम से स्वच्छता और पर्यावरण संरक्षण के प्रति जन जागरूकता पैदा करना और गांव-गांव में अभियान को सक्रिय रखना।",
    icon: Leaf,
    accent: "from-leaf/20 to-transparent",
  },
  {
    title: "जन स्वस्थ - राष्ट्र स्वस्थ",
    desc: "स्वस्थ गांव और स्वस्थ समाज के लिए जागरूकता, सामुदायिक सार्थक सहयोग और जीवन रक्षा से जुड़े अभियानों का संचालन।",
    icon: HeartPulse,
    accent: "from-accent/15 to-transparent",
  },
  {
    title: "समाज व राष्ट्र निर्माण प्रयास",
    desc: "गांवों की स्थानीय समस्याओं पर विचार करना, स्थानीय स्तर पर समाधान ढूंढना और गांव विकास समितियों का गठन कर विकास को गति देना।",
    icon: Users2,
    accent: "from-earth/15 to-transparent",
  },
];

type InitiativeCard = {
  id?: string;
  title: string;
  desc: string;
  icon: typeof Sparkles;
  accent: string;
};

function getInitiativePreviewText(value: string, maxLength = 120) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const shortened = normalized.slice(0, maxLength);
  const safeCut = shortened.lastIndexOf(" ");

  return `${(safeCut > 60 ? shortened.slice(0, safeCut) : shortened).trim()}...`;
}

const initiativeFrameBackgrounds = [
  initiativeBgOne,
  initiativeBgTwo,
  initiativeBgThree,
] as const;

const initiativeBadgeTones = [
  {
    inner: "border-[#8ec1b3] bg-[#7fb5a6] text-white",
    ring: "border-[#d7e7e0] bg-white/88",
    innerRing: "border-white/22",
  },
  {
    inner: "border-accent/55 bg-accent text-accent-foreground",
    ring: "border-accent/20 bg-white/88",
    innerRing: "border-white/24",
  },
  {
    inner: "border-[#184c41] bg-[#113f37] text-white",
    ring: "border-[#d7e7e0] bg-white/88",
    innerRing: "border-white/18",
  },
] as const;

const initiativeHighlights = [
  {
    title: "गांव से शुरुआत",
    value: "10",
    note: "मुख्य अभियान जिन्हें प्रमुख रूप से दिखाया गया है",
  },
  {
    title: "कार्य की दिशा",
    value: "360°",
    note: "शिक्षा, जागरूकता, स्वास्थ्य, पर्यावरण और नेतृत्व का संयुक्त प्रभाव",
  },
  {
    title: "मूल भाव",
    value: "सहभागिता",
    note: "हर पहल गांव के लोगों को साथ लेकर आगे बढ़ती है",
  },
];

const videos = [
  {
    title: "शिक्षा का मंदिर_ उत्थान भवन सरमथुरा",
    embedUrl: "https://www.youtube.com/embed/Mqw26LHHR9E?autoplay=1&rel=0",
    image: galLib,
    tag: "शैक्षिक पहल",
  },
  {
    title: "मानवता की सेवा ही ईश्वर की सेवा है",
    embedUrl: "https://www.youtube.com/embed/kUMosORZmOo?autoplay=1&rel=0",
    image: galHealth,
    tag: "समाजसेवा",
  },
  {
    title: "सोच बदलो गाँव बदलो यात्रा",
    embedUrl: "https://www.youtube.com/embed/3RjwYoCyWrI?autoplay=1&rel=0",
    image: galVillage,
    tag: "जनजागरूकता",
  },
  {
    title: "स्थापना दिवस की शुभकामनाएँ व बधाइयाँ।",
    embedUrl: "https://www.youtube.com/embed/mycj-BJ08Wk?autoplay=1&rel=0",
    image: galAwards,
    tag: "संस्था परिचय",
  },
  {
    title: "स्मार्ट विलेज कॉन्सेप्ट एंड अचीवमेंट्स",
    embedUrl: "https://www.youtube.com/embed/DH3KPEHgAA4?autoplay=1&rel=0",
    image: galEnv,
    tag: "ग्रीन विलेज",
  },
  {
    title: "ज़िंदगी को ऐसे जिया कि लोगों के लिए प्रेरणा बन गए",
    embedUrl: "https://www.youtube.com/embed/wy3rBd3F-hg?autoplay=1&rel=0",
    image: galWomen,
    tag: "महिला सशक्तिकरण",
  },
];

const mediaMonthLabels: Record<string, string> = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
  january: "Jan",
  february: "Feb",
  march: "Mar",
  april: "Apr",
  may: "May",
  june: "Jun",
  july: "Jul",
  august: "Aug",
  september: "Sep",
  october: "Oct",
  november: "Nov",
  december: "Dec",
  "जनवरी": "Jan",
  "फ़रवरी": "Feb",
  "फरवरी": "Feb",
  "मार्च": "Mar",
  "अप्रैल": "Apr",
  "मई": "May",
  "जून": "Jun",
  "जुलाई": "Jul",
  "अगस्त": "Aug",
  "सितंबर": "Sep",
  "अक्टूबर": "Oct",
  "नवंबर": "Nov",
  "दिसंबर": "Dec",
};

function getMediaDateParts(date: string) {
  const compactDate = date.trim().replace(/\s+/g, " ");
  const slashMatch = compactDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    return {
      day: day.padStart(2, "0"),
      month: mediaMonthLabels[month.padStart(2, "0")] ?? month.padStart(2, "0"),
      year,
    };
  }

  const monthFirstMatch = compactDate.match(/^(.+?)\s+(\d{1,2})\s+(\d{4})$/);
  if (monthFirstMatch) {
    const [, monthLabel, day, year] = monthFirstMatch;
    return {
      day: day.padStart(2, "0"),
      month: mediaMonthLabels[monthLabel.toLowerCase()] ?? monthLabel.slice(0, 3),
      year,
    };
  }

  const dayFirstMatch = compactDate.match(/^(\d{1,2})\s+(.+?)\s+(\d{4})$/);
  if (dayFirstMatch) {
    const [, day, monthLabel, year] = dayFirstMatch;
    return {
      day: day.padStart(2, "0"),
      month: mediaMonthLabels[monthLabel.toLowerCase()] ?? monthLabel.slice(0, 3),
      year,
    };
  }

  return {
    day: compactDate.slice(0, 2),
    month: compactDate.slice(2, 5),
    year: compactDate.slice(-4),
  };
}

const latestMediaItemsHindi = [
  {
    date: "जुलाई 18 2018",
    title: "गांवों में पौधारोपण अभियान चलाया जाता है",
    category: "सोच बदलो गांव बदलो यात्रा",
  },
  {
    date: "जुलाई 18 2018",
    title: "चंबल के बीहड़ों से निकले देश का मॉडल विलेज",
    category: "ग्रामीण विकास: जागरूकता लेख",
  },
  {
    date: "20 जून 2018",
    title: "हर गांव धनौरा की तरह आदर्श बने- नन्नूमल पहाड़िया",
    category: "सोच बदलो गांव बदलो यात्रा",
  },
  {
    date: "जुलाई 18 2018",
    title: "सोच बदलो – गाँव बदलो की जनजागृति ने दी स्मार्ट विलेज धनौरा को विकसित गाँव की पहचान",
    category: "सोच बदलो गांव बदलो यात्रा",
  },
] as const;

const latestMediaItemVisualsHindi = [
  {
    image: mediaSbgb01,
    summary:
      "दैनिक भास्कर में प्रकाशित यह कवरेज गांवों में चल रहे पौधारोपण अभियान और उससे जुड़ी जनभागीदारी को प्रमुखता से सामने लाती है।",
  },
  {
    image: mediaSbgb02,
    summary:
      "यह रिपोर्ट चंबल क्षेत्र से उभरे मॉडल विलेज की पहचान और राष्ट्रीय स्तर पर उसके प्रभाव को रेखांकित करती है।",
  },
  {
    image: mediaSbgb03,
    summary:
      "धौलपुर भास्कर में प्रकाशित यह लेख धनौरा गांव को आदर्श गांव बनाने की दिशा में चल रहे विचार और प्रेरणा को सामने लाता है।",
  },
  {
    image: mediaSbgb04,
    summary:
      "हिंदुस्तान एक्सप्रेस की यह खबर स्मार्ट विलेज धनौरा को विकसित गांव की पहचान मिलने और जनजागृति अभियान के असर को दर्शाती है।",
  },
] as const;

const mediaCoverageLabels = [
  "पर्यावरण अभियान",
  "मॉडल विलेज पहल",
  "प्रेरक संवाद",
  "जनजागृति अभियान",
] as const;

const platformStyle = {
  facebook: { icon: Facebook, label: "Facebook", bg: "#1877F2" },
  x: { icon: Twitter, label: "X", bg: "#0f1419" },
  instagram: { icon: Instagram, label: "Instagram", bg: "#d62976" },
  youtube: { icon: Youtube, label: "YouTube", bg: "#FF0000" },
};

const galleryItems = [
  { src: galVillage, title: "# ग्रीन विलेज # क्लीन विलेज" },
  { src: galLib, title: "आओ पढे-आगे बढे" },
  { src: galAwards, title: "Journey 4" },
  { src: galWomen, title: "Journey 2" },
  { src: galEnv, title: "Journey 1" },
  { src: galHealth, title: "ब्लड की कमी से किसी की जान नहीं जा सकेगी" },
];

void galleryItems;

const featuredGalleryItems = [
  { src: greenVillage, title: "# à¤—à¥à¤°à¥€à¤¨ à¤µà¤¿à¤²à¥‡à¤œ # à¤•à¥à¤²à¥€à¤¨ à¤µà¤¿à¤²à¥‡à¤œ" },
  { src: educationDriveGallery, title: "à¤†à¤“ à¤ªà¤¢à¥‡à¤‚, à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¥‡à¤‚" },
  { src: womenEmpowermentGallery, title: "à¤®à¤¹à¤¿à¤²à¤¾ à¤¸à¤¶à¤•à¥à¤¤à¤¿à¤•à¤°à¤£" },
  { src: humanServiceGallery, title: "à¤®à¤¾à¤¨à¤µà¤¤à¤¾ à¤¸à¥‡à¤µà¤¾" },
  { src: thoughtChangeGallery, title: "à¤¸à¥‹à¤š à¤¬à¤¦à¤²à¥‹ à¤…à¤­à¤¿à¤¯à¤¾à¤¨" },
  { src: awarenessGallery, title: "à¤œà¤¨à¤œà¤¾à¤—à¤°à¥‚à¤•à¤¤à¤¾ à¤•à¥‡ à¤¦à¥ƒà¤¶à¥à¤¯" },
] as const;

const readableFeaturedGalleryItems = [
  {
    src: educationDriveGallery,
    title: "\u0936\u093f\u0915\u094d\u0937\u093e \u092a\u093e\u0913-\u091c\u094d\u091e\u093e\u0928 \u092c\u0922\u093c\u093e\u0913",
    category: "\u0936\u093f\u0915\u094d\u0937\u093e \u092a\u093e\u0913-\u091c\u094d\u091e\u093e\u0928 \u092c\u0922\u093c\u093e\u0913",
    year: "2024",
    date: "30-01-2021",
  },
  {
    src: greenVillage,
    title: "\u0023 \u0917\u094d\u0930\u0940\u0928 \u0935\u093f\u0932\u0947\u091c \u0023 \u0915\u094d\u0932\u0940\u0928 \u0935\u093f\u0932\u0947\u091c",
    category: "\u0915\u094d\u0932\u0940\u0928 \u0935\u093f\u0932\u0947\u091c-\u0917\u094d\u0930\u0940\u0928 \u0935\u093f\u0932\u0947\u091c",
    year: "2024",
    date: "30-01-2021",
  },
  {
    src: womenEmpowermentGallery,
    title: "\u092c\u093e\u0932\u093f\u0915\u093e \u0936\u093f\u0915\u094d\u0937\u093e \u0939\u0940 \u092e\u0939\u093f\u0932\u093e \u0938\u0936\u0915\u094d\u0924\u093f\u0915\u0930\u0923 \u0915\u093e \u0906\u0927\u093e\u0930 \u0939\u0948",
    category: "\u092e\u0939\u093f\u0932\u093e \u0938\u0936\u0915\u094d\u0924\u093f\u0915\u0930\u0923",
    year: "2024",
    date: "30-01-2021",
  },
  {
    src: humanServiceGallery,
    title: "\u092c\u094d\u0932\u0921 \u0915\u0940 \u0915\u092e\u0940 \u0938\u0947 \u0915\u093f\u0938\u0940 \u0915\u0940 \u091c\u093e\u0928 \u0928\u0939\u0940\u0902 \u091c\u093e \u0938\u0915\u0947\u0917\u0940",
    category: "\u0930\u0915\u094d\u0924\u0926\u093e\u0928 \u092e\u0939\u093e\u0926\u093e\u0928",
    year: "2024",
    date: "30-01-2021",
  },
  {
    src: thoughtChangeGallery,
    title: "\u0938\u093e\u092e\u093e\u091c\u093f\u0915 \u0915\u094d\u0930\u093e\u0902\u0924\u093f, \u0938\u094d\u092e\u093e\u0930\u094d\u091f \u0917\u093e\u0901\u0935 \u0938\u094d\u092e\u093e\u0930\u094d\u091f \u0938\u094b\u091a",
    category: "\u0936\u093f\u0915\u094d\u0937\u093e \u092a\u093e\u0913-\u091c\u094d\u091e\u093e\u0928 \u092c\u0922\u093c\u093e\u0913",
    year: "2024",
    date: "30-01-2021",
  },
  {
    src: awarenessGallery,
    title: "\u0909\u0924\u094d\u0925\u093e\u0928 \u0915\u094b\u091a\u093f\u0902\u0917 \u0938\u0902\u0938\u094d\u0925\u093e\u0928",
    category: "\u0909\u0924\u094d\u0925\u093e\u0928 \u0915\u094b\u091a\u093f\u0902\u0917 \u0938\u0902\u0938\u094d\u0925\u093e\u0928",
    year: "2024",
    date: "30-01-2021",
  },
] as const;

const socialRevolutionFeaturedItem = {
  src: socialRevolutionGallery,
  title: "\u0938\u093e\u092e\u093e\u091c\u093f\u0915 \u0915\u094d\u0930\u093e\u0902\u0924\u093f",
  category: "\u0938\u093e\u092e\u093e\u091c\u093f\u0915 \u0915\u094d\u0930\u093e\u0902\u0924\u093f",
  year: "2024",
  date: "30-01-2021",
} as const;

const featuredGalleryLayout = [
  "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
] as const;

const socialUpdates = [
  {
    platform: "facebook",
    date: "26 जुलाई 2026",
    title: "हुलासपुरा गाँव की बदलती तस्वीर",
    caption:
      "बरौली क्षेत्र के हुलासपुरा गाँव में कीचड़ और जलभराव से भरे रास्ते अब पक्की सड़क में बदल चुके हैं — विकसित गाँव के संकल्प की एक सशक्त मिसाल।",
    image: socialPostHulaspura,
    link: "https://facebook.com/photo.php?fbid=1497575359073707&set=a.623344943163424&type=3",
  },
  {
    platform: "facebook",
    date: "25 जुलाई 2026",
    title: "'तू ज़िन्दा है तो ज़िन्दगी की जीत में यकीन कर'",
    caption:
      "उम्मीद, संघर्ष और नए सवेरे के जज़्बे को समर्पित एक प्रेरणादायक रचना — हर मुश्किल के बाद बहार ज़रूर आती है।",
    image: socialPostTuZindaHai,
    link: "https://facebook.com/photo?fbid=1496311602533416&set=a.623344943163424",
  },
  {
    platform: "x",
    date: "01 मई 2024",
    title: "धरती माँ के संरक्षण का संदेश — टाटा पावर के साथ",
    caption:
      "\"धरती मां के संरक्षण और संवर्धन का संदेश देता टाटा पावर का दमदार और प्रभावशाली वीडियो।\" हमारे दिन प्रतिदिन का व्यवहार ही प्रकृति मां को आने वाली पीढ़ियों के लिए संरक्षित कर सकता है।",
    image: socialPostTataPower,
    link: "https://x.com/DrSatyapal_IRS/status/1785551206443593737",
    isVideo: true,
    duration: "02:39",
  },
  {
    platform: "facebook",
    date: "25 जुलाई 2026",
    title: "'तू ज़िन्दा है तो ज़िन्दगी की जीत में यकीन कर'",
    caption:
      "उम्मीद, संघर्ष और नए सवेरे के जज़्बे को समर्पित एक प्रेरणादायक रचना — हर मुश्किल के बाद बहार ज़रूर आती है।",
    image: socialPostTuZindaHai,
    link: "https://facebook.com/photo?fbid=1496311602533416&set=a.623344943163424",
  },
  {
    platform: "x",
    date: "01 मई 2024",
    title: "धरती माँ के संरक्षण का संदेश — टाटा पावर के साथ",
    caption:
      "\"धरती मां के संरक्षण और संवर्धन का संदेश देता टाटा पावर का दमदार और प्रभावशाली वीडियो।\" हमारे दिन प्रतिदिन का व्यवहार ही प्रकृति मां को आने वाली पीढ़ियों के लिए संरक्षित कर सकता है।",
    image: socialPostTataPower,
    link: "https://x.com/DrSatyapal_IRS/status/1785551206443593737",
    isVideo: true,
    duration: "02:39",
  },
];

function SocialUpdateCard({ item }: { item: (typeof socialUpdates)[number] }) {
  const meta = platformStyle[item.platform as keyof typeof platformStyle];
  const Icon = meta.icon;

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative w-[86%] shrink-0 snap-center overflow-hidden rounded-[1.9rem] border border-[#255247]/12 bg-[#fbf7ef] shadow-[0_22px_44px_-30px_rgba(17,63,52,0.4)] sm:w-[62%] lg:w-[30%]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

        {/* Platform badge */}
        <div
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-xs font-semibold text-white shadow-lg backdrop-blur"
          style={{ backgroundColor: meta.bg }}
        >
          <span className="grid size-6 place-items-center rounded-full bg-white/20">
            <Icon className="size-3.5" />
          </span>
          {meta.label}
        </div>

        {/* Date chip */}
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#143c35] shadow">
          {item.date}
        </div>

        {/* Video overlay: play icon + duration */}
        {item.isVideo && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid size-14 place-items-center rounded-full bg-white/90 shadow-lg transition duration-300 group-hover:scale-110">
                <ArrowRight className="size-6 -rotate-45 text-[#143c35]" strokeWidth={2.4} />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 rounded bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white">
              {item.duration}
            </div>
          </>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-black leading-snug text-[#143c35]">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5e6c67]">
          {item.caption}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5">
          पूरी पोस्ट देखें <ArrowRight className="size-3.5" />
        </span>
      </div>
    </motion.a>
  );
}

function Home() {
  const [dynamicInitiatives, setDynamicInitiatives] = useState<InitiativeCard[]>(initiatives);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(2);
  const [videoCarouselPosition, setVideoCarouselPosition] = useState(videos.length + 2);
  const [activeInitiativeIndex, setActiveInitiativeIndex] = useState(1);
  const [initiativeCarouselPosition, setInitiativeCarouselPosition] = useState(initiatives.length + 1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const videoCarouselRef = useRef<HTMLDivElement | null>(null);
  const initiativeCarouselRef = useRef<HTMLDivElement | null>(null);
  const stackSectionRef = useRef<HTMLDivElement | null>(null);
  const videoResetTimerRef = useRef<number | null>(null);
  const initiativeResetTimerRef = useRef<number | null>(null);
  const [isDesktopStack, setIsDesktopStack] = useState(false);

  const socialScrollRef = useRef<HTMLDivElement | null>(null);
  const socialAutoScrollPausedRef = useRef(false);
  const autoSlideRef = useRef<number | null>(null);
  const initiativeCount = dynamicInitiatives.length || 1;

  useEffect(() => {
    let isMounted = true;

    fetchPublicActivities()
      .then((rows) => {
        if (!isMounted) {
          return;
        }

        const activeRows = rows.filter((row) => row.is_active && row.status === 1);

        if (activeRows.length === 0) {
          return;
        }

        const mapped = activeRows.map((row, index) => ({
          id: row.id,
          title: row.name,
          desc: getInitiativePreviewText(
            getPlainActivityText(row.description) || initiatives[index % initiatives.length]?.desc || "",
          ),
          icon: initiatives[index % initiatives.length]?.icon || Sparkles,
          accent: initiatives[index % initiatives.length]?.accent || "from-primary/15 to-transparent",
        }));

        setDynamicInitiatives(mapped);
        setActiveInitiativeIndex(0);
        setInitiativeCarouselPosition(mapped.length + 1);
      })
      .catch(() => {
        // Keep fallback homepage content when live activities are unavailable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    autoSlideRef.current = window.setInterval(() => {
      setVideoCarouselPosition((prev) => prev + 1);
    }, 3000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncDesktop = () => setIsDesktopStack(mediaQuery.matches);

    syncDesktop();
    mediaQuery.addEventListener("change", syncDesktop);

    return () => mediaQuery.removeEventListener("change", syncDesktop);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const currentHeroSlide = heroSlides[activeHeroSlide];
  const nextHeroSlide = heroSlides[(activeHeroSlide + 1) % heroSlides.length];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveVideoIndex((current) => (current + 1) % videos.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setInitiativeCarouselPosition((current) => current + 1);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const handleMouseMove = (event: MouseEvent) => {
      if (!mediaQuery.matches) {
        return;
      }

      setCursorPosition({ x: event.clientX, y: event.clientY });
      setCursorVisible(true);
      setHeroOffset({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
      setHeroOffset({ x: 0, y: 0 });
    };

    const handleTouchStart = () => {
      setCursorVisible(false);
      setHeroOffset({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const getWrappedVideoIndex = (offset: number) => (activeVideoIndex + offset + videos.length) % videos.length;
  const visibleVideos = [
    { video: videos[getWrappedVideoIndex(-1)], offset: -1 },
    { video: videos[getWrappedVideoIndex(0)], offset: 0 },
    { video: videos[getWrappedVideoIndex(1)], offset: 1 },
  ] as const;
  const progressCircumference = 188.5;
  const progressOffset =
    progressCircumference - (progressCircumference * scrollProgress) / 100;
  const loopedVideos = [...videos, ...videos, ...videos];
  const loopedInitiatives = [...dynamicInitiatives, ...dynamicInitiatives, ...dynamicInitiatives];

  // SBGBT के प्रेरक वीडियो।

  useEffect(() => {
    const container = videoCarouselRef.current;
    if (!container) {
      return;
    }

    const cards = container.querySelectorAll<HTMLElement>("[data-video-card]");
    const targetCard = cards[videoCarouselPosition];

    if (!targetCard) {
      return;
    }

    container.scrollTo({
      left: targetCard.offsetLeft,
      behavior: "smooth",
    });

    if (videoResetTimerRef.current) {
      window.clearTimeout(videoResetTimerRef.current);
    }

    if (videoCarouselPosition >= videos.length * 2 || videoCarouselPosition < videos.length) {
      videoResetTimerRef.current = window.setTimeout(() => {
        const normalizedIndex = ((videoCarouselPosition % videos.length) + videos.length) % videos.length;
        const resetPosition = videos.length + normalizedIndex;
        const resetCard = cards[resetPosition];

        if (!resetCard || !videoCarouselRef.current) {
          return;
        }

        videoCarouselRef.current.scrollTo({
          left: resetCard.offsetLeft,
          behavior: "auto",
        });
        setVideoCarouselPosition(resetPosition);
      }, 720);
    }

    return () => {
      if (videoResetTimerRef.current) {
        window.clearTimeout(videoResetTimerRef.current);
      }
    };
  }, [videoCarouselPosition]);

  useEffect(() => {
    const container = initiativeCarouselRef.current;
    if (!container) {
      return;
    }

    const cards = container.querySelectorAll<HTMLElement>("[data-initiative-card]");
    const targetCard = cards[initiativeCarouselPosition];

    if (!targetCard) {
      return;
    }

    container.scrollTo({
      left: targetCard.offsetLeft,
      behavior: "smooth",
    });

    setActiveInitiativeIndex(
      ((initiativeCarouselPosition % initiativeCount) + initiativeCount) % initiativeCount,
    );

    if (initiativeResetTimerRef.current) {
      window.clearTimeout(initiativeResetTimerRef.current);
    }

    if (
      initiativeCarouselPosition >= initiativeCount * 2 ||
      initiativeCarouselPosition < initiativeCount
    ) {
      initiativeResetTimerRef.current = window.setTimeout(() => {
        const normalizedIndex =
          ((initiativeCarouselPosition % initiativeCount) + initiativeCount) % initiativeCount;
        const resetPosition = initiativeCount + normalizedIndex;
        const resetCard = cards[resetPosition];

        if (!resetCard || !initiativeCarouselRef.current) {
          return;
        }

        initiativeCarouselRef.current.scrollTo({
          left: resetCard.offsetLeft,
          behavior: "auto",
        });
        setInitiativeCarouselPosition(resetPosition);
      }, 720);
    }

    return () => {
      if (initiativeResetTimerRef.current) {
        window.clearTimeout(initiativeResetTimerRef.current);
      }
    };
  }, [initiativeCarouselPosition, initiativeCount]);

  useEffect(() => {
    const container = socialScrollRef.current;
    if (!container) {
      return;
    }

    const interval = window.setInterval(() => {
      if (socialAutoScrollPausedRef.current) {
        return;
      }

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 4) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = container.querySelector<HTMLElement>("[data-social-card]")?.offsetWidth ?? 320;
        container.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
      }
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f0df_0%,#f1ecd7_28%,#f7f3e7_100%)] text-foreground">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(241,189,26,0.12),0_0_18px_rgba(241,189,26,0.24)] mix-blend-normal lg:block"
        animate={{
          x: cursorPosition.x - 5,
          y: cursorPosition.y - 5,
          opacity: cursorVisible ? 1 : 0,
          scale: cursorVisible ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.8 }}
      />
      <SiteHeader />

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f463c_0%,#145446_48%,#193e34_100%)] pt-10 text-cream">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[48px] overflow-hidden">
          <div
            className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat"
            style={{ backgroundImage: `url(${heroDividerRough})`, filter: "contrast(1.02)" }}
          />
          <div className="absolute inset-x-0 top-0 h-[16px] bg-[linear-gradient(180deg,#f5f0df_0%,#f5f0df_48%,rgba(245,240,223,0.82)_72%,rgba(245,240,223,0)_100%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%,rgba(0,0,0,0.12)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex -translate-y-1 items-center gap-2 rounded-full border border-cream/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cream shadow-sm backdrop-blur sm:-translate-y-2"
            >
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_18px_rgba(241,189,26,0.9)]" />
              सोच बदलो, गांव बदलो टीम
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                x: heroOffset.x * -10,
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] },
                x: { type: "spring", stiffness: 90, damping: 18, mass: 1.1 },
              }}
              className="mt-7 font-display text-4xl font-black leading-[1.08] text-balance text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:mt-8 sm:text-5xl lg:mt-10 lg:text-7xl lg:leading-[1.04]"
            >
              शिक्षा, जनजागरूकता और
              <span className="block text-accent drop-shadow-[0_6px_18px_rgba(0,0,0,0.24)]">ग्राम उत्थान की सशक्त पहल।</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{
                opacity: 1,
                y: 0,
                x: heroOffset.x * -6,
              }}
              transition={{
                opacity: { duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] },
                x: { type: "spring", stiffness: 84, damping: 18, mass: 1.15 },
              }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-cream/88 sm:text-lg"
            >
              SBGBT शिक्षा, जन जागरूकता, महिला सशक्तिकरण, स्मार्ट विलेज, पर्यावरण संरक्षण,
              स्वास्थ्य और समाज व राष्ट्र निर्माण जैसे कार्यों के माध्यम से ग्रामीण समाज को
              मजबूत बनाने के लिए लगातार प्रयासरत है।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                x: heroOffset.x * -4,
              }}
              transition={{
                opacity: { duration: 0.66, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.66, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
                x: { type: "spring", stiffness: 80, damping: 18, mass: 1.2 },
              }}
              className="premium-capsule relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] px-4 py-2 text-cream backdrop-blur-md transition duration-500 hover:-translate-y-0.5 hover:border-white/18"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(241,189,26,0.08),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
              <span className="relative grid size-11 place-items-center rounded-full bg-accent/12 ring-1 ring-accent/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <img
                  src={heroHeartSprade}
                  alt=""
                  aria-hidden="true"
                  className="hero-heartbeat h-8 w-8 object-contain"
                  width={32}
                  height={32}
                />
              </span>
              <span className="relative text-sm font-medium text-cream/92 sm:text-[15px]">
                हर सहयोग से बदलाव की धड़कन और मजबूत होती है
              </span>
            </motion.div>

            <div className="hidden">
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/6 p-3 shadow-[0_28px_55px_-34px_rgba(0,0,0,0.88)] backdrop-blur">
                <motion.div className="relative overflow-hidden rounded-[1.8rem]">
                  <img
                    src={currentHeroSlide.image}
                    alt={currentHeroSlide.title}
                    className="h-[360px] w-full object-cover transition duration-700"
                    width={900}
                    height={1200}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-white/10" />

                  <div className="absolute left-4 top-4 rounded-[1.35rem] bg-[#f8f3e7] px-4 py-3 text-ink shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                        <GraduationCap className="size-5" />
                      </div>
                      <div>
                        <div className="text-base font-black text-primary">SPGBP 2025-26</div>
                        <div className="text-xs text-ink/70">रजिस्ट्रेशन प्रारंभ</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 rounded-[1.35rem] bg-[#f8f3e7] px-4 py-3 text-ink shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                        <Leaf className="size-5" />
                      </div>
                      <div>
                        <div className="text-base font-black text-primary">{currentHeroSlide.stat}</div>
                        <div className="text-xs text-ink/70">{currentHeroSlide.statNote}</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
                      <BadgeCheck className="size-3.5 text-accent" />
                      {currentHeroSlide.accent}
                    </div>
                    <div className="mt-3 font-display text-3xl font-black">{currentHeroSlide.title}</div>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/92">
                      {currentHeroSlide.note}
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>

          <motion.div
            className="group/hero relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: heroOffset.y * 10,
              x: heroOffset.x * 12,
            }}
            transition={{
              opacity: { duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] },
              y: { type: "spring", stiffness: 82, damping: 18, mass: 1.15 },
              x: { type: "spring", stiffness: 82, damping: 18, mass: 1.15 },
            }}
          >
            <div className="relative z-10 rounded-[2rem] shadow-[0_38px_80px_-32px_rgba(0,0,0,0.95)]">
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5]">
                <img
                  src={currentHeroSlide.image}
                  alt={currentHeroSlide.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-700"
                  // className="aspect-[4/5] w-full scale-[1.02] object-center transition duration-700 sm:aspect-[5/6]"
                  width={1600}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream sm:p-6">
                  <div className="mt-3 font-display text-2xl font-black sm:text-3xl">
                    {currentHeroSlide.title}
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/92">
                    {/* {currentHeroSlide.note} */}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 opacity-0 transition duration-300 group-hover/hero:opacity-100 lg:flex xl:-right-10">
              <button
                type="button"
                onClick={() => setActiveHeroSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)}
                aria-label="Previous slide"
                className="pointer-events-none grid size-14 place-items-center rounded-full border border-white/20 bg-[#0f463c] text-cream shadow-[0_22px_40px_-22px_rgba(0,0,0,0.7)] transition duration-300 motion-safe:animate-[floatArrow_3.2s_ease-in-out_infinite] group-hover/hero:pointer-events-auto hover:-translate-y-0.5 hover:brightness-110"
              >
                <ArrowRight className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setActiveHeroSlide((current) => (current + 1) % heroSlides.length)}
                aria-label="Next slide"
                className="pointer-events-none grid size-14 place-items-center rounded-full border border-accent/40 bg-accent text-accent-foreground shadow-[0_22px_40px_-22px_rgba(0,0,0,0.7)] transition duration-300 motion-safe:animate-[floatArrow_3.2s_ease-in-out_infinite_180ms] group-hover/hero:pointer-events-auto hover:translate-y-0.5 hover:brightness-95"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
            <motion.div
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-transparent to-[#2f7a65]/30 blur-3xl"
              animate={{ x: heroOffset.x * 22, y: heroOffset.y * 18 }}
              transition={{ type: "spring", stiffness: 72, damping: 18, mass: 1.18 }}
            />
            <div className="hidden absolute -right-3 top-14 w-[34%] overflow-hidden rounded-[1.75rem] bg-[#f8f3e7]/92 shadow-[0_26px_48px_-32px_rgba(0,0,0,0.72)] backdrop-blur">
              <img
                src={nextHeroSlide.image}
                alt={nextHeroSlide.title}
                className="aspect-[3/4] w-full object-cover object-center"
                width={900}
                height={1200}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
                <div className="text-[10px] uppercase tracking-[0.24em] text-cream/75">Next Focus</div>
                <div className="mt-2 font-display text-xl font-black leading-tight">
                  ग्रामीण शिक्षा सबलीकरण
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/92">
                  ग्रामीण प्रतिभाओं को निखारने, उनको प्रोत्साहित करने, मार्गदर्शन देने और
                  जरूरतमंद विद्यार्थियों को सार्थक सहयोग प्रदान करने की सतत पहल।
                </p>
              </div>
            </div>

            <div className="hidden absolute -left-3 top-8 rounded-[1.5rem] border border-white/12 bg-[#f5efd9]/95 p-4 text-ink shadow-xl backdrop-blur sm:-left-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink/55">
                विशेष सूचना
              </div>
              <div className="mt-1 font-display text-lg font-black text-primary">SPGBP 2025-26</div>
              <div className="text-sm text-muted-foreground">रजिस्ट्रेशन प्रारंभ</div>
            </div>

            <div className="hidden absolute bottom-8 right-4 rounded-[1.35rem] bg-[#f8f3e7] px-4 py-3 text-ink shadow-xl sm:right-6">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Leaf className="size-5" />
                </div>
                <div>
                  <div className="text-base font-black text-primary">{currentHeroSlide.stat}</div>
                  <div className="text-xs text-ink/70">{currentHeroSlide.statNote}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        {...sectionRevealProps}
        className="border-y border-[#255247]/20 bg-[linear-gradient(180deg,#f1ebd4_0%,#efe7cd_100%)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-md">
                <Sparkles className="size-5" />
              </div>
              <div className="w-full">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-earth">महत्वपूर्ण सूचना</div>
                <p className="mt-1 max-w-none font-hi text-base leading-relaxed sm:text-lg lg:whitespace-nowrap">
                  शिक्षा पाओ-ज्ञान बढ़ाओ प्रतियोगिता (SPGBP):2025-26 रजिस्ट्रेशन प्रारंभ -
                  अधिक जानकारी के लिए नीचे दिए गए नोटिफिकेशन और Annexures(परिशिष्ट)
                  डाउनलोड करें।
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.15fr_1.15fr_1fr_1fr_1fr]">
              {noticeLinks.map((item) => {
                const meta = getNoticeMeta(item.label);
                const Icon = meta.icon;

                const content = (
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid size-10 shrink-0 place-items-center rounded-full transition duration-300 ${meta.featured
                        ? "bg-black/10 text-accent-foreground"
                        : "bg-primary/8 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                        }`}
                    >
                      <Icon className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${meta.featured
                          ? "bg-black/10 text-accent-foreground/80"
                          : "bg-primary/7 text-primary/70"
                          }`}
                      >
                        {meta.tag}
                      </div>
                      <div className="mt-2 text-sm font-semibold leading-snug">
                        {item.label}
                      </div>
                    </div>
                    <ArrowRight
                      className={`ml-auto mt-1 size-4 shrink-0 transition duration-300 group-hover:translate-x-1 ${meta.featured ? "text-accent-foreground" : "text-primary/70"
                        }`}
                    />
                  </div>
                );

                const className = `group rounded-[1.35rem] border px-4 py-3 shadow-sm transition duration-300 hover:-translate-y-1 ${meta.featured
                  ? "border-accent/35 bg-accent text-accent-foreground shadow-[0_18px_34px_-24px_rgba(241,189,26,0.78)] hover:brightness-[0.98]"
                  : "border-primary/15 bg-white/84 text-primary hover:border-primary/30 hover:bg-white"
                  }`;

                return item.href.startsWith("/") ? (
                  <Link key={item.label} to={item.href} className={className}>
                    {content}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </motion.section>

      {/* new section */}

      <motion.section
        {...sectionRevealProps}
        className="relative bg-[linear-gradient(135deg,#0f463c_0%,#145446_48%,#193e34_100%)] py-16 text-cream sm:py-20"
      >
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="h-full w-full bg-[length:42px_24px] bg-[linear-gradient(135deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%),linear-gradient(225deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="size-3.5" />
                सोशल मीडिया पर SBGBT
              </div>
              <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
                हमारी ताज़ा गतिविधियाँ।
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3 hover:text-white"
            >
              सभी पोस्ट देखें <ArrowRight className="size-4" />
            </a>
          </div>

          <div
            ref={socialScrollRef}
            onMouseEnter={() => { socialAutoScrollPausedRef.current = true; }}
            onMouseLeave={() => { socialAutoScrollPausedRef.current = false; }}
            onTouchStart={() => { socialAutoScrollPausedRef.current = true; }}
            onTouchEnd={() => { socialAutoScrollPausedRef.current = false; }}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {socialUpdates.map((item, i) => (
              <SocialUpdateCard key={i} item={item} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* new section */}

      <motion.section
        {...sectionRevealProps}
        className="relative overflow-hidden bg-[linear-gradient(180deg,#f0e8d0_0%,#f7f2e5_100%)]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute left-0 top-24 size-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-0 top-40 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
            <div className="text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">हमारी पहलें</div>
              <h2 className="mt-3 font-display text-3xl font-black leading-[1.18] text-accent text-balance sm:text-4xl lg:text-5xl">
                SBGBT की प्रमुख विकास पहलें।
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">

              </p>
            </div>

            <div className="grid items-stretch gap-4 sm:grid-cols-3">
              {initiativeHighlights.map((item, index) => {
                const highlightImage = [galVillage, galEnv, galWomen][index % 3];

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -6, scale: 1.018, rotate: index === 1 ? -0.25 : 0.25 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-[#255247]/10 bg-white/75 p-5 shadow-[0_18px_40px_-30px_rgba(17,63,52,0.52)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/25"
                  >
                    <img
                      src={highlightImage}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-18"
                      width={800}
                      height={600}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(17,63,52,0),rgba(17,63,52,0))] transition duration-500 group-hover:bg-[linear-gradient(145deg,rgba(17,63,52,0.78),rgba(241,189,26,0.28))]" />
                    <div className="relative">
                      <div className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80 transition duration-300 group-hover:bg-white/12 group-hover:text-accent">
                        {item.title}
                      </div>
                      <div className="mt-3 font-display text-3xl font-black text-primary transition duration-300 group-hover:text-white">
                        {item.value}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition duration-300 group-hover:text-white/88">
                        {item.note}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#255247]/12 bg-[linear-gradient(145deg,rgba(255,251,242,0.98),rgba(242,236,216,0.98))] shadow-[0_30px_60px_-42px_rgba(14,57,48,0.8)]">
            <div className="grid gap-6 border-b border-border px-6 py-6 lg:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="size-3.5" />
                  अभियान परिचय
                </div>
                <p className="mt-4 font-hi text-lg leading-relaxed text-earth">
                  शिक्षा, सशक्तिकरण, पर्यावरण, जन-नेतृत्व और सामाजिक जागरूकता को एक साथ
                  लेकर चलने वाली पहलें।
                </p>
              </div>
            </div>

            <div className="group/initiative relative p-4 sm:p-6">
              <button
                type="button"
                onClick={() => setInitiativeCarouselPosition((current) => current - 1)}
                className="absolute left-0 top-1/2 z-20 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-[0_18px_36px_-22px_rgba(17,63,52,0.72)] transition duration-300 hover:-translate-y-[52%] hover:brightness-110 group-hover/initiative:opacity-100 lg:grid"
                aria-label="Previous initiative"
              >
                <ArrowRight className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setInitiativeCarouselPosition((current) => current + 1)}
                className="absolute right-0 top-1/2 z-20 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-foreground opacity-0 shadow-[0_18px_36px_-22px_rgba(241,189,26,0.72)] transition duration-300 hover:-translate-y-[52%] hover:brightness-95 group-hover/initiative:opacity-100 lg:grid"
                aria-label="Next initiative"
              >
                <ArrowRight className="size-4" />
              </button>

              <div
                ref={initiativeCarouselRef}
                className="flex snap-x snap-mandatory gap-1 overflow-x-auto scroll-smooth px-1 pb-2 lg:gap-2 lg:px-12 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" }}
              >
                {loopedInitiatives.map((item, renderedIndex) => {
                  const itemIndex = renderedIndex % initiativeCount;
                  const frameBackground =
                    initiativeFrameBackgrounds[
                    (renderedIndex + initiativeFrameBackgrounds.length) % initiativeFrameBackgrounds.length
                    ];
                  const badgeTone =
                    initiativeBadgeTones[
                    (renderedIndex + initiativeBadgeTones.length) % initiativeBadgeTones.length
                    ];

                  return (
                    <motion.button
                      key={`${item.title}-${renderedIndex}`}
                      data-initiative-card
                      type="button"
                      onClick={() => setInitiativeCarouselPosition(renderedIndex)}
                      onFocus={() => setInitiativeCarouselPosition(renderedIndex)}
                      whileHover={{ y: -8, scale: 1.014, rotate: itemIndex % 2 === 0 ? 0.2 : -0.2 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="group relative min-h-[424px] w-[88%] shrink-0 snap-center text-left sm:w-[54%] lg:w-[35%]"
                    >
                      <div
                        className="absolute inset-0 bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${frameBackground})`,
                          backgroundSize: "95% 95%",
                          backgroundPosition: "center center",
                          filter: "saturate(0.96) brightness(1)",
                          transform: "scale(0.985)",
                        }}
                      />
                      <div className="relative mx-auto mt-5 flex min-h-[382px] w-[84%] max-w-[350px] flex-col items-center px-5 pb-14 pt-7 text-center">
                        <div className="pointer-events-none absolute inset-x-4 top-5 h-6 rounded-full bg-white/45 blur-md" />

                        <div className="relative flex h-full w-full flex-col items-center text-center">
                          <motion.div
                            whileHover={{ rotateY: 180, scale: 1.04 }}
                            transition={{ duration: 0.75, ease: "easeInOut" }}
                            style={{ transformStyle: "preserve-3d" }}
                            className={`relative mt-3 flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full border shadow-[0_12px_24px_-18px_rgba(16,47,39,0.3)] ${badgeTone.ring}`}
                          >
                            <div
                              className={`flex h-[70px] w-[70px] items-center justify-center rounded-full border shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ${badgeTone.inner}`}
                            >
                              <div className={`flex h-[56px] w-[56px] items-center justify-center rounded-full border ${badgeTone.innerRing}`}>
                                <item.icon className="size-8" strokeWidth={2.1} />
                              </div>
                            </div>
                          </motion.div>

                          <h3 className="mt-7 min-h-[3.5rem] max-w-[14rem] text-balance font-display text-[1.38rem] font-black leading-[1.15] text-[#173f37]">
                            {item.title}
                          </h3>
                          <p className="mt-4 min-h-[8.3rem] max-w-[14.5rem] overflow-hidden text-[0.84rem] leading-6 text-[#5e6c67] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                            {item.desc}
                          </p>
                        </div>
                        {item.id ? (
                          <Link
                            to="/activities/$activityId"
                            params={{ activityId: String(item.id) }}
                            className="absolute bottom-16 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 border-b border-[#143c35]/25 pb-0.5 text-[0.88rem] font-semibold text-[#143c35] transition hover:gap-2.5 hover:border-[#143c35] hover:text-[#0f302a]"
                          >
                            विस्तार से देखें <ArrowRight className="size-4" />
                          </Link>
                        ) : null}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-7 flex justify-center gap-2.5">
                {dynamicInitiatives.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setInitiativeCarouselPosition(initiativeCount + index)}
                    aria-label={item.title}
                    className={`rounded-full transition-all duration-300 ${index === activeInitiativeIndex ? "h-2.5 w-12 bg-primary" : "h-2.5 w-2.5 bg-primary/30"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...sectionRevealProps}
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">वीडियो गैलरी</div>
          <h2 className="mt-3 font-display text-3xl font-black text-balance sm:text-4xl lg:text-5xl">
            SBGBT के प्रेरक वीडियो।
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            शिक्षा, समाजसेवा, महिला सशक्तिकरण और ग्राम विकास से जुड़ी हमारी पहलों की झलक इन वीडियो कहानियों में देखें।
          </p>
        </div>

        <div className="group/video relative mt-12 overflow-hidden rounded-[2.8rem] border border-primary/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.86),rgba(244,237,217,0.92)_44%,rgba(239,232,214,0.98)_100%)] px-4 py-10 shadow-[0_34px_80px_-46px_rgba(19,67,56,0.38)] sm:px-6 lg:px-16 lg:py-14">

          <button
            type="button"
            onClick={() => setVideoCarouselPosition((current) => current - 1)}
            className="absolute left-3 top-1/2 z-20 hidden size-14 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-[0_18px_40px_-22px_rgba(17,63,52,0.7)] transition duration-300 hover:-translate-y-[52%] hover:brightness-110 group-hover/video:opacity-100 lg:grid"
            aria-label="पिछला वीडियो"
          > <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setVideoCarouselPosition((current) => current + 1)}
            className="absolute right-3 top-1/2 z-20 hidden size-14 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-foreground opacity-0 shadow-[0_18px_40px_-22px_rgba(241,189,26,0.6)] transition duration-300 hover:-translate-y-[52%] hover:brightness-95 group-hover/video:opacity-100 lg:grid"
            aria-label="अगला वीडियो"
          >
            <ArrowRight className="size-5" />
          </button>

          <div className="overflow-hidden px-8 sm:px-10 lg:px-20">
            <div
              ref={videoCarouselRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 lg:gap-5 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {loopedVideos.map((video, renderedIndex) => (
                <Dialog key={`${video.title}-${renderedIndex}`}>
                  <DialogTrigger asChild>
                    <motion.button
                      data-video-card
                      type="button"
                      onClick={() => setVideoCarouselPosition(renderedIndex)}
                      onFocus={() => setVideoCarouselPosition(renderedIndex)}
                      whileHover={{ y: -8, scale: 1.016, rotate: renderedIndex % 2 === 0 ? 0.2 : -0.2 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="group relative min-h-[336px] w-[100%] shrink-0 snap-center overflow-hidden rounded-[2.4rem] border border-primary/10 text-left shadow-[0_22px_50px_-34px_rgba(17,63,52,0.34)] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                    >
                      <img
                        src={getYouTubeThumbnail(video.embedUrl)}
                        alt={video.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
                        width={1200}
                        height={900}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/12 to-transparent" />
                      <div className="absolute inset-x-0 top-[22%] z-10 flex justify-center">
                        <div className="group/play relative grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_20px_42px_-18px_rgba(17,63,52,0.72)]">
                          <ArrowRight className="relative z-10 size-8 -rotate-45 transition duration-500 group-hover/play:translate-x-0.5 group-hover/play:-translate-y-0.5" strokeWidth={2.2} />
                        </div>
                      </div>
                      <div className="absolute inset-x-4 bottom-4 z-10 rounded-[1.35rem] border border-white/14 bg-[linear-gradient(180deg,rgba(38,29,24,0.6),rgba(23,18,16,0.76))] p-5 text-cream shadow-[0_20px_40px_-28px_rgba(0,0,0,0.85)]">
                        <div className="relative">
                          <div className="text-[11px] uppercase tracking-[0.22em] text-cream/70">{video.tag}</div>
                          <div className="mt-2 font-display text-[1rem] font-black leading-tight sm:text-[1.08rem]">
                            {video.title}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl border-border bg-background p-3 sm:p-4">
                    <DialogHeader>
                      <DialogTitle className="pr-8 font-hi text-base sm:text-lg">{video.title}</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-hidden rounded-2xl bg-black">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="aspect-video w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          <div className="hidden">
            {visibleVideos.map(({ video, offset }) => {
              const isActive = offset === 0;
              const cardIndex = videos.findIndex((item) => item.title === video.title);

              return (
                <Dialog key={video.title}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setActiveVideoIndex(cardIndex)}
                      onFocus={() => setActiveVideoIndex(cardIndex)}
                      className={`group relative min-h-[28rem] overflow-hidden rounded-[1.8rem] border text-left transition-all duration-500 ${isActive
                        ? "border-primary/18 shadow-[0_28px_58px_-34px_rgba(17,63,52,0.42)]"
                        : "border-primary/10 shadow-[0_18px_40px_-34px_rgba(17,63,52,0.24)]"
                        }`}
                    >
                      <img
                        src={video.image}
                        alt={video.title}
                        className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${isActive ? "grayscale-0" : "grayscale-[0.12]"
                          }`}
                        width={1200}
                        height={900}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/16 to-transparent" />

                      {isActive ? (
                        <>
                          <div className="absolute inset-0 grid place-items-center">
                            <div className="grid size-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_22px_48px_-20px_rgba(17,63,52,0.72)] transition duration-500 group-hover:scale-105">
                              <ArrowRight className="size-10 -rotate-45" strokeWidth={2.1} />
                            </div>
                          </div>
                          <div className="absolute inset-x-0 bottom-8 z-10 px-8 text-center text-cream">
                            <div className="text-[11px] uppercase tracking-[0.22em] text-cream/72">{video.tag}</div>
                            <div className="mt-3 font-display text-4xl font-black leading-tight">{video.title}</div>
                            <div className="mt-2 text-sm text-cream/78">वीडियो कहानी देखें</div>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-x-0 bottom-6 z-10 px-5 text-cream">
                          <div className="text-[10px] uppercase tracking-[0.18em] text-cream/64">{video.tag}</div>
                          <div className="mt-2 font-display text-[1.65rem] font-black leading-tight">{video.title}</div>
                        </div>
                      )}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl border-border bg-background p-3 sm:p-4">
                    <DialogHeader>
                      <DialogTitle className="pr-8 font-hi text-base sm:text-lg">{video.title}</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-hidden rounded-2xl bg-black">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="aspect-video w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {videos.map((video, index) => (
              <button
                key={video.title}
                type="button"
                onClick={() => setVideoCarouselPosition(videos.length + index)}
                aria-label={video.title}
                className={`rounded-full transition-all duration-500 ${index === activeVideoIndex ? "h-2.5 w-12 bg-primary" : "h-2.5 w-2.5 bg-primary/30"
                  }`}
              />
            ))}
          </div>

        </div>
      </motion.section>

      <motion.section
        {...sectionRevealProps}
        className="relative overflow-hidden bg-[linear-gradient(135deg,#083a32_0%,#0d4b3e_48%,#08352d_100%)] text-cream"
      >
        <div className="absolute inset-0 opacity-[0.22]">
          <div className="h-full w-full bg-[length:42px_24px] bg-[linear-gradient(135deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%),linear-gradient(225deg,transparent_33%,rgba(255,255,255,0.065)_33%,rgba(255,255,255,0.065)_37%,transparent_37%)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_25%_0%,rgba(241,189,26,0.08),transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">मीडिया कवरेज</div>
              <h2 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">समाचारों और मीडिया उल्लेखों में SBGBT।</h2>

            </div>
            <Link to="/media" className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3 hover:text-white">
              सभी देखें <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="news-ticker mt-7 overflow-hidden rounded-full border border-white/10 bg-white/8 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/70">
            <div className="news-ticker-track flex min-w-max items-center gap-8 px-5">
              {Array.from({ length: 2 }).map((_, loopIndex) => (
                <div key={loopIndex} className="flex items-center gap-8">
                  {latestMediaItemsHindi.map((item) => (
                    <span key={`${loopIndex}-${item.title}`} className="inline-flex items-center gap-3 whitespace-nowrap">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item.category}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {latestMediaItemsHindi.map((item, index) => (
              (() => {
                const dateParts = getMediaDateParts(item.date);

                return (
                  <article
                    key={item.title}
                    className="news-float group relative min-h-[320px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] text-cream shadow-[0_20px_44px_-34px_rgba(0,0,0,0.52)] transition duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_26px_50px_-32px_rgba(0,0,0,0.6)]"
                    style={index > 0 ? { animationDelay: `${index * 180}ms` } : undefined}
                  >
                    <div className="grid min-h-full h-full md:grid-cols-[0.95fr_1.05fr]">
                      <div className="relative min-h-[220px] overflow-hidden md:min-h-full">
                        <img
                          src={latestMediaItemVisualsHindi[index % latestMediaItemVisualsHindi.length].image}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          width={1200}
                          height={900}
                        />
                        <div className="inset-0 bg-[linear-gradient(90deg,rgba(8,28,24,0.1),rgba(8,28,24,0.68))]" />

                      </div>
                      <div className="relative flex min-h-full flex-col p-5 sm:p-6">
                        <div className="absolute right-4 top-4 h-14 w-14 rounded-full bg-accent/10 blur-2xl" />
                        <div className="relative flex items-start justify-between gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4b3e]/78 px-3 py-1 font-semibold text-accent backdrop-blur">
                            <Newspaper className="size-3.5" />
                            {mediaCoverageLabels[index % mediaCoverageLabels.length]}
                          </span>
                          <div className="relative h-[74px] w-[74px] shrink-0">
                            <div className="absolute left-[8px] top-[4px] h-[48px] w-[52px] rounded-[1.2rem_1.35rem_1rem_1.45rem] bg-[#6eb29f] rotate-[18deg]" />
                            <div className="absolute right-[4px] top-[6px] h-[46px] w-[50px] rounded-[1.35rem_1rem_1.35rem_1rem] bg-accent/85 -rotate-[18deg] opacity-90" />
                            <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-[1.3rem_1.45rem_1.1rem_1.5rem] bg-[#145446] text-[#fbf7ef] shadow-[0_18px_30px_-18px_rgba(0,0,0,0.42)] ring-1 ring-white/10">
                              <span className="text-[1.35rem] font-black leading-none">{dateParts.day}</span>
                              <span className="mt-0.5 text-[0.72rem] font-semibold uppercase leading-none tracking-[0.06em]">
                                {dateParts.month}
                              </span>
                              <span className="mt-1 text-[0.52rem] font-medium leading-none text-[#fbf7ef]/72">
                                {dateParts.year}
                              </span>
                            </div>
                          </div>
                        </div>
                        <h3 className="relative mt-4 text-base font-semibold leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)] sm:text-[1.08rem]">
                          {item.title}
                        </h3>
                        <p className="relative mt-3 text-sm leading-6 text-cream/76 md:mt-4">
                          {latestMediaItemVisualsHindi[index % latestMediaItemVisualsHindi.length].summary}
                        </p>

                      </div>
                    </div>
                  </article>
                );
              })()
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        {...sectionRevealProps}
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">फोटो गेलरी</div>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">मैदान से जुड़े प्रेरक दृश्य।</h2>
          </div>
          <div className="max-w-xl rounded-[1.75rem] bg-[linear-gradient(145deg,#0f473d,#174f43)] px-6 py-5 text-cream shadow-[0_30px_55px_-36px_rgba(0,0,0,0.9)]">
            <Quote className="size-4 text-accent" />
            <p className="mt-2 font-hi text-sm leading-6 text-cream/90 sm:text-[15px]">
              “ग्रीन विलेज - क्लीन विलेज”, शिक्षा, स्वास्थ्य और सामुदायिक भागीदारी के
              दृश्य ही SBGBT की असली कहानी बताते हैं।
            </p>
          </div>
        </div>

        <div className="mt-8">
          {(() => {
            const heroItem = readableFeaturedGalleryItems[0];
            const rightItems = readableFeaturedGalleryItems.slice(1, 3);

            const bottomItems = [
              socialRevolutionFeaturedItem,
              ...readableFeaturedGalleryItems.slice(3, 6),
            ];

            return (
              <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[210px]">

                {/* HERO */}
                <figure className="group relative overflow-hidden rounded-[1.9rem] border border-[#e7dbc0] bg-[#103d34] shadow-[0_28px_70px_-38px_rgba(16,61,52,0.52)] lg:col-span-8 lg:row-span-3">
                  <img
                    src={heroItem.src} alt={heroItem.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.75))]" />

                  <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
                      <Images className="size-3" />
                      Gallery
                    </span>

                    <div className="mt-3 text-xs uppercase tracking-wider text-white/80">
                      {heroItem.year} • {heroItem.category}
                    </div>

                    <h3 className="mt-2 font-hi text-xl font-semibold">
                      {heroItem.title}
                    </h3>
                  </figcaption>
                </figure>

                {/* RIGHT */}
                {rightItems.map((item) => (
                  <figure
                    key={item.title}
                    className="group relative overflow-hidden rounded-[1.9rem] border border-[#e7dbc0] bg-[#103d34] lg:col-span-4"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="text-xs text-white/80">
                        {item.year} • {item.category}
                      </div>

                      <h3 className="mt-2 font-hi text-base font-semibold">
                        {item.title}
                      </h3>
                    </figcaption>
                  </figure>
                ))}

                {/* BOTTOM */}
                {bottomItems.map((item) => (
                  <figure
                    key={item.title}
                    className="group relative overflow-hidden rounded-[1.7rem] border border-[#e7dbc0] bg-[#103d34] lg:col-span-3"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="text-xs text-white/80">
                        {item.year} • {item.category}
                      </div>

                      <h3 className="mt-2 font-hi text-sm font-semibold leading-6">
                        {item.title}
                      </h3>
                    </figcaption>
                  </figure>
                ))}
              </div>
            );
          })()}
        </div>

        {false && (
          <div className="mt-8 rounded-[2.25rem] border border-[#d9cfb5] bg-[linear-gradient(180deg,rgba(255,252,244,0.96),rgba(249,243,227,0.92))] p-3 shadow-[0_30px_80px_-45px_rgba(20,60,53,0.38)] sm:p-4">
            <div className="grid auto-rows-[230px] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[240px] lg:grid-cols-12 lg:auto-rows-[190px]">
              {readableFeaturedGalleryItems.map((item, index) => (
                <figure
                  key={item.title}
                  className={`${featuredGalleryLayout[index % featuredGalleryLayout.length]} group relative overflow-hidden rounded-[1.9rem] border border-white/50 bg-[#103d34] shadow-[0_20px_45px_-28px_rgba(12,41,35,0.75)] ring-1 ring-[#ede3c8] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_65px_-30px_rgba(12,41,35,0.82)]`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    width={1200}
                    height={900}
                    className="h-full min-h-[230px] w-full object-cover transition duration-700 group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,28,24,0.04),rgba(8,28,24,0.18)_42%,rgba(8,28,24,0.88)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_bottom,rgba(17,71,59,0.58),transparent_72%)]" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-cream sm:p-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#fff7ec]/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/92 backdrop-blur-md">
                      <Images className="size-3.5" />
                      गैलरी
                    </span>
                    <div className="mt-3 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,53,45,0.92),rgba(17,67,57,0.78))] p-3.5 shadow-[0_18px_32px_-24px_rgba(0,0,0,0.75)] backdrop-blur-md sm:p-4">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#efe5cf]/78 sm:text-[11px]">
                        <span>{item.year}</span>
                        <span>{item.category}</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="mt-2 font-hi text-sm leading-6 text-[#fff8ee] sm:text-[1rem]">
                        {item.title}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      <motion.section
        {...sectionRevealProps}
        id="donate"
        className="relative overflow-hidden bg-[#fbf7ef] text-[#143c35]"
      >
        <div
          className="absolute inset-0 bg-repeat opacity-[0.82]"
          style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(255,255,255,0.12))]" />
        <div className="absolute left-[4%] top-1/2 hidden -translate-y-1/2 xl:block">
          <img
            src={heroHeartSprade}
            alt=""
            aria-hidden="true"
            className="hero-heartbeat h-48 w-48 object-contain opacity-30"
            width={192}
            height={192}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <img
              src={heroHeartSprade}
              alt=""
              aria-hidden="true"
              className="hero-heartbeat h-5 w-5 object-contain opacity-70"
              width={20}
              height={20}
            />
            सार्थक सहयोग
          </span>
          <h2 className="mt-5 font-display text-4xl font-black text-balance text-[#143c35] sm:text-5xl lg:text-6xl">
            SBGBT से जुड़ें और परिवर्तन के भागीदार बनें।
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#35544c]/82">
            शिक्षा, पर्यावरण, महिला सशक्तिकरण, स्वास्थ्य और ग्रामीण जन-जागरूकता अभियानों को
            आपकी भागीदारी और सार्थक सहयोग की जरूरत है।
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#143c35]/16 bg-[linear-gradient(135deg,#f8c62f_0%,#efb116_100%)] px-6 py-3 text-sm font-semibold text-[#143c35] shadow-sm backdrop-blur transition hover:bg-white"
            >
              सदस्य बनें
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }} >
                  <img
                    src={ecoNeedsLogo}
                    alt="Eco Needs Foundation"
                    className="mx-auto h-20 w-auto object-contain sm:h-24"
                  />
                </div>
                <div className="rounded-[1.5rem] border border-border bg-background/70 px-6 py-8 text-center shadow-sm" style={{ backgroundImage: `url(${blogBgPaper})`, backgroundSize: "cover" }}>
                  <img
                    src={workholicsLogo}
                    alt="Workholics"
                    className="mx-auto h-24 w-auto object-contain sm:h-28"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group fixed bottom-5 right-5 z-50 grid size-[72px] place-items-center rounded-full bg-transparent shadow-[0_20px_38px_-24px_rgba(20,60,53,0.42)] transition duration-300 hover:-translate-y-1 sm:bottom-7 sm:right-7"
      >
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 72 72"
          aria-hidden="true"
        >
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="rgba(123, 197, 185, 0.24)"
            strokeWidth="4"
          />
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="#68b8a9"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={progressCircumference}
            strokeDashoffset={progressOffset}
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>
        <span className="relative flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-[#f7f6ef] text-[#136b60] shadow-[inset_0_0_0_1px_rgba(104,184,169,0.12),0_10px_24px_-18px_rgba(20,60,53,0.28)]">
          <ArrowDown className="absolute size-5 -translate-y-10 rotate-180 transition duration-300 group-hover:translate-y-0" />
          <ArrowDown className="absolute size-5 rotate-180 transition duration-300 group-hover:translate-y-10" />
        </span>
      </button>

      <SiteFooter />
    </div>
  );
}

