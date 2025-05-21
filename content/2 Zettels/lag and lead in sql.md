---
{"publish":true,"created":"2025-05-18T20:59:27.244+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[window functions\|window functions]]

`LAG` and `LEAD` are SQL window functions that allow you to access data from previous or subsequent rows in a table, relative to the current row. Useful for calculating differences, running totals, and other time-series analyses.

**Syntax:**

```sql
LAG(column_name, offset, default_value) OVER (
    [PARTITION BY column_name, ...]
    ORDER BY column_name, ...
)

LEAD(column_name, offset, default_value) OVER (
    [PARTITION BY column_name, ...]
    ORDER BY column_name, ...
)
```

- `column_name`: The column from which to retrieve the value
- `offset`: The number of rows to go back (`LAG`) or forward (`LEAD`). Defaults to 1
- `default_value`: The value to return if the offset goes beyond the table boundaries. If not specified, it returns `NULL`
- `PARTITION BY`: Divides the rows into partitions, and the function is applied to each partition independently
- `ORDER BY`: Defines the order of rows within each partition

### Examples

**Calculating Differences:** Daily stock prices and calculate the daily price change.

```sql
SELECT
    date,
    price,
    price - LAG(price, 1, price) OVER (ORDER BY date) AS price_change
FROM
    stock_prices
ORDER BY
    date;

```

**Calculating Moving Averages:**  Calculate a 3-day moving average of website traffic.

```sql
SELECT
    date,
    traffic,
    (traffic + LAG(traffic, 1, traffic) OVER (ORDER BY date)
    + LEAD(traffic, 1, traffic) OVER (ORDER BY date)) / 3 AS moving_average
FROM
    website_traffic
ORDER BY
    date;
```

## Related
