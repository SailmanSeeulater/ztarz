---
title: "How DHCP hands out and renews addresses"
module: net
type: concept
source: "https://www.rfc-editor.org/rfc/rfc2131"
tags: ["dhcp", "ip", "lan"]
---

## Prompt

How does a device get an IP address from DHCP, and what happens as its lease runs out?

## Answer

Four messages, often remembered as **DORA**:

1. **Discover:** the client, which has no address yet, broadcasts asking for a server.
2. **Offer:** a server offers an address and settings (subnet mask, gateway, DNS servers, lease time).
3. **Request:** the client broadcasts which offer it accepts, so other servers know theirs was declined.
4. **Ack:** the server confirms, and the lease starts.

The address is only leased. At **T1** (by default half the lease) the client asks its server directly to renew. If that fails, at **T2** (by default 87.5% of the lease) it broadcasts to any server. If the lease expires, it must stop using the address.
