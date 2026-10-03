export const SITE_URL = (process.env.SITE_URL ?? "https://cherr.io").replace(/\/$/, "");

export const SITE = {
  name: "CHERR.IO",
  tagline: "Every cent, on the record",
  description:
    "Transparent charitable giving. Your donation waits in a locked account and is released in three steps — only when donors approve the receipts.",
  operator: "Data Vallis d.o.o.",
  operatorAddress: "Maribor, Slovenia",
  // TODO(David): confirm the public contact address before launch.
  contactEmail: "info@cherr.io",
  x: "https://x.com/CherrioPlatform",
  linkedin: "https://www.linkedin.com/company/cherrio",
} as const;

export const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/charity-market-cap", label: "Charity Market Cap" },
  { href: "/emergency-pool", label: "Emergency Pool" },
  { href: "/charities", label: "For charities" },
  { href: "/faq", label: "FAQ" },
] as const;
