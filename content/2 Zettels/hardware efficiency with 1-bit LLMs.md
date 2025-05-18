---
{"publish":true,"created":"2024-11-14T16:43:20.021+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/1-bit LLMs\|1-bit LLMs]]

For LLMs, in addition to computation, the process of transferring model parameters from DRAM to the memory of an on-chip accelerator (e.g., SRAM) can be expensive during inference. There have been attempts to *enlarge* SRAM to improve throughput, but this introduces significantly higher costs than DRAM.

Compared to full-precision models, [[2 Zettels/1-bit LLMs\|1-bit LLMs]] have a much lower memory footprint from both a capacity and bandwidth standpoint. This can significantly reduce the cost and time of loading weights from DRAM, leading to faster and more efficient inference.
## Related
