---
{"publish":true,"created":"2025-03-27T12:53:42.327+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/contribution technique\|contribution technique]]
> - [[c++ STL\|c++ STL]]

Given $N$ integers $A_1, A_2, \dots, A_N$. Consider all possible pairs $(A_i, A_j)$ where $1 \le i < j \le N$. Calculate the product of each pair. Find the $K$-th smallest product among these $\frac{N(N-1)}{2}$ products.

## Idea

Since we are looking for the $K$-th smallest element in a sorted sequence (of products), [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] comes to mind. We can binary search on the possible range of product values to find the $K$-th smallest product.

### Approach 1

A core idea is to efficiently count how many pairs have a product less than or equal to a given candidate value $x$. Let's define a function `count_le(x, arr)` that returns the number of pairs $(arr[i], arr[j])$ with $i < j$ such that $arr[i] \times arr[j] \le x$. If `count_le(x, arr)` is greater than or equal to $k$, it means the $K$-th smallest product is less than or equal to $x$, otherwise, it's greater than $x$. This gives us the boolean condition needed for binary search.

To implement `count_le(x, arr)` efficiently, we first _sort_ the input array `arr`. For each element `current_val = arr[i]`, we want to count how many elements `arr[j]` (where $j > i$) satisfy `current_val * arr[j] <= x`.

- If `current_val > 0`: We need to find elements `arr[j]` such that `arr[j] * current_val <= x`. Since `arr` is sorted, we can use [[2 Zettels/partition_point in c++\|partition_point in c++]] to efficiently find the **index up to** which this condition holds (i.e. its contribution)
- If `current_val < 0`: The product `arr[j] * current_val` is decreasing (unlike the previous case), but we can still partition to find the **index from** which the condition `arr[j] * current_val <= x` holds.
- If `current_val == 0`: If $x \ge 0$, then all products with `current_val` will be $\le x$. If $x < 0$, no product with `current_val` will be $\le x$

**Time Complexity**: Sorting the array takes $O(N \log N)$. The binary search runs in $O(\log R)$ iterations, where $R$ is the range of possible product values. Inside the binary search, the `count_le` function iterates through the array ($O(N)$) and for each element, it uses `partition_point` (or similar binary search based functions) which takes $O(\log N)$. Thus, `count_le` takes $O(N \log N)$ time. The overall time complexity is $O(N \log N \log R)$. Since $R$ can be up to $\approx 10^{18}$, $\log R$ is still a constant factor in practice.

**Space Complexity**: Ignoring the space for input array, it comes to be $O(1)$ or $O(\log N)$ depending on the sorting implementation details.

### Approach 2

This approach aims to optimize or simplify the counting by handling number signs explicitly.
The number of pairs such that the products are $< 0$, or $\ge 0$ can be calculated easily, so it is determined whether the answer is negative, 0 or positive.
Similar to Approach 1, but here we separate out the negative and positive (including 0) numbers from the array and then based on the sign of the candidate val $x$, we count the pairs.

- If $x < 0$, we only need to consider pairs formed by taking one number from the `pos` array and one number from the `neg` array (original negative numbers)
- If $x \ge 0$, then pairs _within_ the `neg` (-ve times -ve = +ve) and `pos` (+ve times +ve = +ve) array contribute + _any_ pair made between `neg` and `pos` arrays will also contribute, since product of a -ve and +ve number is -ve and will always be $\le x$

For both cases, the count of valid pairs can be found using binary search (or even [[2 Zettels/two pointers technique\|two pointers technique]]). To make implementation simpler, it's wise to use absolute values of the negative integers and do the calculations.

Time complexity remains the same as previously ($O(n)$ extra space for storing the segregated negative and positive arrays).

## Code

```cpp
// Approach 1
ll count_le(ll x, const vector<int> &arr) {
  int n = arr.size();
  ll total_count_minus_self_pairs = 0;

  for (int i = 0; i < n; ++i) {
    ll current_val = arr[i];
    ll current_contribution = 0;

    if (current_val > 0) {
      auto it = partition_point(all(arr),
                                [&](int aj) { return current_val * aj <= x; });
      current_contribution = distance(arr.begin(), it);
    } else if (current_val < 0) {
      auto it = partition_point(all(arr),
                                [&](int aj) { return current_val * aj > x; });
      current_contribution = distance(it, arr.end());
    } else {
      current_contribution = (x >= 0) ? n : 0;
    }

    total_count_minus_self_pairs += current_contribution;

    if (1LL * current_val * current_val <= x) {
      total_count_minus_self_pairs--;
    }
  }

  return total_count_minus_self_pairs / 2;
}

bool check(ll x, const vector<int> &arr, ll k) { return count_le(x, arr) >= k; }

void solve() {
  int n;
  ll k;
  cin >> n >> k;
  vector<int> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  sort(all(arr));

  ll lo = -(1e18 + 5);
  ll hi = 1e18 + 5;
  ll ans = 0;

  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, arr, k)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  cout << ans << "\n";
}

// Approach 2
bool check(ll x, const vector<ll> &neg, const vector<ll> &pos, ll k) {

  ll count = 0;
  if (x < 0) {
    // pairs between neg and pos whose prod <= x
    // neg: [1, 2, 4, 5] (indicates: [-1, -2, -4, -5])
    // pos: [0, 3, 5]

    x = -x;
    for (auto &curr : neg) {
      ll lim = (x + curr - 1) / curr; // ceil
      auto it = lower_bound(all(pos), lim);
      // anything in range [it, ...] will lead to product <= x
      count += distance(it, pos.end());
    }

  } else {
    // pairs within pos whose prod <= x
    auto start = pos.begin();
    auto end = pos.end();
    while (start != end) {
      ll curr = *start;
      // need to handle 0 case separately since x/0 is undefined
      // 0 can be paired will all numbers to the right.
      if (curr == 0) {
        count += distance(start + 1, end);
      } else {
        ll lim = x / curr + 1;
        auto it = lower_bound(start + 1, end, lim);
        count += distance(start + 1, it);
      }
      start++;
    }

    // pairs within neg whose prod <= x
    // same logic as for for pos (as we took absolute values of -ve nums)
    start = neg.begin();
    end = neg.end();
    while (start != end) {
      ll curr = *start;
      ll lim = x / curr + 1;
      auto it = lower_bound(start + 1, end, lim);
      count += distance(start + 1, it);
      start++;
    }

    // all pairs between neg and pos will also be <= x
    count += (1LL * neg.size() * pos.size());
  }
  return count >= k;
}

void solve() {
  int n, x;
  ll k;
  cin >> n >> k;
  vector<ll> pos;
  vector<ll> neg;

  for (int i = 0; i < n; ++i) {
    cin >> x;
    if (x >= 0)
      pos.pb(x);
    if (x < 0)
      neg.pb(-x); // take abs value for simplicity in calc
  }

  sort(all(neg));
  sort(all(pos));

  ll lo = -(1e18 + 5);
  ll hi = 1e18 + 5;
  ll ans = 0;

  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, neg, pos, k)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  cout << ans << "\n";
}
```

## Related

- [[6 Problems/multiplication table\|multiplication table]]
