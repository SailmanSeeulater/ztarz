import type { MetadataRoute } from "next";

// Lets "Add to Home Screen" open ztarz full screen, like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ztarz",
    short_name: "ztarz",
    description: "A daily 20-minute gym for developers, with spaced repetition so nothing fades.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
