---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-02-17T10:55:13.203+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/derangements\|derangements]]
> - [[modular arithmetic\|modular arithmetic]]

Given a permutation `P` of length `N` (containing numbers 1 to N exactly once), and `Q` queries, for each query with a value `K`, find the number of permutations of length `N` that have a distance less than or equal to `K` from `P`. The distance between two permutations is the number of indices where they differ. Output the answer modulo 10^9 + 7.

**Input:**

- N (1 <= N <= 10^5): Length of the permutation.
- P: The permutation (N integers, 1 <= P[i] <= N).
- Q (1 <= Q <= N+1): Number of queries.
- K (0 <= K <= N): Distance limit for each query.

**Output:**
For each query, print the count of permutations with distance <= K from P (modulo 10^9 + 7).

**Example:**
Let P = `[2, 1, 3]`

All permutations of length 3 and their distances from P:

- `[1, 2, 3]` - Distance 2 (indices 0 and 1)
- `[1, 3, 2]` - Distance 3 (indices 0, 1, and 2)
- `[2, 1, 3]` - Distance 0
- `[2, 3, 1]` - Distance 2 (indices 1 and 2)
- `[3, 1, 2]` - Distance 2 (indices 0 and 2)
- `[3, 2, 1]` - Distance 3 (indices 0, 1, and 2)

**Query examples:**

- K = 0: 1 permutation (`[2, 1, 3]`)
- K = 1: 1 permutation (`[2, 1, 3]`)
- K = 2: 4 permutations (`[1, 2, 3], [2, 3, 1], [3, 1, 2], [2, 1, 3]`)
- K = 3: 6 permutations (all permutations)

## Idea

To solve this problem, we can count the number of permutations at a distance of _exactly_ $i$ from $P$, for each $i$ from 0 to $K$, and then sum up these counts.

Let's consider how to count the number of permutations at a distance of _exactly_ $i$ from $P$.
To achieve a distance of exactly $i$, we need to choose $i$ positions out of $N$ where the permutation differs from $P$. The number of ways to choose these $i$ positions is given by the [[binomial coefficient\|binomial coefficient]] $C(N, i) = \binom{N}{i}$.

For these chosen $i$ positions, we need to arrange the numbers such that _none_ of them are in their original positions as in $P$. In other words, in these $i$ positions, we want to create [[2 Zettels/derangements\|derangements]]. A derangement of $i$ elements is a permutation in which none of the elements appear in their original position. The number of derangements of $i$ elements is denoted by $D(i)$ or $!i$.

For the remaining $N-i$ positions (the positions not chosen to be different), the permutation must be identical to $P$. There is only one way for that.

Therefore, the number of permutations at a distance of _exactly_ $i$ from $P$ is given by the product of the number of ways to choose $i$ positions and the number of derangements of $i$ elements:

$$
\text{Count}(\text{distance} = i) = C(N, i) \times D(i)
$$

To find the number of permutations with a distance _less than or equal to_ $K$, we need to sum the counts for distances from 0 to $K$:

$$
\text{Count}(\text{distance} \le K) = \sum_{i=0}^{K} C(N, i) \times D(i)
$$

### Derangement Calculation

The code uses the [[2 Zettels/derangement recurrence dervied from direct formula\|derangement recurrence dervied from direct formula]] to compute $D(i)$. The formula used is:

$$
D(i) = i \times D(i-1) + (-1)^i
$$

with the base case $D(0) = 1$.

The code initializes `d = 1` (representing $D(0)$) and then iteratively calculates $D(i)$ in the loop using `d = (i * d) % MOD; d += (i % 2 == 0 ? 1 : -1);`.

### Binomial Coefficient Calculation

The code calculates binomial coefficients $C(N, i) = \binom{N}{i}$ iteratively using the formula:

$$
\begin{align*}
C(N, i) &= \frac{N!}{i!(N-i)!} \\
&= \frac{N \times (N-1) \times ... \times (N-i+1)}{i!} \\
&= C(N, i-1) \times \frac{N-i+1}{i}
\end{align*}
$$

The code initializes `c = 1` (representing $C(N, 0) = 1$) and then updates it in each iteration:
`c = (c * (n - i + 1)) % MOD; c = (c * inverse(i)) % MOD;`

This is effectively multiplying by $\frac{N-i+1}{i}$ modulo $MOD$. The `inverse(i)` function calculates the [[2 Zettels/modular multiplicative inverse\|modular multiplicative inverse]] of $i$, using [[2 Zettels/fermat's little theorem\|fermat's little theorem]] (since $MOD$ is prime), which is equivalent to dividing by $i$ in modular arithmetic.

### Cumulative Sum

The code calculates the cumulative sum of $C(N, i) \times D(i)$ and stores it in the `res` array. `res[i]` stores the count of permutations with distance $\le i$.

`res[0] = C(N, 0) * D(0)`
`res[1] = res[0] + C(N, 1) * D(1)`
`res[2] = res[1] + C(N, 2) * D(2)`
...
`res[K] = res[K-1] + C(N, K) * D(K)` = $\sum_{i=0}^{K} C(N, i) \times D(i)$

For each query $K$, the code directly outputs `res[K]`, which is the required answer.

**Time complexity**: $O(N \log{MOD}+Q)$

## Code

```cpp
ll MOD = 1e9 + 7;

ll binpow(ll a, ll b) {
  a %= MOD;
  ll res = 1 % MOD;

  while (b > 0) {
    if (b & 1)
      res = (res * a) % MOD;

    a = (a * a) % MOD;
    b >>= 1;
  }
  return res;
}

ll inverse(ll a) { return binpow(a, MOD - 2); }

void solve() {
  int n;
  cin >> n;
  vector<int> arr(n, 0); // not used
  for (int i = 0; i < n; ++i)
    cin >> arr[i];

  // formula: res[i] = C(n, i) x D(i)

  ll d = 1;
  ll c = 1;

  vector<ll> res(n + 1, 0);
  res[0] = 1;

  for (int i = 1; i <= n; ++i) {
    c = (c * (n - i + 1)) % MOD;
    c = (c * inverse(i)) % MOD;

    d = (i * d) % MOD;
    d += (i % 2 == 0 ? 1 : -1); // d = d + (-1)^i

    ll tres = (c * d) % MOD; // tres = C(n, i) * D(i)
    res[i] = (res[i - 1] + tres) % MOD;
  }

  int q, x;
  cin >> q;
  while(q--){
    cin >> x;
    cout << res[x] << '\n';
  }

}

```

## Related
