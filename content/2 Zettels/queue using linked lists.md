---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-23T12:31:33.889+05:30"}
---


> [!Topics]
> - [[2 Zettels/queues\|queues]]
> - [[2 Zettels/linked lists\|linked lists]]

```python
class Node:
    # Node class for storing data and the reference to the next node
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    # Queue class using linked list
    def __init__(self):
        self.front = self.rear = None
        self.size = 0

    def enqueue(self, data):
        new_node = Node(data)
        if self.rear is None:
            self.front = self.rear = new_node
            self.size += 1
            return
        self.rear.next = new_node
        self.rear = new_node
        self.size += 1

    def dequeue(self):
        if self.front is None:
            return None
        temp = self.front
        self.front = temp.next
        if self.front is None:
            self.rear = None
        self.size -= 1
        return temp.data

    def peek(self):
        if self.front is None:
            return None
        return self.front.data

    def is_empty(self):
        return self.size == 0

    def get_size(self):
        return self.size

```

Here, we're using a `Node` class to create nodes and linking them together to form a queue.

## Related
