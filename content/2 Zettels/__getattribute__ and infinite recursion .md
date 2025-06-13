---
{"publish":true,"created":"2025-06-02T11:09:57.626+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

Python's `__getattribute__` intercepts all attribute accesses. When implemented incorrectly, it leads to infinite recursion:

```python
class Bad:
    def __init__(self):
        self._dict = {"key1": "value1"}

    def __getattribute__(self, name):
        return self._dict[name]  # Recursive call to __getattribute__


obj = Bad() # throws RecursionError: ...
print(obj.key1)
```

Solution:

- Use `super().__getattribute__(name)` to look in the attribute dictionary
- For special cases, implement `__getattr__` (only called if attribute isn't found)

```python
class Good:
    def __init__(self):
        self._dict = {"key1": "value1"}

    def __getattribute__(self, name):
        return super().__getattribute__("_dict")[name]

class GoodToo:
    def __init__(self):
        self._dict = {"key1": "value1"}

    def __getattr__(self, name):
        return self._dict[name]

obj = Good()
obj2 = GoodToo()
print(obj.key1) # prints: value1
print(obj2.key1) # prints: value1
```

## Related
