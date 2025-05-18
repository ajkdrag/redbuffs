---
{"publish":true,"created":"2025-01-31T14:43:18.114+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

- Given n students with smartness values `a[i]`
- m topics numbered 1 to m
- Student i is proficient in topic T if `a[i] mod T = 0`
- Find a team where:
  - For each topic, at least one team member is proficient
  - Minimize the maximum difference in smartness between any two team members

## Idea

Let's use a [[sliding window\|sliding window]] technique on sorted smartness values to track how many topics are being covered as we add and remove a student.

As we expand the team by moving the right pointer, we check the factors of each student's smartness to determine which topics they help cover. If all topics are covered, we calculate the difference between the highest and lowest smartness values in the current team. Then, we attempt to reduce the size of the team from the left to see if the range can be further minimized while still covering all topics.

**Algorithm steps**

- **Preprocessing**: Sort students by smartness
  - For each student, find all factors of their smartness value that are <= m
- **Sliding Window**:
  - Use two pointers (l, r) to maintain a window of students
  - For a valid team, difference is `a[r] - a[l]` (we want to minimize this)
  - For each window:
    - Track count of students proficient in each topic using `counts[]`
    - Track total number of covered topics (`runner`)
  - When window covers all topics, i.e. `runner == m`:
    - Update minimum difference: `best = min(best, arr[r] - arr[l])`
    - Try shrinking window from left
  - When adding student to window (right side):
    - Find all factors <= m of their smartness
    - Increment `counts` for each factor
    - If `counts[factor]` changes 0 to 1, increment `runner`
  - When removing student from window (left side):
    - Decrement `counts` for each factor
    - If `counts[factor]` changes 1 to 0, decrement `runner`

**Time Complexity**

- Sorting: $O(n \log n)$
- Factor calculation: $O(n \cdot \sqrt{\text{max\_ai}})$
- Sliding window: $O(n \cdot \text{max\_factors})$
- Overall: $O(n \cdot (\log n + \sqrt{\text{max\_ai}}))$

## Code

```cpp
void solve(){
  int n, m;
  cin >> n >> m;

  vector<int> arr(n);
  for (int i = 0; i < n; ++i)
    cin >> arr[i];
  sort(all(arr));

  // get all factors <= m, for each element
  vector<vi> factors(n);
  int curr;
  for (int i = 0; i < n; ++i) {
    curr = arr[i];
    for (ll j = 1; j * j <= curr; ++j) {
      if (j > m)
        break;
      if (curr % j == 0) {
        factors[i].pb(j);
        if (j * j != curr and curr / j <= m)
          factors[i].pb(curr / j);
      }
    }
  }

  // sliding window
  int runner = 0;
  int best = INT_MAX;
  int l = 0;
  vector<int> counts(m + 1);

  for (int r = 0; r < n; ++r) {
    for (int &f : factors[r]) {
      if (counts[f] == 0) {
        runner++;
      }
      counts[f]++;
    }

    while (runner == m) {
      best = min(best, arr[r] - arr[l]);
      // shrink
      for (int &f : factors[l]) {
        counts[f]--;
        if (counts[f] == 0) {
          runner--;
        }
      }
      l++;
    }
  }

  cout << (best == INT_MAX ? -1 : best) << '\n';
}
```

## Related
