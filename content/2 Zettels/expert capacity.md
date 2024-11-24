---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]


> The expert capacity determines how many tokens each expert is responsible for during the training or inference process. It sets a limit on the number of tokens processed per expert.

There are a couple of motivations for expert capacity:
- **Prevent bias**: If certain experts or a set of experts become overly favored — reflecting a bias towards exploitation over exploration — it can lead to potential performance issues and load imbalance
- **Fixing tensor shapes**: We cannot know how many tokens will go to each expert ahead of time, so we need to fix the capacity factor to ensure tensor shapes are known during compilation

```python
expert_capacity = int((tokens_per_batch / self.num_experts) * self.capacity_factor)
```

A **capacity factor** greater than 1 allows each expert to handle a buffer above the evenly distributed share, accommodating imbalances in token assignment. It's value commonly ranges in `[1, 1.25]`. 

If the total tokens allocated to an expert surpass its capacity, the tensor is truncated to match the expert capacity. 


## Related
- [[2 Zettels/load balancing in MoE\|load balancing in MoE]]
- [[bias and variance\|bias and variance]]