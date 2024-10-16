---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/vanilla skip-gram spelled out.md","permalink":"/2-zettels/vanilla-skip-gram-spelled-out/","PassFrontmatter":true}
---



Topics: [[3 Topics/skip-gram\|skip-gram]]
Links:

In [[3 Topics/word2vec\|word2vec]], we aim to get good [[word embeddings\|word embeddings]] by using local contextual information in sentences. The prior here is: words close to each other in sentences have similar meanings, and are also close in the vector space compared to other words. Let's take a sentence:
$$
\text{The \textcolor{yellow}{cat} \textcolor{cyan}{sat} \textcolor{yellow}{on} the mat}
$$
Here, for $m=1$, let's choose our center word to be `sat`, so contexts are `{cat, on}`. Let's look at the design choices and training process in the skip-gram algorithm:

1. **Context Window**: For window size $m$, consider $2m$ context words ($m$ on each side of center word). In practice we use [[2 Zettels/dynamic window size in word2vec\|dynamic window size in word2vec]]
2. **Input Pairs**: Process pairs like `(center, context)`. E.g., `(sat, cat)`, `(sat, on)`
3. **Negative Sampling**: 
   - Treat non-context words as negative samples
   - Simplification: Other context words (e.g., `on` when processing `cat`) work as negatives, since we will see `(sat, on)` later again during training and update weights during optimization for that step
4. **Distance Metric**: Use dot product for vector similarity
5. **Dual Embedding Layers**: 
   - Input matrix $W$ (center words) and output matrix $W'$ (context/negative words), both $V \times D$
   - Post-training: Often use $W$ or average of $W$ and $W'$ as final embeddings

> [!Note]
> See discussions on [[2 Zettels/no non-linearity is used in word2vec\|no non-linearity is used in word2vec]] and [[2 Zettels/why we need two weight matrices in word2vec\|why we need two weight matrices in word2vec]]

6. **Training Process**:
   - **Inputs**: $(x, y)$ pairs as one-hot vectors $(1 \times V)$
   - **Center word embedding**: $h = xW$ $(1 \times D)$
   - **All vocab embeddings**: Use $W'$
   - **Embedding dot products**: $z = hW'^T$ $(1 \times V)$
   - **Softmax**: $\hat{y} = \text{softmax}(z)$
   - **Loss**: [[2 Zettels/cross-entropy loss formula\|Cross-entropy loss]] $L = -\sum_{i=1}^V y_i \log(\hat{y}_i)$
7. **Goal**: Maximize probability of true context words, effectively learning to assign higher probabilities to likely context words
8. [[skip-gram with negative sampling\|skip-gram with negative sampling]] (SGNS):
   - Choose $k$ negative samples instead of all $V-1$ words
   - Involves additional modifications to basic skip-gram model

The model is simple, composed of two [[2 Zettels/similarity of nn.Embedding and nn.Linear in Pytorch\|embedding or linear]] matrices. Data points are shuffled, batched, and fed to the model for training, with each word getting a chance to be both center and context (except at text boundaries).