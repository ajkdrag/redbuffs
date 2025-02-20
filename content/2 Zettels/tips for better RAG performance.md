---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:29.045+05:30"}
---



> [!Topics]
> - [[RAG\|RAG]]

In Anthropic's article on Contextual RAG, they ran experiments and give these tips:
- Generate [[2 Zettels/contextual retrieval\|chunks with context]]
- For embeddings, use Gemini or Voyage
- Combine embeddings with BM25 for keyword matching which is one of the common [[2 Zettels/vanilla RAG problems\|vanilla RAG problems]]
- Add [[2 Zettels/reranking concept in RAG\|reranking stage]] after retrieval to reduce the failure rate by 67% (5.7% to 1.9%)
	- Use top-K with K=20 and top-N with N=150

## Related
