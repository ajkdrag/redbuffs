---
{"publish":true,"created":"2025-05-21T13:02:44.114+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

Python doesn't support pointer types (beyond interfacing with C, e.g. with `ctypes`), but arguments passed to functions are all **passed by reference**. For simple types, like integers and strings, parameters appear to be passed by value because they're _immutable_ objects. But more complex objects can be modified whenever they're passed to other functions, regardless of the caller's intent:

```python
def my_func(items: list):
    items.append(4)

a = [7, 6, 5]
b = a # creates an alias
c = a[:] # creates a copy
```

User-defined classes can also be modified by callers. Any of their internal properties can be accessed or assigned by any function they're passed to.

> [!Tip]
>
> When calling a function, be careful about passing mutable args since your data might get modified by the function, causing bugs. If you are passing objects, expose helper methods that work on copies of the data, or use immutable objects (dataclasses with `frozen=True`) and pure functions.

## Related

- [[2 Zettels/avoid mutable default args\|avoid mutable default args]]
