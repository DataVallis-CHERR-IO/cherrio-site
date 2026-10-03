import type { Metadata } from "next";
import { PageHead, Section } from "@/components/chrome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for the CHERR.IO website.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <>
      <PageHead eyebrow="Terms" title="Terms of use" intro="The full terms of use for donating and fundraising will be published when the platform opens." />
      <Section tone="white">
        <div className="s-prose">
          <p>This website is operated by {SITE.operator}, {SITE.operatorAddress}. It describes how the CHERR.IO platform is designed to work. The platform is not open yet: no donations can be made and no campaigns are live.</p>
          <p>Rules, figures and features described on this website may change before launch. The version published at launch is the one that counts. Campaigns, organisations, amounts and transactions shown on this website are examples, unless stated otherwise.</p>
          <p>Nothing on this website is an offer of tokens, an investment or financial advice.</p>
          <p>
            Questions: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
