---
{"publish":true,"created":"2025-06-02T10:09:10.845+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

When we use [[2 Zettels/property decorator\|property decorator]] (`@property`) on methods, we basically control attribute lookups and storage (`get` and `set` behavior), but the problem is that we can't reuse the logic for other attributes without duplicating boilerplate code:

```python
class Exam:
    def __init__(self):
        self._math_grade = 0
        self._english_grade = 0

    @property
    def english_grade(self):
        return self._english_grade

    @english_grade.setter
    def english_grade(self, value):
        if 0 <= value <= 100: self._english_grade = value
        else: raise ValueError(f"{value=} outside range")

    @property
    def math_grade(self):
        return self._math_grade

    @math_grade.setter
    def math_grade(self, value):
        if 0 <= value <= 100: self._math_grade = value
        else: raise ValueError(f"{value=} outside range")


exam = Exam()
exam.math_grade = 100
print(exam.math_grade)
exam.english_grade = 101 # raises ValueError as expected
```

Even if we move the validation logic inside a function, we still need to defined the property methods and have code duplication. This is where **descriptors** can help us. First let's see the code and then understand how it works:

```python
def validate_and_set(inst, attr, value):
    if 0 <= value <= 100: setattr(inst, attr, value)
    else: raise ValueError(f"{value=} outside range")

class MathGrade:
    def __set__(self, inst, value):
        validate_and_set(inst, '_math_grade', value)

    def __get__(self, inst, owner):
        # OR return getattr(inst, '_math_grade')
        return inst._math_grade

class EnglishGrade:
    def __set__(self, inst, value):
        validate_and_set(inst, '_english_grade', value)

    def __get__(self, inst, owner):
        return inst._english_grade


class Exam:
    english_grade = EnglishGrade()
    math_grade = MathGrade()

exam = Exam()
exam.math_grade = 100
print(exam.math_grade)
exam.english_grade = 101 # raises ValueError as expected
```

Above code works the same functionally, but we are using descriptors here. Descriptors are nothing but classes that implement the _descriptor protocol_:

- `__get__(self, obj, type=None)`
- `__set__(self, obj, value)`
- `__delete__(self, obj)`

Define _any_ of the above methods and an object is considered a descriptor and can override default behavior upon being looked up as an attribute. If an object defines `__set__()` or `__delete__()`, it is considered a **data descriptor**. Descriptors that only define `__get__()` are called **non-data descriptors**. The order in which lookup happens is:

1. data descriptors
2. `self.__dict__['attr']`
3. non-data descriptors

Following example illustrates this:

```python
class EnglishGrade:
    def __set__(self, inst, value):
        pass

    def __get__(self, inst, owner):
        return 0

class MathGrade:
    def __get__(self, inst, owner):
        return 0

class Exam:
    english_grade = EnglishGrade()
    math_grade = MathGrade()

    def __init__(self):
        self.__dict__['english_grade'] = 10
        self.__dict__['math_grade'] = 10


exam = Exam()
print(exam.english_grade) # 0
print(exam.math_grade) # 10
```

The output of `exam.english_grade` is 0 because `english_grade` is a data descriptor, so Python fetches the value from `__get__` first even though we have `english_grade` defined in the attribute dictionary. `MathGrade` on the other hand, is a non-data descriptor (as it doesn't have the `__set__()` impl), so the attribute dictionary is looked up _first_.

Now, we got back to our objective of cutting down the lines of repeated code with descriptors. Both `MathGrade` and `EnglishGrade` descriptors are basically the same implementation but the set and get from different internal vars named `_english_grade` and `_math_grade` respectively. What we want is to have a single descriptor:

```python
class Grade:
    ...

class Exam:
    english_grade = Grade(...)
    math_grade = Grade(...)
```

We can achieve this in the following manner:

```python
def validate_and_set(inst, attr, value):
    if 0 <= value <= 100: setattr(inst, attr, value)
    else: raise ValueError(f"{value=} outside range")

class Grade:
    def __init__(self, internal_var_name):
        self.internal_var_name = internal_var_name

    def __set__(self, inst, value):
        validate_and_set(inst, self.internal_var_name, value)

    def __get__(self, inst, owner):
        return getattr(inst, self.internal_var_name)


class Exam:
    english_grade = Grade('_english_grade')
    math_grade = Grade('_math_grade')
```

Notice how we pass the internal var name as args to the code. Python provides a convenient dunder method `__set_name__`, that does for us. It basically gives the name of the variable to which your descriptor instance is assigned to.

```python
class A:
    def __set_name__(self, owner, var_name):
        print(var_name)
        pass

class B:
    my_var = A()

b = B() # prints `my_var`
```

With this, our final code looks like:

```python
def validate_and_set(inst, attr, value):
    if 0 <= value <= 100: setattr(inst, attr, value)
    else: raise ValueError(f"{value=} outside range")

class Grade:
    def __set_name__(self, owner, var_name):
        # var_name is `english_grade` for first instance
        # and `math_grade` for second instance
        # I prefix with an `_` to make a protected internal var
        self.internal_var_name = f'_{var_name}'

    def __set__(self, inst, value):
        validate_and_set(inst, self.internal_var_name, value)

    def __get__(self, inst, owner):
        return getattr(inst, self.internal_var_name)


class Exam:
    english_grade = Grade()
    math_grade = Grade()
```

## Related
