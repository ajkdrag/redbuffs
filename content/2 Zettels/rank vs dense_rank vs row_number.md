---
{"publish":true,"created":"2025-05-18T20:36:02.374+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[window functions\|window functions]]

RANK() gives same rank to ties, skips next ranks; DENSE_RANK() doesn’t skip; ROW_NUMBER() assigns unique numbers:

```sql
SELECT empno, sal,
       RANK() OVER (ORDER BY sal DESC) AS rnk,
       DENSE_RANK() OVER (ORDER BY sal DESC) AS dense_rnk,
       ROW_NUMBER() OVER (ORDER BY sal DESC) AS row_num
FROM employees;
```

For salaries 5000, 5000, 3000: RANK() gives 1,1,3; DENSE_RANK() 1,1,2; ROW_NUMBER() 1,2,3.

> [!Question]
>
> When would you use ROW_NUMBER() over RANK()?
> **Answer**: When unique row identifiers are needed, e.g., pagination.

## Related

- [[6 Problems/find the second-highest salary in a table\|find the second-highest salary in a table]]
