---
{"publish":true,"created":"2024-11-19T15:37:27.461+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[loss functions\|loss functions]]

Router z-loss, introduced in [[2 Zettels/switch-transformer MoE\|switch-transformer MoE]], significantly improves training stability without quality degradation by **penalizing large router logits** i.e., the raw output scores of the gated network aka router (before any `softmax` etc)

Since this loss encourages absolute magnitude of values to be smaller, roundoff errors are reduced, which can be quite impactful for exponential functions such as the `softmax`, used in routing.

```python
router_z_loss = torch.logsumexp(gate_logits, dim = -1)
router_z_loss = torch.square(router_z_loss)            
router_z_loss = router_z_loss.mean()
```

Here `gate_logits` refer to logits that will be *entering* the gates.

> In the implementation, we can see the use of [[log-sum-exp trick\|log-sum-exp trick]]. 
## Related