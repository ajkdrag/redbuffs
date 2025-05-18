---
{"publish":true,"created":"2025-05-04T13:32:53.730+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[pandas\|pandas]]

We can create a `DataFrame` object from a dictionary of `lists`. The `key` is the column name.

> When you are trying to specify an index for each column value, only the rows with the same index value will be joined. Otherwise, a new row is created, and its columns are filled by `NaN` if the type is `int` or `float`.

The example code below shows both single and multi-level indexing in the DataFrame.

```python
import pandas as pd

# example 1: init a dataframe by dict without index
d = {"a": [1, 2, 3, 4], "b": [2, 4, 6, 8]}
df = pd.DataFrame(d)
print(df)
print("---------------------")

# example 2: init a dataframe by dict with different index
d = {"a": {"a1":1, "a2":2, "c":3}, "b":{"b1":2, "b2":4, "c":9}}
df = pd.DataFrame(d)
print(df)
```

```
   a  b
0  1  2
1  2  4
2  3  6
3  4  8
---------------------
      a    b
a1  1.0  NaN
a2  2.0  NaN
b1  NaN  2.0
b2  NaN  4.0
c   3.0  9.0
```

Actually, DataFrame also has a `from_dict` function, which takes a `dict` of dicts or a dict of array-like sequences and returns a `DataFrame`.

This function provides a parameter `orient` with the default value `columns`. You can assign it with the value `index` to make the dict keys row labels.

```python
import pandas as pd

d = {"a": [1, 2, 3, 4], "b": [2, 4, 6, 8]}
df = pd.DataFrame.from_dict(d)
print("dataframe created from from_dict")
print(df)
print("--------------------")

df = pd.DataFrame.from_dict(d, orient="index")
print("dataframe created from from_dict and set the orient")
print(df)
```

```
dataframe created from from_dict
   a  b
0  1  2
1  2  4
2  3  6
3  4  8
--------------------
dataframe created from from_dict and set the orient
   0  1  2  3
a  1  2  3  4
b  2  4  6  8
```

## Related
