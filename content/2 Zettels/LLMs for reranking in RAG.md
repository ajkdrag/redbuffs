---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:28.924+05:30"}
---



> [!Topics]
> - [[reranking techniques\|reranking techniques]]

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727334028/yfxwnfjmy51jicopwnmd.png)

Basically, do Zero-shot prompting by feeding pairs of query and document and ask for relevancy score, followed by sorting.

One can also perform [[LLM fine-tuning\|LLM fine-tuning]] for such task. E.g. RankT5 (Encode-Decoder) model is fine-tuned to **generate classification tokens** for relevant or irrelevant query-document pairs. Similarly, RankZephyr and RankGPT which are [[decoder-only models\|decoder-only models]], propose various methods for relevance calculation.

## Related
- [[2 Zettels/reranking concept in RAG\|reranking concept in RAG]]
- [[cross-encoders\|cross-encoders]]
