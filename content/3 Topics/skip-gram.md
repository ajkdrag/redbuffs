---
{"publish":true,"tags":["status/done","type/topic"],"path":"3 Topics/skip-gram.md","permalink":"/3-topics/skip-gram/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/word2vec\|word2vec]]

Skip-gram is an algorithm belonging to the word2vec family, for learning fixed-size [[word embeddings\|word embeddings]] of words in a vocabulary. The prior for skip-gram comes from the [[2 Zettels/distributional hypothesis\|distributional hypothesis]] concept from 1950s. Simply put, it is the following:

> If we take a random (center) word from a sentence and its $m$ surrounding (context) words on either side, their embeddings should lie close in the vector space.

We know that dot product is a nice way to measure proximity of 2 vectors. Say we got a "black-box" that gives us word embeddings. In the vanilla case, we use it to compute dot products between center word and *all words* in our vocab V, giving us a vector of size V.  
$$
\text{dot-products}=\{0.5, 33, 12.0, -220.5, -1.5, \ldots\}
$$
Dot product values have no fixed range, so let's apply softmax to turn this V-sized vector into a probability distribution with values between 0 and 1. 
$$
\text{softmax-ed-values}=\{0.3, 0.7, 0.5, 0.001, 0.01, \ldots\}
$$

> **Goal**: Value corresponding to the context words be higher than others. 

If we use a neural network for modelling our "black-box":
- Our model can use [[2 Zettels/similarity of nn.Embedding and nn.Linear in Pytorch\|embedding or linear]] layers to give us word vectors
- We can do a sliding window over our sentences and give `(center, context)` word pairs as input to model. So if we choose to pick $m$ words on either side of a center word as our context, then we will have $2m$ such pairs 
- For each input `(center, context)`, e.g. `(0, 4)` indicating 1st and 5th word in our vocab, we get our $\text{softmax-ed-values}$ vector and pick out the 5th value, i.e. `0.01`. We want to *maximize* this, i.e. minimize `-0.01`. During implementation, we use [[2 Zettels/cross-entropy loss formula\|cross-entropy loss]] with `4` as target class index
- Use [[gradient descent\|gradient descent]] and backprop for training over this loss and update embeddings

There are variations of [[2 Zettels/vanilla skip-gram spelled out\|standard skip-gram]]:
- [[skip-gram neural net variations\|skip-gram neural net variations]]
- [[skip-gram with negative sampling\|skip-gram with negative sampling]]
- [[skip-gram with heirarchical softmax\|skip-gram with heirarchical softmax]]

## Related
- [[3 Topics/CBOW\|CBOW]]
