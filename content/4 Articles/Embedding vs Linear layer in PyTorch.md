---
{"publish":true,"tags":["type/post"],"path":"4 Articles/Embedding vs Linear layer in PyTorch.md","permalink":"/4-articles/embedding-vs-linear-layer-in-py-torch/","PassFrontmatter":true}
---


> [!Topics]
> - [[pytorch-internals\|pytorch-internals]]
> - [[word embeddings\|word embeddings]]

Embedding layers are at the heart of almost every NLP architecture since the past decade. We are all familiar with `nn.Linear` layers. Turns out, `nn.Embedding` is simply a lookup table.

<img src="https://res.cloudinary.com/dcameztw9/image/upload/v1727348748/qyiij4ggce93baxnmfkz.png" width=520/>

>The embeding layer above accomplishes exactly the same as `nn.Linear` layer (without bias term) on a one-hot encoded representation in PyTorch.

<img src="https://res.cloudinary.com/dcameztw9/image/upload/v1727348963/yitsgnef0mhzprguo5wo.png" width=520/>

Since all but one index in each one-hot encoded row are 0 (by design), this matrix multiplication is essentially the same as a look-up of the one-hot elements.

```python
V=4
dims=5

embedding = torch.nn.Embedding(V, dims) 
linear = torch.nn.Linear(V, dims, bias=False)

print(embedding.weight.shape) # torch.Size([4, 5])
print(linear.weight.shape) # torch.Size([5, 4])
```

To make an apples to apples comparison, let's have the weights equal in them
```python
linear.weight = torch.nn.Parameter(embedding.weight.T)
```

For linear layer, we need input to be one-hot encoded
```python
idx = torch.tensor([2, 3, 1])
onehot_idx = torch.nn.functional.one_hot(idx)
```

Comparing the results:
```python
res_linear = linear(onehot_idx.float())
res_emb = embedding(idx)

torch.allclose(res_linear, res_emb) # True
```

Thus, we see `nn.Embedding` and `nn.Linear` (without bias term) work the same.


Even though `nn.Embedding` and `nn.Linear` essentially work the same, there are few reasons to prefer `nn.Embedding` for lookups:
- Efficient implementation 
- For `nn.Linear`, lot of wasteful multiplications by 0
- **Memory acess pattern**: For `nn.Linear`, entire weight matrix is loaded in memory during forward pass
- During backpopagation, entire weight matrix is updated (most updates are 0 though) 

<div class="bmac-script">
  <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="ajkdrag" data-color="#dc143c" data-emoji="☕"  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#ffffff" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
</div>