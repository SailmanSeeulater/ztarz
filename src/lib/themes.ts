/**
 * Colour themes. The colours themselves live in globals.css under [data-theme="<id>"];
 * this list is what the picker shows and what the head script accepts. `bg` repeats each
 * theme's --bg for the browser's theme-color (its toolbar and the iOS status bar).
 */
export const THEMES = [
  { id: "midnight", name: "Midnight", scheme: "dark", bg: "#000000" },
  { id: "ember", name: "Ember", scheme: "dark", bg: "#000000" },
  { id: "forest", name: "Forest", scheme: "dark", bg: "#06100b" },
  { id: "plum", name: "Plum", scheme: "dark", bg: "#0b0610" },
  { id: "graphite", name: "Graphite", scheme: "dark", bg: "#000000" },
  { id: "transit", name: "Transit", scheme: "dark", bg: "#0a0d12" },
  { id: "titanium", name: "Titanium", scheme: "light", bg: "#ffffff" },
  { id: "boarding", name: "Boarding", scheme: "light", bg: "#ffffff" },
  { id: "poppy", name: "Poppy", scheme: "light", bg: "#ffffff" },
  { id: "sunflower", name: "Sunflower", scheme: "light", bg: "#ffffff" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_STORAGE_KEY = "ztarz-theme";
export const DEFAULT_DARK: ThemeId = "midnight";
export const DEFAULT_LIGHT: ThemeId = "titanium";

/**
 * Runs in <head> before first paint: the saved theme, else one matching the OS appearance.
 * Kept tiny and dependency-free because it's inlined into every page.
 */
const BG = Object.fromEntries(THEMES.map((t) => [t.id, t.bg]));

/** Sets data-theme and keeps <meta name="theme-color"> in step. Shared by the head script and the picker. */
const APPLY = `function(t){document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement("meta");m.name="theme-color";document.head.appendChild(m)}m.content=${JSON.stringify(BG)}[t]}`;

export const applyTheme: (id: ThemeId) => void = (id) => {
  document.documentElement.setAttribute("data-theme", id);
  let m = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!m) {
    m = document.createElement("meta");
    m.name = "theme-color";
    document.head.appendChild(m);
  }
  m.content = BG[id];
};

export const THEME_SCRIPT = `(function(){var applyThemeColor=${APPLY},ok=${JSON.stringify(THEMES.map((t) => t.id))},t;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}if(ok.indexOf(t)<0)t=matchMedia("(prefers-color-scheme: light)").matches?${JSON.stringify(DEFAULT_LIGHT)}:${JSON.stringify(DEFAULT_DARK)};applyThemeColor(t)})()`;
