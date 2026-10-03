import type { Metadata } from "next";
import { Check, CtaBand, PageHead, Section, SectionTitle } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Cherrions",
  description: "The CHERR.IO community: donate, vote on receipts, rate charities and earn Proof of Charity points.",
  alternates: { canonical: "/cherrions" },
};

const ACTIONS = [
  ["Donate", "Give to any live campaign or to the Emergency Pool."],
  ["Vote on receipts", "Decide whether the next step of a campaign you supported is paid out."],
  ["Rate organisations", "After a campaign ends, rate the organisation from 1 to 5. It feeds their public Trust Score."],
  ["Steer the Emergency Pool", "If you contributed to the pool, vote on where it helps next."],
  ["Bring in charities", "Invite an organisation you trust. When it's verified, you're credited for it."],
  ["Start a campaign", "Need help yourself? Any Cherrion can raise money after an identity check."],
];

export default function Cherrions() {
  return (
    <>
      <PageHead eyebrow="Cherrions" title="The people who keep giving honest." intro="Everyone with a CHERR.IO account is a Cherrion. Together, Cherrions do the checking that a charity platform would normally leave to a back office." />

      <Section tone="tint">
        <SectionTitle eyebrow="What you can do" title="More than a donate button." />
        <div className="s-grid-3">
          {ACTIONS.map(([t, d]) => (
            <div key={t} className="s-box">
              <h2 className="s-h2">{t}</h2>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="s-split">
          <div className="s-col-narrow s-stack-md">
            <span className="ch-label s-eyebrow">Proof of Charity</span>
            <h2 className="s-display-2">Points for what you actually do.</h2>
          </div>
          <div className="s-col-wide s-stack-md">
            <p className="s-lead">You earn Proof of Charity points only for actions we can verify — a donation on the blockchain, a signed vote, a signed rating. Points move you up five levels that reflect how active you&apos;ve been recently.</p>
            <ul className="s-checks">
              <Check>Points for signing up, donating, voting, rating and bringing in charities</Check>
              <Check>Daily limits and abuse checks keep it fair</Check>
              <Check>Social-media likes and shares don&apos;t count</Check>
            </ul>
            <div className="s-callout">
              <strong>Points are not money.</strong> At launch they can&apos;t be exchanged for money or tokens. Exact point values will be published at launch.
            </div>
          </div>
        </div>
      </Section>

      <CtaBand source="cherrions" role="cherrion" title="Become a Cherrion" text="Leave your email and we'll invite you when the community opens." buttonLabel="Count me in" />
    </>
  );
}
