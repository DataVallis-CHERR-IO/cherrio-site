import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/tokens.css";
import "@/styles/components.css";
import "@/styles/site.css";
import { Footer, Header } from "@/components/chrome";
import { SITE, SITE_URL } from "@/lib/site";

const GA_ID = "G-JPNKGW05DE";
const COOKIEYES_SRC = "https://cdn-cookieyes.com/client_data/e620245ea48e2091c8127e58be65ef26/script.js";

// Google Consent Mode v2: everything denied until the visitor accepts in the CookieYes banner.
// CookieYes then sends gtag("consent", "update", …) for the categories the visitor allows.
const CONSENT_DEFAULT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("consent", "default", {
  ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
  analytics_storage: "denied", functionality_storage: "denied", personalization_storage: "denied",
  security_storage: "granted", wait_for_update: 2000
});
gtag("set", "ads_data_redaction", true);
gtag("set", "url_passthrough", true);`;

const GA_CONFIG = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "${GA_ID}");`;

// Fonts ship with the app (src/fonts, OFL): no request to Google at build or run time (GDPR).
const display = localFont({ src: "../fonts/archivo-black-latin-400-normal.woff2", weight: "400", display: "swap", variable: "--nf-display" });
const sans = localFont({
  src: [
    { path: "../fonts/archivo-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/archivo-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/archivo-latin-700-normal.woff2", weight: "700" },
    { path: "../fonts/archivo-latin-800-normal.woff2", weight: "800" },
  ],
  display: "swap",
  variable: "--nf-sans",
});
const mono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  display: "swap",
  variable: "--nf-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  // Share image: versioned file name, so a new image busts X/LinkedIn/Facebook caches.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GB",
    url: SITE_URL,
    images: [{ url: "/og/cherrio-og-v1.png", width: 1200, height: 630, alt: "CHERR.IO — Every cent, on the record. Example: €12,000 raised, released in 3 steps." }],
  },
  twitter: { card: "summary_large_image", site: "@CherrioPlatform", images: ["/og/cherrio-og-v1.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e3e3e3" },
    { media: "(prefers-color-scheme: dark)", color: "#090c0d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Order matters: consent defaults → CookieYes banner → Google tag. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT }} />
        {/* Start cookieyes banner */}
        <script id="cookieyes" type="text/javascript" src={COOKIEYES_SRC} />
        {/* End cookieyes banner */}
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: GA_CONFIG }} />
      </head>
      <body>
        <a href="#main" className="s-skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
