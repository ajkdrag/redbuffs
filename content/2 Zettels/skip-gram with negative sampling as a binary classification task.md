---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/skip-gram with negative sampling as a binary classification task.md","permalink":"/2-zettels/skip-gram-with-negative-sampling-as-a-binary-classification-task/","PassFrontmatter":true}
---



In [[skip-gram with negative sampling\|skip-gram with negative sampling]], the problem shifts to a **binary classification** task. Instead of considering all words in the vocabulary, the model only considers a small number of "negative samples" (random words) along with the true context word. For each word-context pair, the model classifies whether it is a **real pair** (true context word) or a **fake pair** (negative sample).

- For the true word-context pairs, the model wants to output a probability close to 1 (indicating the pair is correct).
- For the negative samples, the model aims to output a probability close to 0 (indicating the pair is incorrect).

This binary classification process is simpler and more computationally efficient than classifying over the entire vocabulary, which makes it practical.

## Related
- [[2 Zettels/standard skip-gram as a multi-class classification task\|standard skip-gram as a multi-class classification task]]
