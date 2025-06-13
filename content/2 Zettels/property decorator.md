---
{"publish":true,"created":"2025-06-01T18:22:44.003+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/decorators\|decorators]]
> - [[oops\|oops]]

The concept of setters and getters can be applied in Python with the help of `@property`:

```python
class Resistor:
    def __init__(self, ohms):
        self.ohms = ohms


class BoundedResistance(Resistor):
    def __init__(self, ohms):
        super().__init__(ohms)

    @property
    def ohms(self):
        return self._ohms

    @ohms.setter
    def ohms(self, ohms):
        if ohms <= 0:
            raise ValueError(f"ohms must be > 0; found: {ohms}")
        self._ohms = ohms

r = BoundedResistance(1e3)
r.ohms = 0 # raises ValueError ...
```

> [!Note]
>
> In the above example, doing `r2 = BoundedResistance(-5)` also raises ValueError, because `BoundedResistance.__init__` calls `Resistor.__init__`, which assigns `self.ohms = -5`. That assignment causes the `@ohms.setter` method from `BoundedResistance` to be called, and it immediately runs the validation code before object construction has completed.

Few guidelines to keep in mind when use `@property` setters and getters:

- Do not set stuff in getter property methods
- Do not create unexpected side-effects such as importing modules dynamically, running slow helper functions, doing I/O, or making expensive database queries, as the users of a class will expect its attributes to be like any other Python object: **quick and easy**

## Related

- [[2 Zettels/descriptors in python\|descriptors in python]]
