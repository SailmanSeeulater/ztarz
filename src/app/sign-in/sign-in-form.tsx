"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "./actions";

/** iOS inset grouped fields: one rounded group, rows split by a hairline. */
const row = "flex items-center gap-3 px-4";
const input =
  "min-w-0 flex-1 bg-transparent py-3 text-[0.9375rem] text-label outline-none placeholder:text-label-2";

export function SignInForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});
  return (
    <form action={action} className="mt-6 space-y-4">
      <div className="overflow-hidden rounded-2xl bg-group focus-within:ring-2 focus-within:ring-tint">
        {/* iOS insets the hairline to the text, so it starts under the label */}
        <label className={`${row} ml-4 border-b border-sep pl-0`}>
          <span className="w-20 shrink-0 text-[0.9375rem]">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            defaultValue={state.email}
            key={state.email}
            className={input}
          />
        </label>
        <label className={row}>
          <span className="w-20 shrink-0 text-[0.9375rem]">Password</span>
          <input name="password" type="password" autoComplete="current-password" required className={input} />
        </label>
      </div>
      {state.error && (
        <p role="alert" className="px-1 text-sm text-bad">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-tint px-4 py-3 text-[0.9375rem] font-semibold text-tint-ink transition-[opacity,transform] hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
