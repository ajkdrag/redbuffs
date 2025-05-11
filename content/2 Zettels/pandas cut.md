---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-05-10T11:50:49.777+05:30"}
---


> [!Topics]
>
> - [[pandas\|pandas]]

> `pd.cut` allows us to bin values into discrete intervals.

Use `cut` when you need to segment and sort data values into bins. This function is also useful for going from a continuous variable to a categorical variable. For example, `cut` could convert ages to groups of age ranges. Supports binning into an equal number of bins, or a pre-specified array of bins.

**Example:**

The `grocery` contains the prices of groceries. Based on the prices, we need to divide the groceries into three categories and label them as cheap, mid-priced, or expensive. Then calculate the average price for each category using the `groupby` function.

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")


def find_avg_price():
    try:
        grocery["price_category"] = pd.cut(
            grocery["price"], bins=3, labels=["cheap", "mid-priced", "expensive"]
        )
        avg_prices = grocery.groupby("price_category").agg(
            avg_price=("price", "mean"))

        return list(avg_prices.index), list(avg_prices["avg_price"].round(2))
    except:
        pass
```

```
                avg_price
price_category
cheap            3.362060
mid-priced       6.391228
expensive       11.400000
```

## Related
