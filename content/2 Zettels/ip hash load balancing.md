---
{"publish":true,"created":"2025-05-20T19:40:22.359+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/load balancing algorithms\|load balancing algorithms]]

IP/URL hash is a _static_ load balancing algorithm which applies hash function to client IP address or request URL. The result of hash determines which server handles the request.

> IP hashing works best when client distribution is relatively uniform and session persistence is critical.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747750507/ip%20hash%20load%20balancing-21z5zg.webp)

### Pros

- Ensures requests from same client IP consistently go to same server. Useful for stateful applications that need session persistence
- Predictable and consistent routing
- Simple to implement

### Cons

- Can lead to uneven server load if IP distribution is skewed
- Adding or removing servers can disrupt the hash mapping, causing some clients to be routed to different servers
- Changes in client IP (mobile networks, NAT) can disrupt session persistence
- Does not account for server load or capacity

## Related
