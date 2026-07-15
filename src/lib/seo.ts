export const SITE_URL = "https://www.sbgbteam.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Soch Badlo Gaon Badlo Team",
  alternateName: "SBGBT",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "sbgbteam@gmail.com",
  telephone: "+91-9314408609",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sarmathura",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/sbgbteam/",
    "https://twitter.com/sbgbteam",
    "https://www.instagram.com/sbgbteam/",
    "https://www.youtube.com/channel/UCOQAQS7J5cKft2mlwjpZn-A",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SBGBT",
  url: SITE_URL,
  inLanguage: "hi-IN",
};
