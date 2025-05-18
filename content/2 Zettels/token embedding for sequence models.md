---
{"publish":true,"created":"2025-04-16T10:53:53.054+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[sequence modeling\|sequence modeling]]
> - [[word embeddings\|word embeddings]]

In sequence models, including the [[2 Zettels/transformer\|transformer]], the initial step in processing discrete input tokens (like words, [[subwords\|subwords]], or image patches) is to convert them into continuous vector representations. This is achieved through an **embedding layer**, which acts as a _lookup table_ that stores a unique vector for each token in the model's vocabulary. The dimensionality of these embedding vectors is a crucial hyperparameter, often denoted as $d_{model}$.

The embedding layer takes a sequence of token indices as input and outputs a corresponding sequence of embedding vectors. These vectors are typically initialized randomly and learned during the training process through [[backpropagation\|backpropagation]] (i.e. dynamic embeddings). The goal is to create a vector space where tokens with similar meanings or roles are located close to each other. This learned semantic relationship provides a strong foundation for the model to understand and process the input sequence.

This concept of token embedding is generally applicable to any type of discrete sequential data, whether it's text, audio, or even _visual data_ represented as a sequence of patches

Here's a PyTorch example of using `nn.Embedding`:

```python
import torch
import torch.nn as nn

vocab_size = 10000
d_model = 512
embedding_layer = nn.Embedding(num_embeddings=vocab_size, embedding_dim=d_model)

# Example input: batch of 2 sequences, each with 4 token IDs
input_ids = torch.LongTensor([[1, 5, 100, 2], [4, 12, 87, 6]])

# Get embeddings
embeddings = embedding_layer(input_ids)
print("Input IDs shape:", input_ids.shape)
print("Output Embeddings shape:", embeddings.shape)
# Expected output shape: torch.Size([2, 4, 512])
```

The `nn.Embedding` module requires the vocabulary size (`num_embeddings`) and the desired embedding dimension (`embedding_dim`) as arguments. The input to the layer should be a tensor of integer indices representing the tokens. The output will be a tensor where each token index is replaced by its corresponding embedding vector.

## Related

- [[2 Zettels/why choose nn.Embedding over nn.Linear\|why choose nn.Embedding over nn.Linear]]
- [[static vs dynamic word embeddings\|static vs dynamic word embeddings]]
