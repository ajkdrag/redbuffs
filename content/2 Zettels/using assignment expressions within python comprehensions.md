---
{"publish":true,"created":"2025-05-23T14:11:22.102+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[idiomatic python\|idiomatic python]]

When you have a computation whose result you need to use more than once within a comprehension (for example, both in the value expression and the filtering `if` clause), you can use [[2 Zettels/walrus operator in python\|walrus operator in python]] which lets you compute it once, assign it to a variable, and then reuse that variable.

Consider an example which filters items from an `order` based on `stock` and computes batches using `get_batches`:

```python
stock = {'nails': 122, 'screws': 35, 'washers': 24}

# Original, without walrus operator (repeats computation)
found = {name: get_batches(stock.get(name, 0), 8)
         for name in order
         if get_batches(stock.get(name, 0), 8)}
```

Notice how `get_batches(stock.get(name, 0), 8)` is repeated. Using the walrus operator, you can compute this value once, assign it to batches, and use batches in both the if filter and the dictionary value expression:

```python
# With walrus operator (computes get_batches once)
found = {name: batches for name in order
         if (batches := get_batches(stock.get(name, 0), 8))}
```

The advantage here is:

- increased readability (less lines of code)
- improved performance (as expression is evaluated only once)
- less prone to bugs (in the original impl, we call `get_batches` twice. What if we pass incorrect params in any of the calls accidentally?)

> [!Warning]
>
> Be aware that variables defined using the walrus operator within comprehensions **leak** into the surrounding scope after the comprehension finishes, unlike regular loop variables in comprehensions.

## Related
