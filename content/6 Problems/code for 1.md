---
{"publish":true,"created":"2025-03-09T15:27:58.615+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[recursion\|recursion]]
> - [[2 Zettels/prefix sums\|prefix sums]]

Sam has a list initially containing a single element $n$. He repeatedly performs operations where he removes any element $x > 1$ and replaces it with the elements $\lfloor x/2 \rfloor$, $x \bmod 2$, $\lfloor x/2 \rfloor$ in that order. The operations continue until all elements in the list are either 0 or 1.

We need to find the total number of 1s in the range from position $l$ to position $r$ (1-indexed) in the final list.

## Idea

We can define the transformation function $T(n)$ recursively:

- $T(0) = [0]$
- $T(1) = [1]$
- $T(n) = T(\lfloor n/2 \rfloor) \oplus [n \bmod 2] \oplus T(\lfloor n/2 \rfloor)$ for $n > 1$, where $\oplus$ represents concatenation

We need to precompute two important properties for each value $n$:

1. The length of the final list for $n$
2. The number of 1s in the final list for $n$

For a number $n$, if we define:

- $len(n)$ = length of the final list for $n$
- $ones(n)$ = number of 1s in the final list for $n$

Then we have:

- $len(n) = 2 \times len(\lfloor n/2 \rfloor) + 1$ for $n > 1$
- $ones(n) = 2 \times ones(\lfloor n/2 \rfloor) + (n \bmod 2)$ for $n > 1$
- $len(0) = 1$, $ones(0) = 0$
- $len(1) = 1$, $ones(1) = 1$

### Range Query

To count the number of 1s in a range $[l, r]$, we can use a helper function to count the number of 1s up to a given index (like prefix sums concept):

$$
\text{ones in range}[l, r] = \text{ones up to index }r - \text{ones up to index }(l-1)
$$

Our helper function, `num_ones_until(n, idx)`, computes the same, recursively as follows:

1. If `idx` equals the length of the final list for $n$, return the total number of 1s for $n$
2. If `idx` equals the length of the final list for $\lfloor n/2 \rfloor$ + 1, return the number of 1s in $\lfloor n/2 \rfloor$ plus $n \bmod 2$
3. If `idx` is less than or equal to the length of the final list for $\lfloor n/2 \rfloor$, recurse with $\lfloor n/2 \rfloor$ and the same `idx`
4. Otherwise, return the number of 1s in $\lfloor n/2 \rfloor$ plus $n \bmod 2$ plus the number of 1s in the remaining part

### Time Complexity

- Precomputation: $O(\log n)$ since we have a recursive function that divides $n$ by 2 each time
- Query: $O(\log n)$ for a similar reason
- Overall: $O(\log n)$

### Space Complexity

$O(\log n)$ for storing the precomputed values and the recursion stack.

## Code

```cpp
map<ll, pll> ones;

// Precomputes the length and number of ones for each value
void precomp(ll n) {
  if (n <= 1) {
    ones[n] = make_pair(1, n);
    return;
  }
  precomp(n / 2);
  int mid_bit = n % 2;
  ll sz = 1 + 2 * ones[n / 2].first;    // Total length
  ll one_sz = mid_bit + 2 * ones[n / 2].second;  // Total number of ones
  ones[n] = make_pair(sz, one_sz);
}

// Returns number of ones up to index idx in the final list for n
ll num_ones_until(ll n, ll idx) {
  if (idx == ones[n].first)
    return ones[n].second;
  if (idx == ones[n / 2].first + 1)
    return n % 2 + ones[n / 2].second;
  if (idx <= ones[n / 2].first)
    return num_ones_until(n / 2, idx);
  return ones[n / 2].second + n % 2 +
         num_ones_until(n / 2, idx - ones[n / 2].first - 1);
}

void solve() {
  ll n, l, r;
  cin >> n >> l >> r;
  precomp(n);
  ll ans = num_ones_until(n, r);
  if (l > 1)
    ans -= num_ones_until(n, l - 1);
  cout << ans << endl;
}
```

## Related

- [[6 Problems/christmas\|christmas]]
