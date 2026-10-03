import type { Metadata } from "next";
import { Check, CtaBand, PageHead, Section, SectionTitle } from "@/components/chrome";
import { StatusChip, TrustScore } from "@/components/ds";
import { exampleImportedTrust, exampleTrust } from "@/lib/examples";

export const metadata: Metadata = {
  title: "Charity Market Cap",
  description: "A public ranking of charities by a published, versioned Trust Score from 0 to 100.",
  alternates: { canonical: "/charity-market-cap" },
};

const WEIGHTS = [
  { c: "Community rating", w: "30%", d: "Donors rate an organisation from 1 to 5 after a campaign they supported. A few early ratings can't swing the score: it starts from a neutral 3.5." },
  { c: "Campaign success", w: "25%", d: "Share of finished campaigns that reached at least 10% of their goal." },
  { c: "Receipts approved", w: "20%", d: "Share of donor votes on receipts that ended in approval." },
  { c: "Evidence on time", w: "15%", d: "Share of required evidence — invoices, payment proofs, video reports — delivered on time." },
  { c: "Verification", w: "10%", d: "Verified on CHERR.IO counts in full; listed in a public registry only counts half." },
];

export default function CharityMarketCap() {
  return (
    <>
      <PageHead eyebrow="Charity Market Cap" title="A public ranking of trust, not hype." intro="Like a market list — but instead of price, charities are ranked by how they actually handle donations. Every score is built from public records and a published formula.">
        <div className="s-row">
          <StatusChip status="pending">Opens with the platform</StatusChip>
        </div>
      </PageHead>

      <Section tone="tint">
        <div className="s-split s-center">
          <div className="s-col-wide s-stack-md">
            <span className="ch-label s-eyebrow">Two kinds of listing</span>
            <h2 className="s-display-2">Verified members and everyone else.</h2>
            <p className="s-lead">Organisations verified on CHERR.IO get a full Trust Score. Charities imported from public registries in Slovenia, the UK and the US are listed too, so donors can compare — but their score is capped at 40 until they join.</p>
            <ul className="s-checks">
              <Check>Slovenia — NGOs in the public interest and the AJPES register</Check>
              <Check>United Kingdom — Charity Commission register</Check>
              <Check>United States — IRS exempt organisations</Check>
            </ul>
          </div>
          <div className="s-col-narrow s-grid-2" style={{ gridTemplateColumns: "1fr" }}>
            <div className="s-stack-sm">
              <span className="ch-label s-muted">Example · verified organisation</span>
              <TrustScore {...exampleTrust} />
            </div>
            <div className="s-stack-sm">
              <span className="ch-label s-muted">Example · imported from a registry</span>
              <TrustScore {...exampleImportedTrust} imported />
            </div>
          </div>
        </div>
      </Section>

      <Section id="methodology" tone="white">
        <SectionTitle eyebrow="Methodology · Trust Score v1" title="The formula, in full." aside="Each part is scored from 0 to 1, weighted, and added up to a score from 0 to 100. Every score is stored with its formula version." />
        <div className="s-table-wrap">
          <table className="s-table">
            <thead>
              <tr>
                <th scope="col">Part</th>
                <th scope="col" className="s-num">
                  Weight
                </th>
                <th scope="col">What it measures</th>
              </tr>
            </thead>
            <tbody>
              {WEIGHTS.map((w) => (
                <tr key={w.c}>
                  <td style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{w.c}</td>
                  <td className="s-num s-score">{w.w}</td>
                  <td className="s-muted">{w.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="s-muted" style={{ maxWidth: "70ch" }}>
          New organisations start from neutral values where there is no history yet, so a first campaign is neither rewarded nor punished. Scores are recalculated after every relevant event and every night. When the formula changes, the version number changes with it.
        </p>
      </Section>

      <CtaBand source="charity-market-cap" role="charity" title="Get your charity listed" text="Imported charities can claim their profile at launch, get verified and lift the cap on their score. Leave your email and we'll invite you first." buttonLabel="Notify my charity" />
    </>
  );
}
