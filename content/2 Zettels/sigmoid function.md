---
{"publish":true,"created":"2025-04-30T18:01:15.112+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[activation function\|activation function]]

Sigmoid function, also known as logistic function, maps any real-valued number to a value between 0 and 1.

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

Input $z \in (-\infty, +\infty)$. Output $\sigma(z) \in (0, 1)$.

Properties:

- Function has an S-shaped curve
- Maps inputs to a probability-like range
- $\sigma(0) = 0.5$
- As $z \to +\infty$, $\sigma(z) \to 1$
- As $z \to -\infty$, $\sigma(z) \to 0$

```python
import numpy as np

def sigmoid(z):
  # Prevent overflow/underflow for large inputs
  z = np.clip(z, -500, 500)
  return 1 / (1 + np.exp(-z))
```

**Role:** Often used in [[neural networks\|neural networks]] or for estimating probabilities in [[classical machine learning\|classical machine learning]] algorithms such as [[2 Zettels/logistic regression\|logistic regression]].

Derivative:

$$
\frac{d\sigma}{dz} = \sigma(z)(1 - \sigma(z))
$$

**Numerical Stability:** Computing $e^{-z}$ can cause numerical issues (overflow or underflow) for very large or small $z$. The [[exp-normalize trick\|exp-normalize trick]] or a stable sigmoid implementation helps. For example, compute $\frac{1}{1 + e^{-z}}$ for $z \ge 0$ and $\frac{e^z}{1 + e^z}$ for $z < 0$.

```python
def sigmoid(z):
    "Numerically stable sigmoid function."
    if z >= 0:
        return 1 / (1 + exp(-z))
    else:
        s = exp(z)
        return s / (1 + s)
```

## Related
