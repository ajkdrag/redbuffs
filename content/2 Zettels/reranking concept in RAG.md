---
{"publish":true,"created":"2024-10-22T15:38:29.186+05:30","tags":["status/done","type/zettel"],"cssclasses":""}
---



> [!Topics]
> - [[RAG\|RAG]]
> - [[reranking techniques\|reranking techniques]]

**Without Reranking**:
- Initial retrieval → Select top-K chunks for final context
- The selected chunks could be irrelevant

**With Reranking**:
- Initial retrieval → Rerank top-N chunks → Select top-K chunks for final context
- Here N > K, so more likely to get relevant chunks in that group
- Reranking helps to get relevant chunks in the top-K selection process

## Related
