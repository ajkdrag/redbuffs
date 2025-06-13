---
{"publish":true,"created":"2025-06-08T15:17:16.931+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

The `pickle` module in python allows for serialization and deserialization, but it's unsafe and comes with challenges. Deserializing previously pickled objects may break if the classes involved have changed over time (e.g., attributes have been added or removed). The `copyreg` module offers a way to define functions used while pickling specific objects.

If we have some class that connects to DB or opens file (like the following):

```python
class DatabaseConnection:
    def __init__(self, db_path):
        self.db_path = db_path
        # In a real scenario, establish connection here
        print(f"Connecting to {self.db_path}...")
        self.connection = open("main.py") # Placeholder

    def get_num_lines(self):
        lines = self.connection.readlines()
        return len(lines)

    def __del__(self):
        # In a real scenario, close connection here
        print(f"Closing connection to {self.db_path}")
        self.connection.close()
```

and try to vanilla pickle it:

```python
db = DatabaseConnection("dummy.db")
pickled_db = pickle.dumps(db) # raises Error
```

Above raises error: `TypeError: cannot pickle 'TextIOWrapper' instances` because the connection stream to file io can't be pickled. Here's where `copyreg` can fix things. It allows us to define a function which can return a tuple. The tuple's first value is a callable, and the second value is a tuple of arguments for the callable. There can be more values (refer the `__reduce__` [docs](https://docs.python.org/3/library/pickle.html#object.__reduce__)). Here's the impl:

```python
def reducer(conn: DatabaseConnection):
    print("reducing")
    return (expander, (conn.db_path, )) # this is saved

def expander(db_path):
    print("Reconstructing...")
    return DatabaseConnection(db_path)


copyreg.pickle(DatabaseConnection, reducer) # IMPORTANT

db = DatabaseConnection("dummy.db")
pickled_db = pickle.dumps(db)
```

This time, we don't get any exception, because the pickle module finds an entry for `DatabaseConnection` in the `dispatch_table` and sees that a `reducer` function is registered for it. Instead of trying to automatically pickle the `DatabaseConnection` instance's `__dict__` (which would include `self.connection`, the `TextIOWrapper`), the pickler calls `reducer`.

> [!Note]
>
> The bytes result after pickling is a **binary stream of opcodes and data**, essentially a mini-program for the unpickler. In this case, our mini-program looks at the return value of the `reducer` and knows that to unpickle, call the `expander` func with the args: `conn.db_path`.

## Related
