import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero, SiteFooter, CTASection} from "@/components/site/SiteFooter";
 
export const Route = createFileRoute("/talent-felicitation-ceremony")({
  head: () => ({
    meta: [
      { title: "प्रतिभा सम्मान समागम | SBGBT" },
      {
        name: "description",
        content:
          "SBGBT प्रतिभा सम्मान समागम की जानकारी, आवेदन श्रेणियां, चयन मानदंड और आवेदन लिंक।",
      },
      { property: "og:title", content: "प्रतिभा सम्मान समागम | SBGBT" },
      {
        property: "og:description",
        content:
          "प्रतिभा सम्मान समागम के लिए आवेदन श्रेणियों, पात्रता और आवेदन प्रक्रिया की जानकारी।",
      },
    ],
  }),
  component: TalentFelicitationCeremonyPage,
});

const categories = [
  {
    id: "1",
    items: [
      {
        category: "A. कक्षा 10वीं एवं 12वीं के विद्यार्थी",
        criteria: "A. सत्र 2022-23 में 80% या उससे अधिक प्राप्त करने वाले विद्यार्थी",
      },
      {
        category: "B. स्नातक एवं स्नातकोत्तर के विद्यार्थी",
        criteria: "B. सत्र 2022-23 के 70% या उससे अधिक प्राप्त करने वाले विद्यार्थी",
      },
      {
        category: "C. JEE, NEET, CLAT और JRF के प्रवेशार्थी",
        criteria: "C. सत्र 2022-23 में JEE, NEET, CLAT एवं JRF में प्रवेश पाने वाले प्रवेशार्थी",
      },
    ],
  },
  {
    id: "2",
    items: [
      {
        category: "केंद्र और राज्य सेवाओं में चयनित अभ्यर्थी",
        criteria:
          "1 जनवरी 2023 से 31 दिसंबर 2023 तक UPSC, RPSC, SSC, शिक्षा, रेलवे, पुलिस या अन्य किसी विभाग में चयनित अभ्यर्थी",
      },
    ],
  },
  {
    id: "3",
    items: [
      {
        category: "केंद्र और राज्य सेवाओं से सेवानिवृत सेवाकर्मी",
        criteria: "1 जनवरी 2023 से 31 दिसंबर 2023 तक राजकीय सेवा से सेवानिवृत सेवाकर्मी",
      },
    ],
  },
  {
    id: "4",
    items: [
      {
        category: "राष्ट्र निर्माण के क्षेत्र में विशिष्ट उपलब्धि",
        criteria:
          "चिकित्सा सेवा/इंजीनियरिंग/कृषि क्षेत्र/चार्टर्ड अकाउंटेंट/खेलकूद/वकालत/पत्रकारिता/निजी व्यवसाय या किसी अन्य क्षेत्र में विशिष्ट उपलब्धि वाले व्यक्ति",
      },
    ],
  },
] as const;

function TalentFelicitationCeremonyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <PageHero title="SBGBT प्रतिभा सम्मान समागम - आवेदन फॉर्म" />

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/35 px-5 py-8 shadow-[0_24px_60px_-40px_rgba(18,65,74,0.45)] backdrop-blur-sm sm:px-8 lg:px-10 border shadow-sm sm:p-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <p className="text-center text-xl font-semibold leading-relaxed text-[#1a4c59] sm:text-2xl">
              "दुनिया को बदलने का सबसे शक्तिशाली हथियार शिक्षा है।"
            </p>

            <div className="space-y-6 text-base leading-8 text-[#173d46] sm:text-[1.08rem]">
              <p>
                जन जागरूकता और जनजागरण सामाजिक जन चेतना को जन्म देता है और सामाजिक जन
                चेतना एक सुसंस्कृत समाज के निर्माण के लिए अनिवार्य है। सोच बदलो-गांव बदलो
                टीम जागरूक, सुरक्षित, समृद्ध, समतावादी और न्यायमूलक समाज बनाने और सामाजिक,
                आर्थिक और राजनीतिक लोकतंत्र को मजबूत करने के लिए कृत संकल्पित है।
              </p>

              <p>
                "भारत की आत्मा गांवों में निवास करती है" इसी दृढ़ विश्वास से SBGBT ग्रामीण
                परिवेश में शिक्षा के प्रति जागरूकता पैदा करने, ग्रामीण प्रतिभाओं को निखारने,
                प्रोत्साहित करने और जरूरतमंद विद्यार्थियों को आर्थिक सहयोग प्रदान करने,
                ग्रामीण बच्चों में स्वस्थ प्रतिस्पर्धा, प्रतिभाशाली विद्यार्थियों को सम्मानित
                और मार्गदर्शित करने, विभिन्न सेवाओं में चयनित प्रतिभागियों, सेवानिवृत
                प्रबुद्धजनों और राष्ट्र निर्माण के विविध क्षेत्रों में विशिष्ट उपलब्धि प्राप्त
                व्यक्तियों को सम्मानित करने के लिए नियमित रूप से "प्रतिभा सम्मान समागम" का
                आयोजन कर रही है।
              </p>

              <p>
                इसी क्रम में इस वर्ष "सोच बदलो-गांव बदलो टीम" के 8वें स्थापना दिवस के
                उपलक्ष्य में दिनांक 21 मई 2024 को "उत्थान परिसर बाड़ी" में अखिल भारतीय
                मीना समाज धौलपुर के सानिध्य में विशाल प्रतिभा सम्मान समागम का आयोजन किया जा
                रहा है; जिसमें भाग लेने के लिए निम्न श्रेणियों में आवेदक आमंत्रित किए जा रहे
                हैं:
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-[#5fbcc4]/50 bg-white shadow-[0_20px_50px_-38px_rgba(21,87,96,0.55)]">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#6cc8d0] text-left text-[#103942]">
                      <th className="border-r border-[#9b6a28] px-4 py-4 text-l font-bold">
                        क्र. सं.
                      </th>
                      <th className="border-r border-[#9b6a28] px-4 py-4 text-l font-bold">
                        आवेदन की श्रेणी (Category)
                      </th>
                      <th className="border-r border-[#9b6a28] px-4 py-4 text-l font-bold">
                        प्रतिभागी चयन का पैमाना
                      </th>
                      <th className="px-4 py-4 text-l font-bold align-middle text-center">आवेदन लिंक</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((group) =>
                      group.items.map((item, index) => (
                        <tr
                          key={`${group.id}-${index}`}
                          className="align-top bg-white text-[#1a2f36] odd:bg-[#fffefe]"
                        >
                          {index === 0 ? (
                            <td
                              rowSpan={group.items.length}
                              className="border-r border-t border-[#c58a45] bg-[#74c6cd] px-4 py-5 text-center text-l font-bold text-[#103942]"
                            >
                              {group.id}
                            </td>
                          ) : null}
                          <td className="border-r border-t border-[#c58a45] px-4 py-4 text-l leading-8">
                            {item.category}
                          </td>
                          <td className="border-r border-t border-[#c58a45] px-4 py-4 text-l leading-8">
                            {item.criteria}
                          </td>
                          <td className="border-t border-[#c58a45] px-4 py-4 align-middle text-center">
                            <Link
                              to="/samman-samaroh-registration"
                              className="transition-all hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-xl inline-flex items-center justify-center text-l font-semibold text-[#165dff] underline decoration-transparent transition hover:decoration-current text-primary"
                            >
                              आवेदन करें
                            </Link>
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-l font-bold text-[#16323b] sm:text-l">
              नोट: आवेदन फॉर्म में विवरण केवल अंग्रेजी (English) में भरें।
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      < CTASection />
      {/* === */}

      <SiteFooter />
    </div>
  );
}
