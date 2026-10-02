import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addToWaitlist, KlaviyoConfigError, profileImportBody, subscribeBody } from "@/lib/klaviyo";
import { rateLimit } from "@/lib/rate-limit";
import { subscribeSchema } from "@/lib/waitlist";

describe("subscribeSchema", () => {
  it("accepts a valid sign-up and normalises the email", () => {
    const r = subscribeSchema.parse({ email: "  Ana@Example.COM ", consent: true });
    expect(r).toMatchObject({ email: "ana@example.com", role: "donor", source: "home" });
  });
  it("requires consent", () => {
    expect(subscribeSchema.safeParse({ email: "a@b.co", consent: false }).success).toBe(false);
  });
  it("rejects a bad email and unknown role", () => {
    expect(subscribeSchema.safeParse({ email: "nope", consent: true }).success).toBe(false);
    expect(subscribeSchema.safeParse({ email: "a@b.co", consent: true, role: "admin" }).success).toBe(false);
  });
  it("rejects a filled honeypot", () => {
    expect(subscribeSchema.safeParse({ email: "a@b.co", consent: true, company: "ACME" }).success).toBe(false);
  });
});

describe("Klaviyo request bodies", () => {
  const input = subscribeSchema.parse({ email: "a@b.co", consent: true, role: "charity", source: "charities-hero" });
  it("subscribes to the configured list with marketing consent", () => {
    const b = subscribeBody(input, "LIST1");
    expect(b.data.relationships.list.data.id).toBe("LIST1");
    expect(b.data.attributes.profiles.data[0]!.attributes.subscriptions.email.marketing.consent).toBe("SUBSCRIBED");
  });
  it("stores the role on the profile", () => {
    expect(profileImportBody(input).data.attributes.properties).toEqual({ cherrio_role: "charity", cherrio_signup_source: "charities-hero" });
  });
});

describe("addToWaitlist", () => {
  const input = subscribeSchema.parse({ email: "a@b.co", consent: true });
  beforeEach(() => {
    process.env.KLAVIYO_PRIVATE_KEY = "pk_test";
    process.env.KLAVIYO_LIST_ID = "LIST1";
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.KLAVIYO_PRIVATE_KEY;
    delete process.env.KLAVIYO_LIST_ID;
  });

  it("calls profile-import then the subscription job with the private key", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response("{}", { status: 201 })).mockResolvedValueOnce(new Response(null, { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    await addToWaitlist(input);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]![0]).toBe("https://a.klaviyo.com/api/profile-import");
    expect(fetchMock.mock.calls[1]![0]).toBe("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs");
    expect(fetchMock.mock.calls[1]![1].headers.Authorization).toBe("Klaviyo-API-Key pk_test");
  });

  it("throws when Klaviyo rejects the subscription", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(new Response("{}", { status: 200 })).mockResolvedValueOnce(new Response("bad", { status: 400 })));
    await expect(addToWaitlist(input)).rejects.toThrow(/subscribe failed: 400/);
  });

  it("throws a config error when keys are missing", async () => {
    delete process.env.KLAVIYO_LIST_ID;
    await expect(addToWaitlist(input)).rejects.toBeInstanceOf(KlaviyoConfigError);
  });
});

describe("rateLimit", () => {
  it("allows 5 per window, then blocks, then resets", () => {
    const t = 1_000_000;
    for (let i = 0; i < 5; i++) expect(rateLimit("k", 5, 1000, t)).toBe(true);
    expect(rateLimit("k", 5, 1000, t)).toBe(false);
    expect(rateLimit("k", 5, 1000, t + 1001)).toBe(true);
  });
});
