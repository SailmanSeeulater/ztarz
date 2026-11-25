---
title: "The login page with no CSS"
module: nextjs
type: bug-hunt
source: "https://nextjs.org/docs/app/api-reference/file-conventions/proxy"
tags: ["nextjs", "proxy", "auth"]
stack: ["nextdotjs"]
choices:
  - text: "`proxy.ts` must be named `middleware.ts` to run"
    why: "It is running, which is the problem. `proxy.ts` is the current name; `middleware.ts` is the old one."
  - text: "Redirects in Proxy must use status 308"
    why: "The status code doesn't matter; the redirect itself is being applied to the wrong requests."
  - text: "Proxy needs `export const runtime = \"edge\"`"
    why: "Proxy runs on Node.js by default, and setting `runtime` in a Proxy file throws an error."
  - text: "Without a `matcher`, Proxy runs on every request, including `/_next/static` CSS and JS, so signed-out users get those redirected to /login too"
    correct: true
    why: "Add a `config.matcher` that targets protected paths or excludes `_next/static`, `_next/image` and public files."
---

## Prompt

After adding this, the login page loads unstyled and its JavaScript fails. Why?

```ts
// proxy.ts
export function proxy(request: NextRequest) {
  if (!request.cookies.has("session") && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

## Explanation

Proxy runs before routing for every matched request, and with no matcher that's all of them, static assets included.

```ts
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
```

Proxy is still only an optimistic check. Verify the session again where data is read or changed.
