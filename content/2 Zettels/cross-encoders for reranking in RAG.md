---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/cross-encoders for reranking in RAG.md","permalink":"/2-zettels/cross-encoders-for-reranking-in-rag/","PassFrontmatter":true}
---



> [!Topics]
> - [[reranking techniques\|reranking techniques]]
> - [[cross-encoders\|cross-encoders]]

In typical [[RAG\|RAG]], the retriever has to be efficient for large document collections with millions of entries. However, it might return irrelevant candidates. A [[2 Zettels/reranking concept in RAG\|re-ranker]] based on a Cross-Encoder can substantially improve the final results for the user. 
> The query and a possible document is passed simultaneously to transformer network, which then outputs a single score between 0 and 1 indicating how relevant the document is for the given query.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727359294/xpemudhxbxt9dldhwskj.png)

We can also [[2 Zettels/LLMs for reranking in RAG\|use an LLM as a cross-encoder]]. Closed source models like [OpenAI models can also be used](https://cookbook.openai.com/examples/search_reranking_with_cross-encoders), by passing the query and doc in the prompt and asking it to classify the pair as `yes` or `no` and then use [[token logprobs\|token logprobs]] to get a probablity which becomes our relevancy score.

## Related
