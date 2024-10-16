---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/GloVe model pytorch.md","permalink":"/2-zettels/glo-ve-model-pytorch/","PassFrontmatter":true}
---


Topics: [[GloVe\|GloVe]]
Links:

Very straightforward to implement, if one refers the [[2 Zettels/GloVe objective function\|GloVe objective function]]

```python
class GloVe(nn.Module):
    def __init__(self, vocab_size, embedding_size, x_max, alpha):
        super().__init__()
        self.weight = nn.Embedding(
            num_embeddings=vocab_size,
            embedding_dim=embedding_size,
            sparse=True
        )
        self.weight_tilde = nn.Embedding(
            num_embeddings=vocab_size,
            embedding_dim=embedding_size,
            sparse=True
        )
        self.bias = nn.Parameter(
            torch.randn(
                vocab_size,
                dtype=torch.float,
            )
        )
        self.bias_tilde = nn.Parameter(
            torch.randn(
                vocab_size,
                dtype=torch.float,
            )
        )
        self.weighting_func = lambda x: (x / x_max).float_power(alpha).clamp(0, 1)
    
    def forward(self, i, j, x):
        loss = torch.mul(self.weight(i), self.weight_tilde(j)).sum(dim=1)
        loss = (loss + self.bias[i] + self.bias_tilde[j] - x.log()).square()
        loss = torch.mul(self.weighting_func(x), loss).mean()
        return loss
```

Notice that we set `sparse=True` when creating the embeddings, as the gradient update is sparse by nature. In `forward(...)`, the average batch loss is returned.
The final word embeddings are obtained by summing `weight` and `weight_tilde`.