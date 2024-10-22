---
{"publish":true,"tags":["status/done","type/topic"],"path":"3 Topics/CBOW.md","permalink":"/3-topics/cbow/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/word2vec\|word2vec]]

Continuous Bag of Words (CBOW) is an algorithm belonging to the word2vec family, for learning fixed-size [[word embeddings\|word embeddings]] of words in a vocabulary. The modelling is very similar to [[2 Zettels/vanilla skip-gram spelled out\|standard skip-gram]], only difference being in *how we feed the data*.

> The design choice is to average out the embeddings for the context words and compute dot products between this `avg_context` and *all words* in our vocab V, giving us a vector of size V.

$$
\text{dot-products}=\{0.5, 33, 12.0, -220.5, -1.5, \ldots\}
$$
Dot product values have no fixed range, so let's apply softmax to turn this V-sized vector into a probability distribution with values between 0 and 1. 
$$
\text{softmax-ed-values}=\{0.3, 0.7, 0.5, 0.001, 0.01, \ldots\}
$$

> **Goal**: Value corresponding to the center word be higher than others. 

If we use a neural network for modelling our "black-box":
- Our model can use [[2 Zettels/similarity of nn.Embedding and nn.Linear in Pytorch\|embedding or linear]] layers to give us word vectors
- For window size $m$, we can do a sliding window over our sentences and give `(context_1, context_2, ..., context_2m, center)` word tuples as input to model. Input `(2, 4, 0)` indicates 3rd, 5th being context words and 1st being center word
- We get average embeddings of context words, calculate our $\text{softmax-ed-values}$ vector and pick out the 1st value, i.e. `0.3`. We want to *maximize* this, i.e. minimize `-0.3`. During implementation, we use [[2 Zettels/cross-entropy loss formula\|cross-entropy loss]] with `0` as target class index
- Use [[gradient descent\|gradient descent]] and backprop to train over this loss and refine our embeddings

## Related
- [[3 Topics/skip-gram\|skip-gram]]
