---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-20T11:27:08.305+05:30"}
---


> [!Topics]
> - [[2 Zettels/catalan number\|catalan number]]

The Catalan numbers ($C_n$) count various recursive patterns, with **balanced parentheses** being a classic example. Let's break this down step by step:

First, what are we counting?
- $C_n$ represents the number of ways to properly match n pairs of parentheses
- For example, when n=2, we have $C_2=2$ valid arrangements: `(())` and `()()`

Now, let's understand the recursive formula using n=3 as an example. The key insight is:
- Every valid sequence must start with an opening parenthesis `(`
- This opening parenthesis must have a matching closing parenthesis `)`
- These matching parentheses divide our sequence into two parts: what's **inside** them and what's **outside** them

For n=3, let's see how this works:
1. If we have 1 pair inside the first matching parentheses:
   - Inside: We need to arrange 1 pair → $C_1$ ways
   - Outside: We have 1 pair left → $C_1$ ways
   - Example: `(())()` 

2. If we have 0 pairs inside:
   - Inside: Empty → $C_0$ ways (just 1 way)
   - Outside: 2 pairs → $C_2$ ways
   - Example: `()()()` or `()(())`

3. If we have 2 pairs inside:
   - Inside: 2 pairs → $C_2$ ways
   - Outside: 0 pairs → $C_0$ ways
   - Example: `((()))`

The total number $C_3$ is the sum of all these possibilities:
$$
\begin{align*}
C_3 &= C_0C_2 + C_1C_1 + C_2C_0 \\
&= (1×2) + (1×1) + (2×1) = 5
\end{align*}
$$
This pattern generalizes to the formula (combinatorial proof [[2 Zettels/catalan number recurrence proof\|here]]):
$$
C_n = \sum_{i=0}^{n-1} C_i C_{n-1-i}
$$
The formula captures the fact that we're:
1. Always using one pair of parentheses as our "outer frame"
2. Splitting the remaining n-1 pairs between "inside" (i pairs) and "outside" (n-1-i pairs)
3. Multiplying the possibilities for each part (because we can combine any valid inside arrangement with any valid outside arrangement)
4. Summing over all possible ways to split the remaining pairs

This way to breaking problems is a common pattern that is seen in many places:
- balanced parentheses/bracket sequences
- counting full binary trees (unlabelled)
    - for labelled: $n!C_n$ since we can assign labels to $n$ nodes in $n!$ ways
- paths in a grid without crossing the diagonal
    - [[2 Zettels/catalan number direct formula combinatorial proof\|catalan number direct formula combinatorial proof]]
- [[triangulations of a convex polygon\|triangulations of a convex polygon]]: A pentagon can be triangulated in $C_3$ ways
- number of mountain ranges (dyck paths)
- number of ways to connect disjoint chords

## Related
