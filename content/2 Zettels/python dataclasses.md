---
{"publish":true,"created":"2025-05-27T20:13:18.987+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[clean code\|clean code]]

Python stdlib's `dataclasses` are lightweight and really nice to have. They provide many things out of the box, such as `asdict`, `astuple`, `__repr__` and allow comparison between objects as well if you pass `@dataclass(..., order=True)`. They should be used if you have few methods and need to remove the boilerplate when defining classes (`__init__`, `__eq__`, etc). For more sophisticated usecases where we need to data-validation, use Pydantic dataclasses.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1748357009/python%20dataclasses-x43m6m.webp)

> [!Warning]
>
> The `frozen=True` makes the dataclass immutable, but the attributes might not be immutable (e.g. you can still do: `obj.attr3.append(4)`). Earlier people used `NamedTuple` to create such immutable objects.

For immutable objects (created using `frozen=True`), we would likely want to modify attrs at some point. Take an example of a `Point` object and a function `translate` whose job is to move that point by some deltas:

```python
@dataclass(frozen=True)
class Point:
    x: float
    y: float
    color: str # color of point: blue, green etc

def translate(point: Point, delta_x: float, delta_y: float) -> Point:
    # we can't do point.x += delta_x since it's frozen/immutable
    return Point(
        x = point.x + delta_x,
        y = point.y + delta_y,
        color = point.color,
    )
```

Above implementation works but not the best, since we also need to copy attrs which we aren't even dealing with in the translation process: `color = point.color`. A better way is to use `dataclasses.replace(...)` built-in helper func that allows us to **update attrs** of a dataclass and return a **new object**. We don't need to pass attrs which we aren't changing:

```python
def translate(point: Point, delta_x: float, delta_y: float) -> Point:
    # we can't do point.x += delta_x since it's frozen/immutable
    return dataclasses.repalce(
        point,
        x = point.x + delta_x,
        y = point.y + delta_y,
        # color = point.color is not needed here
    )

point = Point(3, 4, "red")
new_point = translate(point, 1, 2)
```

## Related
