---
{"publish":true,"created":"2025-05-21T13:58:26.075+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/load balancing algorithms\|load balancing algorithms]]

This approach aims to direct traffic to the server that can handle the request the _fastest_, based on recent performance metrics.

Steps involved:

- Load balancer monitors the response times of each server
- New requests are sent to server with _lowest average response time_
- Assignment of requests is based on real-time performance data (i.e. dynamic)

> [!Note]
>
> Since server response time is monitored, this algo is dynamic and adjusts to changing server performance, as opposed to static algorithms like [[2 Zettels/round robin load balancing\|round robin load balancing]], [[2 Zettels/ip hash load balancing\|ip hash load balancing]] etc

![](https://res.cloudinary.com/dcameztw9/image/upload/v1747820196/least%20response%20time%20load%20balancing-xlsj53.webp)

### Pros

- **Reduced server overload** since this algo distributes traffic away from servers experiencing high response times, preventing them from being overloaded
- **Improved client experience** owing to lower latency
- **Optimized performance** since algo minimizes response time for individual requests and traffic is routed to fastest available server

> Ideal for applications where low latency and fast response times are critical, such as online gaming, video streaming, or financial trading platforms.

### Cons

- **Added overhead and complexity** since load balancer has to monitor servers continuously
- **Reliance on accurate metrics** and any inaccurate data leads to poor distribution decisions

> [!Tip]
>
> There are implementations where the number of active connections is also taken into account (akin to [[2 Zettels/least connections load balancing\|least connections load balancing]]).

## Related
