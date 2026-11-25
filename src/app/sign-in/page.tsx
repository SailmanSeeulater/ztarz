import type { Metadata } from "next";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-sm pt-6">
      <section className="pass px-5 pt-4 pb-5" data-hue="1">
        <p className="text-[0.9375rem] font-bold tracking-tight">ztarz</p>
        <h1 className="mt-8 text-[1.625rem] leading-tight font-semibold tracking-[-0.015em]">Sign in</h1>
        <p className="mt-1 text-[var(--ink-2)]">Your daily session is waiting.</p>
        <dl className="mt-5 flex gap-7">
          <div>
            <dt className="field-label">Session</dt>
            <dd className="mt-0.5 text-[0.9375rem] font-medium">About 20 min</dd>
          </div>
          <div>
            <dt className="field-label">Schedule</dt>
            <dd className="mt-0.5 text-[0.9375rem] font-medium">Spaced repetition</dd>
          </div>
        </dl>
      </section>
      <SignInForm />
    </div>
  );
}
