/**
 * Resolves a card's `stack:` slugs to logos at content build time, so the app ships only the
 * few SVG paths its cards use. Logos come from Simple Icons (CC0, https://simpleicons.org);
 * the slugs are theirs. Technologies Simple Icons doesn't carry get a lettered tile instead.
 * Build-only: imported by parse.ts, never by app code.
 */
import * as icons from "simple-icons";
import type { StackLogo } from "./schema";

type SimpleIcon = { title: string; slug: string; hex: string; path: string };

const BY_SLUG = new Map<string, SimpleIcon>(
  Object.values(icons as unknown as Record<string, SimpleIcon>)
    .filter((i) => i && typeof i === "object" && "slug" in i)
    .map((i) => [i.slug, i]),
);

/** Friendlier names for slugs that Simple Icons spells differently. */
const ALIASES: Record<string, string> = {
  jwt: "jsonwebtokens",
  nextjs: "nextdotjs",
  node: "nodedotjs",
  bash: "gnubash",
  java: "openjdk",
};

/** Not in Simple Icons (removed at the owner's request, or never added): shown as a lettered tile. */
const LETTERED: Record<string, { title: string; hex: string }> = {
  aws: { title: "AWS", hex: "232F3E" },
  s3: { title: "Amazon S3", hex: "3F8624" },
  sqs: { title: "Amazon SQS", hex: "C7254E" },
  grpc: { title: "gRPC", hex: "244C5A" },
  oauth: { title: "OAuth 2.0", hex: "3C3C3C" },
  openai: { title: "OpenAI", hex: "000000" },
  pgvector: { title: "pgvector", hex: "336791" },
  playwright: { title: "Playwright", hex: "2EAD33" },
  systemd: { title: "systemd", hex: "30D475" },
  bullmq: { title: "BullMQ", hex: "D82C20" },
  certbot: { title: "Certbot", hex: "003A70" },
};

export function resolveStack(slug: string): StackLogo | undefined {
  const icon = BY_SLUG.get(ALIASES[slug] ?? slug);
  if (icon) return { slug, title: icon.title, hex: icon.hex, path: icon.path };
  const lettered = LETTERED[slug];
  return lettered && { slug, ...lettered };
}
