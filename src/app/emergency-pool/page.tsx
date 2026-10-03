import type { Metadata } from "next";
import { Check, CtaBand, PageHead, Section, SectionTitle } from "@/components/chrome";
import { VoteMeter } from "@/components/ds";

export const metadata: Metadata = {
  title: "Emergency Pool",
  description: "A shared pool for urgent causes, filled by donations from campaigns that fell short and spent only by a vote of its contributors.",
  alternates: { canonical: "/emergency-pool" },
};

export default function EmergencyPool() {
  return (
    <>
      <PageHead eyebrow="Emergency Pool" title="No donation is wasted." intro="When a campaign falls short, its donors don't have to take the money back. They can pass it to a shared pool that helps the next urgent case — and only its contributors decide where it goes." />

      <Section tone="tint">
        <SectionTitle eyebrow="Where the money comes from" title="Three ways in." />
        <div className="s-grid-3">
          <div className="s-box">
            <span className="s-bignum">1</span>
            <h2 className="s-h2">Direct donations</h2>
            <p>Give to the general pool or to a themed one.</p>
          </div>
          <div className="s-box">
            <span className="s-bignum">2</span>
            <h2 className="s-h2">Campaigns that fell short</h2>
            <p>Donors who choose the pool when a campaign fails or is rejected by donors.</p>
          </div>
          <div className="s-box">
            <span className="s-bignum">3</span>
            <h2 className="s-h2">Unclaimed refunds</h2>
            <p>Refunds nobody collected within 180 days.</p>
          </div>
        </div>
        <div className="s-row" aria-label="Themed pools">
          <span className="ch-label s-muted">Themed pools</span>
          <span className="ch-chip">General</span>
          <span className="ch-chip">Medical help</span>
          <span className="ch-chip">Disasters</span>
          <span className="ch-chip">Animals</span>
          <span className="ch-chip">Climate</span>
        </div>
      </Section>

      <Section tone="white">
        <div className="s-split">
          <div className="s-col-narrow s-stack-md">
            <span className="ch-label s-eyebrow">Where the money goes</span>
            <h2 className="s-display-2">Contributors vote. Every time.</h2>
            <p className="s-lead">Our team proposes sending a set amount to an approved, live campaign. Everyone who contributed to that pool then has 24 hours to vote.</p>
            <ul className="s-checks">
              <Check>Contributors who gave half of the pool must vote</Check>
              <Check>More than half must approve</Check>
              <Check>Votes count by what you gave before the proposal — no buying in late</Check>
              <Check>Money can only go to live campaigns on CHERR.IO</Check>
            </ul>
          </div>
          <div className="s-col-wide s-stack-md">
            <span className="ch-label s-muted">Example · proposal to send €2,500 to a medical campaign</span>
            <VoteMeter turnout={57} approval={74} closesIn="9 h 40 min" />
          </div>
        </div>
      </Section>

      <CtaBand source="emergency-pool" />
    </>
  );
}
