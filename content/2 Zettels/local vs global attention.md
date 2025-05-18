---
{"publish":true,"created":"2025-04-19T15:24:27.639+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]
> - [[transformer architecture\|transformer architecture]]

Choice between [[2 Zettels/local attention\|local attention]] and [[2 Zettels/global attention\|global attention]] fundamental trade-off driven by sequence length and task.

Global attention provides richest contextual info, but computationally prohibitive for long sequences. Local attention offers linear scalability, feasible for long inputs, but fixed window limits capturing long-range dependencies directly.

This trade-off motivates research into [[2 Zettels/sparse attention\|sparse attention]] mechanisms: attempt to balance capturing relevant long-range dependencies while maintaining sub-quadratic complexity.

| Feature                       | Local Attention (Fixed Window)                                | Global Attention                                       |
| ----------------------------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| Scope                         | Considers small, fixed-size window (w) of input sequence      | Considers entire input sequence (n) for every position |
| Computational Complexity      | $O(n\times w)$ (Linear in sequence length n)                  | $O(n^2)$ (Quadratic in sequence length n)              |
| Memory Complexity             | $O(n\times w)$ (Reduced memory footprint)                     | $O(n^2)$ (Requires storing large attention matrix)     |
| Long-Range Dependency Capture | Limited; may miss dependencies outside window                 | Effective; can capture dependencies across sequence    |
| Contextual Understanding      | Localized; focuses on immediate surroundings                  | Global; broader understanding of overall context       |
| Typical Use Cases/Motivation  | Long sequences, efficiency-critical tasks, data with locality | Holistic understanding tasks, shorter sequences        |

## Related
