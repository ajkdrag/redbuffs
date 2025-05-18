---
{"publish":true,"created":"2025-05-15T10:21:03.837+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[concurrency\|concurrency]]
> - [[optimization\|optimization]]
> - [[parallel computing\|parallel computing]]

Concurrency is about managing multiple tasks that may or may not run simultaneously. It involves designing systems that can deal with multiple ongoing tasks _at the same time_, often by _interleaving_ their execution on a single processor core.

> [!Example]
>
> Think of a single chef juggling multiple orders – starting one, switching to another, then back, to keep everything progressing without necessarily cooking two things at the exact same moment.

- Concurrency aims to make progress on multiple tasks
- Often achieved through techniques like time-sharing or task switching on a single CPU core
- Tasks take turns using the resource
- Execution order is non-deterministic

Parallelism is about performing multiple tasks _at the exact same time_. It requires hardware with multiple processing units (like multi-core processors, GPUs, or distributed systems) where different parts of a program or different programs can execute _simultaneously_.

> [!Example]
>
> Think of multiple chefs working on different orders in a kitchen at the same time.

- Parallelism aims to execute multiple tasks simultaneously
- Requires multiple processing resources
- Can lead to significant speedup for tasks that can be divided

> Parallelism implies concurrency (if you're doing multiple things at once, you're definitely dealing with multiple things at once). Concurrency does not imply parallelism (you can manage multiple tasks without doing them all at the same instant).

## Related
