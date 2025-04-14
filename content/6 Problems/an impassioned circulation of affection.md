---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/814/C","PassFrontmatter":true,"created":"2025-02-02T11:27:52.325+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]
> - [[dynamic programming\|dynamic programming]]
> - [[2 Zettels/precomputation techniques\|precomputation techniques]]

- **Input:** A string (garland) of length `n`, where each position has a color
- **Queries:** Each query gives:
  - A number `m` indicating the maximum pieces you can repaint
  - A target color `c` (Koyomi’s favorite)
- **Goal:** For each query, determine the maximum length of a contiguous segment (subsegment) that can be made entirely of color `c` by repainting at most `m` pieces

## Idea

### Key Observations

- If a segment already has many pieces of color `c`, you need fewer repaints to convert the whole segment, e.g: `komodoo` with 2 repaints -> `koooooo`
- You want to balance the window size (segment length) with the repainting limit `m` such that the number of non-`c` pieces in the window does not exceed `m`

### Approach 1 (Sliding Window)

Use two pointers (`l` and `r`) to maintain a window. Increase `r` (expanding the window) until you would need more than `m` repaints (i.e., the count of pieces not equal to `c` exceeds `m`). Then, update the maximum length (aka Koyomity) and move `l` to reduce the repaint cost.

- **Time Complexity:** $O(n)$ per query, so overall $O(nq)$ for all queries
- **Code Mechanics:** The inner loop increments `r` while decreasing `max_repaint` when a non-`c` is encountered, and the outer loop shifts `l` while "restoring" a repaint opportunity if the left element was not `c` (typical sliding window)

### Approach 2 (Sliding Window + Prefix Sums)

Precompute prefix sums for each color, so you can quickly calculate how many occurrences of the target color exist in any subsegment. Then use a sliding window to check if a segment can be made uniform with at most `m` repaints. Optimization over previous approach.

- **Time Complexity:** $O(26n+nq)=O(n(26 + q))$
- **Code Mechanics:** It calculates `c_count` (number of target color pieces in the current window) and compares it with the window length plus available repaints to decide if the window is valid

### Approach 3 (Dynamic Programming)

Use a 3D DP array where `dp[i][j][k]` represents the best (maximum) subsegment length achievable considering the first `i` pieces, having used `j` repaints, and focusing on the target color `k`.

- **DP Logic** When adding a new character, you either:
  - Repaint it (using one repaint) if it's not `c`.
  - Or if it’s already `c`, you can extend the segment without using a repaint.
- **Time Complexity:**  
   This approach is more heavy-weight (around $O(n^2 \cdot 26)$), so it’s suitable when you need to precompute answers for a large number of queries.
- **Code Mechanics:**  
   It carefully updates the DP states considering both painting and saving repaints when the character matches the target.

Each approach has its trade-offs:

- The **sliding window methods** are direct and efficient for a moderate number of queries.
- The **DP method** is more precomputation-heavy but can answer many queries quickly once the table is built.

> [!Tip]
> Few other approaches/optimizations:
>
> - Using [[binary search\|binary search]] on ans for each query (to find max segment) and checking each candidate ans via sliding window
> - Since we only have 26 chars and m <= n, thus we can have atmost `26*n` unique queries, i.e. many queries will be duplicated => **cache the answers**!!

## Code

```cpp
// Approach 1 (sliding window)
void solve() {
  int n;
  cin >> n;
  string s;
  cin >> s;

  int q;
  int m, l, r, runner, best;
  char c;

  cin >> q;
  while (q--) {
    cin >> m >> c;
    l = r = 0;
    best = runner = 0;
    for (; r < n; r++) {
      runner += (s[r] != c);
      // shrink from left
      while (runner > m) {
        runner -= s[l] != c;
        l++;
      }

      best = max(best, r - l + 1);
    }

    cout << best << '\n';
  }
}

// Approach 2 (Sliding window + Precomputation)
void solve() {
  int n;
  cin >> n;
  string s;
  cin >> s;
  s = "#" + s;

  // precomputation
  vector<vector<int>> dp(26, vector<int>(n + 1, 0));
  for (int i = 0; i < 26; ++i) {
    for (int j = 1; j <= n; ++j) {
      dp[i][j] = (s[j] == 'a' + i) + dp[i][j - 1];
    }
  }

  int q;
  int m, l, r, count_c, best;
  char c;

  cin >> q;
  while (q--) {
    cin >> m >> c;
    l = r = 1;
    best = count_c = 0;
    for (; r <= n; ++r) {
      count_c = dp[c - 'a'][r] - dp[c - 'a'][l - 1];
      // shrink from left
      while (count_c + m < r - l + 1) {
        l++;
        count_c = dp[c - 'a'][r] - dp[c - 'a'][l - 1];
      }
      best = max(best, r - l + 1);
    }
    cout << best << '\n';
  }
}

// Approach 3 (DP)
void solve() {
  int n;
  string s;
  cin >> n >> s;

  // dp[color][repaints][position] represents the longest sequence ending at
  // position after using exactly 'repaints' changes to make color sequences
  vector<vector<vector<int>>> dp(26,
                                 vector<vector<int>>(n + 1, vector<int>(n)));
  vector<vector<int>> maxLen(
      26, vector<int>(n + 1)); // Store maximum achievable lengths

  for (int color = 0; color < 26; ++color) {
    char targetColor = 'a' + color;

    // Base case: no repaints allowed
    for (int pos = 0; pos < n; ++pos) {
      dp[color][0][pos] = (s[pos] == targetColor)
                              ? (pos > 0 ? dp[color][0][pos - 1] : 0) + 1
                              : 0;
      maxLen[color][0] = max(maxLen[color][0], dp[color][0][pos]);
    }

    // For each number of allowed repaints
    for (int repaints = 1; repaints <= n; ++repaints) {
      for (int pos = 0; pos < n; ++pos) {
        if (s[pos] == targetColor) {
          // No need to repaint this position
          dp[color][repaints][pos] =
              (pos > 0 ? dp[color][repaints][pos - 1] : 0) + 1;
        } else {
          // Either repaint this position or take previous best
          dp[color][repaints][pos] =
              (pos > 0 ? dp[color][repaints - 1][pos - 1] : 0) + 1;
        }
        maxLen[color][repaints] =
            max(maxLen[color][repaints], dp[color][repaints][pos]);
      }
    }
  }

  int q;
  cin >> q;
  while (q--) {
    int m;
    char c;
    cin >> m >> c;
    cout << maxLen[c - 'a'][m] << '\n';
  }
}
```

## Related
