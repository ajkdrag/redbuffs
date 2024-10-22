---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/GloVe key idea.md","permalink":"/2-zettels/glo-ve-key-idea/","PassFrontmatter":true}
---



> [!Topics]
> - [[GloVe\|GloVe]]
> - [[word embeddings\|word embeddings]]

Uses global statistics (similar to [[TF-IDF\|TF-IDF]] and [[latent semantic analysis\|latent semantic analysis]]) such as **word co-ocurrence counts**, to build text representations (aka word [[word embeddings\|word embeddings]]). 

> The driving idea is that the dot product of the word vectors is proportional to the logarithm of the words' co-occurrence probability

The logarithm term helps with numerical stability during training, when working with very large numbers (like raw co-occurrence counts).

## Related
