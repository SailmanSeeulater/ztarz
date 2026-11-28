import { describe, expect, it } from "vitest";
import { searchLibrary, type SearchItem } from "./search";

const items: SearchItem[] = [
  { kind: "card", href: "/cards/f1/dns", title: "What DNS does", context: "How the web works", extra: "dns resolver" },
  { kind: "card", href: "/cards/devops/cname", title: "CNAME at the apex", context: "DevOps and servers", extra: "dns records" },
  { kind: "term", href: "/library/glossary#t-dns", title: "DNS", context: "Glossary", extra: "Domain Name System" },
  { kind: "solution", href: "/library/solutions/0001-two-sum", title: "1. Two Sum", context: "Hash map lookup", extra: "array" },
  { kind: "card", href: "/cards/go/nil-map", title: "Writing to a nil map", context: "Go", extra: "go maps panic" },
];

describe("searchLibrary", () => {
  it("puts the glossary definition first, then title matches, then tag matches", () => {
    expect(searchLibrary(items, "dns").map((i) => i.href)).toEqual([
      "/library/glossary#t-dns",
      "/cards/f1/dns",
      "/cards/devops/cname",
    ]);
  });

  it("needs every word, in any field", () => {
    expect(searchLibrary(items, "nil go").map((i) => i.title)).toEqual(["Writing to a nil map"]);
    expect(searchLibrary(items, "nil rust")).toEqual([]);
  });

  it("finds solutions by pattern and ignores case and blanks", () => {
    expect(searchLibrary(items, "  HASH map ")[0].title).toBe("1. Two Sum");
    expect(searchLibrary(items, "   ")).toEqual([]);
  });
});
