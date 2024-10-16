---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/derive the GloVe objective function.md","permalink":"/2-zettels/derive-the-glo-ve-objective-function/","PassFrontmatter":true}
---


Topics: [[GloVe\|GloVe]] | [[loss functions\|loss functions]] 
Links:

Building on the [[2 Zettels/GloVe interpretation through co-occurrence ratios\|GloVe interpretation through co-occurrence ratios]], the objective function can be derived as follows:

**Start with the desired property**:
   $$ f(\mathbf{u}_j, \mathbf{u}_k, \mathbf{v}_i) \approx \frac{p_{ij}}{p_{ik}} $$

**Choose a scalar function** $f$:
   - We want $f$ to be a scalar function since the ratio is a scalar
   - A reasonable choice is dot product: $f(\mathbf{u}_j, \mathbf{u}_k, \mathbf{v}_i) = f((\mathbf{u}_j - \mathbf{u}_k)^\top \mathbf{v}_i)$
   - The dot product captures similarity, and the difference $(\mathbf{u}_j - \mathbf{u}_k)$ compares the two context words
   - Note that this is a *heuristic* choice which worked well

**Determine the form of** $f$:
   - Switching indices $j$ and $k$ should give the reciprocal: $f(x)f(-x) = 1$
	   - The probabilities become inverted and the vector difference becomes negative. Multiplication between original equation and one where we swap $j$ and $k$ results in $f(x)f(-x)=1$
   - The exponential function satisfies this: $\exp(x)\exp(-x) = 1$
   - Therefore, choose $f(x) = \exp(x)$

This gives us:
   $$ f(\mathbf{u}_j, \mathbf{u}_k, \mathbf{v}_i) = \frac{\exp(\mathbf{u}_j^\top \mathbf{v}_i)}{\exp(\mathbf{u}_k^\top \mathbf{v}_i)} \approx \frac{p_{ij}}{p_{ik}} $$

Assume $\exp(\mathbf{u}_j^\top \mathbf{v}_i) \approx \alpha p_{ij}$, where $\alpha$ is a constant. Take the logarithm and substitute $p_{ij} = x_{ij}/x_i$:
   $$ \mathbf{u}_j^\top \mathbf{v}_i \approx \log \alpha + \log x_{ij} - \log x_i $$
Introduce bias term $b_i$ to replace $- \log\, \alpha + \log\, x_i$:
   $$ \mathbf{u}_j^\top \mathbf{v}_i + b_i \approx \log x_{ij} $$
This expression is not *symmetric* w.r.t. $i$ and $j$, due to the $b_i$ term. So to *balance* it out, we add another bias term $c_j$:
   $$ \mathbf{u}_j^\top \mathbf{v}_i + b_i + c_j \approx \log x_{ij} $$
   
The [[2 Zettels/GloVe objective function\|GloVe objective function]] is obtained by measuring the squared error of this approximation with weights:
   $$ J = \sum_{i,j=1}^V f(x_{ij})(\mathbf{u}_j^\top \mathbf{v}_i + b_i + c_j - \log x_{ij})^2 $$

Where $f(x_{ij})$ is a [[2 Zettels/weighting function in GloVe\|weighting function in GloVe]] and $V$ is the vocabulary size.

This objective function aims to learn word vectors that capture the relationships between words as expressed by their co-occurrence statistics in the corpus.