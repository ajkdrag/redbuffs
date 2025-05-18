---
{"publish":true,"created":"2025-05-11T22:31:43.061+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[basic arithmetic\|basic arithmetic]]
> - [[data wrangling\|data wrangling]]

Apart from [[2 Zettels/data standardization\|data standardization]], we can also scale data by compressing it into a fixed range. One of the biggest use cases for this is compressing data into the range `[0, 1]`. This allows us to view the data in terms of proportions, or percentages, based on the minimum and maximum values in the data.

The formula for scaling based on a range is a two-step process. For a given data value, `x`, we first compute the proportion of the value with respect to the min and max of the data: $d_\min$ and $d_\max$, respectively.

$$
x_\text{prop} = \frac{x-d_\min}{d_\max - d_\min}
$$

The formula above computes the proportion of the data value, $x_\text{prop}$.

> [!Warning]
>
> Note that this only works if not all the data values are the same (i.e. $d_\max \ne d_\min$).

We then use the proportion of the value to scale to the specified range, $[r_\min, r_\max]$:

$$
x_\text{scale} = x_\text{prop}\cdot (r_\max - r_\min) + r_\min
$$

```python
from sklearn.preprocessing import MinMaxScaler

# the default range is [0,1]
default_scaler = MinMaxScaler(feature_range=(-2, 3))
default_scaler.fit(data)

transformed = default_scaler.transform(new_data)
```

## Related

- [[2 Zettels/robust scaling\|robust scaling]]
