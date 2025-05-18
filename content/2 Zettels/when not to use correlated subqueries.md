---
{"publish":true,"created":"2025-05-18T11:52:13.716+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sql\|sql]]

While [[2 Zettels/correlated subqueries\|correlated subqueries]] are useful, they have a significant drawback: **performance**. Avoid them whenever possible, especially in performance-sensitive contexts or when the same result can be achieved using joins or non-correlated subqueries, and always verify performance by examining the execution plan. So, basically:

- Don't use when performance is critical, especially with large datasets due to possibly $O(n^2)$ time complexity
- Try to [[2 Zettels/replace correlated subqueries with joins\|replace correlated subqueries with joins]], which tend to execute faster because they can process data in a more set-based manner rather than row-by-row
- Check the execution plan to see how the database intends to run the query. Sometimes, correlated subquery may not be problematic since db optimizes the query

## Related
