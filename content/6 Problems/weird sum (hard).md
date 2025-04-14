---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-02-10T21:22:25.048+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/prefix sums\|prefix sums]]
> - [[basic arithmetic\|basic arithmetic]]

We are given an array $A$ of size $N$. For each query with parameters $l$, $r$, and $k$, we need to compute the sum of consecutive subarrays starting at each index from $l$ to $r$, where each subarray runs from the current index up to $\min(l + k - 1, r)$. In other words, for each valid starting index $i$, we sum

$$
\sum_{j=i}^{\min(i+k-1,\, r)} A_j
$$

Then, we output the total sum over all starting indices from $l$ to $r$.

For example, with array $[1,2,3,4,5]$ and query $l=1,r=5,k=4$:

- First window: $(1+2+3+4)$ `[size=4]`
- Second window: $(2+3+4+5)$ `[size=4]`
- Third window: $(3+4+5)$ `[size=3]`
- Fourth window: $(4+5)$ `[size=2]`
- Fifth window: $(5)$ `[size=1]`
- Total sum = 50

## Input

- Line 1: Integer $N$
- Line 2: Array elements $A_1, A_2, ..., A_N$
- Line 3: Integer $Q$
- Next $Q$ lines: Three integers $l$, $r$, $k$ per line

## Constraints

- $1 \leq N, Q \leq 2 \times 10^5$
- $0 \leq A_i \leq 10^5$
- $1 \leq l \leq r \leq N$
- $1 \leq k \leq N$

## Sample

Input:

```
5
1 2 3 4 5
3
1 5 4
1 1 2
1 3 4
```

Output:

```
50
1
14
```

### Explanations

1. Query $(1,5,4)$: $(1+2+3+4) + (2+3+4+5) + (3+4+5) + (4+5) + (5) = 50$
2. Query $(1,1,2)$: Single element $(1) = 1$
3. Query $(1,3,4)$: $(1+2+3) + (2+3) + (3) = 14$

## Idea

The solution uses **prefix sums** to quickly compute sums over subarrays. We precompute:

- The prefix sum array: $\text{prefix}[i] = A_1 + A_2 + \cdots + A_i$
- A secondary prefix array (prefix of prefix sums): $\text{prefix2}[i] = \text{prefix}[1] + \text{prefix}[2] + \cdots + \text{prefix}[i]$

Similarly, we compute right prefix sums for handling cases where $k$ is larger than the length of the interval:

- Right prefix sum array: $\text{rPrefix}[i] = A_i + A_{i+1} + \cdots + A_N$
- And its prefix: $\text{rPrefix2}[i] = \text{rPrefix}[i] + \text{rPrefix}[i+1] + \cdots + \text{rPrefix}[N]$

The main challenge is handling the two distinct cases based on the relation between $k$ and the length of the query interval $(r-l+1)$.

#### 1. When $k \leq (r-l+1)$

In this case, the window of $k$ elements fits completely for many starting indices. The sum is divided into two parts:

- **Full Window Sums:**  
   For indices $i$ from $l$ to $r-k+1$, the window covers exactly $k$ elements.  
   Each sum is $\sum_{j=i}^{i+k-1} A_j$
  Using the prefix sum arrays, these sums can be computed quickly and then summed over $i$ (refer [[6 Problems/weird sum (easy)\|weird sum (easy)]] for formula derivation)
- **Decreasing Window Sums:**  
   For indices $i$ from $r-k+2$ to $r$, the window would naturally extend past $r$, so we only take up to $r$.  
   The sum for these indices is $\sum_{j=i}^{r} A_j$,  
   which forms a decreasing sequence of window lengths (from $k-1$ elements down to $1$).  
   Here, the right prefix sums come into play to compute the total sum efficiently.

Combining these two parts gives the answer when $k$ is small enough.

#### 2. When $k > (r-l+1)$

If $k$ is larger than the number of elements in the interval, then for every starting index $i$, the window always runs from $i$ to $r$. Thus, the sum becomes:

$$
\sum_{i=l}^{r} \left(\sum_{j=i}^{r} A_j\right)
$$

Using the right prefix sums, this can be computed by taking the difference:

$$
\text{result} = \Bigl(\text{rPrefix2}[l] - \text{rPrefix2}[r+1]\Bigr) - \Bigl(\text{rPrefix}[r+1] \times (r-l+1)\Bigr)
$$

Thus, by precomputing both prefix and right prefix sums, we can efficiently answer each query in constant time.

## Code

```cpp
void solve() {
  int n, q;
  cin >> n;
  vector<ll> arr(n + 1);
  vector<ll> prefix(n + 1, 0);
  vector<ll> prefix2(n + 1, 0);
  vector<ll> rPrefix(n + 2, 0);
  vector<ll> rPrefix2(n + 2, 0);

  for (int i = 1; i <= n; ++i) {
    cin >> arr[i];
    prefix[i] = prefix[i - 1] + arr[i];
  }

  for (int i = 1; i <= n; ++i) {
    prefix2[i] = prefix[i] + prefix2[i - 1];
  }

  for (int i = n; i > 0; --i) {
    rPrefix[i] = arr[i] + rPrefix[i + 1];
  }

  for (int i = n; i > 0; --i) {
    rPrefix2[i] = rPrefix[i] + rPrefix2[i + 1];
  }

  int l, r, k;
  cin >> q;
  while (q--) {
    cin >> l >> r >> k;

    ll part1 = 0;
    ll part2 = (rPrefix2[l] - rPrefix2[r + 1]) - (rPrefix[r + 1] * (r - l + 1));

    if (k <= r - l + 1) {
      ll part1_first = prefix2[r] - prefix2[l + k - 2];
      ll part1_second = prefix2[r - k] - (l - 2 >= 0 ? prefix2[l - 2] : 0);
      part1 = part1_first - part1_second;

      ll part2_first = rPrefix2[r - k + 2] - rPrefix2[r + 1];
      ll part2_second = rPrefix[r + 1] * (k - 1);
      part2 = part2_first - part2_second;
    }

    // cout << part2 << endl;
    cout << part1 + part2 << '\n';
  }
}
```

## Related
