---
{"publish":true,"created":"2025-05-31T10:24:14.638+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[oops\|oops]]

Mixins are Python's way to **interfaces** - classes that define behavior. Although a mixin is defined just like any other class, there are some "best practices" to follow:

- Mixins should be used to add a "behavior" to another class. With this in mind, there's no need for a mixin to have state variables
- Since mixins are classes, they can also inherit from other classes, but it's advisable to keep them self-contained and not inherit from other mixins/classes

> A mixin is a class with a single purpose to **add functionality** to other classes. Multiple inheritance is used to achieve mixins in Python.

We can see how they help with an example:

```python
@dataclass
class Coord:
    x: float
    y: float

@dataclass
class Center(Coord):
    "Center of shape"
    pass

@dataclass
class TopLeft(Coord):
    "Top left 'corner' of a shape"
    pass

@dataclass
class Shape:
    coord: Coord

# ========================== #
# Above is part of a library (say)
# and can't be modified
# ========================== #

class Rectangle(Shape):
    def __init__(self, x, y, w, h):
        super().__init__(TopLeft(x, y))
        self.w = w
        self.h = h

class Circle(Shape):
    def __init__(self, x, y, r):
        super().__init__(Center(x, y))
        self.r = r


rect = Rectangle(0, 0, 100, 50)
circle = Circle(10, 10, 50)


print(rect.coord) # TopLeft(x=0, y=0)
print(circle.coord) # Center(x=10, y=10)
```

In above toy example, we have different shapes like Rectangle and Circle. Say, I want to have the ability to serialize them. Since we can't modify `Shape` class as it's "locked" in a library, we would normally create a serialize method within the subclasses and call it. Within mixins, things get simpler. Since **serializing** is a _behavior_, we can have a `SerializerMixin`:

```python
from dataclasses import asdict

class SerializerMixin:
    def serialize(self):
        print(asdict(self))

class Rectangle(Shape, SerializerMixin):
    ...

class Circle(Shape, SerializerMixin):
    ...

circle.serialize() # {'coord': {'x': 10, 'y': 10}}
```

## Related
