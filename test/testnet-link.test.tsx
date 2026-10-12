import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "@/components/chrome";
import Home from "@/app/page";
import { TESTNET } from "@/lib/site";

const link = `href="${TESTNET.href}"`;

describe("testnet link", () => {
  it("points at the public testnet", () => {
    expect(TESTNET.href).toBe("https://testnet.cherr.io/en");
  });

  it("is in the footer and in the home hero, next to the waitlist", () => {
    expect(renderToStaticMarkup(<Footer />)).toContain(link);
    const home = renderToStaticMarkup(<Home />);
    expect(home).toContain(link);
    expect(home).toContain("nothing real is spent");
    // The waitlist stays (David, 2026-10-12: "subscribe pa vseeno pusti").
    expect(home).toContain('type="email"');
  });
});
