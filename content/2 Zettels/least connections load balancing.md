---
{"publish":true,"created":"2025-05-20T17:35:32.293+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/load balancing algorithms\|load balancing algorithms]]

Least Connections load balancing routes new requests to server with fewest active connections. It's dynamic as opposed to static methods like [[2 Zettels/round robin load balancing\|round robin load balancing]].

### How it works

- Tracks active connections per server
- Assigns new request to least busy server
- Automatically adapts to changing loads

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747743465/least%20connections%20load%20balancing-5qzcva.webp)

### When to use

- Servers have different capacities
- Request processing times vary significantly
- Need automatic load adjustment

### Pros vs Round Robin

- Better for unpredictable traffic
- Handles variable request durations
- More resource-efficient for unequal servers

### Limitations

- Requires connection tracking
- Overhead from maintaining state of active connections
- Short-lived connections cause rapid spikes in connection counts, leading to frequent rebalancing

## Related
