---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/drawbacks of cross-encoders.md","permalink":"/2-zettels/drawbacks-of-cross-encoders/","PassFrontmatter":true}
---


Topic: [[reranking techniques\|reranking techniques]] | [[cross-encoders\|cross-encoders]]
Links:

A cross-encoder takes sentence pairs and performs [[binary classification\|binary classification]]. It **does not produce a sentence embedding**, so we can't preprocess docs and create an index or efficiently compare using [[cosine similarity\|cosine similarity]]. 

They can be used whenever we have a pre-defined set of sentence pairs to score. For example, we need to get similary scores for 100 sentence pairs. Usually used for [[2 Zettels/cross-encoders for reranking in RAG\|reranking in RAG applications]]. 

> [!warning] A bad use-case for cross-encoders
> Clustering 10,000 sentence with CrossEncoders would require computing similarity scores for about 50 Million sentence combinations, which takes about 65 hours. Simply computing the embeddings for each sentence, will take only 5 seconds. You can then perform the clustering in the embedding space.