---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/representation-based similarity.md","permalink":"/2-zettels/representation-based-similarity/","PassFrontmatter":true}
---


Topics: [[neural information retrieval\|neural information retrieval]] [[bi-encoders\|bi-encoders]] 
Links:

Goal is to score how similar a query and a document is. A less expensive approach is to use [[bi-encoders\|bi-encoders]] which simply encode the query and document into **single vector embeddings**. Similarity is computed between these embeddings. Such modelling for semantic similarity is also called as **no-interaction modelling** since query and document terms do not interact with each other (apart from the final cosine similarity calculation) as seen in vanilla [[RAG\|RAG]]. 

- **Advantages**:
	- Fast and easy to implement
	- Efficient extraction of query embeddings at inference time
	- Document embeddings can be pre-computed
- **Disadvantages**:
	- Less effective than [[cross-encoders\|cross-encoders]]