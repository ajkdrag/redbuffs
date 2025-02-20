---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-13T12:51:38.916+05:30"}
---


> [!Topics]
> - [[2 Zettels/catalan number\|catalan number]]
> - [[binary trees\|binary trees]]

We want to prove the recurrence relation for Catalan numbers, $C_n$, which is given by:

$$
\boxed{C_{n+1} = \sum_{i=0}^{n} C_i \cdot C_{n-i} \quad \text{for } n \ge 0}
$$

with the base case $C_0 = 1$.

### Approach: Binary Trees

>We'll use the interpretation of $C_n$ as the number of full binary trees with $n$ internal nodes. A full binary tree has each node either with exactly two children or being a leaf.


Let's consider counting full binary trees with $n+1$ internal nodes, which we denote as $C_{n+1}$.

1.  **Root Node:** Any binary tree with more than one node has a root. In our case, with $n+1$ internal nodes (for $n \ge 0$), the root must be an internal node.  This root has a left and a right child.

2.  **Subtrees:** The children of the root are themselves roots of full binary subtrees (or leaves, effectively representing empty subtrees in terms of internal nodes).

3.  **Internal Nodes Distribution:**  If the total tree has $n+1$ internal nodes, and we've accounted for the root, there are $n$ internal nodes remaining to be distributed between the left and right subtrees.

    Let's say the left subtree has $i$ internal nodes. Then, the right subtree must have $n-i$ internal nodes, where $i$ can range from $0$ to $n$.

4.  **Counting for a Fixed $i$:**
    For a fixed count $i$ of internal nodes in the left subtree:
    *   The number of possible left subtrees is $C_i$.
    *   The number of possible right subtrees is $C_{n-i}$.

    Since the choice of the left and right subtrees are independent, for a specific $i$, the number of combinations is $C_i \cdot C_{n-i}$.

5.  **Summing Over All $i$:**
    To get the total count of trees with $n+1$ internal nodes, we need to consider all possible values of $i$, from $0$ to $n$.  We sum up the counts for each $i$: 

Thus, we have: 
$$
\begin{align*}
C_{n+1} &= \sum_{i=0}^{n} (\text{\#trees with left subtree of size } i \text{ AND right subtree of size } n-i) \\
C_{n+1} &= \sum_{i=0}^{n} C_i \cdot C_{n-i}
\end{align*}
$$

This relation holds because it systematically counts all possible binary trees of size $n+1$ by decomposing them at the root and considering all distributions of size between the left and right subtrees.  The number of ways to form the left and right subtrees are given by smaller Catalan numbers, leading to the recurrence. This decomposition strategy is a common and powerful technique in combinatorial problems.

## Related