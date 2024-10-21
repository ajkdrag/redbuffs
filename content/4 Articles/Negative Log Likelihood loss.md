---
{"publish":true,"tags":["topic/cross-entropy","topic/nll-loss","type/post"],"path":"4 Articles/Negative Log Likelihood loss.md","permalink":"/4-articles/negative-log-likelihood-loss/","PassFrontmatter":true}
---


If we have some output predictions (logits) from a model for a given classification task with `C` classes, we can evaluate against the target class id using NLL loss.

```python
logits = torch.tensor([0.2, 2.0, 1.4])
target_class_id = torch.tensor(1)
```

Here we have 3 classes, so 3 logit values and our target is class 1 (classes are 0-indexed). The logit at index 1 is `2.0`.

> [!Caveat]
> The standard `nn.NLLLoss()` in PyTorch does indeed expect integer targets, not continuous probabilities. It's designed for hard classification where each sample belongs to exactly **one class**.

## Step 1: Convert logits to probabilities

```python
probs = F.softmax(logits, dim=0)
# tensor([0.0964, 0.5834, 0.3202])
```

We see that our target probability is `0.5834`. Ideally we want our probability for the target class to be equal to `1.0`. So we need to *measure* how bad this `0.5834` value is. Taking the log of this basically gives us the *log likelihood*

## Step 2: Getting the log likelihoods

```python
ll = torch.log(probs)
# tensor([-2.3389, -0.5389, -1.1389])
```

## Step 3: Calculate the loss
The loss is nothing but the negative of the value at `target_class_id` position, i.e. `0.5389` in this case. This is basically what `F.nll_loss(...)` does and hence we have the name *negative log likelihood* loss.

```python
val_1 = -1.0 * ll.gather(dim=0, index=target_class_id)
val_2 = F.nll_loss(ll, target_class_id)

print(val_1, val_2) # tensor(0.5389) tensor(0.5389) 
torch.isclose(val_1, val_2) # torch.tensor(True)
```


<div class="bmac-script">
  <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="ajkdrag" data-color="#dc143c" data-emoji="☕"  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#ffffff" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
</div>