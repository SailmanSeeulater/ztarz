// One icon family: 24px grid, 1.75 stroke, round caps. Decorative by default (aria-hidden).
type Props = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const CheckIcon = ({ className = "size-4" }: Props) => (
  <svg {...base} className={className}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const CrossIcon = ({ className = "size-4" }: Props) => (
  <svg {...base} className={className}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </svg>
);

export const ChevronRightIcon = ({ className = "size-4" }: Props) => (
  <svg {...base} className={className}>
    <path d="M9.5 5.5L16 12l-6.5 6.5" />
  </svg>
);

export const ChevronLeftIcon = ({ className = "size-4" }: Props) => (
  <svg {...base} className={className}>
    <path d="M14.5 5.5L8 12l6.5 6.5" />
  </svg>
);

/** Three stacked passes: the theme picker's button. */
export const PassesIcon = ({ className = "size-5" }: Props) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="9" width="17" height="11" rx="2.5" />
    <path d="M5.5 9V7.5A2 2 0 0 1 7.5 5.5h9a2 2 0 0 1 2 2V9M7.5 5.5V4.8A1.3 1.3 0 0 1 8.8 3.5h6.4a1.3 1.3 0 0 1 1.3 1.3v.7" />
  </svg>
);

export const ArrowUpRightIcon = ({ className = "size-3.5" }: Props) => (
  <svg {...base} className={className}>
    <path d="M8 16L16 8M9.5 8H16v6.5" />
  </svg>
);
