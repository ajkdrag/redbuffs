---
{"publish":true,"created":"2025-05-25T11:34:51.220+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[oops\|oops]]

I will let the code do the talking here. With OOP, one can add more AST methods and subclasses for the below toy calculator program, as the needs grow. Without OOP, I would have to do many `if` or `isinstance` checks to perform the right operation based on the operator.

```python
class Node:
    def evaluate(self):
        raise NotImplementedError

    def pretty(self):
        raise NotImplementedError

class Integer(Node):
    def __init__(self, value):
        self.value = value

    def evaluate(self):
        return self.value

    def pretty(self):
        return repr(self.value)

class Add(Node):
    def __init__(self, l, r):
        self.l = l
        self.r = r

    def evaluate(self):
        return self.l.evaluate() + self.r.evaluate()

    def pretty(self):
        pretty_l = self.l.pretty()
        pretty_r = self.r.pretty()
        return f"({pretty_l} + {pretty_r})"

# Similarly can have `Multiply`, `Divide` and other ops
class Mul(Node):
    ...

class Div(Node):
    ...

tree = Add(Add(Integer(3), Integer(4)), Integer(5))
print(tree.pretty()) # ((3 + 4) + 5)
print(tree.evaluate()) # 12

```

## Related
