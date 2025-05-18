---
{"publish":true,"created":"2025-04-28T10:30:22.889+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[numpy\|numpy]]

NumPy provides many functions to create new arrays from existing arrays.

### Vertical and Horizontal stacking

Given two or more existing arrays, you can stack them vertically using the `vstack()` function and horizontally using `hstack()`.

```python
from numpy import array
from numpy import vstack


a1 = array([1,2,3])
a2 = array([4,5,6])

print(a1)
print(a2)

# vertical and horizontal stack
a3 = vstack((a1, a2))
a4 = hstack((a1, a2))

print(a3)
print(a3.shape)

print(a4)
print(a4.shape)
```

```
a1: [1 2 3]
a2: [4 5 6]

vstack: [[1 2 3]
        [4 5 6]]

vstack shape: (2, 3)

hstack: [1 2 3 4 5 6]

hstack shape: (6,)
```

## Related
