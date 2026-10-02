import type { Metadata } from "next";
import Link from "next/link";
import { Check, CtaBand, PageHead, Section, SectionTitle } from "@/components/chrome";
import { MilestoneTrack, ProofLink, VoteMeter } from "@/components/ds";
import { exampleTranches, exampleVote } from "@/lib/examples";

export const metadata: Metadata = {
  title: "How it works",
  description: "How a donation on CHERR.IO is locked, released in steps after a donor vote, and returned if a campaign falls short.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  { t: "A verified fundraiser opens a campaign", d: "Organisations are reviewed by hand. Individuals pass an identity check. Each campaign sets a goal in euros and a deadline between 7 and 90 days." },
  { t: "You give by card or crypto wallet", d: "Log in with email or Google. Your account is created for you and the network costs are on us. Already have a crypto wallet? Use it." },
  { t: "Your donation goes into a locked account", d: "Each campaign has its own locked account on the blockchain. The money can only go to the fundraiser, back to donors, or to the Emergency Pool — nowhere else." },
  { t: "The campaign ends", d: "When the goal is reached or the deadline passes. With at least 10% of the goal raised, it succeeds. Below that, every donor gets their money back or passes it to the Emergency Pool." },
  { t: "Money is released in steps", d: "Step 1 is paid out right away. Before steps 2 and 3, the fundraiser shows invoices, payment proofs and a short video report." },
  { t: "Donors vote on the receipts", d: "24 hours to vote. The step is approved when donors who gave at least half of the money took part and more than half of the votes say yes." },
];

export default function HowItWorks() {
  return (
    <>
      <PageHead eyebrow="How it works" title="From your card to the hospital invoice." intro="CHERR.IO puts every donation in a locked account and lets donors decide when it is paid out. Here is the whole journey, step by step." />

      <Section raised label="Step by step">
        <ol className="s-grid-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {STEPS.map((s, i) => (
            <li key={s.t} className="s-box">
              <span className="s-bignum">{i + 1}</span>
              <h2 className="s-h2">{s.t}</h2>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="payout">
        <SectionTitle eyebrow="Two ways to pay out" title="Trust is earned, campaign by campaign." />
        <div className="s-grid-2">
          <article className="s-box">
            <span className="ch-label">All at once</span>
            <h3 className="s-h2">For organisations with a proven record</h3>
            <p>Organisations rated 4.0 or higher by past donors — and an organisation&apos;s first campaign, under closer supervision — are paid in full 72 hours after the campaign ends. The wait gives our safety team time to stop a payout if fraud is suspected.</p>
          </article>
          <article className="s-box s-box-featured">
            <span className="ch-label">In three steps</span>
            <h3 className="s-h2">For everyone else, and always for individuals</h3>
            <p>The money is split into three equal steps. Step 1 is paid when the campaign succeeds; steps 2 and 3 only after donors approve the receipts.</p>
          </article>
        </div>
        <div className="s-split">
          <div className="s-col-wide s-stack-lg">
            <span className="ch-label s-muted">Example · €12,000 goal</span>
            <MilestoneTrack tranches={exampleTranches} />
            <VoteMeter {...exampleVote} />
          </div>
          <div className="s-col-narrow s-stack-md">
            <h3 className="s-h2">What the vote decides</h3>
            <ul className="s-checks">
              <Check>Approved — the next step is paid automatically</Check>
              <Check>Too few votes — our team reviews the receipts and decides, on the record</Check>
              <Check>Rejected — what hasn&apos;t been paid goes back to donors or to the Emergency Pool</Check>
            </ul>
            <p className="s-muted">Your vote counts as much as you gave, so buying votes with small accounts doesn&apos;t work.</p>
          </div>
        </div>
      </Section>

      <Section raised>
        <SectionTitle eyebrow="Safety" title="Nobody can run off with the money." aside="Not the fundraiser, not a hacker, not us." />
        <div className="s-grid-3">
          <div className="s-box">
            <h3 className="s-h2">Fixed exits</h3>
            <p>A campaign&apos;s money can only go to its verified beneficiary, back to donors, or to the Emergency Pool. No other address is possible.</p>
          </div>
          <div className="s-box">
            <h3 className="s-h2">An emergency brake</h3>
            <p>If fraud is suspected, our safety team can pause a campaign immediately. A paused campaign takes no donations and pays nothing until the case is decided.</p>
          </div>
          <div className="s-box">
            <h3 className="s-h2">Private documents stay private</h3>
            <p>Invoices and medical records are stored encrypted. Only their fingerprint goes on the blockchain, so they can&apos;t be swapped later.</p>
          </div>
        </div>
        <div className="s-row">
          <ProofLink href="/#proof">See what the public record looks like</ProofLink>
          <Link className="s-arrow-link" href="/faq" style={{ marginTop: 0 }}>
            More questions →
          </Link>
        </div>
      </Section>

      <CtaBand source="how-it-works" />
    </>
  );
}
