---
{"publish":true,"created":"2025-02-19T16:39:40.421+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/contribution technique\|contribution technique]]

Given a numeric string `s`, compute the sum of all substrings (e.g., `"123"` → `1+2+3+12+23+123=164`).

## Idea

### Approach 1

For each digit `s[i]`, compute the sum of all substrings ending at `i` by extending substrings ending at `i-1`. This leverages the [[2 Zettels/contribution technique#Extending Contributions\|extended contribution technique]]. Each new digit appends to previous substrings (multiplying their sum by 10) and adds new single-digit substrings.

$$
\begin{align*}
\text{sum\_ending\_here}[i] &= \text{sum\_ending\_here}[i-1] \times 10 + s[i] \times (i+1)\\

\text{Total Sum} &=
\sum_{i=0}^{n-1} \text{sum\_ending\_here}[i]\\
\end{align*}
$$

### Approach 2

Consider how the answer can be represented when $N$ is small. When $N=3$, the answer is as follows:

$$
\begin{align*}
\text{total}&=f(1,1)+f(1,2)+f(1,3)+f(2,2)+f(2,3)+f(3,3)\\
&=(S_{1})+(10S_{1}+S_{2})+(100S_{1}+10S_{2}+S_{3})+(S_{2})+(10S_{2}+S_{3})+(S_{3})\\
&=10^{2}(S_{1})+10^{1}(S_{1}+2S_{2})+10^{0}(S_{1}+2S_{2}+3S_{3})
\end{align*}
$$

More generally, for $A_{i}=\sum_{j=1}^{i}j\times S_{j}$ (which can be precomputed using [[2 Zettels/prefix sums\|prefix sums]]), the answer is

$$
\sum_{i=1}^{N}10^{N-i}A_{i}
$$

This can be implemented using column addition (tracking carry and remainders manually). Least significant digit of result will come from $A_0$, next one will be come from $A_1$ and carry (from $A_0$) and so on.

## Code

```python
# Approach 1
def solve(n: int, s: str):
    sum_ending_here = 0
    res = 0
    for i in range(n):
        sum_ending_here = sum_ending_here * 10 + int(s[i]) * (i + 1)
        res += sum_ending_here

    print(res)

# Approach 2
def solve(n: int, s: str):
    # Precompute A[i] = sum_{j=1}^{i+1} (j * digit_j)
    a = [(i + 1) * int(s[i]) for i in range(n)]
    for i in range(1, n):
        a[i] += a[i - 1]

    # Compute the final answer digit by digit.
    # The final sum is: 10^(n-1)*A[0] + 10^(n-2)*A[1] + ... + 10^0*A[n-1]
    # Count the digit positions from the right (0: units, 1: tens, etc.)
    i = 0
    c = 0  # Carry
    ans = []  # This will store the digits (in reverse order)

    # Process until we've handled all columns (i < n) or there is still carry left.
    while i < n or c > 0:
        if i < n:
            # Note: We add A[n-1-i] for the i-th column from right (least sig. digit)
            c += a[n - 1 - i]
        ans.append(c % 10)
        c //= 10
        i += 1

    print("".join(map(str, ans[::-1])))

```

## Related
