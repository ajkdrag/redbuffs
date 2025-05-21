---
{"publish":true,"created":"2025-05-18T20:48:13.779+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

The execution order affects alias usage and optimization, so it's essential to know it.
**Order:** FROM, JOIN, ON, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.

> Filters, groups, aggregates, sorts, and limits in that order.

```sql
SELECT department, AVG(salary)
FROM employees
WHERE salary > 30000
GROUP BY department
HAVING AVG(salary) > 40000
ORDER BY AVG(salary) DESC
LIMIT 5;
```

## Related
