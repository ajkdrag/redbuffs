---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/qualitative approaches to evaluating word embeddings.md","permalink":"/2-zettels/qualitative-approaches-to-evaluating-word-embeddings/","PassFrontmatter":true}
---


Topics: [[word embeddings\|word embeddings]]
Links: [[2 Zettels/quantitative approaches to evaluating word embeddings\|quantitative approaches to evaluating word embeddings]]

There are a couple of ways to evaluate word embeddings. One is to take few random words (as queries) and find the *k closest words*, using [[cosine similarity\|cosine similarity]], followed by manually verifying if those k words seem reasonable.

The second approach would be to simply visualize the embeddings in 2D or 3D space, using [[t-SNE\|t-SNE]], [[PCA\|PCA]] or [[UMAP\|UMAP]] and check the groups formed.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727950252/fu77ztevxitcnufv0dj1.png)
