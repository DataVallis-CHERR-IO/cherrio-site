"use client";

import { useId, useState, type FormEvent } from "react";
import type { Role } from "@/lib/waitlist";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "donor", label: "I want to donate" },
  { value: "charity", label: "I run a charity" },
  { value: "fundraiser", label: "I need to raise money" },
  { value: "cherrion", label: "I want to help check campaigns" },
];

export function WaitlistForm({
  source,
  role: fixedRole,
  askRole = false,
  tone = "light",
  buttonLabel = "Join the waitlist",
}: {
  source: string;
  role?: Role;
  askRole?: boolean;
  tone?: "light" | "band";
  buttonLabel?: string;
}) {
  const id = useId();
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          role: fixedRole ?? form.get("role") ?? "donor",
          consent: form.get("consent") === "on",
          source,
          company: form.get("company") ?? "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setState({ kind: "error", message: data.error ?? "We could not add you. Try again in a minute." });
        return;
      }
      setState({ kind: "done" });
    } catch {
      setState({ kind: "error", message: "No connection. Check your internet and try again." });
    }
  }

  if (state.kind === "done") {
    return (
      <div className={`s-form-done ${tone === "band" ? "s-on-band" : ""}`} role="status">
        <span className="s-form-done-mark" aria-hidden="true">
          ✓
        </span>
        <div>
          <strong>You&apos;re on the list.</strong>
          <p>We&apos;ll email you once, when the first campaigns open. Check your inbox to confirm your address.</p>
        </div>
      </div>
    );
  }

  const err = state.kind === "error" ? state.message : null;

  return (
    <form className={`s-form ${tone === "band" ? "s-on-band" : ""}`} onSubmit={onSubmit} noValidate aria-describedby={err ? `${id}-err` : undefined}>
      <div className="s-form-row">
        <div className={`ch-field s-form-email ${err ? "ch-field-error" : ""}`}>
          <label className="ch-label" htmlFor={`${id}-email`}>
            Your email
          </label>
          <div className="ch-field-row">
            <input id={`${id}-email`} className="ch-input" type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
        </div>
        {askRole ? (
          <div className="ch-field s-form-role">
            <label className="ch-label" htmlFor={`${id}-role`}>
              I&apos;m here because
            </label>
            <div className="ch-field-row">
              <select id={`${id}-role`} name="role" className="ch-input s-select" defaultValue="donor">
                {ROLE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}
        <button type="submit" className="ch-btn ch-btn-primary ch-btn-lg s-form-submit" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Adding you…" : buttonLabel}
        </button>
      </div>
      <label className="s-consent">
        <input type="checkbox" name="consent" required />
        <span>
          Email me about the CHERR.IO launch. I can unsubscribe at any time. See the <a href="/privacy">privacy notice</a>.
        </span>
      </label>
      <div className="s-hp" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {err ? (
        <p id={`${id}-err`} className="s-form-error" role="alert">
          {err}
        </p>
      ) : null}
    </form>
  );
}
