---
{"publish":true,"tags":["question","type/zettel","status/done"],"path":"2 Zettels/why we need two weight matrices in word2vec.md","permalink":"/2-zettels/why-we-need-two-weight-matrices-in-word2vec/","PassFrontmatter":true}
---


> [!Topics]
> - [[3 Topics/word2vec\|word2vec]]

The original paper on word2vec uses two matrices W and W'. W is used to get embedding for center word and W' is used to get embeddings for all other words (in skip-gram). This raises a question as to why we can't use the same weight matrix W for both.

There's no clear explanation on this, but one theory is this: consider the case where both the word `dog` and the context `dog` share the same vector $v$. Words hardly appear in the contexts of themselves, and so the model should assign a super low probability to $p(\text{dog}\mid\text{dog})$, which entails having $v \cdot{v}=|v|^2 \approx 0$ which is impossible for non-zero vectors. But this explanation is still not satisfactory since our goal is to have high dot products with context words *relative* to everything else (including itself). This is indeed possible with one matrix W as well.

Also, having 2 weight matrics gives better representation power to the model compared to a single W.

## Related
