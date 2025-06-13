---
{"publish":true,"created":"2025-06-07T17:49:49.838+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]
> - [[sorting algorithms\|sorting algorithms]]

In Python, we have 2 ways to sort:

- `sort()` is a list method modifies the list in-place. Returns `None`
- `sorted()` is a built-in function. Creates a new sorted list from an iterable

```python
# sort() example
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)  # Output: [1, 1, 2, 3, 4, 5, 6, 9]

# sorted() example, using set
numbers = {"solid", "spotted", "cells"}
sorted_numbers = sorted(numbers)
print(numbers)         # Output: {'spotted', 'solid', 'cells'}
print(sorted_numbers)  # Output: ['cells', 'solid', 'spotted']
```

Use cases:

- `sort()`: Modify an existing list when a new copy isn't needed. Faster for large lists
- `sorted()`: Need a sorted copy while preserving the original. Works with **any iterable** (tuples, strings, dictionaries)

## Related
