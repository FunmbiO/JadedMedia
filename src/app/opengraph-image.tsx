import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Jaded Media — Photo & Film";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Reuses the same real logo asset every other icon route is generated
// from (favicon, apple-icon) rather than a separate design file — read
// straight off disk since ImageResponse's renderer needs an embeddable
// image source, not a relative /logo.png URL.
export default function OpengraphImage() {
  const logoPath = join(process.cwd(), "public", "logo.png");
  const logoSrc = `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0b",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "#f6f4ef",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <img src={logoSrc} width={84} height={84} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "#f6f4ef",
          }}
        >
          JADED MEDIA
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: "#b6904c",
            marginTop: 16,
          }}
        >
          PHOTO &amp; FILM
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#a9a598",
            marginTop: 40,
          }}
        >
          Weddings · Cars · Business
        </div>
      </div>
    ),
    { ...size },
  );
}
