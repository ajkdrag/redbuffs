---
{"publish":true,"created":"2025-05-18T20:40:13.888+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

DELETE (DML) removes rows conditionally, rollback possible; whereas TRUNCATE (DDL) removes all rows, often non-reversible.

```sql
DELETE FROM employees WHERE department = 'HR';
TRUNCATE TABLE employees;
```

> DELETE targets specific rows; TRUNCATE clears entire table.

For large tables, TRUNCATE is faster than DELETE as it doesn't log individual row deletions.

## Related
