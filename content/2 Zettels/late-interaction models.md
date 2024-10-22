---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/late-interaction models.md","permalink":"/2-zettels/late-interaction-models/","PassFrontmatter":true}
---



> [!Topics]
> - [[neural information retrieval\|neural information retrieval]]
> - [[ColBERT\|ColBERT]]

> Finds a sweet spot between [[2 Zettels/representation-based similarity\|no-interaction]] and [[2 Zettels/all-to-all interaction\|all-to-all interaction]] modelling. 

In no-interaction or [[bi-encoders\|bi-encoders]], model takes either query or document and gives a  single embedding. We do cosine similary and get score. In all-to-all interaction or [[cross-encoders\|cross-encoders]], we train a model to score on query-doc pairs. Model internally interacts with all query and document tokens.

In late interaction, model generates context-aware embeddings (note the plural) from query and document separately. These generated embeddings from query and document, are cross-encoded or interacted to obtain similarity score. 

Since the query-document interaction happens late after embeddings have been obtained **separately** for query and document terms, we call this late-interaction. 
- **Example**: [[ColBERT\|ColBERT]]
- **Advantages**:
	- Expressiveness via query-document interaction
	- Computational benefits of offline document representation
	- Avoids information bottleneck of single embeddings

## Related
