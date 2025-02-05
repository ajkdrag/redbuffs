---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[optimization\|optimization]]

Since [[2 Zettels/MoE fine-tuning is difficult\|MoE fine-tuning is difficult]] (same for training), as they overfit easily, heavy regularization is used. 

For by **only freezing the MoE layers**, we can speed up the training while preserving the quality

![](https://res.cloudinary.com/dcameztw9/image/upload/v1732009130/MoE%20training%20tips-136f8n.png)

Also, few tips:
- Lower batch size
- Increase learning rate
- [[instruction tuning\|instruction tuning]] works well for MoEs
- Tune for larger (or more number of) tasks
- Scaling experts yield better [[2 Zettels/sample efficiency\|sample efficiency]], but diminishing gains beyond 256
- Stability via [[2 Zettels/expert capacity\|expert capacity]] and [[2 Zettels/load balancing in MoE\|load balancing in MoE]]

> [!Tip] Expert Parallelism
> MoEs are tricky to parallelize, so distribute the experts across workers.

## Related
