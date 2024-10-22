---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/standard skip-gram as a multi-class classification task.md","permalink":"/2-zettels/standard-skip-gram-as-a-multi-class-classification-task/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/skip-gram\|skip-gram]]

In the [[2 Zettels/vanilla skip-gram spelled out\|standard skip-gram]] model, for each center word $w_c$, the model needs to **classify** which word from the entire vocabulary is the correct context word $w_o$. This is analogous to typical classification tasks where the model has multiple classes (the words in the vocabulary), and it needs to pick one correct class (the context word). The model uses a softmax function to assign probabilities to all the words in the vocabulary. The word with the highest probability is considered the model’s prediction. This is similar to how a classifier assigns probabilities to classes and picks the class with the highest score.

> In this sense, standard skip-gram is a [[multi-class classification\|multi-class classification]] task, where the goal is to classify one context word from many possible candidates.

## Related
- [[2 Zettels/skip-gram with negative sampling as a binary classification task\|skip-gram with negative sampling as a binary classification task]]
