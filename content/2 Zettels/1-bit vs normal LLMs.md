---
{"publish":true,"created":"2024-11-11T09:38:13.904+05:30","tags":["status/done","type/zettel"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/1-bit LLMs\|1-bit LLMs]]

In normal case, LLMs are represented in 16-bit or 32-bit precision. 1-bit LLMs use 1-bit to store weights. This results in a significant reduction in `total memory size = size of 1 weight * num weights` .

> [!Example]
> LLama 7B normally represented will take up `4bytes * 7B = 26.09GB` , whereas in 1-bit case, it will take up `0.125bytes * 7B = 0.815GB` (Note that `1byte = 8bits`)

## Related
- [[2 Zettels/1-bit LLM vs Quantization\|1-bit LLM vs Quantization]]
- [[2 Zettels/architectural changes in 1-bit LLMs\|architectural changes in 1-bit LLMs]]