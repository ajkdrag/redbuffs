---
{"publish":true,"created":"2025-05-18T10:55:16.670+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

The [[correlated subqueries\|correlated subqueries]] can be applied in several ways within SQL queries, enabling the inner query to reference and depend on values from the outer query. This dependency means the inner query is typically executed once for each row processed by the outer query.

### 1. Inside `select`

Used in the SELECT list to calculate or retrieve a value for each row returned by the outer query, often summarizing related data:

**Example: Finding Average Departmental Salary for Each Employee**

```sql
SELECT lastname, firstname, salary, (
    SELECT avg(salary) FROM employee e2
    WHERE e2.dep_id = e1.dep_id
) AS avg_dept_salary
FROM employee e1
```

### 2. Inside `where`

Used in the WHERE clause to filter rows from the outer query based on a condition that involves the results of the subquery, where the subquery's filtering depends on outer query:

**Example: Employees Earning More Than Their Department's Average Salary**

```sql
SELECT lastname, firstname, salary
FROM employee e1
WHERE e1.salary > (
    SELECT avg(salary)
    FROM employee e2
    WHERE e2.dept_id = e1.dept_id
)
```

**Example: Employees Who Never Received An Award**

```sql
SELECT lastname, firstname
FROM employees e1
WHERE NOT EXISTS (
    SELECT ph.lastname FROM payment_history ph
    WHERE ph.emp_id = e1.employee_id
    AND ph.payment_type =’award’
)
```

### 3. Inside `having`

When used with GROUP BY, only fields present in the GROUP BY clause or aggregate functions can be used in the inner query's comparison within the HAVING clause:

**Example: Filtering Groups by Average Vacation Hours Relative to Marital Status Average** In other words, we want to answer a question similar to "do married accountants have, on average, more remaining vacation, than married employees in general?"

```sql
SELECT JobTitle, MaritalStatus, AVG(VacationHours)
FROM HumanResources.Employee AS E
GROUP BY JobTitle, MaritalStatus
HAVING AVG(VacationHours) > (
    SELECT AVG(VacationHours)
    FROM HumanResources.Employee AS Emp
    WHERE Emp.MaritalStatus = E.MaritalStatus
)
```

### 4. Inside `update` or `delete`

**Example: Updating Employee's Total Money Earned** Use a correlated subquery to calculate the sum of payments for each employee from the `payment_history` table and update the `all_money_made` column in the employee table.

```sql
UPDATE employee emp
SET all_money_made = (
    SELECT SUM(payment)
    FROM payment_history
    WHERE employee_id = emp.emp_id
)
```

## Related
