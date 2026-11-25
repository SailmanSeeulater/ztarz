"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { MAX_NOTE_CHARS, MAX_TITLE_CHARS, renderNote } from "@/lib/notes";
import { useTRPC } from "@/trpc/client";

type Status = "saved" | "unsaved" | "saving" | "error";

/** Write in Markdown, flip to Preview to read it. Saves itself a moment after you stop typing. */
export function NoteEditor({ id, initialTitle, initialBody }: { id: string; initialTitle: string; initialBody: string }) {
  const trpc = useTRPC();
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [mode, setMode] = useState<"write" | "preview">(initialBody ? "preview" : "write");
  const [status, setStatus] = useState<Status>("saved");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const saved = useRef({ title: initialTitle, body: initialBody });

  const update = useMutation(trpc.note.update.mutationOptions());
  const remove = useMutation(trpc.note.delete.mutationOptions({ onSuccess: () => router.replace("/notes") }));
  const { mutate } = update;

  // Debounced autosave: 700 ms after the last keystroke.
  useEffect(() => {
    if (title === saved.current.title && body === saved.current.body) return;
    setStatus("unsaved");
    const t = setTimeout(() => {
      setStatus("saving");
      mutate(
        { id, title, body },
        {
          onSuccess: () => {
            saved.current = { title, body };
            setStatus((s) => (s === "saving" ? "saved" : s));
          },
          onError: () => setStatus("error"),
        },
      );
    }, 700);
    return () => clearTimeout(t);
  }, [id, title, body, mutate]);

  // Don't lose a pending save to a closed tab.
  useEffect(() => {
    if (status === "saved") return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [status]);

  const html = useMemo(() => (mode === "preview" ? renderNote(body) : ""), [mode, body]);
  const left = MAX_NOTE_CHARS - body.length;

  return (
    <div className="mt-4 rounded-2xl bg-group">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_CHARS))}
        placeholder="Title"
        aria-label="Title"
        className="w-full rounded-t-2xl bg-transparent px-4 pt-4 pb-2 text-[1.5rem] font-semibold tracking-[-0.01em] outline-none placeholder:text-label-2"
      />
      <div className="flex items-center gap-3 border-b border-sep px-4 pb-3">
        <div role="tablist" aria-label="Editor mode" className="flex rounded-[0.6rem] bg-group-2 p-0.5 text-[0.8125rem] font-medium">
          {(["write", "preview"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className="rounded-[0.5rem] px-3 py-0.5 text-label-2 capitalize transition-colors aria-selected:bg-tint aria-selected:text-white"
            >
              {m}
            </button>
          ))}
        </div>
        <span aria-live="polite" className="ml-auto text-[0.8125rem] text-label-2">
          {status === "saved" ? "Saved" : status === "saving" ? "Saving…" : status === "error" ? (
            <span className="text-bad">Couldn&apos;t save</span>
          ) : (
            "Editing"
          )}
        </span>
      </div>

      {mode === "write" ? (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_NOTE_CHARS))}
          maxLength={MAX_NOTE_CHARS}
          rows={18}
          autoFocus={!initialBody}
          placeholder={"# Heading\n\n- a list\n- **bold**, `code`\n\n```ts\nconst x = 1;\n```"}
          aria-label="Note, in Markdown"
          className="block min-h-[50vh] w-full resize-y bg-transparent px-4 py-3 font-mono text-[0.875rem] leading-relaxed outline-none placeholder:text-label-2"
        />
      ) : body.trim() ? (
        <div className="card-md note-md min-h-[50vh] px-4 py-4 text-[0.9375rem]" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="min-h-[50vh] px-4 py-4 text-label-2">Nothing to preview yet.</p>
      )}

      <div className="flex items-center gap-3 border-t border-sep px-4 py-3 text-[0.8125rem]">
        <span className={`tabular-nums ${left < 250 ? "text-bad" : "text-label-2"}`}>
          {body.length.toLocaleString()} / {MAX_NOTE_CHARS.toLocaleString()}
        </span>
        <button
          type="button"
          onClick={() => (confirmDelete ? remove.mutate({ id }) : setConfirmDelete(true))}
          onBlur={() => setConfirmDelete(false)}
          disabled={remove.isPending}
          className={`ml-auto rounded-full px-3 py-1 font-medium transition-colors ${
            confirmDelete ? "bg-bad text-white" : "text-bad hover:bg-group-2"
          }`}
        >
          {remove.isPending ? "Deleting…" : confirmDelete ? "Tap again to delete" : "Delete note"}
        </button>
      </div>
    </div>
  );
}
