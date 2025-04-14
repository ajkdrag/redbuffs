---
{"publish":true,"tags":["type/problem"],"platform":"UVa","link":"https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2408","PassFrontmatter":true,"created":"2025-03-26T16:25:25.940+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]

A conveyor belt has $n$ vessels with different milk capacities. You need to pour the milk into $m$ containers, following these constraints:

- Milk from a vessel must be completely poured into one container.
- Vessels must be processed in order from the conveyor belt.
- The $i$-th container can only be filled with vessels appearing before those filling the $j$-th container (for $i < j$).

Given `m` containers, find the minimal possible capacity for the container with the maximum capacity, ensuring all milk from the vessels is poured into containers.

## Idea

We can use [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]] to find the minimum capacity. The search space will be between the maximum capacity of any single vessel and the sum of capacities of all vessels. In each step, we check if it's possible to fill `m` containers such that no container exceeds the current mid capacity value. If it's possible, we try to reduce the capacity. Otherwise, we increase the capacity.

The time complexity will be $O(n \log(\sum_{i=0}^{n} a_i))$, where $n$ is the number of vessels and $a_i$ is the capacity of the $i$-th vessel. This is because we are performing a binary search on the range of possible capacities, and for each capacity, we iterate through all the vessels to check if it's possible to fill the containers.

Space complexity is $O(1)$, as we're only using a constant amount of extra space.

## Code

```cpp
bool check(ll cap, vector<int> arr, int m) {
  int count = 1;
  ll runner = 0;
  for (auto &x : arr) {
    if (runner + x > cap) {
      count++;
      runner = x;
    } else {
      runner += x;
    }
  }

  return count <= m;
}

void solve() {
  int n, m;
  while (cin >> n >> m) {
    vector<int> arr(n);
    ll sum = 0;
    ll lo = INT_MIN;
    for (int i = 0; i < n; ++i) {
      cin >> arr[i];
      sum += arr[i];
      lo = max(int(lo), arr[i]);
    }

    ll hi = sum;
    ll ans = hi;

    while (lo <= hi) {
      ll mid = lo + (hi - lo) / 2;
      if (check(mid, arr, m)) {
        ans = mid;
        hi = mid - 1;
      } else
        lo = mid + 1;
    }

    cout << ans << '\n';
  }
}
```

## Related

- [[6 Problems/magazine ad\|magazine ad]]
- [[6 Problems/painter's partition problem\|painter's partition problem]]
