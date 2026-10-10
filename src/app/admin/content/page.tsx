import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/queries";
import { ContentForm } from "@/components/admin/content-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content | Jaded Media Admin",
};

export default async function AdminContentPage() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 px-6 pt-10 md:px-10">
        <h1 className="font-display text-2xl text-paper">Site Content</h1>
        <p className="max-w-2xl font-sans text-sm font-light text-muted-on-ink">
          Edit the text and background video shown on the public site.
          Changes go live as soon as you save — no code or redeploy needed.
        </p>
      </div>
      <ContentForm initial={content} />
    </div>
  );
}
