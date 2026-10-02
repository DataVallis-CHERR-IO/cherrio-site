import { NextResponse, type NextRequest } from "next/server";
import { addToWaitlist, KlaviyoConfigError } from "@/lib/klaviyo";
import { rateLimit } from "@/lib/rate-limit";
import { errorMessage, subscribeSchema } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; rate limit still applies
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(`sub:${ip}`)) {
    return NextResponse.json({ error: "Too many attempts. Wait ten minutes and try again." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Check the form and try again." }, { status: 400 });
  }

  // Honeypot filled → pretend success, store nothing.
  if (json && typeof json === "object" && "company" in json && (json as { company?: unknown }).company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = subscribeSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: errorMessage(parsed.error) }, { status: 400 });

  try {
    await addToWaitlist(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never log the email address; log only the failure.
    console.error("[subscribe]", err instanceof KlaviyoConfigError ? "Klaviyo not configured" : (err as Error).message);
    return NextResponse.json({ error: "We could not add you right now. Try again in a few minutes." }, { status: 502 });
  }
}
