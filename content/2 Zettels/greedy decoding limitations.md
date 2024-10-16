---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/greedy decoding limitations.md","permalink":"/2-zettels/greedy-decoding-limitations/","PassFrontmatter":true}
---


Topics: [[3 Topics/greedy decoding\|greedy decoding]]
Links:

> Locally optimal choices may lead to suboptimal overall sequences. Greedy decoding is *fast*, but if we put aside efficiency for a minute, it might seem more reasonable to search for the _most likely sequence_, i.e. maximize:
> $$
> \underbrace{\prod_{t=1}^{T}}_{\substack{\text{Product over} \\ \text{all timesteps}}}
> P(\underbrace{\hat{y}_{t}}_{\substack{\text{Predicted} \\ \text{output at} \\ \text{time t}}} \mid
> \underbrace{\hat{y}_1, \ldots, \hat{y}_{t-1}}_{\substack{\text{Previously predicted} \\ \text{outputs up to t-1}}},
> \underbrace{\mathbf{c}}_{\substack{\text{Context} \\ \text{vector} \\ \text{from encoder}}})
> $$
> and not the sequence of (greedily selected) _most likely tokens_.

> [!Example]
> - Input: `hy het my met 'n tert geslaan`
> - Target: `he hit me with a pie`
> - Decoding steps: `he` -> `he hit` -> `he hit a` (locally optimal, but potentially suboptimal)
> 
> Thus, greedy approach can lead to irreversible suboptimal choices, as it doesn't consider future implications of current decisions.

![|480](https://res.cloudinary.com/dcameztw9/image/upload/v1728132902/tl7frqqf4m5seffj7fu2.png)

In above case, greedy will pick `The nice woman` since the probs are `0.5 x 0.4 = 0.2`, instead of picking `The dog has` whose probs will be `0.4 x 0.9 = 0.36` (globally better).