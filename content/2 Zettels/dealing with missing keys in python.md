---
{"publish":true,"created":"2025-05-21T11:20:36.211+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

Say that I'm writing a program to manage social network profile pictures on the filesystem. I need a dictionary to map profile picture pathnames to open file handles so I can read and write those images as needed. We can't use `setdefault` or `defaultdict` easily to solve this problem as they have their own pitfalls:

```python
pictures = {}
path = "profile_1234.png"

handle = pictures.setdefault(path, open(path, "a+b"))
```

In above, the `open` built-in function to create the file handle is always called, even when the path is already present in the dictionary, which is problematic.

Additionally, we can't do the following:

```python
def open_picture(profile_path):
    try:
        return open(profile_path, "a+b")
    except OSError:
        print(f"Failed to open path {profile_path
        raise

pictures = defaultdict(open_picture)
handle = pictures[path]
```

because `defaultdict` expects that the function passed to its constructor doesn't require any arguments. This is where we can subclass the `dict` type and implement the `__missing__` special method to add custom logic for handling missing keys, as follows:

```python
class Pictures(dict):
    def __missing__(self, key):
        value = open_picture(key)
        self[key] = value
        return value

pictures = Pictures()
handle = pictures[path]
handle.seek(0)
image_data = handle.read()
```

When the `pictures[path]` dictionary access finds that the path key isn't present in the dictionary, the `__missing__` method is called. This method must create the new default value for the key, insert it into the dictionary, and return it to the caller. Subsequent accesses of the same path will not call `__missing__` since the corresponding item is already present (similar to the behavior of `__getattr__`).

## Related
