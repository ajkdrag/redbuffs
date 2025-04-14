---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc115/tasks/abc115_d","PassFrontmatter":true,"created":"2025-03-07T13:11:38.743+05:30"}
---


> [!Topics]
>
> - [[recursion\|recursion]]

We are given a recursive construction where a level‑0 burger is just a patty, and for any $n\ge1$, a level‑$n$ burger consists of a bun, a level‑$(n-1)$ burger, a patty, another level‑$(n-1)$ burger, and a bun. Print the number of patties in the bottom-most $X$ layers from the bottom of a level-$N$ burger.

## Idea

Let $L_n$ be the total number of layers and $P_n$ the total number of patties in a level‑$n$ burger. It is straightforward to prove that

$$
L_0 = 1,\quad P_0 = 1,
$$

$$
L_n = 2L_{n-1} + 3,\quad P_n = 2P_{n-1} + 1.
$$

These recurrences allow us to precompute the total layers and patties for each burger up to the given level.

To solve the problem, we define a recursive function that computes the number of patties in the first $X$ layers of a level‑$N$ burger. The idea is to simulate the burger's construction: if $X=1$, we return 0 (or 1 in the base case when $n=0$); if $X=L_N$, we return $P_N$ directly; otherwise, we decide whether $X$ falls in the lower level‑$(N-1)$ burger, hits the middle patty, or lies in the latter level‑$(N-1)$ burger. More precisely, if

$$
X\leq 1+L_{N-1},
$$

the answer is the same as in the lower burger (after discounting the initial bun), if

$$
X = L_{N-1} + 2,
$$

we add the patties from the first level‑$(N-1)$ burger plus one for the middle patty, and if

$$
X > L_{N-1} + 2,
$$

we add the patties from the first half and the middle, and then recursively compute the result for the remaining layers. This careful case analysis—including the crucial check for $X=L_N$, ensures correctness even for edge cases.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(n)$

## Code

```cpp
vector<pair<ll, ll>> dp(51, make_pair(0, 0));

void precomp_layer_counts(int n) {
  // can also be done iteratively as well
  if (n == 0) {
    dp[n] = make_pair(1, 1);
    return;
  }

  precomp_layer_counts(n - 1);
  pair<ll, ll> prev = dp[n - 1];
  dp[n] = make_pair(3 + 2 * prev.first, 1 + 2 * prev.second);
}

ll burgers(int n, ll x) {
  // base cases
  if (x == dp[n].first)
    return dp[n].second;

  if (x == 1)
    return n == 0 ? 1 : 0;

  pair<ll, ll> prev = dp[n - 1];
  // x is right at the middle
  if (prev.first + 2 == x)
    return prev.second + 1;
  // x is within first half
  else if (prev.first + 2 > x)
    return burgers(n - 1, x - 1);
  // x is within second half
  else {
    // patties in previous layer + middle patty + patties in rest half
    // rest half = x - (first half layers + 1 for 1st bun + 1 for mid patty)
    return prev.second + 1 + burgers(n - 1, x - prev.first - 2);
  }
}

void solve() {
  int n;
  ll a;
  cin >> n >> a;

  precomp_layer_counts(n);
  ll res = burgers(n, a);
  cout << res << endl;
}
```

## Related

- [[6 Problems/code for 1\|code for 1]]
