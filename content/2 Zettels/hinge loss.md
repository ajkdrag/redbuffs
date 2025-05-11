---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-05-02T18:57:04.153+05:30"}
---


> [!Topics]
>
> - [[loss functions\|loss functions]]

Hinge loss measures a penalty based on a data point's position relative to the classification margin. It's centrally used in [[soft margin objective in SVM\|soft margin objective in SVM]]. The objective there is to minimize a combination of the weight vector norm (to maximize margin) and the total hinge loss (to penalize "margin violations").

**Formula:** For a true label $y\in\{-1, +1\}$ and model output score $f(x)=w^Tx+b$:

$$
L_{\text{hinge}}​(y,f(x))=\max(0,1−yf(x))
$$

- If $yf(x)\ge 1$: Point is correctly classified (for SVM, on or outside the correct margin boundary). Loss = 0. No penalty
- If $yf(x)<1$: Point violates the margin (for SVM, either inside margin but correct side, or misclassified). Loss = $1−yf(x)$. Penalty increases linearly

![](https://res.cloudinary.com/dcameztw9/image/upload/v1746195172/hinge%20loss-t6ujm7.webp)

> [!Note]
>
> **Connection to Slack Variables:** In [[soft margin SVM\|soft margin SVM]], slack variable $\xi_i$​ represents the hinge loss for point $i$: $\xi_i​\ge \max(0,1−y_i​(w^Tx_i​+b))$. Minimizing $C\sum \xi_i$​ in the [[soft margin objective in SVM\|soft margin objective in SVM]] is equivalent to minimizing total hinge loss (plus regularization term).

> Hinge loss is **convex** and hence suitable for optimization. However, hinge loss is not differentiable at $yf(x)=1$. Despite this, it has a subgradient, allowing algorithms like [[gradient descent\|gradient descent]] to be used. Smoothed versions of hinge loss can also be used for optimization.

```python
import numpy as np
def hinge_loss(y_true, score): # y_true is -1 or 1
  return np.maximum(0, 1 - y_true * score)
```

**Usefulness:**

- Hinge loss tends to lead to [[sparse models\|sparse models]], meaning many training samples do not influence the final model (e.g. only the support vectors do in case of [[2 Zettels/support vector machines\|SVM]])
- It's less sensitive to outliers than squared loss (penalty increases linearly, not quadratically)
- Compared to [[2 Zettels/logistic regression\|logistic regression]], which uses [[binary cross entropy loss\|binary cross entropy loss]] (Log loss), the Hinge Loss aims more directly at maximizing the margin rather than estimating probabilities

## Related
