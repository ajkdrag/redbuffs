---
{"publish":true,"created":"2025-05-27T19:28:25.751+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[clean code\|clean code]]
> - [[functools\|functools]]

In Python, we don't have function overloading and generic functions like in other languages such as Java. A way to achieve this is by using `functools.singledispatch` decorator. It enables writing functions that behave differently based on first arg type. Here's how it works:

- Base implementation decorated with `@singledispatch`
- Register additional implementations using `@func.register(type)`
    - you can even infer from the type hint instead (as shown in example below)
- Dispatch occurs on first argument's type
- Falls back to base implementation if no match

```python
from functools import singledispatch

@singledispatch
def process(data):
    raise NotImplementedError("Unsupported type")

@process.register(dict)
def _(data: dict):
    return data.items()

# here I am not doing func.register(type)
# the type-hint on the arg does the job
@process.register
def _(data: list):
    return sum(data)

process({"a": 1, "b": 2}) # [(a, 1), (b, 2)]
process([1, 2]) # 3
```

This works best when different types need fundamentally different processing. Say, you are implementing a [[2 Zettels/beauty of OOP illustrated with a basic calculator example\|calculator]] and want to add the feature of pretty-printing the expression. In [[oops\|oops]] style, we would have some abstractmethod named `pretty(...)` which needs to be _implemented_ in each of the classes`Integer, Add, Multiply` etc. This causes the code to be organized along with wrong axis because the implementations of pretty-printing have nothing to do with calculator functionality, so we can use single-dispatch to refactor our code so that we can have a separate module say `utils.py` where we can keep all the print related funcs:

```python
@functools.singledispatch
def pretty_print(node):
    """func for pretty-printing the expression"""
    raise NotImplementedError

@pretty_pretty.register
def _(node: Integer):
    return repr(node.value)

@pretty_pretty.register
def _(node: Add):
    left_str = my_pretty(node.left)
    right_str = my_pretty(node.right)
    return f"({left_str} + {right_str})"

@pretty_pretty.register
def _(node: Multiply):
    left_str = my_pretty(node.left)
    right_str = my_pretty(node.right)
    return f"({left_str} * {right_str})"
```

## Related
