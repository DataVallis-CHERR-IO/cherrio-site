import Link from "next/link";
import type { ReactNode } from "react";

export type QA = { q: string; a: ReactNode };

export const FAQ_HOME: QA[] = [
  { q: "Do I need crypto to donate?", a: <p>No. Log in with your email or Google and pay by card. We create an account for you in the background, and we cover the network costs. If you already have a crypto wallet, you can use that too.</p> },
  { q: "What does CHERR.IO cost?", a: <p>A 1% platform fee, taken only when money is paid out to the fundraiser. Donors pay no platform fee.</p> },
  { q: "What happens if a campaign doesn't reach its goal?", a: <p>A campaign succeeds once it reaches 10% of its goal by the deadline. If it doesn't, every donor can take their money back or pass it on to the <Link href="/emergency-pool">Emergency Pool</Link>.</p> },
  { q: "Who checks the charities?", a: <p>Our team reviews every organisation by hand before it can raise money. Individuals raising money for themselves verify their identity and are always paid in three steps.</p> },
  { q: "Is my personal data on the blockchain?", a: <p>No. The blockchain shows only an account address, never your name or email. Receipts with personal details are stored privately; only their fingerprint is public. You can delete your account at any time.</p> },
  { q: "I had an account on the old CHERR.IO.", a: <p>Thank you for being early. The new platform starts with a clean slate, so old accounts are not moved over. We&apos;ll invite you by email when we open.</p> },
];

export const FAQ_GROUPS: { title: string; items: QA[] }[] = [
  {
    title: "Giving",
    items: [
      FAQ_HOME[0]!,
      { q: "Which currency do I give in?", a: <p>You see and choose amounts in euros. Behind the scenes your donation is held in USDC, a digital dollar, so its value stays stable while it waits in the locked account. The exact amount is always visible in the campaign&apos;s proof section.</p> },
      { q: "Can I give anonymously?", a: <p>Yes. You can hide your name from the public donor list. The donation itself still appears in the public record, shown only as an account address.</p> },
      FAQ_HOME[2]!,
    ],
  },
  {
    title: "Protection and voting",
    items: [
      { q: "How is the money released?", a: <p>Organisations with a strong track record can be paid in one go once the campaign succeeds. Everyone else is paid in three equal steps: step 1 right away, steps 2 and 3 after donors approve the receipts. Individuals are always paid in three steps.</p> },
      { q: "How does the vote work?", a: <><p>When a step is due, the fundraiser uploads receipts and a short report. Donors then have 24 hours to vote.</p><p>The step is approved when donors who gave at least half of the money voted, and more than half of the votes (weighted by amount given) approve.</p></> },
      { q: "What if not enough donors vote?", a: <p>Our team reviews the receipts instead and decides. That decision is recorded publicly as well.</p> },
      { q: "What if donors reject the receipts?", a: <p>The remaining money is not paid out. Every donor can take back their share or pass it to the Emergency Pool.</p> },
    ],
  },
  {
    title: "Fees and money",
    items: [
      FAQ_HOME[1]!,
      { q: "Who pays the network costs?", a: <p>We do. Donating and voting are free of network costs for people who log in with email or Google.</p> },
      { q: "Is there a CHR token?", a: <p>CHR is the existing CHERR.IO token. At launch you don&apos;t need it for anything — donations are in euros. Token features are planned for a later phase and will be announced separately.</p> },
    ],
  },
  {
    title: "Privacy and trust",
    items: [
      FAQ_HOME[4]!,
      FAQ_HOME[3]!,
      { q: "Who runs CHERR.IO?", a: <p>CHERR.IO is operated by Data Vallis d.o.o. in Maribor, Slovenia. <Link href="/about">More about us</Link>.</p> },
      FAQ_HOME[5]!,
    ],
  },
];

export function FaqList({ items, openFirst = true }: { items: QA[]; openFirst?: boolean }) {
  return (
    <div className="s-faq">
      {items.map((it, i) => (
        <details key={it.q} open={openFirst && i === 0}>
          <summary>
            <span>{it.q}</span>
            <span className="s-faq-glyph" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="s-faq-a">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
