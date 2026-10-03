import type { Metadata } from "next";
import { Check, CtaBand, PageHead, Section, SectionTitle } from "@/components/chrome";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "For charities and fundraisers",
  description: "Raise money donors can verify. Verified once, a public track record, a 1% platform fee at payout.",
  alternates: { canonical: "/charities" },
};

export default function Charities() {
  return (
    <>
      <PageHead eyebrow="For charities & fundraisers" title="Raise money people can check." intro="Donors give more when they can see where it goes. CHERR.IO gives every campaign a public record, so your work speaks for itself.">
        <div style={{ maxWidth: 680 }}>
          <WaitlistForm source="charities-hero" role="charity" buttonLabel="Apply early" />
        </div>
      </PageHead>

      <Section tone="tint">
        <SectionTitle eyebrow="Who can raise money" title="Organisations and individuals." />
        <div className="s-grid-2">
          <article className="s-box">
            <span className="ch-label">Organisations</span>
            <h2 className="s-h2">Charities, NGOs and non-profits</h2>
            <ul className="s-checks">
              <Check>Verified by hand by our team</Check>
              <Check>Up to 5 campaigns at the same time</Check>
              <Check>Paid all at once or in three steps, depending on your rating</Check>
              <Check>Already listed on the Charity Market Cap? Claim your profile.</Check>
            </ul>
          </article>
          <article className="s-box">
            <span className="ch-label">Individuals</span>
            <h2 className="s-h2">For yourself or someone close to you</h2>
            <ul className="s-checks">
              <Check>A quick identity check with a valid ID and a selfie</Check>
              <Check>Reviewed by our team before going live</Check>
              <Check>Always paid in three steps, after donors approve the receipts</Check>
              <Check>Your ID documents are never stored by us</Check>
            </ul>
          </article>
        </div>
      </Section>

      <Section tone="white">
        <SectionTitle eyebrow="Step by step" title="From application to payout." />
        <ol className="s-grid-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            ["Create an account", "Email, Google or your own crypto wallet. The account that receives your payouts is created for you if needed."],
            ["Get verified", "Send your organisation's documents, or complete the identity check. We review every application by hand."],
            ["Set up your campaign", "Your story, photos, a goal in euros and a duration of 7 to 90 days. Supporting documents stay private."],
            ["Go live", "After our review the campaign gets its own locked account and starts taking donations."],
            ["Get paid", "Reach at least 10% of your goal and the campaign succeeds — you receive what was raised, minus a 1% fee."],
            ["Show your work", "Upload invoices and a short video report. Good evidence wins votes and lifts your Trust Score."],
          ].map(([t, d], i) => (
            <li key={t} className="s-box">
              <span className="s-bignum">{i + 1}</span>
              <h3 className="s-h2">{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <div className="s-split s-center">
          <div className="s-col-narrow s-stack-sm">
            <span className="ch-label s-eyebrow">Pricing</span>
            <h2 className="s-display-2">1% at payout. That&apos;s it.</h2>
          </div>
          <div className="s-col-wide s-stack-md">
            <ul className="s-checks">
              <Check>No sign-up fee, no monthly fee</Check>
              <Check>No fee at all if a campaign doesn&apos;t succeed</Check>
              <Check>Network costs for donors are covered by us</Check>
            </ul>
            <p className="s-muted">Card payments for donors and guidance on turning donations into euros in your bank account will be published before launch.</p>
          </div>
        </div>
      </Section>

      <CtaBand source="charities-footer" role="charity" title="Be among the first" text="We're onboarding a small group of organisations first. Leave your email and we'll be in touch." buttonLabel="Apply early" />
    </>
  );
}
