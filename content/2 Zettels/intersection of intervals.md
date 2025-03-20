---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-16T13:10:55.604+05:30"}
---


> [!Topics]
> - [[basic arithmetic\|basic arithmetic]]
> - [[geometry\|geometry]]

To determine if a set of intervals $[l_i, r_i]$ has a non-empty intersection, find: 
* `maxL` = $\max(l_1, l_2, ..., l_n)$ (the rightmost left endpoint)
* `minR` = $\min(r_1, r_2, ..., r_n)$ (the leftmost right endpoint) 

The intervals intersect if and only if `maxL <= minR`. 
![](https://res.cloudinary.com/dcameztw9/image/upload/v1742111110/intersection%20of%20intervals-i7abhk.webp)


## Related
