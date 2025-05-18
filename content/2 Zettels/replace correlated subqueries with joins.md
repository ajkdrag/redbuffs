---
{"publish":true,"created":"2025-05-18T14:34:43.954+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]
> - [[optimization\|optimization]]

It's a common practice and often a performance optimization to rewrite correlated subqueries using joins. Here are some common patterns for converting correlated subqueries to equivalent queries using joins:

**1. Correlated Subquery in the SELECT list (Calculating an aggregate for each row):**

```sql
SELECT SalesOrderID, OrderDate, TotalDue, (
    SELECT COUNT(SalesOrderDetailID)
    FROM Sales.SalesOrderDetail
    WHERE SalesOrderID = SO.SalesOrderID
) as LineCount
FROM Sales.SalesOrderHeader SO
```

Equivalent Query using INNER JOIN and GROUP BY:

```sql
SELECT SO.SalesOrderID, OrderDate, TotalDue,
    COUNT(SOD.SalesOrderDetailID) as LineCount
FROM Sales.SalesOrderHeader SO
    INNER JOIN Sales.SalesOrderDetail SOD
    ON SOD.SalesOrderID = SO.SalesOrderID
GROUP BY SO.SalesOrderID, OrderDate, TotalDue
```

**2. Correlated Subquery in the WHERE clause (Filtering based on a row-by-row comparison):**

```sql
SELECT lastname, firstname, salary
FROM employee e1
WHERE e1.salary > (
    SELECT avg(salary)
    FROM employee e2
    WHERE e2.dept_id = e1.dept_id
)
```

Equivalent query using JOIN:

```sql
SELECT e1.lastname, e1.firstname, e1.salary
FROM employee e1
JOIN (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employee
    GROUP BY dept_id
) AS dept_avg ON e1.dept_id = dept_avg.dept_id
WHERE e1.salary > dept_avg.avg_salary
```

**3. Correlated Subquery with NOT EXISTS (Finding rows without a match):**

```sql
SELECT lastname, firstname
FROM employees e1
WHERE NOT EXISTS (
    SELECT ph.lastname
    FROM payment_history ph
    WHERE ph.emp_id = e1.employee_id
        AND ph.payment_type = 'award'
)
```

Equivalent query using LEFT JOIN:

```sql
SELECT e1.lastname, e1.firstname
FROM employees e1
    LEFT JOIN payment_history ph ON e1.employee_id = ph.emp_id
    AND ph.payment_type = 'award'
WHERE ph.emp_id IS NULL
```

> [!Tip]
>
> Check the execution plan to determine whether rewriting actually makes the query faster for your specific database and data. Sometimes, the optimizer can optimize a correlated subquery very well!

## Related
