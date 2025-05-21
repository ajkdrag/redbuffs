---
{"publish":true,"created":"2025-05-18T19:07:50.515+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

Print names of districts whose _total capacity_ is greater than or equal to the average capacity of all districts. Given table `water_schemes`:

| scheme_no | district_name | capacity |
| --------- | ------------- | -------- |
| 1         | Ajmer         | 20       |
| 1         | Bikaner       | 10       |
| 2         | Bikaner       | 10       |
| 3         | Bikaner       | 20       |
| 1         | Churu         | 10       |
| 2         | Churu         | 20       |
| 1         | Dungargarh    | 10       |

## Idea

Use an inner subquery to calculate the total capacity for each district and then another subquery to find `AVG(total_capacity)` across all districts. The outer query uses GROUP_BY with HAVING clause to filter districts where the sum of their capacities is >= the average capacity calculated in the subquery.

## Code

```sql
SELECT district_name
FROM water_schemes
GROUP BY district_name
HAVING SUM(capacity) >= (
    SELECT AVG(total_capacity)
    FROM (
        SELECT district_name, SUM(capacity) AS total_capacity
        FROM water_schemes
        GROUP BY district_name
    ) AS DistrictTotals
)
```

Alternatively, we can simplify code using CTEs:

```sql
WITH
  DistrictTotals AS (
    SELECT
      district_name,
      SUM(capacity) AS total_capacity
    FROM
      water_schemes
    GROUP BY
      district_name
  ),
  AvgCapacity AS (
    SELECT
      AVG(total_capacity) AS avg_capacity
    FROM
      DistrictTotals
  )
SELECT
  dt.district_name
FROM
  DistrictTotals dt
  JOIN AvgCapacity ac ON dt.total_capacity >= ac.avg_capacity;
```

## Related
