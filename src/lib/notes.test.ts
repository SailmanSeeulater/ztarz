import { describe, expect, it } from "vitest";
import { noteExcerpt, renderNote, safeHref } from "./notes";

describe("renderNote", () => {
  it("renders Markdown", () => {
    const html = renderNote("# Title\n\n- **bold**\n- `code`");
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<code>code</code>");
  });

  it("shows raw HTML as text instead of running it", () => {
    const html = renderNote('<script>alert(1)</script>\n\nhi <img src=x onerror="alert(1)">');
    expect(html).not.toMatch(/<script|<img/i);
    expect(html).toContain("&lt;script&gt;");
  });

  it("drops unsafe links but keeps their text", () => {
    const html = renderNote("[click](javascript:alert(1)) and [data](data:text/html,hi)");
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("data:text");
    expect(html).toContain("click");
  });

  it("keeps web links and opens them safely", () => {
    const html = renderNote("[MDN](https://developer.mozilla.org) <https://example.com>");
    expect(html).toContain('href="https://developer.mozilla.org"');
    expect(html).toContain('rel="noreferrer noopener"');
  });

  it("only allows https images", () => {
    expect(renderNote("![a](http://x.test/a.png)")).not.toContain("<img");
    expect(renderNote("![a](https://x.test/a.png)")).toContain('<img src="https://x.test/a.png"');
  });
});

describe("safeHref", () => {
  it.each([
    ["https://a.test", "https://a.test"],
    ["/cards/f1/x", "/cards/f1/x"],
    ["#top", "#top"],
    ["mailto:a@b.test", "mailto:a@b.test"],
    ["JavaScript:alert(1)", null],
    ["//evil.test", null],
    ["vbscript:x", null],
  ])("%s", (href, expected) => expect(safeHref(href)).toBe(expected));
});

describe("noteExcerpt", () => {
  it("takes the first non-empty line without Markdown", () => {
    expect(noteExcerpt("\n\n## **Big O** notes\nmore")).toBe("Big O notes");
    expect(noteExcerpt("")).toBe("");
  });
});
