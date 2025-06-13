---
{"publish":true,"created":"2025-06-04T14:53:46.478+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[functools\|functools]]

When we annotate a function with `functools.wraps` as follows:

```python
@functools.wraps(f)
def g():
    pass
```

we are basically doing:

```python
# update wrapper updates in-place, so no need to capture return
g = functools.update_wrapper(g, f)
```

It does three things:

- copies `WRAPPER_ASSIGNMENTS` (`__module__, __name__, __doc__`, etc) from `f` to `g`
- updates the attribute dictionary (`__dict__`) of `g` with all elements from `f.__dict__`
- sets a new `__wrapped__= <function f at 0x123... >` attribute on `g`

The consequence is that `g` _appears_ as having the same name, docstring, module name, and signature as `f`. This is useful when combined with [[2 Zettels/decorators\|decorators]]. When we decorate a function for example, the closure (`inner`) is the one that runs our wrapped function (`cached`):

```python
def wrapper(func):
    def inner(*args):
        return cached(func, *args)
    return inner

@wrapper
def norm(vec):
    "Get the norm of the vector"
    print("Computing...")
    return math.sqrt(sum(i*i for i in vec))

```

If we do something like the following: `print(norm.__doc__)`, we get `None` and `print(norm)` gives us `function wrapper.<locals>.inner at 0x123...>`. To fix this we use `@wraps`:

```python
def wrapper(func):
    @functools.wraps(func) # The fix
    def inner(*args):
        return cached(func, *args)
    return inner

# ...

print(norm.__doc__) # Get the norm of the vector
print(norm) # <function norm at 0x123...>
```

This is good, but what if we are using class-based decorator:

```python
class wrapper:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args):
        return cached(self.func, *args)
```

In this case, we can't use the annotation syntax of `wraps`, but instead call it directly as such:

```python
class wrapper:
    def __init__(self, func):
        self.func = func
        functools.wraps(func)(self)
        # OR
        # functools.update_wrapper(self, func)

    def __call__(self, *args):
        return cached(self.func, *args)

    # this is to make print(norm) behave the same
    def __repr__(self):
        return self.func.__repr__()
```

Another way to achieve the same is during instance creation:

```python
class wrapper:
    def __init__(self, func):
        self.func = func

    def __new__(cls, func):
        return functools.update_wrapper(
            super().__new__(cls),
            func
        )

    def __call__(self, *args):
        return cached(self.func, *args)

    def __repr__(self):
        return self.func.__repr__()
```

It's simpler and more convenient to call `update_wrapper` in `__init__`, instead of `__new__`.

## Related
