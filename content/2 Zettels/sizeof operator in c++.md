---
{"publish":true,"created":"2025-01-10T00:53:47.237+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[c++ internals\|c++ internals]]

The `sizeof` operator is primarily used to get the size of the variable. The **operand is evaluated at compile time**. `sizeof(a++)` is interesting because: the increment operation `a++` is not actually performed and `sizeof(int)` returns 4 on most systems.

## Related
