---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/when to use cross entropy loss  vs NLL loss.md","permalink":"/2-zettels/when-to-use-cross-entropy-loss-vs-nll-loss/","PassFrontmatter":true}
---



> [!Topics]
> - [[loss functions\|loss functions]]
> - [[cross-entropy\|cross-entropy]]

In PyTorch, this `CrossEntropyLoss` with logits output (logits just means no activation applied) technique is really just [[2 Zettels/cross entropy loss vs negative log likelihood loss\|wrapper code]] around the older `NLLLoss` with `LogSoftmax` technique. When using the newer and simpler approach for [[multi-class classification\|multi-class classification]], you don’t apply any activation to the output and then `CrossEntropyLoss` applies `LogSoftmax` internally. When using the older approach for multi-class classification, you apply `LogSoftmax` to the output and `NLLLoss` assumes you’ve done so.

During prediction with the `CrossEntropyLoss` technique, the raw output values will be logits so if you want to view probabilities you must apply `SoftMax`. With the older `NLLLoss` technique, the raw output values will be a `LogSoftMax` so if you want to view probabilities you must apply the `exp()` function (to negate the `log`).

## Related
