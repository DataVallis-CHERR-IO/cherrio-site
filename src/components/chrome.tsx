import Link from "next/link";
import type { ReactNode } from "react";
import { NAV, SITE } from "@/lib/site";
import { ButtonLink } from "./ds";
import { WaitlistForm } from "./WaitlistForm";

export function Header() {
  return (
    <header className="s-header">
      <div className="s-wrap s-header-row">
        <Link href="/" className="s-logo" aria-label="CHERR.IO home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/cherrio-wordmark-cherry.svg" alt="CHERR.IO" width={126} height={48} />
        </Link>
        <nav aria-label="Main" className="s-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="s-navlink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="s-header-cta">
          <ButtonLink href="/#waitlist">Get early access</ButtonLink>
        </div>
        <details className="s-menu">
          <summary className="ch-btn" aria-label="Open menu">
            Menu
          </summary>
          <nav aria-label="Mobile" className="s-menu-panel">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="s-menu-link">
                {n.label}
              </Link>
            ))}
            <Link href="/cherrions" className="s-menu-link">
              Cherrions
            </Link>
            <Link href="/about" className="s-menu-link">
              About
            </Link>
            <ButtonLink href="/#waitlist" variant="primary" block>
              Get early access
            </ButtonLink>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="s-band s-footer">
      <div className="s-wrap s-footer-inner">
        <div className="s-footer-top">
          <div className="s-footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/cherrio-wordmark-white.svg" alt="CHERR.IO" width={132} height={50} />
            <p>Transparent charitable giving. Every euro locked, released in steps and on the record.</p>
          </div>
          <nav aria-label="Footer" className="s-footer-nav">
            <div>
              <span className="ch-label">Platform</span>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/charity-market-cap">Charity Market Cap</Link>
              <Link href="/emergency-pool">Emergency Pool</Link>
              <Link href="/faq">FAQ</Link>
            </div>
            <div>
              <span className="ch-label">Join</span>
              <Link href="/charities">For charities</Link>
              <Link href="/cherrions">Cherrions</Link>
              <Link href="/#waitlist">Waitlist</Link>
            </div>
            <div>
              <span className="ch-label">Company</span>
              <Link href="/about">About</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <a href={SITE.x} target="_blank" rel="noreferrer">
                X ↗
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </nav>
        </div>
        <div className="s-footer-bottom">
          <span>
            Operated by {SITE.operator}, {SITE.operatorAddress}
          </span>
          <span className="s-mono">© {new Date().getFullYear()} CHERR.IO</span>
        </div>
      </div>
    </footer>
  );
}

/** Page opener for subpages: eyebrow, display-2 title, intro. */
export function PageHead({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="s-section s-pagehead">
      <div className="s-wrap s-stack-lg">
        <span className="ch-label s-eyebrow">{eyebrow}</span>
        <h1 className="s-display-2 s-pagehead-title">{title}</h1>
        {intro ? <p className="s-lead">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function Section({ id, raised, children, label }: { id?: string; raised?: boolean; children: ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className={`s-section ${raised ? "s-raised" : ""}`}>
      <div className="s-wrap s-section-pad">{children}</div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, aside }: { eyebrow?: string; title: string; aside?: ReactNode }) {
  return (
    <div className="s-section-title">
      <div className="s-stack-sm s-grow">
        {eyebrow ? <span className="ch-label s-eyebrow">{eyebrow}</span> : null}
        <h2 className="s-display-2">{title}</h2>
      </div>
      {aside ? <p className="s-aside">{aside}</p> : null}
    </div>
  );
}

export function CtaBand({ title = "Be there on day one", text, source, role, askRole = true, buttonLabel }: { title?: string; text?: string; source: string; role?: "donor" | "charity" | "fundraiser" | "cherrion"; askRole?: boolean; buttonLabel?: string }) {
  return (
    <section className="s-band s-cta" aria-label="Join the waitlist" id="waitlist-band">
      <div className="s-wrap s-cta-inner">
        <div className="s-stack-md s-cta-text">
          <h2 className="s-display-cta">{title}</h2>
          <p className="s-band-muted s-lead">{text ?? "Leave your email and we'll tell you the moment the first campaigns open. One email at launch — no spam."}</p>
        </div>
        <div className="s-cta-form">
          <WaitlistForm source={source} role={role} askRole={askRole && !role} tone="band" buttonLabel={buttonLabel} />
        </div>
      </div>
    </section>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="s-check">
      <span aria-hidden="true">✓</span>
      <span>{children}</span>
    </li>
  );
}
