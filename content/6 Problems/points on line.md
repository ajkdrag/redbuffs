---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/251/A","PassFrontmatter":true,"created":"2025-03-12T13:47:08.367+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]
> - [[binary search\|binary search]]
> - [[combinatorics\|combinatorics]]

We're given `n` points on the x-axis and a maximum distance `d`. A triplet is valid if the difference between the largest and smallest point in the triplet is at most `d`. Count valid triplets of points.

## Idea

We need to count the number of ways to pick three distinct points $(x_i, x_j, x_k)$ such that the distance between the farthest two does not exceed $d$. For each rightmost point $x_i$, we need to count how many previous points $x_j$ and $x_k$ can form a valid triplet.

### Approach 1: Sliding Window

We maintain a sliding window with two pointers:

- The right pointer $i$ iterates through the points.
- The left pointer $left$ moves forward to ensure that $x_i - x_{left} \leq d$.

At each step, we count the number of valid pairs $(x_j, x_k)$ between $left$ and $i-1$. The number of ways to pick two elements from this range is:

$$
\frac{(count \times (count - 1))}{2}
$$

where $count = i - 1 - left + 1$. This efficiently calculates all valid triplets in $O(n)$ time.

### Approach 2: Binary Search

Instead of using two pointers, we can use binary search (**lower bound**) to efficiently find the smallest index $left$ such that $x_i - x_{left} \leq d$. This allows us to find the range of valid points in $O(\log n)$ per iteration, leading to an overall complexity of $O(n \log n)$.

Both approaches are efficient, but two pointers is often simpler and runs in linear time.

## Code

```cpp
// Approach 1 (Sliding window)
void solve() {
  int n, d;
  cin >> n >> d;

  ll ans = 0;
  ll curr = 0;
  int left = 0;
  vector<ll> arr;
  arr.pb(INT_MIN);
  for (int i = 1; i <= n; ++i) {
    cin >> curr;
    arr.pb(curr);

    while (left < i and curr - arr[left] > d) {
      left++;
    }

    int choices = (i - 1 - left + 1);
    ans += (1LL * choices * (choices - 1)) / 2;
  }

  cout << ans << endl;
}

// Approach 2 (Binary search)
void solve() {
  int n, d;
  cin >> n >> d;

  ll ans = 0;
  ll curr = 0;
  vector<ll> arr;
  arr.pb(INT_MIN);

  for (int i = 1; i <= n; ++i) {
    cin >> curr;
    arr.pb(curr);

    auto it = lower_bound(all(arr), curr - d);
    int left = distance(arr.begin(), it); // gives index
    if (left == i) {
      continue;
    }
    int choices = (i - 1 - left + 1);
    ans += (1LL * choices * (choices - 1)) / 2;
  }

  cout << ans << endl;
}
```

## Related
