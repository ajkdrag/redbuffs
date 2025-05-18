---
{"publish":true,"created":"2024-11-18T13:21:31.528+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]

**Pros**
- Allows for pretraining with less compute
- Faster inference
- Useful in high throughput scenarios with many machines/cores

**Cons**
- Even though the *effective* number of params is lower, all experts have to be loaded in memory, since we do not know which expert the token will be routed to. This results in high VRAM usage
- [[2 Zettels/MoE fine-tuning is difficult\|MoE fine-tuning is difficult]]
- Knowing [[2 Zettels/what each expert in MoE learns\|what each expert in MoE learns]]  isn't very helpful in practice


## Related
- [[2 Zettels/powerful ideas for MoEs\|powerful ideas for MoEs]]