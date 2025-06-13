---
{"publish":true,"created":"2025-05-29T13:59:52.216+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[oops\|oops]]
> - [[python internals\|python internals]]

If a class A inherits from B and C and they in-turn have a common superclass somewhere in the hierarchy. This is termed as diamond inheritance and it causes the common superclass's `__init__` method to run multiple times, leading to unexpected behavior:

```python
class BaseClass:
    def __init__(self, val):
        self.val = val

class TimesTwo(BaseClass):
    def __init__(self, val):
        BaseClass.__init__(self, val)
        self.val *= 2

class PlusFive(BaseClass):
    def __init__(self, val):
        BaseClass.__init__(self, val)
        self.val += 5

class MyExpr(TimesTwo, PlusFive):
    def __init__(self, val):
        TimesTwo.__init__(self, val)
        PlusFive.__init__(self, val)


expr = MyExpr(4)
print(expr.val) # Output: 9
```

The expectation would be obtain: `4*2 + 5 = 13`, but instead we get `9`. This is because when we do `PlusFive.__init__(self, val)`, it calls the constructor of `PlusFive` which in-turn calls the base class constructor _again_ `BaseClass.__init__(self, val)`, essentially resetting `val = 4` and then we do `self.val += 5` resulting in: `4 + 5 = 9` as the output.

To overcome this, we have the `super()` built-in function in Python:

```python
class BaseClass:
    def __init__(self, val):
        self.val = val

class TimesTwo(BaseClass):
    def __init__(self, val):
        super().__init__(val)
        self.val *= 2

class PlusFive(BaseClass):
    def __init__(self, val):
        super().__init__(val)
        self.val += 5

class MyExpr(TimesTwo, PlusFive):
    def __init__(self, val):
        super().__init__(val)

expr = MyExpr(4)
print(expr.val) # Output: 18
```

Observe that in the constructor of `MyExpr`, we only call `super().__init__(val)` once and we also don't need to pass `self`. The main thing to understand here is the following:

> [!Warning]
>
> The `super()` function **does not** call the parent class, but follows the method resolution order (MRO). In Python the MRO is defined using the [[2 Zettels/c3 linearization\|c3 linearization]] algorithm.

The way the init calls are done is as follows:

```
MRO: [MyExpr, TimesTwo, PlusFive, BaseClass]

=================
Init Call stack:
=================

MyExpr <- TimesTwo (val*=2) <- PlusFive (val+=5) <- BaseClass (val)

Result (for val = 4): (4 + 5)*2 = 18
```

The MRO can be easily verified by calling the `.mro()` on the **class**:

```python
MyExpr.mro()

"""
Output: [<class '__main__.MyExpr'>, <class '__main__.TimesTwo'>,
<class '__main__.PlusFive'>, <class '__main__.BaseClass'>,
<class 'object'>]
"""
```

## Related
