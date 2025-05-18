---
{"publish":true,"created":"2025-05-16T01:15:06.589+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[idiomatic python\|idiomatic python]]

Destructuring is the core strength of `match`. It allows you to unpack the contents of an object (like a tuple, list, or dataclass) directly within the `case` statement:

```python
point = (0, 1)
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        # this is executed
        print(f"Y={y}")
    case (x, 0):
        print(f"X={x}")
    case (x, y):
        print(f"X={x}, Y={y}")
    case _:
        print("Not a point")

# Output: Y=1
```

In this example, the `match` statement attempts to match the `point` tuple against different patterns. The `case (0, y)` pattern destructures the tuple, assigning the second element to the variable `y` if the first element is 0.

```python
@dataclass
class Point:
    x: int
    y: int

point = Point(1, 2)

match point:
    case Point(x=0, y=0):
        print("Origin")
    case Point(x=x_coord, y=y_coord):
        print(f"{x_coord=}, {y_coord=}")

# Output: x_coord=1, y_coord=2
```

This example destructures a dataclass. You can match against specific attribute values (e.g., `x=0, y=0`) or _extract attribute values into variables_ (e.g., `x_coord, y_coord`).

> [!Tip]
>
> It is recommended to consider match for destructuring in flow control, but avoid it when simple if statements are sufficient.

**Use cases:**

- when we need to simultaneously check the structure and extract parts of the data
- e.g: processing messages from external sources (like JSON), interpreting command structures, or handling different types of events etc

```python
command = "pick up this box"
command_parts = command.split()

match command_parts:
    case ["north"] | ["go", "north"]:
        print("Moving north")
    case ["pick", "up", *args, obj] | ["pick", *args, obj, "up"]:
        print(f"Attempting to pick up {obj}")
    case _:
        print("Unrecognized action.")

# Output: Attempting to pick up box
```

## Related
