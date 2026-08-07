import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/utthan-coaching-organizations")({
  head: () => ({
    meta: [
      { title: "उत्थान कोचिंग संस्थाएं | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT की उत्थान कोचिंग संस्थाओं की शाखाएं, पते और विद्यार्थी रजिस्ट्रेशन लिंक।",
      },
      { property: "og:title", content: "उत्थान कोचिंग संस्थाएं | SBGBT" },
      {
        property: "og:description",
        content:
          "सरमथुरा, बाड़ी, नादौती और करौली स्थित उत्थान कोचिंग संस्थाओं की जानकारी।",
      },
    ],
  }),
  component: UtthanCoachingOrganizationsPage,
});

const organizations = [
  {
    id: "उत्थान कोचिंग संस्थान - सरमथुरा",
    title: '"उत्थान कोचिंग संस्थान - सरमथुरा"',
    address: [
      "उत्थान भवन, मोहिपुरा रोड,",
      "सरमथुरा (धौलपुर) राज. 328026",
    ],
  },
  {
    id: "उत्थान कोचिंग संस्थान - बाड़ी",
    title: '"उत्थान कोचिंग संस्थान - बाड़ी"',
    address: [
      "उत्थान भवन, उमरेह रोड, बाड़ी",
      "(धौलपुर) राज. 328021",
    ],
  },
  {
    id: "उत्थान कोचिंग संस्थान - नादौती",
    title: '"उत्थान कोचिंग संस्थान - नादौती"',
    address: [
      "लाइब्रेरी भवन, हायर सेकेंडरी स्कूल",
      "खेल मैदान, नादौती करौली (राज.) -",
      "322215",
    ],
  },
  {
    id: "उत्थान कोचिंग संस्थान - करौली",
    title: '"उत्थान कोचिंग संस्थान-करौली"',
    address: [
      "भीमनगर पुलिया के पास, पांड का",
      "कुआ, हिंडौन रोड करौली",
      "(राज.)-322241",
    ],
  },
] as const;

function UtthanCoachingOrganizationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="उत्थान कोचिंग संस्थाएं" />

      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {organizations.map((organization) => (
              <article
                key={organization.id}
                className="flex min-h-[305px] flex-col items-center rounded-[1.9rem] bg-white px-8 py-10 text-center shadow-[0_20px_45px_-35px_rgba(17,56,61,0.45)]"
              >
                <div className="space-y-1 text-[1.05rem] leading-10 text-[#1f2d34] sm:text-[1.2rem]">
                  <p className="font-medium">{organization.title}</p>
                  {organization.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/utthan-coaching-registration"
                    search={{ organization: organization.id }}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-[0_14px_24px_-14px_rgba(0,0,0,0.65)] transition hover:-translate-y-0.5 hover:brightness-105"
                  >
                    विद्यार्थी रजिस्टर करें
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
