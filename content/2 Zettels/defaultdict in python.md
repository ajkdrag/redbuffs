---
{"publish":true,"created":"2025-05-20T01:33:52.597+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[idiomatic python\|idiomatic python]]

The `defaultdict` class from the collections built-in module automatically stores a default value when a key doesn't exist. All you have to do is provide a function that will return the default value to use each time a key is missing:

```python
from collections import defaultdict

class Visits:
    def __init__(self):
        self.data = defaultdict(set)

    def add(self, country, city):
        self.data[country].add(city)

visits = Visits()
visits.add("England", "Bath")
visits.add("England", "London")
```

Using `defaultdict` is much better than using `setdefault` for this type of situation

## Related
