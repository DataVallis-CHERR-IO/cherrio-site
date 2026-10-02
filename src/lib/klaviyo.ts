import type { SubscribeInput } from "./waitlist";

const API = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";

export class KlaviyoConfigError extends Error {}

function config() {
  const key = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!key || !listId) throw new KlaviyoConfigError("KLAVIYO_PRIVATE_KEY or KLAVIYO_LIST_ID is not set");
  return { key, listId };
}

async function call(path: string, key: string, body: unknown): Promise<Response> {
  return fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      revision: REVISION,
      accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
}

/** Request bodies are exported for tests. */
export function profileImportBody(input: SubscribeInput) {
  return {
    data: {
      type: "profile",
      attributes: {
        email: input.email,
        properties: { cherrio_role: input.role, cherrio_signup_source: input.source },
      },
    },
  };
}

export function subscribeBody(input: SubscribeInput, listId: string) {
  return {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        custom_source: `cherr.io waitlist (${input.source})`,
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: input.email,
                subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
              },
            },
          ],
        },
      },
      relationships: { list: { data: { type: "list", id: listId } } },
    },
  };
}

/**
 * Adds the email to the CHERR.IO Klaviyo list with marketing consent.
 * 1. profile-import upserts the profile and stores the role (donor/charity/…).
 * 2. profile-subscription-bulk-create-jobs subscribes it to the list
 *    (double opt-in applies if the list is configured for it in Klaviyo).
 */
export async function addToWaitlist(input: SubscribeInput): Promise<void> {
  const { key, listId } = config();

  const profile = await call("/profile-import", key, profileImportBody(input));
  if (!profile.ok) {
    throw new Error(`Klaviyo profile-import failed: ${profile.status} ${await safeText(profile)}`);
  }

  const sub = await call("/profile-subscription-bulk-create-jobs", key, subscribeBody(input, listId));
  if (sub.status !== 202 && !sub.ok) {
    throw new Error(`Klaviyo subscribe failed: ${sub.status} ${await safeText(sub)}`);
  }
}

async function safeText(r: Response): Promise<string> {
  try {
    return (await r.text()).slice(0, 500);
  } catch {
    return "";
  }
}
