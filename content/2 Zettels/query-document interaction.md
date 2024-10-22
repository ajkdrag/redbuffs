---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/query-document interaction.md","permalink":"/2-zettels/query-document-interaction/","PassFrontmatter":true}
---



> [!Topics]
> - [[neural information retrieval\|neural information retrieval]]

This is another approach in Neural IR, where there is direct interaction with query terms and document terms. When we say *terms*, we mean their tokenized representations which can be word or subword level.
> [!example]
> Each query term interacts with every document term, producing a matrix which can be fed to some MLP to get a score.
- **Example**: `monoBERT`
- **Advantages**:
    - Can selectively focus on relevant information
    - More effective than [[2 Zettels/representation-based similarity\|representation-based similarity]] 
- **Disadvantages**:
    - Computationally expensive during inference
    - Hard to use in production



## Related
