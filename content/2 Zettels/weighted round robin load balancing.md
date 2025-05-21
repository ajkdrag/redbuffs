---
{"publish":true,"created":"2025-05-20T19:19:00.571+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/load balancing algorithms\|load balancing algorithms]]

Weighted Round Robin (WRR) is an extension of standard [[2 Zettels/round robin load balancing\|round robin load balancing]] algo. It assigns requests to servers in a cyclical fashion (like vanilla round robin), but _disproportionately_ based on a server's assigned _weight_.

> It is a **static** load balancing method; distribution pattern determined by weights, not real-time server metrics. Useful when server capacities are known and relatively stable.

Each server in the pool is given numerical weight: reflects server's processing capacity or capability to handle connections. Server with higher weight receives proportionally more requests than server with lower weight.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747750084/weighted%20round%20robin%20load%20balancing-b0ljr3.webp)

**Purpose of weights:** To send more traffic to powerful servers and less traffic to weaker ones, resulting in better resource utilization across server pool.

**Example:** Servers A (weight 3), B (weight 1), C (weight 2). Request distribution sequence could be A, A, A, B, C, C, then repeat.

### Advantages

- Distributes load according to server capacity
- Simple to implement and understand
- Effective for steady loads

### Disadvantages

- Requires manual (static) assignment/updating of weights
- Doesn't account for current server load (connections, CPU usage) only theoretical capacity
- Can lead to imbalance if weights are not accurately set or server conditions change dynamically

## Related
