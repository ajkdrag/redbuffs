---
{"publish":true,"created":"2025-06-04T11:49:19.353+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

Decorators in python are a convenient way to allow us to wrap a func or class with additional functionality. Best explained with an example. Say I want to cache few functions in my codebase. Without decorators, I would probably create some function like this:

```python

cache = {}

def cached(func, *args):
    try:
        return cache[args]
    except KeyError:
        cache[args] = ret = func(*args)
        return cache[args]

def norm(vec):
    print("Computing...")
    return math.sqrt(sum(i*i for i in vec))


vec = (3, 4)
vec_norm = cached(norm, vec)
vec_norm = cached(norm, vec) # doesn't print "Computing", uses cache
print(vec_norm)
print(cache)
```

This is fine, but we had to change the API for the user: `norm(...)` vs `cached(norm, ...)` and user has to remember this change. This is where decorators help us:

```python
import math

cache = {}

def cached(func, *args):
    try:
        return cache[args]
    except KeyError:
        cache[args] = ret = func(*args)
        return cache[args]

# our "decorator", using closures
def wrapper(func):
    def inner(*args):
        return cached(func, *args)
    return inner

def norm(vec):
    print("Computing...")
    return math.sqrt(sum(i*i for i in vec))


# our decorated func
wrapped_norm = wrapper(norm)

vec = (3, 4)
vec_norm = wrapped_norm(vec)
vec_norm = wrapped_norm(vec)
print(vec_norm)
print(cache)
```

We basically wrap/decorate our original function in above sample code, leveraging closures. It works exactly the same as before, but our function signature is much better now: `norm` vs `wrapped_norm`. User now only has to remember this new function name. Python provides even more convenience by allowing us to annotate the original function with our `wrapper`:

```python
# Instead of:
wrapped_norm = wrapper(norm)
vec_norm = wrapped_norm(vec)

# We do:
@wrapper
def norm(vec):
    print("Computing...")
    return math.sqrt(sum(i*i for i in vec))

vec_norm = norm(vec)
```

This allows us to re-use the same function name but now with modified behavior. There are several use-cases: logging entry-exit, wrapping try-except, caching, func call counting etc.

We can also create decorators by defining a class instead of a function:

```python
class wrapper:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args):
        return cached(self.func, *args)
```

![](https://res.cloudinary.com/dcameztw9/image/upload/v1749022895/decorators-29uyys.webp)

So far, we have seen ways to decorate functions, but it's also possible (and applicable) to decorate classes and even pass args/flags to these decorators, i.e. `@cached(max_size=3)` etc.

## Related

- [[2 Zettels/class decorators\|class decorators]]
- [[decorators with args\|decorators with args]]
- [[2 Zettels/functools wraps and update_wrapper\|functools wraps and update_wrapper]]
