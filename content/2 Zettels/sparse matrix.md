---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-28T15:26:23.614+05:30"}
---


> [!Topics]
>
> - [[matrices\|matrices]]

A sparse matrix is defined as a matrix where a large proportion of the elements are zero. Matrices with mostly non-zero values are called dense matrices.

$$
\text{sparsity}=\frac{\text{count of non-zero elements​}}{\text{total elements}}
$$

> Many large matrix problems in practice are sparse, and exploiting this sparsity can lead to significant computational savings.

Different data structures are used for _constructing_ sparse matrices efficiently:

- Dictionary of Keys (DOK): Stores a dictionary mapping (row, column) index pairs to values
- List of Lists (LIL): Stores each row as a list, with sublists containing column index and value pairs
- Coordinate List (COO): Stores a list of (row index, column index, value) tuples

Data structures that are better suited for _performing_ efficient operations on sparse matrices:

- [[compressed sparse row\|compressed sparse row]] (CSR): Uses three 1-D arrays to store non-zero values, row extents, and column indices. Often used for efficient access and matrix multiplication
- [[compressed sparse column\|compressed sparse column]] (CSC): Similar to CSR, but compresses column indices first

```python
from scipy.sparse import csr_matrix
import numpy as np

dense = np.array([
    [0, 0, 1],
    [2, 0, 0],
    [0, 3, 0],
])
sparse_csr = csr_matrix(dense)

# You can then do:
# `sparse_csr.dot(x)` for fast matrix–vector products,
# or convert between formats with `.tocoo()`, `.tocsc()`, etc. ​
```

### Usage in ML

- **Raw Data**:
    - Click/purchase matrices in recommender systems
    - User-item interactions (e.g., which movies a user has watched)
- **Feature Encoding**:
    - [[one-hot encoding\|one-hot encoding]] of categorical features
    - [[bag of words\|bag of words]] or [[TF-IDF\|TF-IDF]] vectors in NLP
- **Model Internals**:
    - Huge embedding layers or adjacency matrices in [[graph algorithms\|graph algorithms]]

## Related
