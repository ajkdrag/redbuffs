---
{"publish":true,"created":"2025-05-18T20:53:39.056+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[window functions\|window functions]]

Sum salaries up to current row, ordered by `employee_id`:

```sql
SELECT name, salary,
       SUM(salary) OVER (
           ORDER BY employee_id
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS running_total
FROM employees;
```

If we need to reset running total per group, add `PARTITION BY` clause as well. For example, to compute running totals per department:

```sql
SELECT
    department,
    name,
    salary,
    SUM(salary) OVER (
        PARTITION BY department
        ORDER BY employee_id
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM
    employees;
```

## Related
