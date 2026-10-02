import Link from "next/link";
import { CtaBand, Check, Section, SectionTitle } from "@/components/chrome";
import { Address, ButtonLink, CampaignCard, LedgerTable, MilestoneTrack, ProofLink, StatusChip, TrustScore, VoteMeter } from "@/components/ds";
import { WaitlistForm } from "@/components/WaitlistForm";
import { exampleCampaign, exampleContract, exampleLedger, exampleTranches, exampleTrust, exampleVote } from "@/lib/examples";
import { FAQ_HOME, FaqList } from "@/lib/faq";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="s-section" id="waitlist">
        <div className="s-wrap s-hero-inner">
          <div className="s-hero-text">
            <div className="s-row" style={{ gap: 8 }}>
              <StatusChip status="pending">Opening soon</StatusChip>
              <span className="ch-label s-muted">Transparent giving, rebuilt for 2026</span>
            </div>
            <h1 className="s-display-1">Every euro, on the record</h1>
            <p className="s-hero-sub">
              Give to people and charities you can check. Your donation waits in a locked account and is released in three steps — only when donors approve the receipts.
            </p>
            <WaitlistForm source="home-hero" />
            <div className="s-row">
              <ProofLink href="#proof">See how the proof works</ProofLink>
              <span className="s-note">Pay by card. No crypto knowledge needed.</span>
            </div>
          </div>
          <div className="s-hero-card">
            <span className="ch-label s-muted">Example campaign</span>
            <CampaignCard {...exampleCampaign} verified featured status="live" photoLabel="Campaign photo" />
          </div>
        </div>
      </section>

      {/* Three promises */}
      <section className="s-section s-raised" aria-label="Our promises">
        <div className="s-wrap s-promises">
          <div className="s-promise">
            <span className="ch-label">01</span>
            <h2 className="s-h2">Locked until it&apos;s needed</h2>
            <p className="s-muted">Every donation goes into a locked account for that one campaign. Nobody can move it on a whim — not even us.</p>
          </div>
          <div className="s-promise">
            <span className="ch-label">02</span>
            <h2 className="s-h2">Paid out in steps</h2>
            <p className="s-muted">The money is released in three equal steps. Before each one, donors see the receipts and vote.</p>
          </div>
          <div className="s-promise">
            <span className="ch-label">03</span>
            <h2 className="s-h2">Your money comes back</h2>
            <p className="s-muted">If a campaign falls short or donors reject the receipts, you get your share back — or pass it to the Emergency Pool.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section id="how">
        <SectionTitle eyebrow="How it works" title="Give in a minute. Follow it to the last cent." aside="You don't need to understand blockchains. You just give — the record keeps itself." />
        <ol className="s-grid-3">
          <li className="s-box">
            <span className="s-bignum">1</span>
            <h3 className="s-h2">Choose a verified campaign</h3>
            <p>Every organisation is checked by our team before it can raise money. Individuals verify their identity first.</p>
          </li>
          <li className="s-box">
            <span className="s-bignum">2</span>
            <h3 className="s-h2">Give by card or crypto wallet</h3>
            <p>Log in with email or Google and pay by card. Your account is created for you — no network fees to pay.</p>
          </li>
          <li className="s-box">
            <span className="s-bignum">3</span>
            <h3 className="s-h2">Vote on the receipts</h3>
            <p>When the next step is due, the fundraiser shows what the money paid for. You vote. Your vote counts as much as you gave.</p>
          </li>
        </ol>
        <div>
          <Link className="s-arrow-link" href="/how-it-works">
            The full walkthrough →
          </Link>
        </div>
      </Section>

      {/* Protection */}
      <Section id="protection" raised>
        <div className="s-split">
          <div className="s-col-narrow s-stack-md">
            <span className="ch-label s-eyebrow">How your money is protected</span>
            <h2 className="s-display-2">Three steps. Donors hold the keys.</h2>
            <p className="s-lead">Step 1 is paid out as soon as the campaign succeeds. Steps 2 and 3 wait until enough donors have voted and most of them approve the receipts.</p>
            <ul className="s-checks">
              <Check>Voting is open for 24 hours</Check>
              <Check>Donors who gave half of the money must vote</Check>
              <Check>More than half must approve</Check>
              <Check>Rejected? The rest goes back to donors</Check>
            </ul>
          </div>
          <div className="s-col-wide s-stack-lg">
            <span className="ch-label s-muted">Example · €12,000 goal</span>
            <MilestoneTrack tranches={exampleTranches} />
            <VoteMeter {...exampleVote} />
            <ProofLink href="#proof">Every vote is on the blockchain</ProofLink>
          </div>
        </div>
      </Section>

      {/* Charity Market Cap */}
      <Section id="market-cap">
        <div className="s-split s-center" style={{ flexWrap: "wrap-reverse" }}>
          <div className="s-col-narrow s-stack-sm" style={{ maxWidth: 460 }}>
            <span className="ch-label s-muted">Example organisation</span>
            <TrustScore {...exampleTrust} />
          </div>
          <div className="s-col-wide s-stack-md">
            <span className="ch-label s-eyebrow">Charity Market Cap</span>
            <h2 className="s-display-2">A public ranking of trust, not hype.</h2>
            <p className="s-lead">Every charity gets a Trust Score from 0 to 100, built from donor ratings, campaigns that succeeded, approved receipts and evidence delivered on time. The formula is public and versioned.</p>
            <p className="s-muted" style={{ maxWidth: "56ch" }}>
              Charities from public registries in Slovenia, the UK and the US are listed too — capped at 40 until they join and get verified.
            </p>
            <div className="s-row" style={{ gap: 16 }}>
              <ButtonLink href="/charity-market-cap">Explore the ranking</ButtonLink>
              <StatusChip status="imported" />
            </div>
          </div>
        </div>
      </Section>

      {/* Audiences */}
      <Section raised label="Who CHERR.IO is for">
        <h2 className="s-display-2" style={{ maxWidth: "20ch" }}>
          For everyone who cares where the money goes.
        </h2>
        <div className="s-grid-3">
          <article className="s-box">
            <span className="ch-label">Donors</span>
            <h3 className="s-h2">Know where every euro went.</h3>
            <p>Give by card, follow the campaign, vote on the receipts. If it doesn&apos;t work out, your money comes back.</p>
            <Link className="s-arrow-link" href="/how-it-works">
              How giving works →
            </Link>
          </article>
          <article className="s-box">
            <span className="ch-label">Charities &amp; fundraisers</span>
            <h3 className="s-h2">Raise money people trust.</h3>
            <p>Get verified once, publish campaigns and show your track record on the Charity Market Cap. A 1% platform fee at payout — nothing else.</p>
            <Link className="s-arrow-link" href="/charities">
              Apply as a charity →
            </Link>
          </article>
          <article className="s-box">
            <span className="ch-label">Cherrions</span>
            <h3 className="s-h2">Keep the system honest.</h3>
            <p>Our community rates organisations, votes on receipts and earns Proof of Charity points for doing it.</p>
            <Link className="s-arrow-link" href="/cherrions">
              Become a Cherrion →
            </Link>
          </article>
        </div>
      </Section>

      {/* Emergency Pool — the one cherry block */}
      <section className="s-cherry" aria-label="Emergency Pool">
        <div className="s-wrap s-cherry-inner">
          <div className="s-stack-sm" style={{ flex: "1 1 520px" }}>
            <span className="ch-label">Emergency Pool</span>
            <h2>No donation is wasted.</h2>
            <p className="s-lead" style={{ maxWidth: "58ch" }}>
              Money from campaigns that fall short can go to a shared pool. Its donors vote which live campaigns it helps next — and it can only ever go to campaigns on CHERR.IO.
            </p>
          </div>
          <ButtonLink href="/emergency-pool" size="lg">
            How the pool works
          </ButtonLink>
        </div>
      </section>

      {/* Proof layer */}
      <Section id="proof">
        <div className="s-section-title">
          <div className="s-stack-sm s-grow">
            <span className="ch-label s-mono" style={{ fontWeight: 500, letterSpacing: ".04em" }}>
              #proof
            </span>
            <h2 className="s-display-2">Every donation, on the blockchain.</h2>
          </div>
          <p className="s-aside" style={{ fontSize: 16, lineHeight: "24px" }}>
            For sceptics, journalists and auditors: each campaign is its own contract on Polygon. Every donation, vote and payout is public and can be checked by anyone.
          </p>
        </div>
        <div className="s-split" style={{ gap: 24, alignItems: "stretch" }}>
          <div className="s-box" style={{ flex: "1 1 280px" }}>
            <span className="ch-label">Held in campaign contract</span>
            <span className="s-figure">8,640.00</span>
            <span className="s-mono" style={{ fontSize: 14, color: "var(--ink-muted)" }}>
              USDC · Polygon PoS
            </span>
            <Address value={exampleContract} />
            <span className="s-mono-sm">EXAMPLE DATA · NOT A REAL CAMPAIGN</span>
          </div>
          <div style={{ flex: "999 1 560px", minWidth: 0 }}>
            <LedgerTable caption="Latest donations — example" rows={exampleLedger} />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" raised>
        <div className="s-split">
          <div className="s-stack-sm" style={{ flex: "1 1 300px" }}>
            <span className="ch-label s-eyebrow">Questions</span>
            <h2 className="s-display-2">Straight answers.</h2>
            <Link className="s-arrow-link" href="/faq" style={{ marginTop: 12 }}>
              All questions →
            </Link>
          </div>
          <div className="s-col-wide">
            <FaqList items={FAQ_HOME} />
          </div>
        </div>
      </Section>

      <CtaBand source="home-footer" />
    </>
  );
}
