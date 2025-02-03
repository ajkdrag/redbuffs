---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true}
---


> [!Topics]
> - word2vec
> - [[3 Topics/skip-gram\|skip-gram]]

In standard skip-gram (without negative sampling), we typically have 2 weight matrics $W$ and $W'$. One can use one embedding layer and a linear layer for this:

```python
class SkipGram_Model(nn.Module):  
	"""  
	Implementation of Skip-Gram model described in paper:  
	https://arxiv.org/abs/1301.3781  
	"""  
	def __init__(self, vocab_size: int):  
        super(SkipGram_Model, self).__init__()  
        self.embeddings = nn.Embedding(  
            num_embeddings=vocab_size,  
            embedding_dim=EMBED_DIMENSION  
        )  
        self.linear = nn.Linear(  
            in_features=EMBED_DIMENSION,  
            out_features=vocab_size,  
        )  
	  
	def forward(self, x):
        x = self.embeddings(x)  
        x = self.linear(x)  
		return x
```

## Related
