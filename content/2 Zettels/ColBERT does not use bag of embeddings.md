---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:28.866+05:30"}
---


> [!Topics]
>
> - [[ColBERT\|ColBERT]]
> - [[word embeddings\|word embeddings]]

Describing ColBERT as a bag of embeddings needs to be corrected since each token vector is contextualized by the other tokens in the context window. It's not a representation per _unique_ token, but one vector representation per token, hence can't use the term _bag_.

> In the context of [[ColBERT\|ColBERT]] (Contextualized Late Interaction over [[BERT\|BERT]]), both queries and documents are first tokenized using BERT's [[2 Zettels/wordpiece\|wordpiece]] tokenizer and then converted to sequence of [[2 Zettels/fine-grained embeddings\|fine-grained embeddings]] (token-level).

## Related
