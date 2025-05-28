---
{"publish":true,"created":"2025-05-20T17:27:53.816+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/load balancing algorithms\|load balancing algorithms]]

Round robin load balancing distributes requests to servers in _fixed cyclic order_. After sending request to first server, it moves to next in sequence, looping back to first after reaching end.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747742668/round%20robin%20load%20balancing-pw2ion.webp)

### Key characteristics

- Distributes requests equally among servers in fixed order
- Simple to implement with minimal overhead
- Works best when servers have similar capacity

### Limitations

- Does not consider current server load or capacity
- No session affinity - each request may go to different server
- Performance degrades with servers of unequal capacity
- Predictable pattern may expose security vulnerabilities

### When to use

- Homogeneous server environments
- Stateless applications where requests are independent
- When simplicity is more important than advanced features

## Related
