---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/803/D","PassFrontmatter":true,"created":"2025-03-13T14:06:47.059+05:30"}
---


> [!Topics]
>
> - [[binary search\|binary search]]
> - [[2 Zettels/greedy algorithm\|greedy algorithm]]

The problem asks us to minimize the width of an advertisement text, given a maximum line count $k$. We can wrap lines at spaces or hyphens within words.

## Idea

The core idea is to use **binary search** on the possible ad widths (answer space). This works because if for width $w$, we can't format the ad in atmost $k$ lines, then anything smaller than $w$ will not work as well (so, _try increasing width_). Similarly, if $w$ works, then anything greater than $w$ will also work, but since we want the min width, _try decreasing width_. Thus, we can observe **monotonicity** in our search space.

We can check if a given width is feasible, using at most $k$ lines. Note that the search space is:

- `lo`: maximum token length (a single word segment between hyphens or spaces cannot be broken further)
- `hi`: total length of the input string (the worst case width if no wrapping occurs)

### Checking Feasibility

For a given width `mid`, we simulate the line wrapping process _greedily_. We iterate through the text "tokens" (segments of words separated by spaces or hyphens). We maintain a `tokens_on_line` counter, representing the current line's width. For each token, we check:

1. If adding the token to the current line (`tokens_on_line + token`) does not exceed `mid`, we add it to the current line
2. Otherwise, we must start a new line. We increment the `lines` count and set `tokens_on_line` to the current token's length (as this token starts a new line)

After processing all tokens, we check if the total `lines` count is less than or equal to $k$. If it is, the width `mid` is feasible.

**Time Complexity:** The `check` function iterates through the tokens, taking linear time proportional to the number of tokens, which is bounded by the length of the input string $S$. Binary search performs $O(\log |S|)$ iterations. Thus, the total time complexity is $O(|S| \log |S|)$.

**Space Complexity:** We store the tokens in a vector. The number of tokens is also bounded by $|S|$. Therefore, the space complexity is $O(|S|)$.

## Code

```cpp
bool check(vector<int> &tokens, int mid, int k) {
  int tokens_on_line = 0;
  int lines = 1;
  for (int &token : tokens) {
    if (tokens_on_line + token <= mid) {
      tokens_on_line += token;
    } else {
      tokens_on_line = token;
      lines++;
    }
  }

  return lines <= k;
}

void solve() {
  int k;
  cin >> k;
  string s, _;
  getline(cin, _);
  getline(cin, s);

  vector<int> tokens;
  int prev = 0;
  int curr = 1;
  for (auto &c : s) {
    if (c == '-' or c == ' ') {
      tokens.pb(curr - prev);
      prev = curr;
    }
    curr++;
  }
  // don't forget the last token
  tokens.pb(curr - prev - 1);

  int lo = *max_element(all(tokens));
  int hi = s.size();

  int ans = hi;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(tokens, mid, k)) {
      ans = mid;
      hi = mid - 1;
    } else
      lo = mid + 1;
  }

  cout << ans << endl;
}
```

## Related
