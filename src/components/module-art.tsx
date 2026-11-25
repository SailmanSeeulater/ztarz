import type { ModuleId, StackLogo } from "@/lib/content/schema";

/**
 * One line drawing per module, on a 64-unit grid with round caps, in the pass's ink.
 * Generic pictures of the idea (a globe for the web, a prompt for the shell), never product logos.
 */
const ART: Record<ModuleId, React.ReactNode> = {
  // How the web works: a globe with a request going out and a response coming back
  f1: (
    <>
      <circle cx="28" cy="34" r="18" />
      <ellipse cx="28" cy="34" rx="8" ry="18" />
      <path d="M10 34h36M13 25h30M13 43h30" />
      <path d="M44 12h12m-4-4 4 4-4 4M56 20H44m4-4-4 4 4 4" />
    </>
  ),
  // Linux and the shell: a terminal with a prompt and cursor
  f2: (
    <>
      <rect x="8" y="12" width="48" height="40" rx="5" />
      <path d="M8 21h48" />
      <path d="M16 31l7 5-7 5M27 42h12" />
    </>
  ),
  // Git: a branch leaving main and merging back
  f3: (
    <>
      <path d="M18 8v48" />
      <path d="M18 20c0 10 26 6 26 16v0c0 6-26 4-26 12" />
      <circle cx="18" cy="14" r="4" />
      <circle cx="44" cy="34" r="4" />
      <circle cx="18" cy="50" r="4" />
    </>
  ),
  // One language, deeply: braces around lines of code
  f4: (
    <>
      <path d="M20 12c-6 0-6 4-6 10s-4 10-6 10c2 0 6 4 6 10s0 10 6 10" />
      <path d="M44 12c6 0 6 4 6 10s4 10 6 10c-2 0-6 4-6 10s0 10-6 10" />
      <path d="M24 24h12M28 32h12M24 40h8" />
    </>
  ),
  // Data structures and algorithms: a binary tree
  f5: (
    <>
      <circle cx="32" cy="12" r="5" />
      <circle cx="18" cy="32" r="5" />
      <circle cx="46" cy="32" r="5" />
      <circle cx="10" cy="52" r="5" />
      <circle cx="26" cy="52" r="5" />
      <circle cx="54" cy="52" r="5" />
      <path d="M29 16l-8 12M35 16l8 12M15 36l-3 11M21 36l3 11M48 37l4 10" />
    </>
  ),
  // Databases: a stack of disks
  f6: (
    <>
      <ellipse cx="32" cy="14" rx="20" ry="6" />
      <path d="M12 14v36c0 3.3 9 6 20 6s20-2.7 20-6V14" />
      <path d="M12 26c0 3.3 9 6 20 6s20-2.7 20-6M12 38c0 3.3 9 6 20 6s20-2.7 20-6" />
    </>
  ),
  // APIs and architecture: two services and the calls between them
  f7: (
    <>
      <rect x="6" y="20" width="18" height="24" rx="4" />
      <rect x="40" y="20" width="18" height="24" rx="4" />
      <path d="M26 27h12m-4-4 4 4-4 4M38 37H26m4-4-4 4 4 4" />
    </>
  ),
  // Running software: a container, an isometric box
  f8: (
    <>
      <path d="M32 8l22 12v24L32 56 10 44V20z" />
      <path d="M10 20l22 12 22-12M32 32v24" />
      <path d="M21 14l22 12" />
    </>
  ),
  // Security basics: a shield with a keyhole
  f9: (
    <>
      <path d="M32 6l20 8v14c0 14-9 24-20 30C21 52 12 42 12 28V14z" />
      <circle cx="32" cy="28" r="5" />
      <path d="M32 33v9" />
    </>
  ),
  // Reliability and performance: a gauge and a steady pulse
  f10: (
    <>
      <path d="M10 40a22 22 0 0 1 44 0" />
      <path d="M32 40l10-12" />
      <circle cx="32" cy="40" r="2.5" />
      <path d="M6 52h14l4-6 5 10 4-8 3 4h22" />
    </>
  ),
  // Working with AI and people: a conversation
  f11: (
    <>
      <path d="M8 14h30a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-8 7v-7H8a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" />
      <path d="M46 26h10a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-2v7l-8-7H30a4 4 0 0 1-4-4v-4" />
      <path d="M13 24h20M13 29h12" />
    </>
  ),
  // Frontend: a browser window with a layout
  frontend: (
    <>
      <rect x="6" y="10" width="52" height="44" rx="5" />
      <path d="M6 20h52" />
      <circle cx="12" cy="15" r="1" />
      <circle cx="17" cy="15" r="1" />
      <rect x="13" y="27" width="16" height="20" rx="2" />
      <path d="M35 28h16M35 35h16M35 42h10" />
    </>
  ),
  // Backend: a server rack
  backend: (
    <>
      <rect x="10" y="8" width="44" height="14" rx="3" />
      <rect x="10" y="25" width="44" height="14" rx="3" />
      <rect x="10" y="42" width="44" height="14" rx="3" />
      <path d="M17 15h2M17 32h2M17 49h2M38 15h9M38 32h9M38 49h9" />
    </>
  ),
  // Full stack: a browser window sitting on a server
  fullstack: (
    <>
      <rect x="8" y="6" width="48" height="30" rx="4" />
      <path d="M8 14h48M16 22h14M16 28h20" />
      <path d="M32 36v6" />
      <rect x="12" y="42" width="40" height="8" rx="2.5" />
      <rect x="12" y="50" width="40" height="8" rx="2.5" />
      <path d="M18 46h2M18 54h2" />
    </>
  ),
  // DevOps and servers: the build, ship, run loop
  devops: (
    <>
      <path d="M32 32c-6-8-10-12-16-12a12 12 0 0 0 0 24c6 0 10-4 16-12s10-12 16-12a12 12 0 0 1 0 24c-6 0-10-4-16-12z" />
      <path d="M46 16l4 4-4 4" />
    </>
  ),
  // AI engineering: a small neural network
  ai: (
    <>
      <circle cx="10" cy="20" r="4" />
      <circle cx="10" cy="44" r="4" />
      <circle cx="32" cy="12" r="4" />
      <circle cx="32" cy="32" r="4" />
      <circle cx="32" cy="52" r="4" />
      <circle cx="54" cy="32" r="4" />
      <path d="M14 19l14-6M14 21l14 10M14 43l14-10M14 45l14 6M36 13l14 17M36 32h14M36 51l14-17" />
    </>
  ),
  // Software engineering: components on a blueprint, wired by their interfaces
  swe: (
    <>
      <rect x="6" y="8" width="20" height="14" rx="3" />
      <rect x="38" y="8" width="20" height="14" rx="3" />
      <rect x="22" y="42" width="20" height="14" rx="3" />
      <path d="M26 15h12M16 22v10h16v10M48 22v10H32" />
      <circle cx="32" cy="32" r="2" />
    </>
  ),
  // LeetCode patterns: two pointers closing in on an array
  // Operating systems: stacked layers, hardware at the bottom, apps on top, the kernel between
  os: (
    <>
      <rect x="8" y="44" width="48" height="10" rx="3" />
      <rect x="14" y="29" width="36" height="10" rx="3" />
      <rect x="8" y="10" width="13" height="13" rx="3" />
      <rect x="25.5" y="10" width="13" height="13" rx="3" />
      <rect x="43" y="10" width="13" height="13" rx="3" />
      <path d="M32 39v5M20 23v6M44 23v6" />
    </>
  ),
  // Networking: three nodes joined in a small mesh
  net: (
    <>
      <circle cx="32" cy="12" r="6" />
      <circle cx="12" cy="50" r="6" />
      <circle cx="52" cy="50" r="6" />
      <path d="M29 17 15 45M35 17l14 28M18 50h28" />
      <path d="M32 18v14M32 32 16 46M32 32l16 14" strokeDasharray="2 4" />
    </>
  ),
  // Maths: a function curve over axes
  math: (
    <>
      <path d="M10 54V10M10 54h44" />
      <path d="M14 50c8-2 12-30 22-30s10 14 18 14" />
      <path d="M44 12h10M49 7v10" />
    </>
  ),
  // Embedded systems: a chip with pins
  embedded: (
    <>
      <rect x="16" y="16" width="32" height="32" rx="4" />
      <rect x="25" y="25" width="14" height="14" rx="2" />
      <path d="M24 8v8M32 8v8M40 8v8M24 48v8M32 48v8M40 48v8M8 24h8M8 32h8M8 40h8M48 24h8M48 32h8M48 40h8" />
    </>
  ),
  // Data science: a scatter plot with a trend line
  data: (
    <>
      <path d="M10 54V10M10 54h44" />
      <circle cx="20" cy="44" r="2.5" />
      <circle cx="27" cy="38" r="2.5" />
      <circle cx="33" cy="40" r="2.5" />
      <circle cx="39" cy="28" r="2.5" />
      <circle cx="47" cy="22" r="2.5" />
      <path d="M16 48 52 16" strokeDasharray="3 4" />
    </>
  ),
  // Machine learning: a tiny neural network
  ml: (
    <>
      <circle cx="12" cy="20" r="4" />
      <circle cx="12" cy="44" r="4" />
      <circle cx="32" cy="12" r="4" />
      <circle cx="32" cy="32" r="4" />
      <circle cx="32" cy="52" r="4" />
      <circle cx="52" cy="32" r="4" />
      <path d="m16 20 12-7M16 21l12 10M16 42l12-9M16 45l12 6M16 22l13 27M16 43l13-28M36 13l13 16M36 32h12M36 51l13-16" />
    </>
  ),
  // How LLMs work: tokens in a row, the next one being predicted
  llm: (
    <>
      <rect x="6" y="26" width="12" height="12" rx="3" />
      <rect x="21" y="26" width="12" height="12" rx="3" />
      <rect x="36" y="26" width="12" height="12" rx="3" />
      <rect x="51" y="26" width="8" height="12" rx="3" strokeDasharray="2 3" />
      <path d="M12 26c0-12 30-12 30 0M27 26c0-8 15-8 15 0" />
      <path d="M42 46v8M38 50h8" />
    </>
  ),
  // Python: a snake-ish curve, a prompt at the end
  python: (
    <>
      <path d="M12 44c0-10 8-12 14-12h12c6 0 14-2 14-12" />
      <path d="M52 20c0-6-6-10-12-10" />
      <circle cx="43" cy="15" r="1.5" />
      <path d="M12 44c0 6 6 10 12 10h10" />
      <path d="M42 48l6 6-6 6" />
    </>
  ),
  // Go: a goroutine arrow fanning out into channels
  go: (
    <>
      <path d="M8 32h18" />
      <path d="M26 32c8 0 8-16 18-16h10M26 32h28M26 32c8 0 8 16 18 16h10" />
      <path d="m50 12 4 4-4 4M50 28l4 4-4 4M50 44l4 4-4 4" />
    </>
  ),
  // Rust: a gear (it's a cog in a lot of systems)
  rust: (
    <>
      <circle cx="32" cy="32" r="14" />
      <circle cx="32" cy="32" r="5" />
      <path d="M32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M15 49l6-6M43 21l6-6" />
    </>
  ),
  // Java: a cup with steam
  java: (
    <>
      <path d="M12 28h32v14c0 8-6 12-16 12s-16-4-16-12z" />
      <path d="M44 32h4c4 0 6 3 6 6s-2 6-6 6h-5" />
      <path d="M20 10c-3 4 3 6 0 10M30 8c-3 4 3 6 0 10M40 10c-3 4 3 6 0 10" />
    </>
  ),
  // Node.js: a hexagon around an event loop
  node: (
    <>
      <path d="M32 6 54 19v26L32 58 10 45V19z" />
      <path d="M22 32a10 10 0 1 1 3 7" />
      <path d="m21 35 1 5 5-2" />
    </>
  ),
  // Express: a request passing through middleware into a handler
  express: (
    <>
      <path d="M6 32h52" />
      <rect x="16" y="20" width="6" height="24" rx="2" />
      <rect x="29" y="20" width="6" height="24" rx="2" />
      <rect x="42" y="16" width="14" height="32" rx="3" />
      <path d="m8 28 4 4-4 4" />
    </>
  ),
  // React: a component tree
  react: (
    <>
      <rect x="24" y="6" width="16" height="12" rx="3" />
      <rect x="8" y="30" width="16" height="12" rx="3" />
      <rect x="40" y="30" width="16" height="12" rx="3" />
      <rect x="40" y="48" width="16" height="10" rx="3" />
      <path d="M32 18v6H16v6M32 24h16v6M48 42v6" />
    </>
  ),
  // Next.js: a page split into server and client halves, with an arrow onward
  nextjs: (
    <>
      <rect x="8" y="10" width="40" height="44" rx="4" />
      <path d="M8 20h40M28 20v34" />
      <path d="M14 28h8M14 34h8M34 28h8M34 34h6" />
      <path d="m52 28 6 4-6 4" />
    </>
  ),
  // Spring Boot: a leaf on a power button
  springboot: (
    <>
      <path d="M20 18a18 18 0 1 0 24 0" />
      <path d="M32 8v20" />
      <path d="M38 44c-2-8 4-14 12-14 0 8-4 14-12 14zM38 44l6-8" />
    </>
  ),
  leetcode: (
    <>
      <rect x="6" y="26" width="52" height="12" rx="3" />
      <path d="M19 26v12M32 26v12M45 26v12" />
      <path d="M12 48v-6M12 42l-3 3M12 42l3 3" />
      <path d="M52 48v-6M52 42l-3 3M52 42l3 3" />
      <path d="M12 18h40M24 12l-12 6 12 6M40 12l12 6-12 6" />
    </>
  ),
  // Stack nuance: layers of a stack
  stack: (
    <>
      <path d="M32 8l24 11-24 11L8 19z" />
      <path d="M8 31l24 11 24-11" />
      <path d="M8 43l24 11 24-11" />
    </>
  ),
  // Interview answers: a microphone
  interview: (
    <>
      <rect x="24" y="6" width="16" height="30" rx="8" />
      <path d="M16 30a16 16 0 0 0 32 0M32 46v10M24 56h16" />
    </>
  ),
};

export function ModuleArt({
  id,
  className = "",
  strokeWidth = 1.5,
}: {
  id: ModuleId;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {ART[id]}
    </svg>
  );
}

/**
 * The module's drawing pressed into the pass, like an emboss: big, faint, clipped by the pass's
 * corner. A card about a specific technology shows that technology's logo instead, so the
 * lesson and the tool stick together. Sits behind the content and never takes clicks.
 */
export function PassEmboss({ id, logo, className = "" }: { id: ModuleId; logo?: StackLogo; className?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {logo?.path ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`absolute p-[6%] text-[var(--ink)] opacity-[0.11] ${className}`}
        >
          <path d={logo.path} />
        </svg>
      ) : (
        <ModuleArt id={id} strokeWidth={1.25} className={`absolute text-[var(--ink)] opacity-[0.16] ${className}`} />
      )}
    </div>
  );
}
