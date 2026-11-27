import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemePicker } from "@/components/theme-picker";
import { TopNav, TopNavView } from "@/components/top-nav";
import { DEFAULT_DARK, THEME_SCRIPT } from "@/lib/themes";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "ztarz", template: "%s · ztarz" },
  description: "A daily 20-minute gym for developers, with spaced repetition so nothing fades.",
  // Added to the iOS home screen, it opens full screen under this name.
  appleWebApp: { capable: true, title: "ztarz", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_DARK}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the saved theme before first paint, so there's no flash of the default. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <header className="sticky top-0 z-20 border-b border-sep/60 bg-bg/80 backdrop-blur-xl">
          {/* Phones: logo and theme on one row, the tabs on a full-width row below. Wider: one row. */}
          <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5">
            <Link href="/" className="text-[1.0625rem] font-bold tracking-tight">
              ztarz
            </Link>
            <div className="order-last w-full sm:order-none sm:ml-auto sm:w-auto">
              {/* The nav reads the URL; its fallback is the same tabs with none selected. */}
              <Suspense fallback={<TopNavView pathname={null} />}>
                <TopNav />
              </Suspense>
            </div>
            <div className="ml-auto sm:ml-0">
              <ThemePicker />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-6 pb-16">{children}</main>
      </body>
    </html>
  );
}
