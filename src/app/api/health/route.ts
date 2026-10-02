import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    sha: process.env.NEXT_PUBLIC_GIT_SHA ?? "",
    klaviyo: Boolean(process.env.KLAVIYO_PRIVATE_KEY && process.env.KLAVIYO_LIST_ID),
  });
}
