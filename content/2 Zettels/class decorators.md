---
{"publish":true,"created":"2025-06-05T11:52:20.384+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/decorators\|decorators]]
> - [[oops\|oops]]

Very similar to regular function decorators. Syntactically,

```python
def my_class_decorator(klass):
    klass.extra_param = "hello"
    return klass

@my_class_decorator
class MyClass:
    pass

print(MyClass) # <class '__main__.MyClass'>
print(MyClass.extra_param) # hello
```

When you're looking for composable ways to extend classes, class decorators are the best tool for the job. Python stdlib has [functools.total_ordering](https://docs.python.org/3/library/functools.html#functools.total_ordering) that eases object comparison.

Another practical example is auto-registering different variations of ML models in a registry:

```python
model_registry = {}

def register_model(model_type: str):
    def class_decorator(klass):
        model_registry[model_type] = klass
        return klass
    return class_decorator

# Assume these are defined in their own files
@register_model("linear_regression")
class LinearRegression:
    def __init__(self, params):
        self.params = params
    def fit(self, data):
        print(f"Fitting Linear Regression with {self.params}")

@register_model("neural_network")
class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
    def fit(self, data):
        print(f"Fitting Neural Network with layers {self.layers}")

# In another file, we can simply look up the model and use it
def train_model(model_type: str, config: dict, data):
    model_class = model_registry[model_type]
    model = model_class(config)
    model.fit(data)

train_model("linear_regression", {"solver": "lbfgs"}, [1, 2, 3])
train_model("neural_network", {"layers": [10, 10, 10]}, [1, 2, 3])
```

> [!Tip]
>
> Here, we need to manually decorate the classes we need to register. If we need to auto-register the classes, we would use [[2 Zettels/__init_subclass__ in python\|__init_subclass__ in python]]. Something like: `class LinearRegression(BaseAlgo)` with `BaseAlgo` having the `__init_subclass__` impl.

## Related
