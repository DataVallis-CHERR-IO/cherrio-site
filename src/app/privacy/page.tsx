import type { Metadata } from "next";
import { PageHead, Section } from "@/components/chrome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How CHERR.IO handles your data on this website and the launch waitlist.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <>
      <PageHead eyebrow="Privacy" title="Privacy notice" intro="This notice covers this website and the launch waitlist. The platform itself will publish its own privacy notice at launch." />
      <Section tone="white">
        <div className="s-prose">
          <p className="s-muted">Last updated: 3 October 2026</p>
          <h2>Who is responsible</h2>
          <p>
            {SITE.operator}, {SITE.operatorAddress} (&quot;we&quot;) is the controller of the personal data described here. Contact: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
          <h2>What we collect and why</h2>
          <div className="s-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Purpose</th>
                <th>Legal basis</th>
                <th>Kept for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Email address, the reason you signed up (donor, charity, fundraiser, Cherrion), the page you signed up on</td>
                <td>To tell you when CHERR.IO launches and to invite you to the platform</td>
                <td>Your consent (Art. 6(1)(a) GDPR)</td>
                <td>Until you unsubscribe, or 6 months after launch at most</td>
              </tr>
              <tr>
                <td>Technical data in server logs (IP address, browser, time of request)</td>
                <td>Running the website securely and preventing abuse</td>
                <td>Our legitimate interest (Art. 6(1)(f) GDPR)</td>
                <td>Up to 30 days</td>
              </tr>
              <tr>
                <td>Usage data collected by Google Analytics (pages visited, approximate location, device and browser, cookie identifiers)</td>
                <td>Understanding how visitors use the website so we can improve it</td>
                <td>Your consent (Art. 6(1)(a) GDPR)</td>
                <td>14 months</td>
              </tr>
              <tr>
                <td>Your cookie choices</td>
                <td>Remembering which cookies you accepted or rejected</td>
                <td>Legal obligation (Art. 6(1)(c) GDPR)</td>
                <td>12 months</td>
              </tr>
            </tbody>
          </table>
          </div>
          <h2>Cookies</h2>
          <p>
            Strictly necessary cookies keep the website working and remember your cookie choices. Analytics cookies (Google Analytics) are set only after you accept them in the cookie banner; until then Google receives no cookie identifiers. We use no advertising cookies. Fonts are served from our own server.
          </p>
          <p>
            You can change or withdraw your choice at any time:{" "}
            <button type="button" className="cky-banner-element s-inline-btn">
              open cookie settings
            </button>
            .
          </p>
          <p>The table below lists the cookies currently used on this website. It is kept up to date automatically by our consent tool, CookieYes.</p>
          <div className="cky-audit-table-element" />
          <h2>Who processes your data for us</h2>
          <ul>
            <li>
              <strong>Klaviyo</strong> — stores the waitlist and sends launch emails on our behalf. Data may be transferred to the United States under the EU Standard Contractual Clauses and the EU–US Data Privacy Framework.
            </li>
            <li>
              <strong>Hetzner Online GmbH</strong> (Germany) — hosts this website.
            </li>
            <li>
              <strong>Google Ireland Ltd.</strong> — Google Analytics, only with your consent. Data may be transferred to the United States under the EU–US Data Privacy Framework.
            </li>
            <li>
              <strong>CookieYes Limited</strong> (United Kingdom) — shows the cookie banner and stores your consent record.
            </li>
          </ul>
          <h2>Your rights</h2>
          <p>You can withdraw your consent at any time with the unsubscribe link in every email or by writing to us. You also have the right to access, correct or delete your data, to restrict or object to its processing, and to data portability. You can complain to the Slovenian Information Commissioner (Informacijski pooblaščenec, ip-rs.si).</p>
        </div>
      </Section>
    </>
  );
}
