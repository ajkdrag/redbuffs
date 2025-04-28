---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T12:07:40.801+05:30"}
---


> [!Topics]
>
> - [[linear algebra\|linear algebra]]
> - [[functional analysis\|functional analysis]]

Linear functional maps vectors to scalars while preserving linear structure. For any [[vector space\|vector space]] $V$ over field $K$, linear functional $\phi$ satisfies:

$$
\phi(\alpha\mathbf{u} + \beta\mathbf{v}) = \alpha\phi(\mathbf{u}) + \beta\phi(\mathbf{v})
$$

for all vectors $\mathbf{u},\mathbf{v}\in{V}$ and scalars $\alpha,\beta\in{K}$.

### Key properties

- Special case of [[linear transformation\|linear transformation]] where output space is scalar field $K$
- Real-valued linear functionals map vectors to $\mathbb{R}$

### Examples

- **Projection**: Selecting $i^{th}$ component from vector $\mathbf{v} = (v_1,...,v_n)$
- **Integration**: Maps continuous function to its definite integral value
- The [[2 Zettels/trace\|trace]] of square matrix (sum of diagonal elements)
- The [[dot product\|dot product]] with fixed vector (when $V$ has inner product)

> [!Warning]
>
> - The [[2 Zettels/determinant\|determinant]] appears linear but fails additivity condition
> - Derivative operator is linear but outputs functions, not scalars

## Related

- [[2 Zettels/riesz representation theorem\|riesz representation theorem]]
