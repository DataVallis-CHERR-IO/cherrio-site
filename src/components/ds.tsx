/**
 * CHERR.IO design-system components (marketing-site port).
 * Same markup and ch- classes as the design system bundle and packages/ui
 * in web3-platform, so they render identically. Amounts here are display-only
 * example figures (EUR / USDC as plain numbers) — this site moves no money.
 */
import Link from "next/link";
import type { ReactNode } from "react";

function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export const eur = (n: number) => "€" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
export const usdc = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const short = (a: string) => (a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-4)}` : a);

/* ── Button / ButtonLink ─────────────────────────────────────────────── */
type BtnStyle = { variant?: "primary" | "secondary" | "ghost"; size?: "md" | "lg"; block?: boolean; className?: string };
const btnClass = ({ variant = "secondary", size = "md", block, className }: BtnStyle) =>
  cx("ch-btn", `ch-btn-${variant}`, size === "lg" && "ch-btn-lg", block && "ch-btn-block", className);

export function ButtonLink({ href, children, ...s }: BtnStyle & { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={btnClass(s)} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  type = "button",
  disabled,
  ...s
}: BtnStyle & { children: ReactNode; type?: "button" | "submit"; disabled?: boolean }) {
  return (
    <button type={type} disabled={disabled} className={btnClass(s)}>
      {children}
    </button>
  );
}

/* ── StatusChip ──────────────────────────────────────────────────────── */
export type Status = "live" | "voting" | "succeeded" | "completed" | "verified" | "pending" | "imported" | "needs-review" | "frozen" | "failed" | "rejected";
const STATUS: Record<Status, [string, string, string]> = {
  live: ["ch-chip-live", "●", "Raising"],
  voting: ["ch-chip-warning", "◐", "Donors reviewing"],
  succeeded: ["ch-chip-success", "✓", "Goal reached"],
  completed: ["ch-chip-success", "✓", "Completed"],
  verified: ["ch-chip-success", "✓", "Verified"],
  pending: ["ch-chip-warning", "◐", "In review"],
  imported: ["ch-chip-outline ch-chip-muted", "○", "Not on CHERR.IO yet"],
  "needs-review": ["ch-chip-hatch", "!", "Team reviewing"],
  frozen: ["ch-chip-hatch-accent", "‖", "Paused"],
  failed: ["ch-chip-danger", "✕", "Unsuccessful"],
  rejected: ["ch-chip-danger", "✕", "Rejected by donors"],
};
export function StatusChip({ status, children }: { status: Status; children?: ReactNode }) {
  const [cls, glyph, label] = STATUS[status];
  return (
    <span className={cx("ch-chip", cls)}>
      <span className="ch-chip-glyph" aria-hidden="true">
        {glyph}
      </span>
      {children ?? label}
    </span>
  );
}

/* ── Progress ────────────────────────────────────────────────────────── */
export function Progress({ raised, target, threshold = 0.1 }: { raised: number; target: number; threshold?: number }) {
  const w = target > 0 ? Math.max(0, Math.min(100, (raised / target) * 100)) : 0;
  return (
    <div className="ch-progress">
      <div className="ch-progress-figures">
        <span className="ch-progress-raised">{eur(raised)}</span>
        <span className="ch-progress-target">raised of {eur(target)}</span>
      </div>
      <div className="ch-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(w)} aria-label={`Raised ${Math.round(w)}% of goal`}>
        <div className="ch-bar-fill" style={{ width: `${w}%` }} data-full={w >= 100 ? "true" : undefined} />
        <div className="ch-bar-tick" style={{ left: `${threshold * 100}%` }} aria-hidden="true" />
      </div>
      <div className="ch-progress-meta">
        <span>{Math.floor(w)}% of goal</span>
        <span>{w >= threshold * 100 ? "✓ Campaign will succeed" : `Succeeds at ${Math.round(threshold * 100)}%`}</span>
      </div>
    </div>
  );
}

/* ── CampaignCard ────────────────────────────────────────────────────── */
export function CampaignCard(p: {
  title: string;
  org: string;
  verified?: boolean;
  status?: Status;
  raised: number;
  target: number;
  donors: number;
  daysLeft: number;
  featured?: boolean;
  photoLabel?: string;
}) {
  return (
    <article className={cx("ch-card", p.featured && "ch-card-featured")} style={{ maxWidth: "none" }}>
      <div className="ch-card-media">
        {p.photoLabel ? <span className="s-photo-label">{p.photoLabel}</span> : null}
        <StatusChip status={p.status ?? "live"} />
      </div>
      <div className="ch-card-body">
        <div className="ch-card-org">
          {p.verified ? (
            <span className="ch-verified" role="img" aria-label="Verified organisation">
              <span aria-hidden="true">✓</span>
            </span>
          ) : null}
          <span>{p.org}</span>
        </div>
        <h3 className="ch-card-title">{p.title}</h3>
        <Progress raised={p.raised} target={p.target} />
        <div className="ch-card-foot">
          <span>{p.donors} donors</span>
          <span>{p.daysLeft} days left</span>
        </div>
      </div>
    </article>
  );
}

/* ── ProofLink ───────────────────────────────────────────────────────── */
export function ProofLink({ href = "#proof", external, children }: { href?: string; external?: boolean; children?: ReactNode }) {
  const inner = (
    <>
      <span className="ch-proof-mark" aria-hidden="true">
        ✓
      </span>
      <span>{children ?? "Verified on blockchain"}</span>
      <span aria-hidden="true">{external ? "↗" : "↓"}</span>
    </>
  );
  return external ? (
    <a className="ch-proof" href={href} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link className="ch-proof" href={href}>
      {inner}
    </Link>
  );
}

/* ── MilestoneTrack ──────────────────────────────────────────────────── */
type Tranche = { label?: string; amount: number; state: "released" | "voting" | "locked" | "rejected" };
const MS = { released: "✓ Paid out", voting: "◐ Donors reviewing receipts", locked: "□ Locked until approved", rejected: "✕ Returned to donors" };
export function MilestoneTrack({ tranches }: { tranches: Tranche[] }) {
  return (
    <ol className="ch-ms" style={{ listStyle: "none", margin: 0, padding: 0, maxWidth: "none" }}>
      {tranches.map((t, i) => (
        <li key={i} className="ch-ms-step" data-state={t.state}>
          <span className="ch-label">{t.label ?? `Step ${i + 1}`}</span>
          <span className="ch-ms-amt">{eur(t.amount)}</span>
          <span className="ch-ms-state">{MS[t.state]}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── VoteMeter ───────────────────────────────────────────────────────── */
export function VoteMeter({ turnout, approval, quorum = 50, pass = 51, closesIn }: { turnout: number; approval: number; quorum?: number; pass?: number; closesIn?: string }) {
  const line = (label: string, val: number, need: number, yes: string, no: string) => {
    const ok = val >= need;
    return (
      <div className="ch-vote-line">
        <div className="ch-vote-top">
          <span className="ch-vote-q">{label}</span>
          <b>{Math.round(val)}%</b>
        </div>
        <div className="ch-bar" style={{ height: 20 }} aria-hidden="true">
          <div className="ch-bar-fill" style={{ width: `${Math.min(100, val)}%`, background: ok ? "var(--ink)" : "var(--accent)" }} />
          <div className="ch-bar-tick" style={{ left: `${need}%` }} />
        </div>
        <div className="ch-vote-verdict">{ok ? `✓ ${yes}` : `✕ ${no} (needs ${need}%)`}</div>
      </div>
    );
  };
  return (
    <section className="ch-vote" aria-label="Donor vote" style={{ maxWidth: "none" }}>
      {line("Donors who voted", turnout, quorum, "Enough donors voted", "Not enough donors yet")}
      {line("Votes to approve", approval, pass, "Receipts approved", "Not approved")}
      {closesIn ? <div className="ch-vote-verdict">Voting closes in {closesIn}</div> : null}
    </section>
  );
}

/* ── TrustScore ──────────────────────────────────────────────────────── */
export function TrustScore({ score, components, imported, version = "v1" }: { score: number; components: { label: string; value: number }[]; imported?: boolean; version?: string }) {
  return (
    <section className="ch-trust" aria-label="Trust Score" style={{ maxWidth: "none" }}>
      <div className="ch-trust-head">
        <div>
          <div className="ch-label">Trust Score</div>
          <div className="ch-trust-score">
            {Math.round(score)}
            <small> /100</small>
          </div>
        </div>
        <StatusChip status={imported ? "imported" : "verified"} />
      </div>
      {components.map((c) => (
        <div className="ch-trust-row" key={c.label}>
          <span>{c.label}</span>
          <span className="ch-trust-meter" aria-hidden="true">
            <span style={{ width: `${Math.round(c.value * 100)}%` }} />
          </span>
          <span className="ch-trust-val">{Math.round(c.value * 100)}</span>
        </div>
      ))}
      <div className="ch-trust-note">
        Formula {version}
        {imported ? " · capped at 40 until the charity joins" : ""}
      </div>
    </section>
  );
}

/* ── LedgerTable (proof layer) ───────────────────────────────────────── */
export type LedgerRow = { time: string; from: string; label?: string; amount: number; tx: string };
export function LedgerTable({ rows, caption, explorerBase = "https://amoy.polygonscan.com/tx/" }: { rows: LedgerRow[]; caption?: string; explorerBase?: string }) {
  return (
    <div className="ch-ledger-wrap">
      <table className="ch-ledger">
        {caption ? (
          <caption className="ch-label" style={{ textAlign: "left", padding: "8px 12px" }}>
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr>
            <th scope="col">Time (UTC)</th>
            <th scope="col">From</th>
            <th scope="col" className="ch-num">
              Amount USDC
            </th>
            <th scope="col">Tx</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.tx}>
              <td className="ch-ledger-muted">{r.time}</td>
              <td>{r.label ?? short(r.from)}</td>
              <td className="ch-num">{usdc(r.amount)}</td>
              <td>
                <a href={explorerBase + r.tx} target="_blank" rel="noreferrer">
                  {short(r.tx)} ↗
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Address (static; copy button lives in AddressCopy) ──────────────── */
export { AddressCopy as Address } from "./AddressCopy";
