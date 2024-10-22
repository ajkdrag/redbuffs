---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/vanilla RAG problems.md","permalink":"/2-zettels/vanilla-rag-problems/","PassFrontmatter":true}
---



> [!Topics]
> - [[RAG\|RAG]]

- During chunking stage, context is destroyed
- While embedding models excel at capturing semantic relationships, they can miss crucial exact matches
	- E.g. "Error code TS-999" in a technical support database
	- Use BM-25 to tackle this
- Plain [[word embeddings\|word embeddings]] often lack **contrastive information**
	- Failing to distinguish between "I love apples" and "I used to love apples" since both convey a similar semantic meaning.
- Embeddings represent sentences in a relatively low-dimensional space which makes it challenging to encode all relevant information accurately, especially for longer documents or queries. This is one of the main [[2 Zettels/issues with embedding based search\|issues with embedding based search]]

## Related
