---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - pytorch-internals 
> - optimization
> - quantization

The `detach()` trick follows the pattern:

```python
y = f(x)
y = f(x).detach() + x - x.detach()

# simplifying further we get
y = x + (f(x).detach() - x.detach())
y = x + (f(x) - x).detach()
```

where $f(x)$ is a **discrete function**. Something like this is commonly seen during quantization and more recently in [[3 Topics/1-bit LLMs\|1-bit LLMs]] such as [[3 Topics/BitNet b1.58\|BitNet b1.58]] which discretizes weights to `[-1, 0, 1]`.

In the forward pass, `y` value comes out to be `f(x)` as we want. The beauty of this comes during the backward pass, where we have 

$$
\frac{dy}{dx} = 1 + 0 = 1
$$
because `something.detach()` has gradient 0 (detached from computation graph). A practical example to prove this:

```python
def binary_with_ste(x):
    # Forward: binary step function
    # Backward: identity gradient
    return (x > 0).float().detach() + x - x.detach()

x = torch.tensor([0.6, -0.2, 1.5, -1.0], requires_grad=True)
y = binary_with_ste(x)

print("Forward values:", y)  # Will be [1, 0, 1, 0]
y.sum().backward()
print("Gradients:", x.grad)  # Will be [1, 1, 1, 1]
```

> [!tip]
> Use scaling for better stability:
> ```python
> y = f(x).detach() + 0.1 * (x - x.detach())
> ```



## Related
