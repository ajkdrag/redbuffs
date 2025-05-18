---
{"publish":true,"created":"2024-12-02T22:20:22.200+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[vlm\|vlm]]

> The idea to use MoE tuning with LLaVA architecture

The architecture is straightforward: Feed vision modality using CLIP as vision encoder + MLP. Feed text modality using word embeddings. Pass this through a standard [[2 Zettels/transformer encoder block\|transformer encoder block]]. The interesting part comes during the training/tuning of this architecture where we replicate the FFN layer inside the block and put a router in front of them (typical [[2 Zettels/MoE layer intuition\|MoE layer intuition]]). 

Diving deeper, the training/tuning is 3-staged:
- **Stage 1:** Only train the MLP; rest is frozen
- **Stage 2:** Train embeddings, MLP and the encoder block; vision encoder is frozen
- **Stage 3:** Replace standard encoder with MoE encoder and train, keeping everything frozen except the router and the FFN layers

![](https://res.cloudinary.com/dcameztw9/image/upload/v1733159236/MoE%20LLaVA-sazp7z.webp)

Few [[2 Zettels/optimizations common across vision MoEs\|optimizations common across vision MoEs]] are also used here along with [[2 Zettels/load balancing in MoE\|load balancing in MoE]]. Important thing to note is the use of [[soft-MoE\|soft-MoE]] instead of sparse MoE.

## Related
