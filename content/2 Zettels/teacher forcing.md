---
{"publish":true,"tags":["type/zettel","status/done"],"path":"2 Zettels/teacher forcing.md","permalink":"/2-zettels/teacher-forcing/","PassFrontmatter":true}
---


> [!Topics]
> - [[seq2seq modelling\|seq2seq modelling]]

Teacher forcing is a training technique specifically designed for auto-regressive models, particularly in sequence-to-sequence tasks. 

During inference (normal use), models having [[2 Zettels/auto-regressive property\|auto-regressive property]] use their own previous predictions. With teacher forcing during **training**, we use the actual (ground truth) previous tokens instead. This prevents error accumulation, resulting in more stable training and faster convergence.

**During training (teacher forcing)**

```
Input: I love cats
Target: J'aime les chats

Step 1: I love cats → J' 
Step 2: I love cats + J' → aime             (use gt "J'")
Step 3: I love cats + J'aime → les          (use gt "J'aime")
Step 4: I love cats + J'aime les → chats    (use gt "J'aime les")
```

**During inference (no teacher forcing)**

```
Input: I love cats

Step 1: I love cats → J' 
Step 2: I love cats + J' → aime           (use pred "J'")
Step 3: I love cats + J'aime → le         (use pred "J'aime")
Step 4: I love cats + J'aime le → chat    (use pred "J'aime le")
```


## Related
- [[problems with teacher forcing\|problems with teacher forcing]]
- [[2 Zettels/why the name teacher forcing\|why the name teacher forcing]]