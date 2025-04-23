---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-23T10:59:36.968+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]
> - [[optimization\|optimization]]

Goal of [[linear attention\|linear attention]] (algorithm optimization) is different from implementation optimizations like [[flash attention\|flash attention]].

**FlashAttention**

- Hardware-aware algorithm optimizes standard [[2 Zettels/attention mechanism\|attention mechanism]]
- Avoids explicit $N\times N$ attention matrix materialization in High Bandwidth Memory (HBM)
- Uses techniques like tiling, recomputation within faster on-chip Static Random-Access Memory (SRAM)
- Effectively reduces _memory footprint_ to $O(N)$ during execution
- Does _not_ change underlying computational complexity; still performs $O(N^2)$ computations

**Linear Attention**

- Aims to reduce _both_ computational complexity _and_ memory complexity to $O(N)$
- Achieved by reformulating attention calculation itself
- Relevant where even $O(N^2)$ compute becomes prohibitive
