---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/ColBERT does not use bag of embeddings.md","permalink":"/2-zettels/col-bert-does-not-use-bag-of-embeddings/","PassFrontmatter":true}
---


Topics: [[ColBERT\|ColBERT]] | [[word embeddings\|word embeddings]]
Links:

Describing ColBERT as a bag of embeddings needs to be corrected since each token vector is contextualized by the other tokens in the context window. It's not a representation per *unique* token, but one vector representation per token, hence can't use the term *bag*.

> In the context of [[ColBERT\|ColBERT]] (Contextualized Late Interaction over [[BERT\|BERT]]), both queries and documents are encoded into sequences of token-level aka [[2 Zettels/fine-grained embeddings\|fine-grained embeddings]] using BERT's [[wordpiece tokenizer\|wordpiece tokenizer]].
