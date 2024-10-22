---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/reranking concept in RAG.md","permalink":"/2-zettels/reranking-concept-in-rag/","PassFrontmatter":true}
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
