"use client";

import { useState } from "react";

const short = (a: string) => (a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-4)}` : a);

export function AddressCopy({ value, full }: { value: string; full?: boolean }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(value).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      },
      () => undefined,
    );
  }
  return (
    <span className="ch-addr" title={value}>
      <span className="ch-addr-text">{full ? value : short(value)}</span>
      <button type="button" onClick={copy} aria-label="Copy address">
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}
