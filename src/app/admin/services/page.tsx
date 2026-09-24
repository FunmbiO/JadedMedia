import type { Metadata } from "next";
import Link from "next/link";
import { getAllServicesForAdmin } from "@/lib/services/queries";
import { DeleteServiceButton } from "@/components/admin/delete-service-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Jaded Media Admin",
};

export default async function AdminServicesPage() {
  const services = await getAllServicesForAdmin();

  return (
    <div className="flex flex-col gap-8 px-6 py-10 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-paper italic">Services</h1>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-gold px-5 py-2.5 font-sans text-[12px] font-bold tracking-[0.06em] text-ink uppercase transition-opacity hover:opacity-90"
        >
          + New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="font-sans text-sm text-muted-on-ink">
          No services yet.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-paper/10 border-t border-b border-paper/10">
          {services.map((service) => (
            <div key={service.id} className="flex flex-wrap items-center gap-4 py-4">
              <span className="w-10 shrink-0 font-display text-sm text-gold-soft">
                {String(service.sortOrder).padStart(2, "0")}
              </span>

              <div className="flex min-w-40 flex-1 flex-col gap-1">
                <span className="font-sans text-sm font-semibold text-paper">
                  {service.title}
                </span>
                <span className="font-sans text-xs text-muted-on-ink">
                  /contact?type={service.slug}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {service.published ? (
                  <span className="rounded-full bg-sage/20 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-sage uppercase">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-paper/10 px-2.5 py-1 font-sans text-[10px] font-semibold tracking-[0.06em] text-muted-on-ink uppercase">
                    Draft
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/services/${service.id}/edit`}
                  className="font-sans text-[12px] font-semibold text-gold-soft transition-opacity hover:opacity-75"
                >
                  Edit
                </Link>
                <DeleteServiceButton id={service.id} title={service.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
