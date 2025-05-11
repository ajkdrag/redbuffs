---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-05-05T09:52:03.706+05:30"}
---


> [!Topics]
>
> - [[pandas\|pandas]]
> - [[data wrangling\|data wrangling]]

### Basic Filtering

**Label vs position selection**: Use `.loc` for label-based indexing, `.iloc` for positional indexing.

- `.loc`: Index labels or boolean masks
- `.iloc`: Integer positions

```python
df.loc['2025-01-01']           # select rows with index label "2025-01-01"
df.loc[df['value'] > 0, 'id']  # filter rows by condition, get 'id'
df.iloc[0:5, [1, 3]]           # first 5 rows, columns at 1 and 3
```

`.at` (label-based) or `.iat` (position-based) are faster for single value access

**Boolean filtering**: Boolean masks filter DataFrames. Combine conditions with `&` (AND), `|` (OR), and use parentheses.

```python
mask = (df['age'] > 30) & (df['income'] < 50_000)
subset = df[mask]
subset = df[df['category'] != 'X']
```

`.isin` performs membership checks:

```python
df[df['country'].isin(['USA', 'Canada'])]
df[df['score'].between(0, 100)]    # numeric range filter (inclusive)
```

**Query strings**: Filter using `DataFrame.query(expr)` with _pandas-safe_ expression strings. Concise, leverages numexpr engine for speed.

```python
df.query('age > 30 and income < 50000')
min_val = 5
df.query('value >= @min_val or category == "A"')  # use @ for external vars
```

> [!Tip]
>
> `query`/`eval` may be faster than complex boolean indexing, avoids intermediate arrays.

**Filtering with eval**: Use `df.eval("df.col > 2")` using expression strings (can also include boolean masks). Vectorized evaluation improves performance for complex expressions.

```python
import math
df[df.eval('math.sin(df.a)>0')] # fast filtering
```

**Multi-index slicing**: Use `.loc` with tuples/`pd.IndexSlice` for DataFrames with MultiIndex to slice by partial levels.

- Example: `df.loc[('StoreA', slice('2025-01','2025-02')), :]` selects data for StoreA in Jan-Feb 2025
- Use `df.xs()` (cross-section) to select along a level by label: `df.xs('StoreA', level='store')`

### Select and Assign

**Conditional assignment**: Use `np.where` for vectorized if-else logic. It chooses elements from two options based on a boolean condition array:

```python
df['sign'] = np.where(df['balance'] >= 0, 'Positive', 'Negative')
```

For multiple conditions, use `np.select`:

```python
conditions = [df['score'] >= 90, df['score'] >= 60]
choices = ['A', 'B']
df['grade'] = np.select(conditions, choices, default='C')
```

These are much faster than iterating or using `apply` row by row.

**DataFrame.where and mask**: `df.where(cond, other)` keeps original values where `cond` is True and uses `other` where False. `df.mask(cond, other)` does the inverse (replaces where condition is True). This is useful for bulk value setting:

```python
df['adjusted'] = df['value'].where(df['value'] >= 0, 0)  # set negatives to 0
# equivalent using mask:
df['adjusted'] = df['value'].mask(df['value'] < 0, 0)
```

> [!Tip]
>
> You can also fill entire DataFrame cells conditionally (e.g., replace all negative entries with NaN: `df.mask(df < 0, np.nan)`).

## Related

- [[2 Zettels/pandas groupby and agg basics\|pandas groupby and agg basics]]
