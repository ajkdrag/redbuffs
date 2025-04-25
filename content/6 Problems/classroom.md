---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-03-22T11:43:22.274+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]

Vivek has built a new classroom with $N$ seats. The seats are located along a straight line at positions $x_1, x_2, \dots, x_N$. Vivek has to assign seats to $K$ students such that a seat can be assigned to at most 1 student and the minimum distance between any two students is as large as possible. Find the largest minimum distance possible.

## Idea

This problem is a classic application of the [[2 Zettels/binary search boolean array framework\|binary search boolean array framework]]. We are searching for the largest minimum distance possible between any two students. The key observation is that the feasibility of a minimum distance is monotonic.

If a minimum distance of $X$ is possible by assigning seats to $K$ students, then it is possible to have a minimum distance less than $X$ as well. This suggests the boolean array pattern `[T, T, ..., T, F, F, ..., F]` (where `T` represents feasible and `F` represents infeasible), suitable for binary search. We want to find the transition point, i.e., the largest `T`.

We are doing binary search on the largest minimum adjacent distance possible.

1.  **Sort the seat positions**
2.  **Define the search space**:
    - `lo = 1` (minimum possible distance, since a seat can be assigned to at most 1 student)
    - `hi = arr[N-1] - arr[0]` (maximum possible distance, the difference between the farthest seats)
3.  **Binary search**:
    - Calculate `mid = lo + (hi - lo) / 2`
    - Use a greedy approach (described below) to check how many students can be seated with a minimum separation of `mid`
    - If the number of students seated is $\geq K$, then `mid` is a potential answer, so search for a larger distance: `lo = mid + 1`
    - Otherwise, we need to reduce the minimum distance to accommodate more students: `hi = mid - 1`

### Greedy Check Function

The `check(mid, arr, k)` function determines whether it's feasible to seat at least `k` students with a minimum distance of `mid` using a greedy approach. The function iteratively places students, ensuring each new student is at least `mid` distance away from the previously seated student. It uses `lower_bound` to efficiently find the next available seat that meets the minimum distance criteria.

1.  Start with the first student in the **first** seat.
2.  In each iteration, find the next seat that is at least `mid` distance away from the current student's seat using `lower_bound`.
3.  If such a seat is found, seat a student there and repeat.
4.  The function returns whether the total number of seated students is at least `k`.

### Complexity Analysis

- **Time Complexity:** $O(N \log D + N \log N)$, where:
  - $D$ is the difference between the largest and smallest seat positions. The `check` function uses `lower_bound` in a loop that iterates at most N times during the binary search, contributing $O(N)$ to each step
  - $O(N \log N)$ is the time complexity to sort the seat positions initially
- **Space Complexity:** $O(1)$ (excluding the input array)

## Code

```cpp
bool check(int mid, vector<int> arr, int k) {
  auto it_start = arr.begin();
  auto it_end = arr.end();

  int count = 1;
  while (it_start != it_end) {
    int curr = *it_start;
    int nearest = curr + mid;

    // search from next position onwards
    auto it = lower_bound(it_start + 1, it_end, nearest);
    if (it != it_end) {
      count++;
      // early return
      if (count >= k) return true;
    }
    it_start = it;
  }

  return count >= k;
}

void solve() {
  int n, k;
  cin >> n >> k;

  vector<int> arr(n);
  for (int i = 0; i < n; ++i) {
    cin >> arr[i];
  }

  sort(all(arr));

  int lo = 1;
  int hi = 1e9;
  int ans = 1;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid, arr, k)) {
      ans = mid;
      lo = mid + 1;
    } else
      hi = mid - 1;
  }

  cout << ans << '\n';
}
```

## Related

- https://www.spoj.com/problems/AGGRCOW/
  - Basically the same problem, reworded.
- [[6 Problems/minimise max diff\|minimise max diff]]
