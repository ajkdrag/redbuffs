---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-23T16:53:03.616+05:30"}
---


> [!Topics]
> - [[2 Zettels/queues\|queues]]

In a Circular Queue, the last element points back to the first element making a circular link. We can visualize it as a circle where we remove elements from one end and add elements at the other end, and it goes on in a cycle.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1737698250/circular%20queue-e1df4g.webp)


 In a normal Queue (implemented using an array), we can ****insert**** elements until the *queue becomes full*. However once the queue becomes full, we can not insert the next element even if there is a space in front of the queue. With a circular queue, the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

## Related
- [[2 Zettels/circular queue using array\|circular queue using array]]