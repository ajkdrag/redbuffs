---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/types of rerankers.md","permalink":"/2-zettels/types-of-rerankers/","PassFrontmatter":true}
---


Topics: [[reranking techniques\|reranking techniques]]
Links: [[cross-encoders\|cross-encoders]] | [[ColBERT\|ColBERT]] | [[3 Topics/GPT\|GPT]] | [[2 Zettels/reranking concept in RAG\|reranking concept in RAG]]

|Model|Type|Performance|Cost|Example|
|---|---|---|---|---|
|Cross encoder|Open source|Great|Medium|BGE, sentence-transformers, Mixedbread|
|Multi-vector|Open source|Good|Low|ColBERT|
|LLM|Open source|Great|High|RankZephyr, RankT5|
|LLM API|Private|Best|Very High|GPT, Claude|
|Rerank API|Private|Great|Medium|Cohere, Mixedbread, Jina|