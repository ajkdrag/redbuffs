---
{"publish":true,"tags":["type/problem"],"platform":"Naukri","link":"https://www.naukri.com/code360/problems/painter-s-partition-problem_1089557?leftPanelTabValue=PROBLEM","PassFrontmatter":true,"created":"2025-03-11T13:20:11.061+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/greedy algorithms\|greedy algorithms]]

We need to paint `n` boards of lengths `{A₁, A₂, ..., Aₙ}` using `k` painters. Each painter can paint a contiguous segment of boards and takes 1 unit time per unit length. Determine the minimum time required to paint all boards under the constraints:

1. Each board is painted by exactly one painter
2. Each painter paints contiguous boards

## Idea

The problem can be solved efficiently using **binary search** on the possible answer space (time T). This is **monotonic**:

- If **T = X** is feasible, all **T' > X** are also feasible
- Thus, the smallest feasible **T** can be found via [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]

The value of T must lie between two bounds:

- Lower Bound (`lo`): The length of the largest board, since a painter must fully paint this board
- Upper Bound (`hi`): The sum of all board lengths, which corresponds to one painter doing all the work

We perform binary search in this range. For each candidate value **mid** (current guess for **T**), we check if it's possible to partition the array into at most **k** contiguous segments where each segment's sum does not exceed **mid**. If possible, we try to find a smaller **T**; otherwise, we increase **T**.

### Check Function

The `check` function verifies if a given **mid** (candidate **T**) is feasible. It _greedily_ assigns boards to painters, ensuring that no painter's total exceeds **mid**:

1. Traverse the boards, accumulating their lengths into a running total
2. If adding the next board exceeds **mid**, start a new painter and reset the total
3. If all boards are assigned within **k** painters, **mid** is feasible (even if some painters are left no problem for us, since our goal is finish painting in given time with **k** painters)

**Time Complexity**: $O(n \log S)$ where $S$ is the range of our binary search (hi - lo), roughly close to sum of all board lengths.
**Space Complexity:** $O(1)$

> [!Tip]
> Alternative way to think about binary search: check if for each `mid` (candidate time), how many painters are required to paint **all** the boards. If this count is ≤ `k`, then we set `ans` to `mid` and try to find a smaller time T; otherwise we increase T. In our original solution, we were trying to check if within time `mid`, _can we_ paint all the boards using atmost `k` painters. Same thing but different POV.

## Code

```cpp
bool check(ll mid, vector < int > & arr, int k) {
  int i = 0;
  ll total = 0;
  do {
    if (total + arr[i] > mid) {
      total = 0;
      k--;
    } else {
      total += arr[i++];
    }

  } while (i < int(arr.size()) and k > 0);

  return i == int(arr.size());
}

int findLargestMinDistance(vector < int > & boards, int k) {
  ll lo = 0;
  ll hi = 0;
  int n = boards.size();
  for (int i = 0; i < n; ++i) {
    lo = max(lo, ll(boards[i]));
    hi += boards[i];
  }

  ll ans = hi;
  while (lo <= hi) {
    ll mid = lo + (hi - lo) / 2;

    if (check(mid, boards, k)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }
  return ans;
}

```

## Related

- [[6 Problems/minimize max dist to gas station\|minimize max dist to gas station]]
