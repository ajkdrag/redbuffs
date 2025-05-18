---
{"publish":true,"created":"2025-05-18T11:15:17.464+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

A correlated subquery is a type of subquery (a SELECT statement nested inside another SQL statement) that depends on the outer query for its input values.

A key difference between a correlated subquery and a simple (non-correlated) subquery is how often it executes. Unlike a simple subquery that typically executes once for the entire outer query, a correlated subquery is executed repeatedly – typically once for each row processed by the outer query. There are several [[2 Zettels/ways to apply correlated subqueries\|ways to apply correlated subqueries]] such as inside SELECT, WHERE, HAVING etc.

Correlated subqueries are useful and sometimes necessary for expressing complex logic, particularly "negative" conditions (e.g: return employees who never received an award):

```sql
SELECT lastname, firstname
FROM employees e1
WHERE NOT EXISTS (
    SELECT ph.lastname
    FROM payment_history ph
    WHERE ph.emp_id = e1.employee_id AND ph.payment_type ='award'
)
```

> [!Warning]
>
> With correlated subqueries, performance can be a concern with large datasets compared to alternatives like joins, although db optimizers can often optimizing them.

## Related

- [[2 Zettels/when not to use correlated subqueries\|when not to use correlated subqueries]]
