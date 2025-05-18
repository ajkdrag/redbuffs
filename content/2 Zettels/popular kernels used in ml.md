---
{"publish":true,"created":"2025-05-03T20:34:05.316+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[kernel methods\|kernel methods]]

A kernel function (in the context of ML) computes the [[inner product\|inner product]] between vectors in a different feature space. $K(\mathbf{x}_i, \mathbf{x}_j) = \phi(\mathbf{x}_i) \cdot \phi(\mathbf{x}_j)$, where $\phi$ is the mapping to the feature space. Popular kernel functions include:

- **Linear Kernel** is the simplest: $K(\mathbf{x}_i, \mathbf{x}_j) = \mathbf{x}_i \cdot \mathbf{x}_j$. This is just a standard dot product in the original input space. It's efficient for large datasets, especially text data, and effective when data is linearly separable
- **Polynomial Kernel** maps data to a polynomial feature space: $K(\mathbf{x}_i, \mathbf{x}_j) = (\gamma \mathbf{x}_i \cdot \mathbf{x}_j + r)^d$. It captures polynomial interactions between features. Parameters are degree ($d$), scale ($\gamma$), and offset ($r$). A degree of 1 with $r=0$ is equivalent to the linear kernel. Higher degrees can capture more complex boundaries but increase the risk of overfitting
- **Radial Basis Function (RBF)** Kernel, also known as the [[gaussian kernel\|gaussian kernel]], uses the distance between points: $K(\mathbf{x}_1, \mathbf{x}_2) = \exp(-\gamma ||\mathbf{x}_1 - \mathbf{x}_2||^2)$. This kernel corresponds to an infinite-dimensional feature space and can capture complex, non-linear regions. It's often a good default choice when prior knowledge about the data is limited. The parameter $\gamma$ scales the distance
- **Sigmoid Kernel** is defined as: $K(\mathbf{x}_i, \mathbf{x}_j) = \tanh(\alpha \mathbf{x}_i \cdot \mathbf{x}_j + c)$. It resembles the [[activation function\|activation function]] used in neural networks

Some other kernels include [[ANOVA\|ANOVA]] radial basis, hyperbolic tangent, and Laplace RBF.

![](https://res.cloudinary.com/dcameztw9/image/upload/v1746285468/popular%20kernels%20used%20in%20ml-1rxmo3.webp)

Choosing the best kernel depends on the specific problem and data characteristics. The linear kernel is fast for linearly separable data. RBF is versatile when data distribution is unknown. Polynomial kernels work well when data is normalized. No matter which kernel we choose, you will need to tune the kernel parameters to get good performance from the classifier. Popular parameter-tuning techniques include [[k-fold cross validation\|k-fold cross validation]].

## Related

- [[2 Zettels/support vector machines\|support vector machines]]
- [[2 Zettels/kernel trick\|kernel trick]]
