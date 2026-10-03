import type { Metadata } from "next";
import { CtaBand, PageHead, Section } from "@/components/chrome";
import { FAQ_GROUPS, FaqList } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Straight answers about giving, voting, fees and privacy on CHERR.IO.",
  alternates: { canonical: "/faq" },
};

export default function Faq() {
  return (
    <>
      <PageHead eyebrow="Questions" title="Straight answers." intro="Can't find yours? Ask us on X or LinkedIn — we answer every question in public." />
      <Section tone="white">
        <div>
          {FAQ_GROUPS.map((g) => (
            <div key={g.title} className="s-faq-group s-split">
              <h2 className="s-h2" style={{ flex: "1 1 240px" }}>
                {g.title}
              </h2>
              <div className="s-col-wide">
                <FaqList items={g.items} openFirst={false} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand source="faq" />
    </>
  );
}
