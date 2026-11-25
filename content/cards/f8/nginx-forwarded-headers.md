---
title: "Reverse proxy without forwarded headers"
module: f8
type: bug-hunt
source: "https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/#passing-request-headers"
tags: ["nginx", "proxy", "http"]
stack: ["nginx"]
choices:
  - text: "`proxy_pass` needs a trailing slash"
    why: "A trailing slash changes how the request path is mapped upstream. It doesn't change the Host or the scheme the app sees."
  - text: "nginx sends the upstream address as `Host` and nothing says the client used HTTPS: set `Host` and `X-Forwarded-Proto`"
    correct: true
    why: "By default nginx sets `Host` to `$proxy_host`, the upstream from `proxy_pass`. `X-Forwarded-Proto $scheme` tells the app the original request was HTTPS."
  - text: "Add `proxy_buffering off`"
    why: "That stops nginx buffering responses, which helps streaming. It doesn't affect the URLs the app builds."
  - text: "The app should listen on port 443 itself"
    why: "nginx terminates TLS; the app behind it speaks plain HTTP. It just needs to be told about the original request."
---

## Prompt

The site is served over HTTPS by nginx, but redirects and sign-in callback URLs the app builds come out as `http://127.0.0.1:3000/...`. What's missing?

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
}
```

## Explanation

Behind a proxy, the app only sees nginx's own connection: plain HTTP from loopback. Pass on what the client sent:

```nginx
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

`X-Forwarded-For` carries the client's IP, for logs and rate limits.
