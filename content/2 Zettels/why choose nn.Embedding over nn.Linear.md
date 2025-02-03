---
{"publish":true,"tags":["question","status/done","type/zettel"],"PassFrontmatter":true}
---



> [!Topics]
> - pytorch-internals
> - word embeddings

`nn.Embedding` and `nn.Linear` essentially [[2 Zettels/similarity of nn.Embedding and nn.Linear in Pytorch\|work the same]] but there are few reasons to prefer `nn.Embedding` for lookup:
- Implementation is efficient 
- For `nn.Linear`, lot of wasteful multiplications by 0
- **Memory acess pattern**: For `nn.Linear`, entire weight matrix is loaded in memory during forward pass
- During backpopagation, entire weight matrix is updated (most updates are 0 though) #question


## Related
