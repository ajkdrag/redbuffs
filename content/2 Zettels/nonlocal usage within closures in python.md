---
{"publish":true,"created":"2025-05-21T19:41:35.206+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

Imagine that I want to sort a list of numbers but prioritize one group of numbers to come first. This pattern is useful when you’re rendering a user interface and want important messages or exceptional events to be displayed before everything else. We can do this the following way:

```python
def sort_priority(numbers, group):
    found = False
    def helper(x):
        # necessary to refer outer `found`
        nonlocal found

        if x in group:
            found = True
            return (0, x)
        return (1, x)

    numbers.sort(key=helper)
    return found
```

Above workds because Python supports closures—that is, functions that refer to variables from the scope in which they were defined: The `helper` func is able to access `group` arg.

The use of `nonlocal` is necessary to modify a variable in the enclosing scope: var `found` in this case.

> [!Tip]
>
> Avoid using `nonlocal` statements for anything beyond simple functions. Define a class that can be called like a func, i.e. by [[2 Zettels/using __call__ for stateful hooks in python\|using __call__ for stateful hooks in python]]:
>
> ```python
> class Sorter:
>     def __init__(self, group):
>         self.group = group
>         self.found = False
>
>     def __call__(self, x):
>         if x in self.group:
>             self.found = True
>             return (0, x)
>         return (1, x)
>
> sorter = Sorter(group)
> numbers.sort(key=sorter)
> print("Found:", sorter.found)
> ```

## Related
