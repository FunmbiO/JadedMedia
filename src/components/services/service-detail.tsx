import { ServiceIcon } from "@/components/services/service-icon";
import { QuoteRequestModal } from "@/components/services/quote-request-modal";

type ServiceDetailProps = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  serviceId: string;
  reverse?: boolean;
};

export function ServiceDetail({
  number,
  title,
  description,
  bullets,
  serviceId,
  reverse,
}: ServiceDetailProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-10 border-t border-paper/15 pt-14 md:grid-cols-2 md:gap-16 md:pt-20 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="flex flex-col gap-6">
        <span className="font-display text-sm text-gold-soft">{number}</span>
        <ServiceIcon className="text-paper" />
        <h2 className="font-display text-3xl font-normal text-paper italic sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-md font-sans text-base leading-relaxed font-light text-muted-on-ink">
          {description}
        </p>
        <QuoteRequestModal
          serviceId={serviceId}
          title={title}
          description={description}
          bullets={bullets}
        />
      </div>

      <ul className="flex flex-col gap-4 self-start">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 font-sans text-[15px] font-light text-paper/85"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
