---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[loss functions\|loss functions]]

A vanilla approach to penalize imbalanced routing in MoEs.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1731926879/load%20balancing%20in%20MoE-6gkyhs.webp)

This loss ensures that all experts receive a roughly equal number of training examples. 

```python
def compute_load_balance_loss(router_probs, num_experts):
    # Calculate fraction of tokens going to each expert
    expert_usage = router_probs.mean(dim=0)  # [num_experts]
    
    # Compute variance from ideal uniform distribution
    uniform_prob = 1.0 / num_experts
    balance_loss = torch.sum((expert_usage - uniform_prob) ** 2)
    
    return balance_loss
```

In sample code above, `router_probs` are weights generated during [[2 Zettels/token routing\|token routing]]

## Related
