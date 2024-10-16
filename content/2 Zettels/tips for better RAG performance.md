---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/tips for better RAG performance.md","permalink":"/2-zettels/tips-for-better-rag-performance/","PassFrontmatter":true}
---


Topics: [[RAG\|RAG]]
Links:

In Anthropic's article on Contextual RAG, they ran experiments and give these tips:
- Generate [[2 Zettels/contextual retrieval\|chunks with context]]
- For embeddings, use Gemini or Voyage
- Combine embeddings with BM25 for keyword matching which is one of the common [[2 Zettels/vanilla RAG problems\|vanilla RAG problems]]
- Add [[2 Zettels/reranking concept in RAG\|reranking stage]] after retrieval to reduce the failure rate by 67% (5.7% to 1.9%)
	- Use top-K with K=20 and top-N with N=150