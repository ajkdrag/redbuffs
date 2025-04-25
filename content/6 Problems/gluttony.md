---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc144/tasks/abc144_e","PassFrontmatter":true,"created":"2025-03-26T20:57:42.067+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]
> - [[binary search\|binary search]]

Given $N$ members with consumption coefficients $A_i$ and $N$ foods with difficulties $F_i$, find the minimum possible score of the team. The score is the maximum time it takes a member to finish their assigned food ($time = A_i * F_i$). You can train members to reduce their consumption coefficient by 1 (but not below 0), with a total of $K$ training sets available. Assign any one member to each food, and each member to only one food.

## Idea

The problem asks us to minimize the maximum time taken by any member. This "minimize the maximum" structure strongly suggests using [[binary search\|binary search]]. We can binary search on the possible range of the "maximum time", let's call it $t$. For a given time $t$, we need to check if it's feasible to assign foods to members and distribute training such that no member takes more than time $t$.

To **check feasibility** for a given time $t$, we iterate through each member and food pair. For each pair $(A_i, F_i)$, the time taken is initially $A_i \times F_i$. If this time exceeds $t$, we need to reduce the member's consumption coefficient $A_i$ through training. The required reduction is $training\_needed = A_i - \lfloor t / F_i \rfloor$. If $training\_needed$ is greater than the remaining training sets $K$, then it's impossible to achieve time $t$, and the `check` function returns `false`. Otherwise, we subtract $training\_needed$ from $K$ and continue. If we can process all members and foods without exceeding the training limit $K$, then time $t$ is feasible, and the `check` function returns `true`.

The **greedy approach** of sorting `coeffs` in ascending order and `foods` in descending order (or vice versa) is crucial for optimality. Consider two members with coefficients $A_1 < A_2$ and two foods with difficulties $F_1 > F_2$. We want to minimize $\max(A_1F_{p_1}, A_2F_{p_2})$ where $(p_1, p_2)$ is a permutation of $(1, 2)$.

If we pair them as $(A_1, F_1)$ and $(A_2, F_2)$, the times are $A_1F_1$ and $A_2F_2$. If we pair them as $(A_1, F_2)$ and $(A_2, F_1)$, the times are $A_1F_2$ and $A_2F_1$. Since $A_1 < A_2$ and $F_2 < F_1$, it's generally better to pair the smaller coefficient with the larger food difficulty and the larger coefficient with the smaller food difficulty to balance out the times and reduce the maximum. Therefore, sorting the consumption coefficients in ascending order and food difficulties in descending order (or vice versa) and pairing them up is a [[2 Zettels/greedy algorithm\|greedy strategy]] that leads to the optimal assignment before applying training.

### Complexity

- **Time Complexity**: $O(N \log N + N \log M)$, where $N$ is the number of members (and foods), and $M$ is the maximum possible score (range for binary search). The $N \log N$ term comes from sorting, and $N \log M$ from the binary search (with $O(N)$ check function).
- **Space Complexity**: $O(1)$ (no extra space except space to store the arrays).

## Code

```cpp
bool check(ll t, vector<int> coeffs, vector<int> foods, ll k) {
  for (int i = 0, n = int(coeffs.size()); i < n; ++i) {
    ll coeff = coeffs[i];
    ll food = foods[i];
    if (food * coeff > t) {
      ll training_needed = coeff - t / food;
      if (training_needed > k)
        return false;
      k -= training_needed;
    }
  }
  return true;
}

void solve() {
  int n;
  ll k;
  cin >> n >> k;
  vector<int> coeffs(n);
  vector<int> foods(n);

  for (int i = 0; i < n; ++i) {
    cin >> coeffs[i];
  }

  for (int i = 0; i < n; ++i) {
    cin >> foods[i];
  }

  // optionally: one can sort coeffs in descending order
  // and foods in ascending order
  sort(all(coeffs));
  sort(all(foods), greater<int>());

  // if the sorting were done vice-versa, hi = 1LL * coeffs[0] * foods[n-1]
  ll lo = 0;
  ll hi = 1LL * coeffs[n - 1] * foods[0];
  ll ans = hi;
  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;
    if (check(mid, coeffs, foods, k)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  cout << ans << endl;
}
```

## Related
