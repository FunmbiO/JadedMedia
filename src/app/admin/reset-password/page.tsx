import type { Metadata } from "next";
import { updatePassword } from "./actions";

export const metadata: Metadata = {
  title: "Set New Password | Jaded Media",
};

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <form
        action={updatePassword}
        className="flex w-full max-w-sm flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Admin
          </span>
          <h1 className="font-display text-3xl font-normal text-paper italic">
            Set a new password
          </h1>
        </div>

        {error && (
          <p className="rounded border border-red-400/30 bg-red-400/10 px-4 py-3 font-sans text-sm text-red-200">
            {error}
          </p>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="font-sans text-xs font-medium text-muted-on-ink">
            New password
          </span>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="rounded border border-paper/20 bg-transparent px-3.5 py-2.5 font-sans text-sm text-paper outline-none focus:border-gold"
          />
        </label>

        <button
          type="submit"
          className="mt-2 rounded-full bg-gold px-6 py-3 font-sans text-[13px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
