---
{"publish":true,"created":"2025-02-26T11:01:00.398+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/prefix sums\|prefix sums]]

We are given a boolean array $a$ of length $n$. We are allowed to perform **exactly one operation**: choose a range $[i, j]$ (where $1 \le i \le j \le n$) and flip all the values within this range. Flipping a value $x$ means changing it to $1-x$ (i.e., 0 becomes 1, and 1 becomes 0). The goal is to maximize the total number of ones in the array after performing exactly one flip operation.

## Idea

### Approach 1: Brute Force

The most straightforward approach is to try all possible valid ranges $[i, j]$ for the flip operation. For each range, we perform the flip, count the number of ones in the resulting array, and keep track of the maximum count encountered so far.

To efficiently count the number of ones and zeros in ranges, we can utilize the prefix sum array. Let's define a prefix sum array $cum$ where $cum[k+1] = \sum_{l=0}^{k} a_l$ for $k \ge 0$, and $cum[0] = 0$. Then, $cum[k+1]$ stores the count of ones in the prefix $a_0, a_1, ..., a_{k}$.

Using the prefix sum array, we can quickly calculate the number of ones within any range $[i, j]$ in the original array. The number of ones in the range $[i, j]$ (inclusive, 0-based indexing) is given by $ones = cum[j+1] - cum[i]$. The number of zeros in the range $[i, j]$ is simply the length of the range minus the number of ones, which is $(j - i + 1) - ones$. After flipping, all zeros become ones and all ones become zeros in this range. So, in the range $[i, j]$ after flipping, we will have $zeros$ ones and $ones$ zeros.

Outside the range $[i, j]$, the values remain unchanged. The number of ones to the left of index $i$ (indices $0, 1, \ldots, i-1$) is $left\_range\_ones = cum[i]$. The number of ones to the right of index $j$ (indices $j+1, j+2,\ldots, n-1$) is $right\_range\_ones = cum[n] - cum[j+1]$.

Total ones after flip:

$$
cum[i] + (cum[n] - cum[j+1]) + ((j - i + 1) - ones)
$$

We can iterate through all possible start indices $i$ from 0 to $n-1$ and end indices $j$ from $i$ to $n-1$. For each pair $(i, j)$, we calculate the total number of ones after flipping the range $[i, j]$ using the formula above and update the maximum number of ones found so far. We can initialize our result with the number of zeros in the original array, $n - cum[n]$, as a starting lower bound (as we want to at least achieve this number of ones by flipping entire array) and then try to maximize from there.

**Time complexity:** $O(n^2)$
**Space complexity:** $O(n)$

### Approach 2: Optimizing the Brute Force to Linear Time

For a given flip range $[i, j]$ ($0 \le i \le j \le n-1$), the number of ones in the modified array is given by:
$$ \text{ones} = cum[n] + (j - i + 1) - 2 \times (cum[j+1] - cum[i]) $$
Our goal is to maximize this expression by choosing the optimal range $[i, j]$.

Let's rewrite the expression for clarity:
$$ V(i, j) = (j - i + 1) - 2 \times (cum[j+1] - cum[i]) $$
We want to maximize $cum[n] + V(i, j)$ over all possible $0 \le i \le j \le n-1$. Since $cum[n]$ is constant, we need to maximize $V(i, j)$.

We can fix the ending index $j$ and then find the optimal starting index $i \le j$ that maximizes $V(i, j)$. For a fixed $j$, let's analyze $V(i, j)$ as a function of $i$:
$$ V(i, j) = (j + 1 - 2 \times cum[j+1]) + (-i + 2 \times cum[i]) $$
Let $C_j = j + 1 - 2 \times cum[j+1]$ (which is constant for a fixed $j$). And let $K(i) = -i + 2 \times cum[i]$. Then $V(i, j) = C_j + K(i)$. To maximize $V(i, j)$ for a fixed $j$ and varying $i \le j$, we need to maximize $K(i)$ for $0 \le i \le j$.
Let $M(j) = \max_{0 \le i \le j} K(i)$. Then the maximum value of $V(i, j)$ for a fixed $j$ is $M(j) + C_j$.

We can precompute $K(i) = -i + 2 \times cum[i]$ for all $i$ from $0$ to $n-1$. Then, we can compute the prefix maximum of $K(i)$. Let $M[j] = \max_{0 \le i \le j} K(i)$. We can calculate $M[j]$ iteratively: $M[0] = K(0)$, and for $j > 0$, $M[j] = \max(M[j-1], K(j))$.

Finally, we can iterate through all possible ending indices $j$ from $0$ to $n-1$. For each $j$, calculate $C_j = j + 1 - 2 \times cum[j+1]$, the maximum number of ones after a flip ending at index $j$ is $cum[n] + M[j] + C_j$. We take the maximum of these values over all $j$.

**Time complexity:** $O(n)$
**Space complexity:** $O(n)$

### Approach 3: Using Kadane's Algorithm

The core idea is to reframe the problem of maximizing ones after a flip into finding a maximum subarray sum and solve using [[kadane's algorithm\|kadane's algorithm]]

Let's consider the effect of flipping a bit.

- If we flip a 0, it becomes a 1, increasing the number of ones by 1 (i.e. +1)
- If we flip a 1, it becomes a 0, decreasing the number of ones by 1 (i.e. -1)

We can represent this change numerically. For each element $x$ in the original array, we transform it into a value $x'$ such that $x'$ represents the _change_ in the number of ones when we flip $x$.

We define the transformation as (you can verify it works, by putting 0 and 1):
$$ x' = 1 - 2x $$
So, we create a new transformed array $b$ where $b_i = 1 - 2a_i$.

Now, if we flip a subarray $[i, j]$ in the original array $a$, the _net change_ in the total number of ones is the sum of the transformed values $b_k$ for $k$ in the range $[i, j]$. Our goal is to find the subarray flip that maximizes the number of ones. This is same as finding the [[max subarray sum\|max subarray sum]] in $b$. We can solve this using any linear time algo such as Kadane's algorithm.

Let $S_{max}$ be the maximum subarray sum found. Let $O$ be the original number of ones in array $a$. Then, the maximum number of ones we can achieve after one flip is $O + S_{max}$.

**Time complexity:** $O(n)$
**Space complexity:** $O(n)$

## Code

```cpp
// Approach 1: O(n^2) Brute force + prefix sums
void solve() {
  int n;
  cin >> n;
  vector<int> arr(n);
  vector<int> cum(n + 1);
  cum[0] = 0;
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    cum[i + 1] = cum[i] + arr[i];
  }

  int res = n - cum[n];
  for (int i = 0; i < n; ++i) {
    for (int j = i; j < n; ++j) {
      int ones = cum[j+1] - cum[i];
      int zeros = j - i + 1 - ones;
      int left_range_ones = cum[i];
      int right_range_ones = cum[n] - cum[j+1];
      res = max(res, left_range_ones + right_range_ones + zeros);
    }
  }

  cout << res << endl;
}


// Approach 2: O(n) (Mathematical optimization of Brute force)
void solve() {
  int n;
  cin >> n;
  vector<int> arr(n);
  vector<int> cum(n + 1, 0);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
    cum[i + 1] = cum[i] + arr[i];
  }

  vector<int> k_values(n);
  for (int i = 0; i < n; ++i) {
    k_values[i] = -i + 2 * cum[i];
  }

  vector<int> m_values(n);
  m_values[0] = k_values[0];
  for (int i = 1; i < n; ++i) {
    m_values[i] = max(m_values[i - 1], k_values[i]);
  }

  int max_ones = n - cum[n]; // Initial number of zeros

  for (int j = 0; j < n; ++j) {
    int c_j = (j + 1) - 2 * cum[j + 1];
    int current_ones = cum[n] + m_values[j] + c_j;
    max_ones = max(max_ones, current_ones);
  }

  cout << max_ones << endl;
}


// Approach 3: O(n) Kadane's algo
void solve() {
  int n;
  cin >> n;
  vector<int> a(n);
  int original_ones = 0;
  for (int i = 0; i < n; ++i) {
    cin >> a[i];
    if (a[i] == 1) {
      original_ones++;
    }
  }

  vector<int> b(n);
  for (int i = 0; i < n; ++i) {
    b[i] = 1 - 2 * a[i];
  }

  int max_so_far = b[0];
  int current_max = b[0];

  for (int i = 1; i < n; ++i) {
    current_max = max(b[i], current_max + b[i]);
    max_so_far = max(max_so_far, current_max);
  }

  cout << original_ones + max_so_far << endl;
}

```

## Related

- [[6 Problems/consecutive one\|consecutive one]]
