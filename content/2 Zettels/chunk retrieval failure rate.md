---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/chunk retrieval failure rate.md","permalink":"/2-zettels/chunk-retrieval-failure-rate/","PassFrontmatter":true}
---



> [!Topics]
> - [[RAG evaluation\|RAG evaluation]]

Recall that in vanilla [[RAG\|RAG]], we chunk docs and a subset of the chunks (top K ranked by relevance to the input question) is passed to the LLM as context. One of the metrics for evaluating this **retrieval component** is `1-recall@K` aka chunk retrieval failure rate. 
> Measures the percentage of relevant documents that fail to be retrieved within the top K chunks


## Related
