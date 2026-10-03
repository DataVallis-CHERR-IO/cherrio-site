import type { Metadata } from "next";
import { CtaBand, PageHead, Section } from "@/components/chrome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "CHERR.IO is operated by Data Vallis d.o.o. in Maribor, Slovenia.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHead eyebrow="About" title="Built so that trust doesn't have to be blind." />
      <Section tone="white">
        <div className="s-prose">
          <p>CHERR.IO started in 2018 with a simple question: why should a donor have to take a charity&apos;s word for it? The first version proved that people want to see where their money goes. Since then the tools have caught up — cheap, fast public ledgers, card payments that work without crypto knowledge, and identity checks that respect privacy.</p>
          <p>So we rebuilt CHERR.IO from scratch. Donations sit in a locked account per campaign, payouts happen in steps that donors approve, and every charity earns a public Trust Score from its real record. Everything a donor needs is in plain euros; everything a sceptic needs is one click away on the public record.</p>
          <h2>Who we are</h2>
          <p>
            CHERR.IO is operated by <strong>{SITE.operator}</strong>, {SITE.operatorAddress}. We are a small team of engineers who build the platform in the open: the rules for every campaign are written in code that anyone can inspect, and every movement of money is public.
          </p>
          <h2>Contact</h2>
          <p>
            Email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>, or find us on{" "}
            <a href={SITE.x} target="_blank" rel="noreferrer">
              X
            </a>{" "}
            and{" "}
            <a href={SITE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            .
          </p>
        </div>
      </Section>
      <CtaBand source="about" />
    </>
  );
}
