---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc186/tasks/abc186_d","PassFrontmatter":true,"created":"2025-02-23T18:52:27.219+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/contribution technique\|contribution technique]]
> - [[basic arithmetic\|basic arithmetic]]

The problem asks us to calculate the sum of differences for all pairs $(i, j)$ such that $i < j$ in a given array.

## Idea

We can employ the contribution technique to determine how each element contributes to the final sum. Instead of focusing on pairs, we consider each element $arr[i]$ individually and figure out its net contribution to the total sum of differences. Let's first sort the array, as done in the code, which simplifies our analysis. In a sorted array, for any pair of indices $(i, j)$ with $i < j$, we know that $arr[i] \le arr[j]$.

In the sum, $arr[k]$ will be added when it is the $j^{th}$ element in a pair $(i, j)$ with $i < j = k$. If $j=k$, then $i < k$, so $i$ can be $0, 1, ..., k-1$. So, there are $k$ values of $i$. Thus, $arr[k]$ is added $k$ times.

Now, when is $arr[k]$ subtracted? $arr[k]$ is subtracted when it is the $i^{th}$ element in a pair $(i, j)$ with $i = k < j$. Then $j$ can be $k+1, k+2, ..., n-1$. There are $(n - 1 - k)$ such values of $j$. Thus, $arr[k]$ is subtracted $(n - 1 - k)$ times. So, the net contribution of $arr[k]$ is:

$$
\begin{align*}
\text{contrib(k)} &= arr[k] \times (\text{times added} - \text{times subtracted}) \\
&= arr[k] \times (k - (n - 1 - k)) \\
&= arr[k] \times (2k - n + 1)
\end{align*}
$$

Therefore, the total sum of differences is $\sum_{i=0}^{n-1} arr[i] \times (2i - n + 1)$, where $arr$ is the sorted array. If the array is already sorted or sorting can be done in linear time (e.g., count sort for a limited range), the overall complexity becomes $O(n)$, otherwise $O(n \log n)$.

## Code

```cpp
void solve() {
  int n;
  cin >> n;
  vector<ll> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  sort(all(arr));

  ll res = 0;
  for (int i = 0; i < n; ++i) {
    res += (arr[i] * (2 * i - n + 1));
  }
  cout << res << endl;
}

```

## Related
