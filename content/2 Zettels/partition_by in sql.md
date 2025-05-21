---
{"publish":true,"created":"2025-05-18T20:38:16.657+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

The `partition_by` clause divides result set into partitions for [[window functions\|window functions]] calculations.

```sql
SELECT department, name, salary,
       AVG(salary) OVER (PARTITION BY department) AS avg_salary
FROM employees;
```

Above sql calculates average salary per department without collapsing rows.

Note that PARTITION BY retains all rows; GROUP BY aggregates.

## Related
