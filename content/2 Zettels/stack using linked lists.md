---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/stacks\|stacks]]
> - [[linked lists\|linked lists]]

```python
class Stack:
    class Node:
        def __init__(self, data):
            self.data = data  # Store the data in this node
            self.next = None  # Initialize the next node as None

    def __init__(self):
        self.top = None  # Initialize the top of the stack as None

    def pop(self):
        if self.top is None:
            raise IndexError(
                "pop from empty stack"
            )  # Raise exception if the stack is empty
        item = self.top.data  # Store the top item's data
        self.top = self.top.next  # Update the top to be the next node
        return item  # Return the popped item

    def push(self, item):
        t = self.Node(item)  # Create a new node with the provided data
        t.next = self.top  # Set the next of this new node to be the current top
        self.top = t  # Update the top to be the new node

    def peek(self):
        if self.top is None:
            raise IndexError(
                "peek from empty stack"
            )  # Raise exception if the stack is empty
        return self.top.data  # Return the top item's data

    def is_empty(self):
        return self.top is None  # Return True if the stack is empty, False otherwise
```

Here, we're using a `Node` class to create nodes and linking them together to form a stack. This method allows our stack to be dynamically sized, avoiding the overflow issue we saw when implementing [[2 Zettels/stack using arrays\|stack using arrays]].

## Related
