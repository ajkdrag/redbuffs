---
{"publish":true,"created":"2025-05-22T10:48:37.824+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

Keyword-only args _force_ callers to supply specific arguments by keyword. This eliminates the confusion that can arise when optional keyword arguments (which have default values) are passed positionally, obscuring their meaning:

```python
def safe_division_c(
    number,
    divisor,
    ignore_overflow=False,
    ignore_zero_division=False,
): pass
```

Above func can be called as `safe_division_c(3, 4, True, False)` and it's easy to confuse the position of the two Boolean arguments. To fix this, we can use keyword-only args:

```python
def safe_division_c(
    number,
    divisor,
    *, # added
    ignore_overflow=False,
    ignore_zero_division=False,
): pass
```

Now, `safe_division_c(1.0, 10**500, True, False)` will not work and we have to explicitly speficify the arg names that are defined after the `*`.

```python
safe_division_c(
    number=1.0,
    divisor=10**500,
    ignore_overflow=True,
)
```

This is great, but notice that this would break if developer changes the name of the arg, e.g. from `number` to `numerator`. This is where we need to decide which args need to be **keyword-only** and which ones need to be **positional-only**. We can also enforce position-only args as:

```python
def safe_division_c(
    number,
    divisor,
    /, # added
    *,
    ignore_overflow=False,
    ignore_zero_division=False,
): pass
```

This allows me to change the name of the params from `number` to say `numerator` without breaking anything. Any arg before the `/` can't be assigned by their keyword: `safe_division_c(number=4, divisor=10)` raises an exception, so we can safely rename those args in future without breaking things.

> [!Tip]
>
> One notable consequence of keyword and positional-only arguments is that any parameter name between the `/` and `*` symbols in the argument list may be passed either by position or by keyword.

## Related
