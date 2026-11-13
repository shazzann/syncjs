import { renderOg, ogSize } from "@/lib/og";

export const alt = "SyncJS: software that holds up";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ label: "websites · web apps · internal tools", title: "Software that holds up." });
}
