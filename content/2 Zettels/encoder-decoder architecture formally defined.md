---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/encoder-decoder architecture formally defined.md","permalink":"/2-zettels/encoder-decoder-architecture-formally-defined/","PassFrontmatter":true}
---


Topics: [[3 Topics/encoder-decoder architecture\|encoder-decoder architecture]]
Links:

The encoder takes variable length inputs and creates encoded representations aka *hidden states* for them. Mathematically, we can write a recurrence as:
$$
h_n = f(x_n, h_{n-1})
$$
which says that encoded representation at step $n$ is a function of the representation at $n-1$ and current input $x_n$. In the general case, the encoder creates a single fixed-dimensional representation:
$$
c = q(h_{1:N})
$$
In many architectures, the encoded representation at last time-step is used as the *final fixed-dimensional representation*:
$$
c = h_N
$$
The decoder hidden state $s_t$ depends on the previous model output, the previous decoder hidden state, and the encoder output:
$$
s_t = g(y_{t-1}, s_{t-1}, c)
$$
Normally, the decoder hidden state $s_t$ is passed on to some output operation such as linear layer + softmax, in order to get a probability distribution (e.g. for machine translation, we want probabilities over the vocab $V$ of target language):
$$
\hat{y}_t = \text{softmax}(s_t W + b) \in [0, 1]^{|V|}
$$