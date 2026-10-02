/**
 * Example figures shown on the marketing site. They illustrate how the
 * platform works and are always labelled "Example" in the UI — they are
 * not real campaigns, organisations or transactions.
 */
import type { LedgerRow } from "@/components/ds";

export const exampleCampaign = {
  title: "Surgery for Susan, 7",
  org: "Children's Health Maribor",
  raised: 8640,
  target: 12000,
  donors: 214,
  daysLeft: 18,
};

export const exampleTranches = [
  { label: "Step 1", amount: 4000, state: "released" as const },
  { label: "Step 2", amount: 4000, state: "voting" as const },
  { label: "Step 3", amount: 4000, state: "locked" as const },
];

export const exampleVote = { turnout: 62, approval: 81, closesIn: "23 h 12 min" };

export const exampleTrust = {
  score: 82,
  components: [
    { label: "Community rating", value: 0.86 },
    { label: "Campaign success", value: 0.9 },
    { label: "Receipts approved", value: 0.78 },
    { label: "Evidence on time", value: 0.7 },
    { label: "Verification", value: 1 },
  ],
};

export const exampleImportedTrust = {
  score: 32,
  components: [
    { label: "Registry data", value: 0.8 },
    { label: "Verification", value: 0.5 },
  ],
};

export const exampleContract = "0x7a3f9c21b84e0d5f6a1c3b92e47d08f5c2b4e91d";

export const exampleLedger: LedgerRow[] = [
  { time: "2026-10-02 18:41", from: "0x91c4e2a07b3d5f8e6a2c1b0d9f3e7a4c5b2d8e61", amount: 50, tx: "0x4e8b1c7d2a9f03e65b4c8d1a7f2e9b3c6d0a5e4f8b1c2d3e4f5a6b7c8d9e0f1a" },
  { time: "2026-10-02 17:09", from: "0x2b7f0d14c9e8a3b65f1d2c7e4a9b8f3d6c5e0a12", label: "Anonymous", amount: 120, tx: "0x9a2c4e6f8b1d3f5a7c9e0b2d4f6a8c1e3b5d7f9a0c2e4b6d8f1a3c5e7b9d0f2c" },
  { time: "2026-10-02 15:52", from: "0x6d3a8e21f4b7c90d5e2a6f1b8c3d7e4a9f0b2c58", amount: 25, tx: "0x1f3d5b7a9c2e4f6b8d0a1c3e5f7b9d2a4c6e8f0b1d3a5c7e9f2b4d6a8c0e1f3b" },
  { time: "2026-10-02 12:30", from: "0xa4e9c3b1d7f2086e5c4b9a3d1f8e2c7b6a5d0f97", amount: 300, tx: "0x7c9e1a3b5d7f2c4e6a8b0d2f4c6e8a1b3d5f7c9e2a4b6d8f0c1e3a5b7d9f2c4e" },
];
