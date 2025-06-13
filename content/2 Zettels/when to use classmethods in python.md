---
{"publish":true,"created":"2025-05-23T13:21:20.250+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[oops\|oops]]
> - [[python internals\|python internals]]

You use `@classmethod` when you need a method that operates on the class itself, rather than a specific instance of the class. The first argument to a class method is the class object, conventionally named `cls`.

A primary use case for `@classmethod` is defining _alternative constructors_ for your class. Python only has one standard constructor, `__init__`. If you need different ways to create instances based on varying inputs or logic, `@classmethod` provides a way to do this with a common interface:

```python
class Color:
    def __init__(self, red, green, blue):
        self.red = red
        self.green = green
        self.blue = blue

    @classmethod
    def from_hex(cls, hex_code):
        # Convert hex string to RGB values
        red = int(hex_code[1:3], 16)
        green = int(hex_code[3:5], 16)
        blue = int(hex_code[5:7], 16)
        return cls(red, green, blue)

# Usage
color = Color.from_hex('#FF0000')  # Creates a red color
```

Another practical use-case will be alongside [[2 Zettels/mixins in python\|mixins in python]]. Say I have a class A with some attributes and I need the ability to instantiate its object by reading/deserializing from JSON. We can create a `JsonMixin` that _implements_ the deserization classmethod as follows:

```python
import json

class JsonMixin:
    @classmethod
    def from_json(cls, data):
        kwargs = json.loads(data)
        return cls(**kwargs) # Calls the class constructor (like MyClass(**kwargs))
    # ... other methods ...
```

In this code, `cls` refers to the class that inherits from `JsonMixin`. The `from_json` method uses this `cls` object to create an instance of the subclass, providing a generic way to deserialize from JSON.

Another common way is to use it in conjuction with the [[2 Zettels/factory design pattern\|factory design pattern]]:

```python
class Vehicle:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"{self.__class__.__name__}({self.name})"

class Car(Vehicle):
    pass

class Bike(Vehicle):
    pass


class VehicleFactory:
    _vehicle_types = {
        "car": Car,
        "bike": Bike,
    }

    @classmethod
    def create_vehicle(cls, vehicle_type, name):
        vehicle_class = cls._vehicle_types.get(vehicle_type.lower())
        if vehicle_class:
            return vehicle_class(name)
        else:
            raise ValueError("Unknown vehicle type")

# Usage
car = VehicleFactory.create_vehicle("car", "MySedan")
bike = VehicleFactory.create_vehicle("bike", "RoadKing")

print(car)
print(bike)
```

Here, though we can use `@staticmethod` for our factory method `create_vehicle` and use an `if-else` construct inside to check the vehicle type and instantite the correct class accordingly, but `@classmethod` is cleaner and allows us to refer the class var `_vehicle_types`.

## Related
