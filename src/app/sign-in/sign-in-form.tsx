"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "./actions";

const field =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent";

export function SignInForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});
  return (
    <form action={action} className="space-y-3">
      <label className="block space-y-1">
        <span className="text-sm text-muted">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          key={state.email}
          className={field}
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm text-muted">Password</span>
        <input name="password" type="password" autoComplete="current-password" required className={field} />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-bad">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
