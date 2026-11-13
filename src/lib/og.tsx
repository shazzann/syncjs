import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const font = (f: string) => readFile(path.join(process.cwd(), "assets/fonts", f));

/* Branded 1200×630 social card: sync line, title, footer with mark. */
export async function renderOg({ label, title, footer }: { label: string; title: string; footer?: string }) {
  const [sans, sansMedium, mono, mark] = await Promise.all([
    font("Geist-Regular.ttf"),
    font("Geist-Medium.ttf"),
    font("GeistMono-Medium.ttf"),
    readFile(path.join(process.cwd(), "public/brand/syncjs-mark.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#F5FAFA", padding: "72px 80px", fontFamily: "Geist" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Geist Mono", fontSize: 24, color: "#557276" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#16B8B0" }} />
          <div style={{ display: "flex" }}>{label}</div>
          <div style={{ flex: 1, height: 2, background: "#DFEAEA" }} />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: title.length > 48 ? 64 : 80,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            fontWeight: 500,
            color: "#172B2D",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #DFEAEA", paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} width={52} height={52} alt="" />
            <div style={{ display: "flex", fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", color: "#172B2D" }}>
              Sync<span style={{ fontFamily: "Geist Mono", color: "#06767A" }}>JS</span>
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 24, color: "#557276" }}>{footer ?? "software that holds up"}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansMedium, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
