export function ServiceIcon({
  size = 34,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 7L9.5 4.5H14.5L16 7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="13.5" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
