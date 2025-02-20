---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-24T20:22:35.843+05:30"}
---


> [!Topics]
> - [[2 Zettels/load balancing in MoE\|load balancing in MoE]]

A **capacity factor** greater than 1 allows each expert to handle a buffer above the evenly distributed share, accommodating imbalances in token assignment. If the expert capacity is reached and there's another token to be sent to this expert, we can choose to do the following:
- drop this token
- send to the next expert
- send to next layer aka *token overflow*

![](https://res.cloudinary.com/dcameztw9/image/upload/v1732463232/capacity%20factor%20for%20load%20balancing%20in%20MoEs-7b96ee.webp)

> [!tip]
> Capacity factor too high ⎯ wasting computing resource; too low ⎯ lots of token overflow. Common ranges in `[1, 1.25]`

## Related
