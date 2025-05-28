---
{"publish":true,"created":"2025-05-22T10:31:18.232+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

Using `None` for default argument values is especially important when the [[2 Zettels/function args can be mutated in python\|function args can be mutated in python]].

> The default value is evaluated only once when the function is defined, not each time the function is called. All calls to the function will share the same default object or the same initial dynamic value, which can lead to unexpected behavior.

```python
def decode(data, default={}):
    try:
        return json.loads(data)
    except ValueError:
        return default

foo = decode("bad data")
foo["stuff"] = 5
bar = decode("also bad")
bar["meep"] = 1

print("Foo:", foo) #Foo: {'stuff': 5, 'meep': 1}
print("Bar:", bar) #Bar: {'stuff': 5, 'meep': 1}
```

In above, `foo` and `bar` are both equal to the default parameter to the `decode` function. They are the same dictionary object: `assert foo is bar`.

The fix is to use `None` and explicitly check inside the function:

```python
def decode(data, default=None):
    """Load JSON data from a string.

    Args:
        data: JSON data to decode.
        default: Value to return if decoding fail
        Defaults to an empty dictionary.
    """
    try:
        return json.loads(data)
    except ValueError:
        if default is None: # Check here
        default = {}
    return default
```

Now, running the same test code as before produces the expected result:

```
Foo: {'stuff': 5}
Bar: {'meep': 1}
```

## Related
