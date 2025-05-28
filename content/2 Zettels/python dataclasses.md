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
> The `frozen=True` makes the dataclass immutable, but the attributes might not be immutable (e.g. you can still do: `obj.attr3.append(4)`).

## Related
