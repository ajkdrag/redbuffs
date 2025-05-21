---
{"publish":true,"created":"2025-05-20T11:13:40.638+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[load balancing\|load balancing]]
> - [[1 Drafts/system design\|system design]]

Load balancers distribute incoming network traffic across multiple servers to optimize resource usage and prevent overload. They act as traffic managers for distributed systems.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747720132/how%20load%20balancers%20work%20in%20simple%20terms-iuftx1.webp)

Common [[2 Zettels/load balancing algorithms\|load balancing algorithms]]:

- [[2 Zettels/round robin load balancing\|round robin load balancing]]
- [[2 Zettels/least connections load balancing\|least connections load balancing]]

Load balancing can occur at multiple system layers:

- Between users and web servers
- Between web servers and application servers
- Between application servers and databases

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747720213/how%20load%20balancers%20work%20in%20simple%20terms-duawo4.webp)

> [!Note]
> Modern cloud platforms provide managed load balancing services (AWS ELB, Azure LB, GCP Load Balancer, HAProxy etc) that handle scaling automatically.

## Related
