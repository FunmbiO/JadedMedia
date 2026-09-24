import type { Metadata } from "next";
import { getAllLeadsForAdmin } from "@/lib/leads/queries";
import { EVENT_TYPE_LABELS } from "@/app/contact/labels";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads | Jaded Media Admin",
};

export default async function AdminLeadsPage() {
  const leads = await getAllLeadsForAdmin();

  return (
    <div className="flex flex-col gap-8 px-6 py-10 md:px-10">
      <h1 className="font-display text-2xl text-paper italic">Leads</h1>

      {leads.length === 0 ? (
        <p className="font-sans text-sm text-muted-on-ink">No leads yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-paper/10 border-t border-b border-paper/10">
          {leads.map((lead) => (
            <div key={lead.id} className="flex flex-col gap-3 py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-sans text-sm font-semibold text-paper">
                      {lead.name}
                    </span>
                    {lead.source === "quote_popup" ? (
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-[0.06em] text-gold-soft uppercase">
                        Quote Request
                      </span>
                    ) : (
                      <span className="rounded-full bg-paper/10 px-2.5 py-0.5 font-sans text-[10px] font-semibold tracking-[0.06em] text-muted-on-ink uppercase">
                        Contact Form
                      </span>
                    )}
                  </div>
                  <span className="font-sans text-xs text-muted-on-ink">
                    {lead.email}
                    {lead.phone ? ` · ${lead.phone}` : ""}
                  </span>
                  <span className="font-sans text-xs text-muted-on-ink">
                    {lead.serviceTitle
                      ? `Re: ${lead.serviceTitle}`
                      : lead.eventType
                        ? EVENT_TYPE_LABELS[lead.eventType]
                        : null}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] text-muted-on-ink/70">
                    {new Date(lead.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <LeadStatusSelect id={lead.id} status={lead.status} />
                </div>
              </div>

              <p className="max-w-2xl font-sans text-sm font-light whitespace-pre-wrap text-paper/85">
                {lead.message}
              </p>

              {(lead.eventDate || lead.budgetRange) && (
                <div className="flex flex-wrap gap-4 font-sans text-xs text-muted-on-ink">
                  {lead.eventDate && <span>Date: {lead.eventDate}</span>}
                  {lead.budgetRange && <span>Budget: {lead.budgetRange}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
