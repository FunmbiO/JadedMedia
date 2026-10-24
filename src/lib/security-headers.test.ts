import { test } from "node:test";
import assert from "node:assert/strict";
import {
  EMBEDDABLE_ORIGINS,
  frameAncestorsFor,
  isEmbeddablePath,
  shouldSetXFrameOptionsDeny,
} from "./security-headers";

const PUBLIC_PAGES = [
  "/",
  "/work",
  "/work/some-project-slug",
  "/services",
  "/about",
  "/contact",
  "/faq",
  "/press",
  "/privacy",
  "/terms",
  "/cookies",
  "/refund-policy",
];

const SENSITIVE_PAGES = [
  "/admin",
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/auth/confirm",
  "/admin/content",
  "/admin/email",
  "/admin/portfolio/new",
  "/admin/portfolio/some-id/edit",
  "/admin/services/new",
  "/admin/testimonials/new",
  "/admin/faqs/new",
  "/admin/leads",
];

test("the homepage is embeddable: allowlisted frame-ancestors, no X-Frame-Options", () => {
  assert.equal(isEmbeddablePath("/"), true);
  assert.equal(
    frameAncestorsFor("/"),
    "frame-ancestors 'self' https://jaded-works.vercel.app",
  );
  assert.equal(shouldSetXFrameOptionsDeny("/"), false);
});

test("every public marketing page is embeddable", () => {
  for (const path of PUBLIC_PAGES) {
    assert.equal(isEmbeddablePath(path), true, `${path} should be embeddable`);
    assert.equal(
      shouldSetXFrameOptionsDeny(path),
      false,
      `${path} should not set X-Frame-Options`,
    );
    assert.match(
      frameAncestorsFor(path),
      /^frame-ancestors 'self' /,
      `${path} should allow framing from 'self' plus the allowlisted origins`,
    );
  }
});

test("every sensitive route stays locked to frame-ancestors 'none' and X-Frame-Options: DENY", () => {
  for (const path of SENSITIVE_PAGES) {
    assert.equal(isEmbeddablePath(path), false, `${path} should not be embeddable`);
    assert.equal(frameAncestorsFor(path), "frame-ancestors 'none'");
    assert.equal(shouldSetXFrameOptionsDeny(path), true);
  }
});

test("an unknown route defaults to blocked, not embeddable", () => {
  const unknownPaths = [
    "/some-brand-new-route-nobody-added-yet",
    "/api/anything",
    "/work-but-not-really",
    "//",
  ];
  for (const path of unknownPaths) {
    assert.equal(isEmbeddablePath(path), false, `${path} should default to blocked`);
    assert.equal(frameAncestorsFor(path), "frame-ancestors 'none'");
    assert.equal(shouldSetXFrameOptionsDeny(path), true);
  }
});

test("the default allowlisted origin includes the portfolio preview", () => {
  assert.ok(EMBEDDABLE_ORIGINS.includes("https://jaded-works.vercel.app"));
});
