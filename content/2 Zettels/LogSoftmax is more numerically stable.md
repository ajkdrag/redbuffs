---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/LogSoftmax is more numerically stable.md","permalink":"/2-zettels/log-softmax-is-more-numerically-stable/","PassFrontmatter":true}
---


Topics: [[pytorch-internals\|pytorch-internals]]
Links:

If we apply `log` and `softmax` separately, when the output of softmax becomes very close to zero, then log would yield negative infinity.

```python
x = torch.tensor([-500.0, 0])

torch.log(torch.softmax(x, dim=0)) # tensor([-inf, 0.])
torch.log_softmax(x, dim=0) # tensor([-500.0, 0.])
```

The numerical instability stems from the log and exp operations done separately:

```python
torch.log(torch.exp(x)) # tensor([-inf, 0.])
```

In above example, we expect log and exp to cancel each other out and get `x`, but we actually get `[-inf, 0.0]`.
