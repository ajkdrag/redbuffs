---
{"publish":true,"created":"2025-04-27T10:15:53.920+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[functional analysis\|functional analysis]]
> - [[2 Zettels/vector inner product\|vector inner product]]

**Core idea**: In any [[2 Zettels/vector inner product\|vector inner product]] space, a [[2 Zettels/linear functional\|linear functional]] (linear maps to scalars) can be represented as an inner product with some fixed vector. Formally, for a [[vector space\|vector space]] $V$ with inner product $\langle{\cdot,\cdot}\rangle$, any linear functional $\phi : V \to F$ can be written as:

$$
\phi({\bf x}) = \langle{{\bf z},{\bf x}}\rangle
$$

for some unique ${\bf z} \in V$

> This theorem connects algebraic (functionals) and geometric (inner products) concepts

**Proof sketch**:

1. Take orthonormal [[2 Zettels/basis of a vector space\|basis]] $\{{\bf u}_k\}$ of $V$
2. Expand any vector ${\bf x} = \sum x_k{\bf u}_k$
3. By linearity:
    $$
    \phi({\bf x}) = \sum x_k \phi({\bf u}_k)
    $$
4. This matches $\langle{{\bf z},{\bf x}}\rangle$ if we choose:
    $$
    {\bf z} = \sum \overline{\phi({\bf u}_k)}{\bf u}_k
    $$

> [!Note] Finite vs infinite dimensions
>
> - In finite dimensions, always holds
> - In infinite dimensions ([[hilbert spaces\|hilbert spaces]]), requires completeness

## Related
