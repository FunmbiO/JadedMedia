export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-32 text-center">
      <div className="flex max-w-lg flex-col items-center gap-4">
        <span className="font-sans text-[12px] font-semibold tracking-[0.2em] text-gold uppercase">
          Foundation Phase
        </span>
        <h1 className="font-display text-4xl font-normal text-paper italic">
          The homepage build starts next sprint.
        </h1>
        <p className="font-sans text-[15px] leading-relaxed font-light text-muted-on-ink">
          This page is a placeholder while the layout, design tokens, and
          backend wiring for Jaded Media are put in place.
        </p>
      </div>
    </div>
  );
}
