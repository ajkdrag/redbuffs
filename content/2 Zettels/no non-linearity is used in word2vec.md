---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/no non-linearity is used in word2vec.md","permalink":"/2-zettels/no-non-linearity-is-used-in-word2vec/","PassFrontmatter":true}
---


Topics: [[3 Topics/word2vec\|word2vec]]
Links:

Mainly because the network is shallow with just [[2 Zettels/similarity of nn.Embedding and nn.Linear in Pytorch\|embedding or linear]] layers, so no need to use non-linearity. Also the loss function adds some non-linearity to the logits (e.g., sigmoid for [[skip-gram with negative sampling\|skip-gram with negative sampling]], softmax for [[cross-entropy\|cross-entropy]]). 