import Link from "next/link";
import type { ReactNode } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

// Only ever a relative path or an https: URL — this text comes from an
// admin-authored field (FAQ answers, site content), and while that's
// already an authenticated-only surface, there's no reason to let a
// javascript:/data: URI through if a second admin account were ever
// compromised or malicious.
function isSafeHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("https://");
}

/**
 * Turns `[label](/path)` or `[label](https://...)` inside plain admin-typed
 * text into real links, so editable copy (FAQ answers, etc.) can still link
 * to /contact or /work without needing JSX in the database.
 */
export function renderWithLinks(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    nodes.push(
      isSafeHref(href) ? (
        <Link
          key={`link-${key++}`}
          href={href}
          className="text-gold-soft underline underline-offset-2 hover:opacity-75"
        >
          {label}
        </Link>
      ) : (
        label
      ),
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
