---
{"publish":true,"created":"2025-05-20T19:45:42.854+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/load balancing algorithms\|load balancing algorithms]]

Sticky round robin extends basic [[2 Zettels/round robin load balancing\|round robin load balancing]] by adding "stickiness" or [[session persistence\|session persistence]]. This means a client's requests are consistently sent to the same server instance for duration of their session.

Working steps:

- Use round robin to distribute initial requests or new sessions to servers
- Once a client session established with a specific server, subsequent requests from the same client during session lifetime are directed to same server
- This maintains session state on the server

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747806032/sticky%20round%20robin%20load%20balancing-uxlx8g.webp)

There are different ways for achieving stickiness:

- **Cookie-based stickiness**: Load balancer sets a cookie in client's browser identifying assigned server. Client includes cookie in future requests, allowing load balancer to route to correct server.
- **IP Hash stickiness**: Load balancer hashes client's IP address to determine server. All requests from same IP address go to same server. Can be problematic if multiple users share same public IP (e.g., behind a NAT).
- **Session ID stickiness**: Application includes session ID in URL or POST data. Load balancer tracks session ID and server mapping.

The benefits of this algo come from the simplicity of Round robin algo as well as state management via "stickiness", but the drawbacks are the same as with any other static load balancing algorithm:

- Potential for unequal server load if some sessions much more active or longer than others (violates pure round robin's load distribution goal)
- Doesn't take into account current server stats (i.e. not algo is not dynamic)
- Server failure impacts all stuck sessions on that server until they time out or sticky info cleared

## Related
