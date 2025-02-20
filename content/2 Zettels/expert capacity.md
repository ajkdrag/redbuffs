---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-19T15:17:22.045+05:30"}
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

If there are 6 tokens in a batch and we have 3 experts, above implies a capacity of 2 tokens per expert. We also use a [[2 Zettels/capacity factor for load balancing in MoEs\|capacity factor for load balancing in MoEs]]. This is a hyper-param that gives some additional buffer to each expert.

## Related
- [[2 Zettels/load balancing in MoE\|load balancing in MoE]]
- [[bias and variance\|bias and variance]]