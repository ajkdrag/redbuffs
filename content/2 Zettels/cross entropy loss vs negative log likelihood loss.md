---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/cross entropy loss vs negative log likelihood loss.md","permalink":"/2-zettels/cross-entropy-loss-vs-negative-log-likelihood-loss/","PassFrontmatter":true}
---



> [!Topics]
> - [[loss functions\|loss functions]]
> - [[cross-entropy\|cross-entropy]]

In the case of **classification**, [[2 Zettels/cross-entropy loss formula\|cross-entropy loss]] (CE) function in Pytorch is equivalent to a combination of Log+Softmax and [[2 Zettels/negative log likelihood loss in pytorch\|negative log likelihood loss in pytorch]] (NLL).

```python
logits = torch.tensor([0.2, 2.0, 1.4])
target_class_id = torch.tensor(1)
```

Logits are shaped as `[C]` where `C` is the number of classes.
Target is an index among `C` 

```
logits.shape: torch.Size([3])
target_class_id.shape: torch.Size([])
```

Our goal with these loss functions is to find how bad the prediction probability is for the target class given by `target_class_id`
- Convert logits to probabilities with `F.softmax(...)`
- Convert probabilities to log likelihoods with `torch.log(...)`
- Apply `F.nll_loss(...)` against the `target_class_id`
- This is equal to Cross entropy loss

```python
ce_loss = F.cross_entropy(logits, target_class_id)
nll_loss = F.nll_loss(F.log_softmax(logits, dim=0), target_class_id)

print(ce_loss, nll_loss) # tensor(0.5389) tensor(0.5389)
print(torch.isclose(ce_loss, nll_loss)) # tensor(True)
```

Differences:
- `CrossEntropyLoss` can take probability vector (can be one-hot encoded) as input as well as just the target class id, while `NLLLoss` strictly takes only target class id as input
- This means we can't use [[label smoothing\|label smoothing]] with `NLLLoss`

## Related
