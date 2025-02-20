---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-18T16:10:39.248+05:30"}
---


> [!Topics]
> - [[mixture of experts\|mixture of experts]]
> - [[load balancing\|load balancing]]

If all our tokens are sent to just a few popular experts, that will make training inefficient. Without load balancing, some experts become overused while others are underutilized, which can lead to:
- Poor specialization (as same "popular" experts are used for everything)
- Inefficient resource usage
- Expert collapse (some experts never trained)

To mitigate this, an [[2 Zettels/auxiliary loss for load balancing in MoEs\|auxiliary loss for load balancing in MoEs]] is added to encourage giving all experts equal importance. Other techniques include:
- **Noisy Top-K gating**: Add some noise to the router logits
- [[2 Zettels/router z-loss\|router z-loss]]
- Drop tokens exceeding [[2 Zettels/expert capacity\|expert capacity]]
- **Expert Choice Routing**:  instead of tokens choosing experts, experts choose their most relevant tokens

## Related
