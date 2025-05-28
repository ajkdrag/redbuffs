---
{"publish":true,"created":"2025-05-26T13:14:36.350+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]
> - [[idiomatic python\|idiomatic python]]

Iterations are everywhere in practical programming. In Python, there are ways to create custom iterators and often we confuse between iterators, iterables and generators.

An **iterator** is an object _representing_ stream of data. It has `__next__` method which returns the next item in sequence, raising `StopIteration` when no more items exist. Also has `__iter__` method which returns itself. Keeps track of iteration state.

```python
class TodoIterator:
    def __init__(self, data):
        self.data = data
        self.index = 0 # Keep track of position

    def __iter__(self):
        # iter(some_iterator) should return some_iterator
        # since it's already an iterator
        return self

    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration # Signal end of iteration

        value = self.data[self.index]
        self.index += 1
        return value

print(isinstance(TodoIterator([1, 2, 3]), collections.abc.Iterator)) # True
```

> [!Note]
>
> An iterator is also an iterable (as per the `collections.abc.Iterator` interface) since `iter(TodoIterator(...))` returns the underlying iterator (`self` in this case). However

An **iterable** is an object capable of returning its members one at a time. Has an `__iter__` method which returns an _iterator_. Examples: lists, tuples, strings. When we call `iter(some_iterable)`, we get the underlying iterator.

```python
class TodoList:
    def __init__(self, todos: list):
        self.todos = todos

    def __iter__(self):
        return TodoIterator(self.todos)

todos = TodoList(["groceries", "office", "journal"])
print(isinstance(todos, collections.abc.Iterable))
```

Consider a sequence $S=(s_1, s_2, \ldots, s_n)$:

- An iterable is like the definition of S. You can always refer to S and start traversing it from the beginning
- An iterator is like a pointer or index $i$ that moves through S. It holds the state of the iteration. When you ask for the next element, it provides $s_i$ and then increments $i$. Once $i$ goes beyond $n$, it signifies the end

When we use a `for` loop on an iterable, it internally calls the `__iter__()` to get the iterator from the iterable and then iterates over it by calling the `__next__()`.

```python
for t in todos: print(t)
```

If we run this for loop twice, we will get the same result because each for loop calls the `__iter__()` which in-turn _creates_ the iterator. We can do something interesting like this:

```python
class TodoList:
    def __init__(self, todos: list):
        self.todos = todos
        self.it = TodoIterator(self.todos)

    def __iter__(self):
        return self.it

todos = TodoList(["groceries", "office", "journal"])

for t in todos: print(t) # prints: groceries, office, journal
for t in todos: print(t) # prints nothing
```

The second for loop prints nothing because we have _consumed_ the iterator in the first loop itself. Our class `TodoList` doesn't create iterators in each `__iter__()` call, but simply returns the same iterator. Thus, if we exhaust the iterator once, we can't iterate again.

**Generators**, on the other hand are nothing but functions defined using `yield` keyword. They automatically _create an iterator_. It's memory efficient as items are generated one by one on demand instead of all at once.

```python
issubclass(types.GeneratorType, collections.abc.Iterator) # True
```

```python
def todo_generator(data):
    for d in data:
        yield d

class TodoList:
    def __init__(self, todos: list):
        self.todos = todos

    def __iter__(self):
        return todo_generator(self.todos)

todos = TodoList(["groceries", "office", "journal"])

for t in todos: print(t)
```

## Related
