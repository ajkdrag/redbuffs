---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:28.761+05:30"}
---


> [!Topics]
> - [[word2vec\|word2vec]]
> - [[2 Zettels/skip-gram\|skip-gram]]

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
