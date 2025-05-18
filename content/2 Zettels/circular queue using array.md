---
{"publish":true,"created":"2025-01-23T21:25:00.910+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/queues\|queues]]
> - [[arrays\|arrays]]

When we `enqueue` (add an element), we add it at the rear and increment the rear pointer. But if we reach the end of our array while enqueueing, instead of declaring an Overflow, we wrap around and continue from the front of the array, as long as there is space.

Similarly, when we `dequeue` (remove an element), we remove it from the front and increment the front pointer. But if we reach the end of the array while dequeuing, we wrap around and continue from the start of the array.

> [!Tip]
> Keep in mind, we always add items to the rear and remove them from the front


![](https://res.cloudinary.com/dcameztw9/image/upload/v1737698301/circular%20queue%20using%20array-4kzd32.webp)

```python
class CircularQueue:
    def __init__(self, capacity: int):
        """
        Initialize the circular queue with a given capacity.
        
        :param capacity: Maximum number of elements the queue can hold
        """
        if capacity <= 0:
            raise ValueError("Queue capacity must be a positive integer")
        
        self._max_size = capacity
        self._elements = [None] * capacity
        self._reset_queue()

    def _reset_queue(self):
        """
        Reset the queue to its initial empty state.
        """
        self._head_index = -1
        self._tail_index = -1
        self._current_size = 0

    def enqueue(self, value: int) -> bool:
        """
        Add an element to the queue.
        
        :param value: Element to be added
        :return: True if successful, False if queue is full
        """
        if self.is_full():
            return False

        if self.is_empty():
            # First element case
            self._head_index = self._tail_index = 0
        else:
            # Move tail to next position circularly
            self._tail_index = (self._tail_index + 1) % self._max_size

        # Add the element
        self._elements[self._tail_index] = value
        self._current_size += 1
        return True

    def dequeue(self) -> bool:
        """
        Remove the front element from the queue.
        
        :return: True if successful, False if queue is empty
        """
        if self.is_empty():
            return False

        if self._current_size == 1:
            # Last element being removed
            self._reset_queue()
        else:
            # Move head to next position circularly
            self._head_index = (self._head_index + 1) % self._max_size
            self._current_size -= 1

        return True

    def get_front(self) -> int:
        return -1 if self.is_empty() else self._elements[self._head_index]

    def get_rear(self) -> int:
        return -1 if self.is_empty() else self._elements[self._tail_index]

    def is_empty(self) -> bool:
        return self._current_size == 0

    def is_full(self) -> bool:
        return self._current_size == self._max_size

    def size(self) -> int:
        return self._current_size
```


## Related
