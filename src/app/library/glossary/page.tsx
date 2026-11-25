import type { Metadata } from "next";
import { GlossaryBrowser } from "@/components/glossary-browser";
import { LibraryTabs } from "@/components/library-tabs";
import { allGlossary } from "@/lib/content";
import { GLOSSARY_CATEGORIES } from "@/lib/content/schema";

export const metadata: Metadata = { title: "Glossary" };

export default function Glossary() {
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Library</h1>
      <LibraryTabs active="glossary" />
      <p className="mt-4 max-w-[60ch] text-[0.9375rem] text-label-2">
        The acronyms and ideas every engineer bumps into, each in a sentence or two, with a fun fact where there&apos;s
        a good one.
      </p>
      <div className="mt-4">
        <GlossaryBrowser terms={allGlossary()} categories={GLOSSARY_CATEGORIES} />
      </div>
    </div>
  );
}
