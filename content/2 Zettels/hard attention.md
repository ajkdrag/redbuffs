---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-19T02:05:02.300+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Hard attention differs fundamentally from [[2 Zettels/global attention\|soft attention]] by making a **discrete** choice rather than computing a weighted average. Instead of soft weights, attention scores define a probability distribution over input elements, from which one or a small subset is sampled. The output relies solely on the selected element(s), making the selection process stochastic and discrete.
This discrete nature offers advantages:

- improved interpretability by revealing the specific element(s) attended to
- potential computational efficiency during inference as only selected elements are processed, unlike soft attention which processes all inputs

Major challenge is **non-differentiability**. The discrete sampling step blocks standard gradient flow for [[backpropagation\|backpropagation]]. Training requires specialized methods:

- Reinforcement learning views attention as an agent's action, using [[policy gradient methods\|policy gradient methods]] like [[REINFORCE algorithm\|REINFORCE algorithm]], though these suffer high gradient variance
- [[variational inference\|variational inference]] trains an auxiliary model to predict attention locations by maximizing an ELBO, often yielding more stable training
- Other approaches include differentiable approximations like the [[gumbel-softmax trick\|gumbel-softmax trick]]

**Applications**: image captioning and VQA, where selecting specific image regions (glimpses) is intuitive. Despite conceptual benefits like interpretability and efficiency, training complexity due to non-differentiability limits hard attention's widespread adoption.
