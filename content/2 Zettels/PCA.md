---
{"publish":true,"created":"2025-04-30T13:01:37.481+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topic]
>
> - [[dimensionality reduction\|dimensionality reduction]]
> - [[linear algebra\|linear algebra]]

> PCA is used to remove correlation from features and perform dimensionality reduction.

Principal component analysis is a fundamental technique for reducing dimensionality in data while preserving its structure. It transforms correlated variables into linearly uncorrelated **principal components** that encompass most of the information from the original dataset. Useful for: data visualization, feature extraction etc.

### Core idea

Given data matrix $X$ with $n$ samples and $m$ features, PCA finds new axes (principal components) that maximize variance. These axes are [[eigenvectors and eigenvalues\|eigenvectors]] of covariance matrix $C = \frac{1}{n}X^TX$ where $X$ is mean-centered. The covariance matrix can be computed easily if you understand the calculation behind [[2 Zettels/variance of a matrix\|variance of a matrix]].

### Key steps

1. Center data by subtracting mean from each feature
2. Compute [[2 Zettels/covariance matrix\|covariance matrix]] of centered data
3. Perform [[2 Zettels/eigendecomposition\|eigendecomposition]] of covariance matrix
4. Sort eigenvectors by eigenvalues in descending order
5. Select top $k$ eigenvectors as principal components
6. Project data onto new subspace using $Y = XW$ where $W$ contains selected eigenvectors

### Implementation options

```python
# Using numpy
cov_matrix = np.cov(X_centered.T)
eigenvals, eigenvecs = np.linalg.eig(cov_matrix)

# project data
P = eigenvecs.T.dot(X_centered.T)

print(P.T)
```

```python
# Using scikit-learn
from sklearn.decomposition import PCA
pca = PCA(n_components=2)
X_transformed = pca.fit_transform(X) # dimensionality reduced

# access values and vectors
print(pca.components_)
print(pca.explained_variance_)
```

> [!Warning]
>
> PCA is sensitive to outliers and assumes linear relationships. For non-linear dimensionality reduction, consider [[manifold learning\|manifold learning]] techniques.

## Related

- [[2 Zettels/SVD\|SVD]]
