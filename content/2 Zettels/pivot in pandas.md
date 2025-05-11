---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-05-10T10:21:31.141+05:30"}
---


> [!Topics]
>
> - [[pandas\|pandas]]

Reshaping data is common task in data analysis. Pandas offers `pivot` and `pivot_table` for this. Both rearrange data based on unique values in specified columns, creating new index, columns, and values.

### `df.pivot`

Reshapes DataFrame based on column values. Requires three columns: one for index, one for columns, one for values.

- `index`: Column to use to make new frame index
- `columns`: Column to use to make new frame columns
- `values`: Column to use for filling new frame values

> [!Warning]
>
> Cannot handle duplicate entries for same index/column combination. If duplicates exist, `pivot` will raise an error.

```python
import pandas as pd
df = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02'],
    'city': ['New York', 'Los Angeles', 'New York', 'Los Angeles'],
    'temperature': [32, 65, 30, 68]
})
pivot_df = df.pivot(index='date', columns='city', values='temperature')
print(pivot_df)

```

```
city       Los Angeles  New York
date
2023-01-01           65        32
2023-01-02           68        30
```

### `df.pivot_table`

> Useful when combinations of `index` and `columns` values are not unique in original data. `pivot_table` will group rows with same index/column combination and apply `aggfunc`.

More general function than `pivot`. Also reshapes data but can handle _duplicate_ entries by _aggregating_ them. Essentially a generalization of pivot that can perform aggregation.

- `values`: Column to aggregate
- `index`: Column or list of columns for index
- `columns`: Column or list of columns for columns
- `aggfunc`: Function or list of functions to aggregate values (default 'mean'). Can be string name ('sum', 'mean', 'count') or function (`np.sum`)

> `pivot_table` is essentially a fancier `groupby().agg()` followed by reshaping.

```python
import pandas as pd
import numpy as np
df = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-01', '2023-01-01', '2023-01-02'],
    'city': ['New York', 'New York', 'Los Angeles', 'New York'],
    'temperature': [32, 35, 65, 30],
    'humidity': [80, 75, 20, 85]
})
# Using pivot_table with duplicate date/city ('2023-01-01', 'New York')
# Default aggfunc='mean'
pivot_table_df = df.pivot_table(index='date', columns='city', values='temperature')
print(pivot_table_df)

# Using multiple values and different aggfunc
pivot_table_multi = df.pivot_table(index='date', columns='city', values=['temperature', 'humidity'], aggfunc={'temperature': np.mean, 'humidity': np.max})
print(pivot_table_multi)
```

```
city       Los Angeles  New York
date
2023-01-01         65.0      33.5
2023-01-02          NaN      30.0


                   humidity               temperature
city            Los Angeles New York    Los Angeles New York
date
2023-01-01           20.0     80.0         65.0     33.5
2023-01-02            NaN     85.0          NaN     30.0
```
