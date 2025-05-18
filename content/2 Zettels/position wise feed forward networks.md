---
{"publish":true,"created":"2025-04-17T01:50:54.164+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[neural network design pattern\|neural network design pattern]]


The **Position-wise Feed-Forward Network (FFN)** is a component within each [[2 Zettels/transformer encoder block\|transformer encoder block]] and [[2 Zettels/transformer decoder block\|transformer decoder block]]. It is applied to each position in the sequence independently after the attention sub-layer(s).

The FFN consists of two linear transformations with a [[2 Zettels/ReLU activation\|ReLU activation]] in between:
$$
FFN(x) = \max(0, xW_1 + b_1)W_2 + b_2
$$
where $x$ is the input vector at a specific position, $W_1$ and $b_1$ are the weights and bias of the first linear layer, and $W_2$ and $b_2$ are the weights and bias of the second linear layer.

The term "position-wise" means that while the input to the FFN is a sequence of vectors (shape `[batch_size, seq_len, d_model]`), the *same* set of learned weights is applied to each vector at each position in the sequence. Typically, the FFN expands the dimensionality of the input to an intermediate higher dimension, $d_{ff}$ (often $d_{ff} = 4 \times d_{model}$), applies the activation, and then projects it back down to $d_{model}$.

> [!Note]
> Think of it like sliding the same small neural network (with weights $W_1$ and $W_2$) over each token independently - whether it's the first token or the hundredth, they all go through the exact same transformation.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class PositionwiseFeedForward(nn.Module):
    def __init__(self, d_model: int, d_ff: int, dropout: float = 0.1, activation = F.relu):
        super(PositionwiseFeedForward, self).__init__()
        self.w_1 = nn.Linear(d_model, d_ff)
        self.w_2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)
        self.activation = activation

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.w_2(self.dropout(self.activation(self.w_1(x))))

# Example Usage
d_model = 512
d_ff = 2048
dropout = 0.1
batch_size = 4
seq_len = 10

ffn = PositionwiseFeedForward(d_model, d_ff, dropout, activation=F.relu)
input_tensor = torch.randn(batch_size, seq_len, d_model)
output_tensor = ffn(input_tensor)
print("FFN Input shape:", input_tensor.shape)
print("FFN Output shape:", output_tensor.shape)
# Expected output shape: torch.Size([4, 10, 512])
```

## Related