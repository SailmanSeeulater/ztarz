"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";

export function NewNoteButton({ disabled }: { disabled: boolean }) {
  const trpc = useTRPC();
  const router = useRouter();
  const create = useMutation(trpc.note.create.mutationOptions({ onSuccess: ({ id }) => router.push(`/notes/${id}`) }));
  return (
    <div className="text-right">
      <button
        type="button"
        disabled={disabled || create.isPending || create.isSuccess}
        onClick={() => create.mutate({})}
        className="rounded-full bg-tint px-4 py-1.5 text-[0.9375rem] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {create.isPending || create.isSuccess ? "Creating…" : "New note"}
      </button>
      {create.isError && (
        <p role="alert" className="mt-1 text-[0.8125rem] text-bad">
          {create.error.message}
        </p>
      )}
    </div>
  );
}
