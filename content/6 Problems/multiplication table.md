---
{"publish":true,"created":"2025-03-12T15:02:38.356+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[basic arithmetic\|basic arithmetic]]

In this problem, we are given an $n \times m$ multiplication table where the entry at position $(i, j)$ is $i \cdot j$. Find the $k$-th number when all $n \cdot m$ numbers are sorted in non-decreasing order.

## Idea

The smallest value in the table is $1 \times 1 = 1$. The largest value is $n \times m$. Thus, our search space for the $k$-th number lies within the range $[1, n \cdot m]$.

We can use binary search, but we need a function that, for a given candidate value $x$, tells us how many numbers in the multiplication table are $\le x$. Let's consider row $i$. The numbers in row $i$ are $i \times 1, i \times 2, \dots, i \times m$. The count of numbers in row $i$ that are $\leq x$ is given by:

$$
\min\left(\left\lfloor \frac{x}{i} \right\rfloor, m\right).
$$

Summing this count over all rows from $1$ to $n$ gives us the total count of numbers in the table that are $\leq x$:

$$
\text{count}(x) = \sum_{i=1}^{n} \min\left(\left\lfloor \frac{x}{i} \right\rfloor, m\right).
$$

Since $\text{count}(x)$ is monotonic, and we need to find the smallest $x$ for which $\text{count}(x) >= k$, we can use the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]. Evaluating `check(x) = (count(x) >= k)` for every value of $x$ in our search space $[1, n \cdot m]$ would generate a boolean array: `0,0,...,0,1,1,...,1`. Our goal is to find the **transition point**, i.e. the first `1`.

Note that this works correctly for duplicates as seen for the example:

> [!Example]
> We have `n=2, m=3, table=[1, 2, 2, 3, 4, 6]` and we want the $k=2$-nd element which's `2`. Observe that when $x=2$, we have $\text{count}(2)=3$ and for $x=1$, $\text{count}(1)=1$. Thus, `check(1)` is `false` while `check(2)` is `true` and $2$ will be returned as answer since it's the transition point.

> [!Warning]
> Even though our search space includes elements that aren't in the table (e.g. 5 in this case), this transition point must occur at one of the actual table values $i \cdot j$, ensuring the correctness of the solution.

**Time Complexity:** $O(n \log(n \cdot m))$
**Space Complexity:** $O(1)$

## Code

```cpp
#include <bits/stdc++.h>
using namespace std;

#define ll long long

bool check(ll mid, ll n, ll m, ll k) {
    ll cnt = 0;
    for (ll i = 1; i <= n; i++) {
        // Count how many numbers in row i are <= mid
        // which is min(mid/i, m)
        cnt += min(mid / i, m);
    }
    return (cnt >= k);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    ll n, m, k;
    cin >> n >> m >> k;

    ll lo = 1;
    ll hi = n * m;
    ll ans = hi;

    // Binary search for the k-th smallest
    while (lo <= hi) {
        ll mid = (lo + hi) / 2;
        if (check(mid, n, m, k)) {
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }

    cout << ans << "\n";
    return 0;
}
```

## Related

- https://cses.fi/alon/task/2422/
  - can be solved by putting $m=n$ and $k=n^2/2 + 1$ (middle element).
