---
{"publish":true,"created":"2025-05-25T11:14:25.432+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[oops\|oops]]
> - [[python internals\|python internals]]

The `__call__` special method is what makes an instance of a class callable, just like a regular function or method. If a class defines a `__call__` method, you can invoke an instance of that class using the standard function call syntax `()`. Objects that can be executed in this manner are referred to as **callables**.

Any time you have an operation that can be represented by a function call but needs to maintain _internal state_ or configuration, a class with` __call__` can be suitable. A great example is that many Python APIs (such as `sort`, `defaultdict`) accept simple functions as hooks or callbacks. If the behavior required for the hook is stateless, a plain function is sufficient. However, if the hook needs to keep track of information across multiple calls, defining a small class that encapsulates the state and implements the `__call__` method is often clearer and easier to reason:

```python
class CountMissing:
    def __init__(self):
        self.added = 0

    def __call__(self):
        self.added += 1
        return 0

current = {"green": 12, "blue": 3}
increments = [
    ("red", 5),
    ("blue", 17),
    ("orange", 9),
]

counter = CountMissing()
result = defaultdict(counter, current)
for key, amount in increments:
    result[key] += amount
assert counter.added == 2 # red and orange were new keys
```

Another example with `sort`:

```python
class Sorter:
    def __init__(self, group):
        self.group = group
        self.found = False

    def __call__(self, x):
        if x in self.group:
            self.found = True
            return (0, x)
        return (1, x)

colors_grp = {"r", "g", "b"}
items = ["a", "b", "c", "g", "r", "d"]

items.sort(key=Sorter(colors_grp))
print(items) # ['b', 'g', 'r', 'a', 'c', 'd']
```

## Related
