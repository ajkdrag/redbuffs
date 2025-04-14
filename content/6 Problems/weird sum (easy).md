---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-02-10T18:22:46.296+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/prefix sums\|prefix sums]]
> - [[basic arithmetic\|basic arithmetic]]

Given array $A$ of $N$ integers, answer $Q$ queries. For each query $(l,r,k)$, we need to find sum of all possible consecutive subsequences of length $k$ starting from index $l$ up to index $r$.

In other words:

1. Take $k$ consecutive elements starting at index $l$: $(A_l + A_{l+1} + ... + A_{l+k-1})$
2. Take $k$ consecutive elements starting at index $l+1$: $(A_{l+1} + A_{l+2} + ... + A_{l+k})$
3. Continue this pattern until reaching the last possible subsequence ending at index $r$

For example, with array $[1,2,3,4,5]$ and query $l=2,r=4,k=2$:

- First subsequence: $(2+3)$
- Second subsequence: $(3+4)$
- Sum = $(2+3) + (3+4) = 12$

The mathematical expression is:
$\sum_{i=l}^{r-k+1} \sum_{j=0}^{k-1} A_{i+j}$

### Input

- Line 1: Integer $N$
- Line 2: Array elements $A_1, A_2, ..., A_N$
- Line 3: Integer $Q$
- Next $Q$ lines: Three integers $l$, $r$, $k$ per line

### Constraints

- $1 \leq N, Q \leq 2 \times 10^5$
- $0 \leq A_i \leq 10^5$
- $1 \leq l \leq r \leq N$
- $1 \leq k \leq r-l+1$

### Sample

Input:

```
5
1 2 3 4 5
2
2 4 2
1 1 1
```

Output:

```
12
1
```

#### Explanation

Query 1: $(2+3) + (3+4) = 12$
Query 2: Single element sum: $1$

## Idea

Use two levels of prefix sums to transform each query into O(1) operation.

### 1. Build First Prefix Sum (P)

Let $P[i] = \sum_{j=1}^i A_j$ with $P[0] = 0$

This allows computing any subarray sum in O(1):
$\sum_{j=i}^{i+k-1} A_j = P[i+k-1] - P[i-1]$

### 2. Query Expression

For query $(l,r,k)$:

- Initial form: $\sum_{i=l}^{r-k+1} (P[i+k-1] - P[i-1])$
- Split into: $(\sum_{i=l}^{r-k+1} P[i+k-1]) - (\sum_{i=l}^{r-k+1} P[i-1])$
- After reindexing: $(\sum_{j=l+k-1}^r P[j]) - (\sum_{j=l-1}^{r-k} P[j])$

### 3. Build Second Prefix Sum (PP)

Let $PP[i] = \sum_{j=0}^i P[j]$ with $PP[0] = P[0]$

This transforms range sums of P into O(1):
$\sum_{j=a}^b P[j] = PP[b] - (a-1 \geq 0 ? PP[a-1] : 0)$

### 4. Final Query Formula

```
Answer = (PP[r] - PP[l+k-2]) - (PP[r-k] - (l-2 ≥ 0 ? PP[l-2] : 0))
```

- **Time Complexity**: O(N) preprocessing + O(Q) queries
- **Space Complexity**: O(N)

## Code

```cpp
#include <iostream>
#include <vector>
using namespace std;
typedef long long ll;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);

  int N;
  cin >> N;

  vector<ll> A(N + 1);
  for (int i = 1; i <= N; i++) {
    cin >> A[i];
  }

  vector<ll> P(N + 1, 0);
  for (int i = 1; i <= N; i++) {
    P[i] = P[i - 1] + A[i];
  }

  vector<ll> PP(N + 1, 0);
  PP[0] = P[0]; // P[0] is 0.
  for (int i = 1; i <= N; i++) {
    PP[i] = PP[i - 1] + P[i];
  }

  int Q;
  cin >> Q;
  while (Q--) {
    int l, r, k;
    cin >> l >> r >> k;

    // Calculate sum_{j = l+k-1}^{r} P[j]
    ll sumFirst = PP[r] - PP[l + k - 2];

    // Calculate sum_{j = l-1}^{r-k} P[j]
    ll sumSecond = PP[r - k] - (l - 2 >= 0 ? PP[l - 2] : 0);

    ll answer = sumFirst - sumSecond;
    cout << answer << "\n";
  }

  return 0;
}
```

## Related

- [[6 Problems/weird sum (hard)\|weird sum (hard)]]
