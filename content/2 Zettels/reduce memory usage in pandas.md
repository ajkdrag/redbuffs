---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-05-04T20:51:34.966+05:30"}
---


> [!Topics]
>
> - [[pandas\|pandas]]
> - [[memory management\|memory management]]

Loading large files into pandas `DataFrame` objects may consume more memory than expected. Here are a few methods to reduce memory usage:

### Type conversion

`int64` takes more memory than `int8`. When loading data, pandas uses larger data types (`int64`, `float64`, `object`) by default if `dtype` is unspecified.

> [!Tip]
> Use smaller types like `int8` (if the column stores numbers from 0 to 20) or `float32` instead of `float64`

Example of type conversion:

```python
import numpy as np
import pandas as pd

d = np.random.randint(-10, 10, size=(20000, 10))
df = pd.DataFrame(d)

print("The total information about original object")
print(df.info())
print("The memory usage of each column")
print(df.memory_usage())

print("---------------------------------------------------")
intCols = df.select_dtypes(include=['int64']).columns.tolist()
df[intCols] = df[intCols].apply(pd.to_numeric, downcast='integer')
print("The total information about modified object")
print(df.info())
print("The memory usage of each column")
print(df.memory_usage())
```

The total memory usage has dropped from 1.5MB to 195KB, which's very impressive. Memory usage was reduced by nearly 90 percent. The only thing we did was change the data type from `int64` to `int8` (by using `pd.to_numeric` with `downcast`.

### Use category type instead of object

For object type columns with limited unique values (e.g. a "Country" column with a few hundred unique countries in a dataset with millions of rows), use the `category` type instead of `object`.

```python
import pandas as pd
import string
import random

l = [''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(2))
for i in range(2000000)]
s = pd.Series(l)
print("The original series memory usage")
print(s.memory_usage())
s = s.astype("category")
print("The modified series memory usage")
print(s.memory_usage())
```

This code creates a pandas Series with 2 million random strings, then converts its type to `category`. This reduces memory usage from approximately 16MB to 4MB.

> [!Tip]
>
> Use `df.memory_usage(deep=True)` to see memory usage by column (including object data). This can guide which columns to downcast or convert to categorical.

## Related
