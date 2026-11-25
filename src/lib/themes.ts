/**
 * Colour themes. The colours themselves live in globals.css under [data-theme="<id>"];
 * this list is what the picker shows and what the head script accepts.
 */
export const THEMES = [
  { id: "midnight", name: "Midnight", scheme: "dark" },
  { id: "ember", name: "Ember", scheme: "dark" },
  { id: "forest", name: "Forest", scheme: "dark" },
  { id: "plum", name: "Plum", scheme: "dark" },
  { id: "graphite", name: "Graphite", scheme: "dark" },
  { id: "transit", name: "Transit", scheme: "dark" },
  { id: "titanium", name: "Titanium", scheme: "light" },
  { id: "boarding", name: "Boarding", scheme: "light" },
  { id: "poppy", name: "Poppy", scheme: "light" },
  { id: "sunflower", name: "Sunflower", scheme: "light" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_STORAGE_KEY = "ztarz-theme";
export const DEFAULT_DARK: ThemeId = "midnight";
export const DEFAULT_LIGHT: ThemeId = "titanium";

/**
 * Runs in <head> before first paint: the saved theme, else one matching the OS appearance.
 * Kept tiny and dependency-free because it's inlined into every page.
 */
export const THEME_SCRIPT = `(function(){var d=document.documentElement,ok=${JSON.stringify(THEMES.map((t) => t.id))},t;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}if(ok.indexOf(t)<0)t=matchMedia("(prefers-color-scheme: light)").matches?${JSON.stringify(DEFAULT_LIGHT)}:${JSON.stringify(DEFAULT_DARK)};d.setAttribute("data-theme",t)})()`;
