import { ImageResponse } from "next/og";
import { AppIconArt } from "@/components/app-icon";

// Large enough for the web manifest; browsers scale it down for the tab.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<AppIconArt size={512} rounded />, size);
}
