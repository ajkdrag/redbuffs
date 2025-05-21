---
{"publish":true,"created":"2025-05-18T20:42:43.137+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

WHERE filters individual rows _before_ grouping; HAVING filters groups _after_ aggregation.

```sql
SELECT department, COUNT(*)
FROM employees
WHERE salary > 40000
GROUP BY department
HAVING COUNT(*) > 5;
```

Here, WHERE filters high earners; HAVING ensures groups have more than 5 employees.

## Related
