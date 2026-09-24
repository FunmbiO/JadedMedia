import type { Metadata } from "next";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata: Metadata = {
  title: "New Service | Jaded Media Admin",
};

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="px-6 pt-10 font-display text-2xl text-paper italic md:px-10">
        New Service
      </h1>
      <ServiceForm />
    </div>
  );
}
