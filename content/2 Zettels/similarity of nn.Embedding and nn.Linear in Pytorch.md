---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/similarity of nn.Embedding and nn.Linear in Pytorch.md","permalink":"/2-zettels/similarity-of-nn-embedding-and-nn-linear-in-pytorch/","PassFrontmatter":true}
---




> [!Topics]
> - [[pytorch-internals\|pytorch-internals]]
> - [[word embeddings\|word embeddings]]

`nn.Embedding` is nothing but a lookup table.

![|520](https://res.cloudinary.com/dcameztw9/image/upload/v1727348748/qyiij4ggce93baxnmfkz.png)

>The embedding layer above accomplishes exactly the same as `nn.Linear` layer (without bias term) on a one-hot encoded representation in PyTorch.

![|520](https://res.cloudinary.com/dcameztw9/image/upload/v1727348963/yitsgnef0mhzprguo5wo.png)
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

## Related
