---
{"publish":true,"created":"2025-03-11T12:20:09.794+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[basic arithmetic\|basic arithmetic]]

Given two integers $N$ and $S$, determine the number of positive integers $X$ ($1 \leq X \leq N$) such that the difference between $X$ and the sum of its digits is at least $S$. Formally, count all $X$ satisfying:

$$
X - \text{sum\_digits}(X) \geq S
$$

## Idea

For a given $X$, the function $f(X) = X - \text{sum\_digits}(X)$ is **non-decreasing**. This means that once $f(X) \geq S$, all larger $X$ will also satisfy $f(X) \geq S$. Thus, the valid $X$ values form a contiguous range from some minimum valid $X$ (let's call it $\text{ans}$) to $N$. We can use the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] to efficiently find $\text{ans}$. The total valid numbers will then be: $N - \text{ans} + 1$.

Binary Search Strategy:

1. **Search Space**: $[1, N]$
2. **Check Function**: For a candidate $X$, check if $X - \text{sum\_digits}(X) \geq S$
3. **Monotonicity**: Since $f(X)$ is non-decreasing, binary search can find the smallest valid $X$

**Time Complexity**: $O(\log N \cdot D)$, where $D$ is the maximum number of digits in $N$. Each binary search step checks the digits of $X$.
**Space Complexity**: $O(1)$, constant extra space is used.

### Proof of Monotonicity

We need to show that $f(X+1) \geq f(X)$ for all $X \geq 1$. Let’s compute the difference:

$$
\begin{align*}
f(X+1) - f(X) &= (X+1 - \text{sum\_digits}(X+1)) - (X - \text{sum\_digits}(X))\\
&= 1 - (\text{sum\_digits}(X+1) - \text{sum\_digits}(X))
\end{align*}
$$

The term $\text{sum\_digits}(X+1) - \text{sum\_digits}(X)$ can be expressed as $1 - 9k$, where $k$ is the number of trailing 9s in $X$. This is because incrementing $X$ turns trailing 9s into 0s (each reducing the sum by 9) and increments the next digit by 1. Thus:

$$
f(X+1) - f(X) = 1 - (1 - 9k) = 9k \geq 0
$$

Since $k \geq 0$, $f(X)$ is non-decreasing.

## Code

```cpp
bool check(ll x, ll target) {
  ll sod = 0;
  while (x > 0) {
    sod += x % 10;
    x /= 10;
  }
  return sod <= target;
}

void solve() {
  ll n, s;
  cin >> n >> s;

  ll lo = 1;
  ll hi = n;
  ll ans = n+1;

  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, mid - s)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  cout << (n - ans + 1) << endl;
}
```

## Related
