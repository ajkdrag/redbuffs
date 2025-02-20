---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2024-11-12T15:36:48.619+05:30"}
---


> [!Topics]
> - [[quantization\|quantization]]
> - [[activation functions\|activation functions]]

In [[3 Topics/BitNet b1.58\|BitNet b1.58]], we [[2 Zettels/quantize activation functions\|quantize activation functions]] to reduce memory comsumption and improve speed. A concise implementation in PyTorch will look something like:

```python
def activation_quant(x):
    scale = 127.0 / x.abs().max(dim=-1,
            keepdim=True).values.clamp_(min=1e-5)
    y = (x * scale).round().clamp_(-128, 127) / scale
    return y
```

Not that due to the precense of the `round()`, this becomes non-differentiable, so we use the [[2 Zettels/detach trick for straight through estimators\|detach trick for straight through estimators]] (STE)

> STE: In the backward pass, basically pass the gradient as is through this layer without any calculation, pretending this function/layer to be identity

```python
class BitLinear(nn.Linear):
    """
    Only for training
    """
    def forward(self, x):
        w = self.weight
        x_quant = x + (activation_quant(x) - x).detach()
        
        ...
```
## Related
