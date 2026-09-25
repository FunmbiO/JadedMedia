import type { Metadata } from "next";
import Link from "next/link";
import { requestPasswordReset } from "./actions";

export const metadata: Metadata = {
  title: "Reset Password | Jaded Media",
};

type PageProps = {
  searchParams: Promise<{ error?: string; sent?: string }>;
};

export default async function ForgotPasswordPage({ searchParams }: PageProps) {
  const { error, sent } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <form
        action={requestPasswordReset}
        className="flex w-full max-w-sm flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Admin
          </span>
          <h1 className="font-display text-3xl font-normal text-paper italic">
            Reset password
          </h1>
          <p className="font-sans text-sm text-muted-on-ink">
            Enter your admin email and we&apos;ll send a link to set a new
            password.
          </p>
        </div>

        {error && (
          <p className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200">
            {error}
          </p>
        )}

        {sent && (
          <p className="rounded border border-gold/30 bg-gold/10 px-4 py-3 font-sans text-sm text-gold-soft">
            Check your inbox for a reset link.
          </p>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="font-sans text-xs font-medium text-muted-on-ink">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-full bg-gold px-6 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
        >
          Send Reset Link
        </button>

        <Link
          href="/admin/login"
          className="text-center font-sans text-xs text-muted-on-ink underline underline-offset-2 hover:text-paper"
        >
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
