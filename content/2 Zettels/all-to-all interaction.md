---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/all-to-all interaction.md","permalink":"/2-zettels/all-to-all-interaction/","PassFrontmatter":true}
---


> [!Topics]
> - [[neural information retrieval\|neural information retrieval]] 
> - [[cross-encoders\|cross-encoders]] 

Comprehensive interaction between all elements of query and document

In this kind of Neural IR, the model takes all query and document terms, and gives a score. This is more accurate than [[bi-encoders\|bi-encoders]]. The [[BERT\|BERT]] model can be trained for such modelling, by feeding in query-document pairs. Such models are also called as [[cross-encoders\|cross-encoders]].

- **Advantages**:
    - Captures complex relationships between query and document
- **Disadvantages**:
    - High computational cost
    - Difficult to use in production



```handdrawn-ink
{
	"versionAtEmbed": "0.2.6",
	"filepath": "0 Admin/02 Attachments/Ink/Drawing/2024.10.23 - 21.03pm.drawing"
}
```


## Related
- [[2 Zettels/cross-encoders for reranking in RAG\|cross-encoders for reranking in RAG]]
