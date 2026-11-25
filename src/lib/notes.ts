import { Marked, type Tokens } from "marked";

/** Notes are a scratchpad, not a wiki: a few, short, kept current. */
export const MAX_NOTES = 15;
export const MAX_NOTE_CHARS = 5000;
export const MAX_TITLE_CHARS = 120;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Only web links, mail links and same-site paths; never javascript:, data: or the like. */
export function safeHref(href: string) {
  const h = href.trim();
  if (/^(https?:|mailto:)/i.test(h)) return h;
  if (/^[/#?]/.test(h) && !h.startsWith("//")) return h;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(h) && !h.startsWith("//")) return h; // relative, e.g. "docs/x"
  return null;
}

/**
 * Markdown for notes, which come from a user rather than this repo: raw HTML is shown as text,
 * links are limited to safe schemes and open in a new tab, images must be https.
 */
const md = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    html(token: Tokens.HTML | Tokens.Tag) {
      return escapeHtml(token.text);
    },
    link(token: Tokens.Link) {
      const text = this.parser.parseInline(token.tokens);
      const href = safeHref(token.href);
      if (!href) return text;
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
      return `<a href="${escapeHtml(href)}"${title} target="_blank" rel="noreferrer noopener">${text}</a>`;
    },
    image(token: Tokens.Image) {
      if (!/^https:\/\//i.test(token.href.trim())) return escapeHtml(token.text);
      return `<img src="${escapeHtml(token.href.trim())}" alt="${escapeHtml(token.text)}" loading="lazy">`;
    },
  },
});

export const renderNote = (markdown: string) => md.parse(markdown, { async: false });

/** The first line of a note, without Markdown markers, for lists. */
export function noteExcerpt(body: string, max = 140) {
  const line = body
    .split("\n")
    .map((l) => l.replace(/^[#>\-*+\s]+|[*_`~]/g, "").trim())
    .find(Boolean);
  if (!line) return "";
  return line.length > max ? line.slice(0, max - 1) + "…" : line;
}
