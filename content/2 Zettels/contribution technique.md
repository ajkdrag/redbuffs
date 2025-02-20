---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-30T18:01:00.842+05:30"}
---


> [!Topics]
> - [[algorithmic paradigm\|algorithmic paradigm]]

The contribution technique is a way of “inverting the summation” so that instead of iterating over all possible combinations or substructures (which might be prohibitively many), you identify how much each individual element (or a well‐defined part of the structure) contributes to the final answer.

At its heart, the contribution technique thrives on the principle of **linearity**. In the context of sums, linearity states that the sum of sums is the sum of individual elements. More formally, if we want to calculate a sum $S = \sum_{C \in \mathcal{C}} f(C)$ over a set of combinations $\mathcal{C}$, and we can express $f(C)$ as a sum of contributions of elements within $C$, i.e., $f(C) = \sum_{e \in C} g(e)$, then due to linearity: 
$$
\begin{align*}
S &= \sum_{C \in \mathcal{C}} \left( \sum_{e \in C} g(e) \right) \\
&= \sum_{e \in \mathcal{E}} g(e) \times (\text{\#combinations } C \in \mathcal{C} \text{ that contain } e)
\end{align*}
$$
where $\mathcal{E}$ is the set of all possible elements. In expectation, linearity holds similarly: $E[\sum X_i] = \sum E[X_i]$. This transformation shifts our focus to two crucial questions:

- **How many times does this element participate in valid substructures?**
- **What is the weight of its participation?** 

You calculate for each element its “contribution” (i.e. the number of times it is counted multiplied by its value or weight) and then add up these contributions.

## Classic Examples
### A. Sum of All Subarrays
- **Problem:** Compute the sum of all subarrays of an array `a` of length `n`
- **Idea:** Each element `a[i]` appears in exactly $(i + 1) \times (n − i)$ subarrays (since left point can be chosen in `i+1` ways, and right point in `n-i` ways)
- **Contribution:** If the element is `a[i]`, its total contribution is $a[i] \times (i+1) \times (n-i)$
- **Formula:** Instead of iterating over all subarrays, a single loop computes the global sum: 
  $$
   \text{Total}=\sum^{n-1}_{i=0}a[i]\times (i+1) \times (n-i)
   $$
### B. Sum of All Subsets
- **Problem:** Compute the sum of all subsets of an array
- **Idea:** Each element `a[i]` appears in $2^{n-1}$ subsets (put `a[i]` in a set $S$ first and now 2 choices for rest `n-1` elements: to place or not to place in $S$)
- **Contribution:** $a[i] \times 2^{n-1}$
- **Formula:**
  $$
   \text{Total}=(\sum a)\times 2^{(n−1)}
   $$

### C. Sum of All Pairwise Products
- **Problem:** Find the sum of `a[i] x a[j]` for all `i < j`
- **Idea:** Each element `a[i]` pairs with all elements to its right
- **Contribution:**  `a[i] x sum(a[j] for j > i)`
- **Formula:** While above can be implemented in linear time using [[2 Zettels/prefix sums\|prefix sums]], a [[2 Zettels/sum of all pairwise products formula\|direct formula]] can be derived as well:
  $$
   \frac{(\sum a)^2 - \sum_{i} a[i]^2}{2}
   $$
```python
def pairwise_product_sum_suffix_sum(a):
    n = len(a)
    suffix_sum = [0] * (n + 1) # suffix_sum[i] = sum from index i to end
    for i in range(n - 1, -1, -1):
        suffix_sum[i] = suffix_sum[i+1] + a[i]

    total_sum = 0
    for i in range(n - 1):
        contribution = a[i] * suffix_sum[i+1]
        total_sum += contribution
    return total_sum
```
### D. Counting Inversions in All Subarrays
- **Problem:** Find the sum of inversion counts for all possible subarrays of a given array
- **Idea:** Iterate through all pairs of indices `(i, j)` where `i < j`. For each pair that forms an inversion (`a[i] > a[j]`), calculate the number of subarrays that contain both indices `i` and `j`, which is `(i + 1) * (n - j)`. Finally, sum these counts for all inversion pairs
- **Contribution:** For each inversion pair `(i, j)`, its total contribution is $(i+1) \times (n-j)$
- **Formula:**
  $$
   \sum_{i=0}^{n-2} \sum_{j=i+1}^{n-1} \mathbb{1}_{[a[i] > a[j]]} \cdot (i+1)(n-j)
   $$

## Extending Contributions
In many problems, direct contribution technique isn't applicable, instead, an element's contribution is obtained by "extending" the contributions of other elements (often the previous or next element's). This is illustrated by the following problem:

### Sum of Product of All Subarrays
Let's rearrange the formulation in terms of subarrays ending at element i. The algebraic rearrangement shows that the final result can be written in a "contribution technique" form where the contribution of each element is **related** to the contribution of the previous element. 

```
arr = [a, b, c, d]

res = a + b + c + d + ab + bc + cd + abc + bcd + abcd
res = a + (ab + b) + (abc + bc + c) + (abcd + bcd + cd + d)
res = a + b(1 + a) + c(1 + b + ab) + d(1 + c + bc + abc)
```

Mathematically, contribution of element $a[i]$ is:
$$
\text{contrib}(a[i]) = a[i] \times (1 + \text{contrib}(a[i-1]))
$$
We are basically "extending" the contribution of the previous element.

> [!Note] General Approach
> 1. **Decompose the Problem:** Break the problem into substructures (subarrays, subsets, pairs, etc.)
> 2. **Identify Contributions:** For each element, determine:
>     - How many substructures include it
>     - Its weight in those substructures
> 3. **Sum Contributions:** Aggregate contributions efficiently (often in linear time).

## Related
