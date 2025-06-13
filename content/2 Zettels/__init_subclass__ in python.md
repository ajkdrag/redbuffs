---
{"publish":true,"created":"2025-06-03T16:05:51.260+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]
> - [[oops\|oops]]

Whenever a class inherits from another class, `__init_subclass__` is called on the parent class. This way, it is possible to write classes which change the _behavior_ of subclasses. This is closely related to [[2 Zettels/class decorators\|class decorators]], but where class decorators only affect the specific class they're applied to, `__init_subclass__` solely applies to future subclasses of the class defining the method:

```python
class BaseClass:
    # it's recommended to decorate it with @classmethod for clarity
    @classmethod
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs) # Important for proper inheritance
        print(f"__init_subclass__ called for {cls.__name__}")

class MySubclass(BaseClass):
    pass
# Output: __init_subclass__ called for MySubclass
```

> `__init_subclass__` primarily serves as a simpler, more Pythonic alternative to metaclasses for most class creation customization needs.

`__init_subclass__` receives any keyword arguments passed during the subclass definition. For compatibility with other classes using `__init_subclass__`, one should take out the needed keyword arguments and pass the others over to the base class (crucial to call `super().__init_subclass__(...)` for proper MRO).

```python
class Philosopher:
    def __init_subclass__(cls, *, default_name, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.default_name = default_name


class AustralianPhilosopher(Philosopher, default_name="Bruce"):
    def __init_subclass__(cls, *, default_city, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.default_city = default_city

class MyPhilosopher(
    AustralianPhilosopher,
    default_name="John", # need to provide this here
    default_city="Sydney",
):
    pass

print(MyPhilosopher.default_name)
# OUT: 'John'
print(MyPhilosopher.default_city)
# OUT: 'Sydney'
print(AustralianPhilosopher.default_name)
# OUT: 'Bruce'
```

> [!Tip]
>
> In Python, we have the option of [[2 Zettels/enforcing clarity with keyword-only and positional-only args\|enforcing clarity with keyword-only and positional-only args]] (keyword-only in above code via the `*` arg).

An example will be registering classes for dynamic serialization and deserization. If we go with the metaclass route, the code will look like this:

```python
import json

REGISTRY = {}

def deserialize(data):
    params = json.loads(data)
    name = params["class"]
    target_class = REGISTRY[name] # Relies on class being registered
    return target_class(*params["args"])

class Serializable:
    def __init__(self, *args):
        self.args = args

    def serialize(self):
        return json.dumps({
            "class": self.__class__.__name__,
            "args": self.args
        })

class Meta(type):
    def __new__(meta, name, bases, class_dict):
        cls = type.__new__(meta, name, bases, class_dict)
        # Register the class immediately after it's defined
        REGISTRY[cls.__name__] = cls
        return cls

class RegisteredPoint2D(Serializable, metaclass=Meta):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.x = x
        self.y = y

    def __repr__(self):
        return f"RegisteredPoint2D({self.x}, {self.y})"

# Now, when RegisteredPoint2D is defined (no need to instantiate it),
# it is automatically registered.
# You don't need a separate call like `register_class(RegisteredPoint2D)`.
# This avoids the "forgot to call register_class!" problem

point_obj = RegisteredPoint2D(10, 20)
serialized_data = point_obj.serialize()
print(f"Serialized: {serialized_data}")
deserialized_obj = deserialize(serialized_data)
print(f"Deserialized: {deserialized_obj}")
print(REGISTRY)

assert isinstance(deserialized_obj, RegisteredPoint2D)
assert deserialized_obj.x == 10
assert deserialized_obj.y == 20
```

With `__init_subclass__`, we can do above, in a cleaner, more direct way:

```python
class Serializable:
    @classmethod
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        REGISTRY[cls.__name__] = cls
        print(f"Class '{cls.__name__}' automatically registered.")

    def __init__(self, *args):
        self.args = args

    def serialize(self):
        return json.dumps({
            "class": self.__class__.__name__,
            "args": self.args
        })

class RegisteredPoint2D(Serializable): # no need for metaclass
    ...

```

Another use-case of this can be for validating subclasses as such:

```python
class BaseValidator:
    @classmethod
    def __init_subclass__(cls, min_value=None, **kwargs):
        super().__init_subclass__(**kwargs)

        if not hasattr(cls, 'value'):
            raise TypeError(f"Subclass {cls.__name__} must define 'value'")

        if min_value is not None and cls.value < min_value:
             raise TypeError(f"Value ({cls.value}) must be at least {min_value}")

class ValidSubclass(BaseValidator, min_value=10):
    value = 15 # This subclass is valid

class InvalidSubclass(BaseValidator):
    # Missing 'value' attribute - would raise TypeError
    pass

class AnotherInvalidSubclass(BaseValidator, min_value=10):
    value = 5 # value is less than min_value - would raise TypeError
```

## Related

- [[__init_subclass__ for inspecting class attributes and methods\|__init_subclass__ for inspecting class attributes and methods]]
