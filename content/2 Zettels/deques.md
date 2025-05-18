---
{"publish":true,"created":"2025-01-23T21:29:33.519+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/queues\|queues]]

The name Deque is short for Double Ended Queue, and as the name suggests, it's a Queue where we can add or remove elements from both ends.

The operations on Deques are a bit different from our regular Queues. We have four main operations in Deques:

- **InsertFront:** add an element at the front of the Deque.
- **InsertRear:** add an element at the rear of the Deque.
- **DeleteFront:** remove an element from the front of the Deque.
- **DeleteRear:** remove an element from the rear of the Deque.

> [!Example]
> Think of browser history. You close tabs and if you press Control + Shift + T, the tabs you closed are reopened.
> 
> Above scenario can be implemented using [[2 Zettels/stacks\|stacks]] (Last In - First Out). But when this list of browsing history becomes too big in size, it must be able to delete the first entered record, then second and so on as per the requirement. This requires inserting and deleting functionality at both the ends which a deque is ideal for.

## Related
