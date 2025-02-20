---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-18T13:28:27.745+05:30"}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[LLM fine-tuning\|LLM fine-tuning]]

Since MoEs comprise of many experts, total number of parameters is larger than the effective number of parameters. During training or fine-tuning, this causes challenges related to overfitting. Some ways to tackle this are via higher regularization:
- Higher dropout within the experts
- Token dropping

For small tasks, such as SuperGLUE CB, overfitting is high, while for larger tasks such as SuperGLUE ReCoRD, MoE performs well.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1731917075/moe%20fine-tuning%20is%20difficult-zry7qv.webp)


## Related
- [[2 Zettels/MoE training tips\|MoE training tips]]