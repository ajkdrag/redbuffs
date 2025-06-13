---
{"publish":true,"created":"2025-05-31T11:59:09.158+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[oops\|oops]]
> - [[python internals\|python internals]]

In Python, we are "mature consenting adults". There are no actual "private" variables and by doing `obj.__dict__`, one can see all the attributes of an obj. Nevertheless, _conceptually_, there are standards to follow:

- If a var is like: `self._value = value`, then it is _protected_. External callers and subclasses are **expected** (but not enforced) not to use this variable
- If a var is named as: `self.__value = value`, then it is _private_. In Python, internally they are **name-mangled** and stored as `_ClassName__value`, so caller can't directly do `obj.__value` to access it. This is used majorly inside libraries to avoid var name clashes, since users of that library can have similar var names (especially when word is very common such as `value`, `model`, `total` etc)

Following code illustrates this pretty clearly:

```python
@dataclass
class BaseClass:
    __value: int


class SubClass(BaseClass):
    def get_value_v1(self):
        return self.__value

    def get_value_v2(self):
        return self._BaseClass__value

subcls = SubClass(3)
print(subcls.get_value_v2()) # Success: Prints 3
print(subcls.get_value_v1()) # Error: Throws `AttributeError: ...`
```

## Related
