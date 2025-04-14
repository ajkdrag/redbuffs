---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/798/B","PassFrontmatter":true,"created":"2025-02-27T10:27:55.689+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/complete search\|complete search]]
> - [[c++ internals\|c++ internals]]

Given `n` strings of equal length we need to find min "moves" to make them all equal. In a single move, one can circular shift a string by one character, i.e. `coolmike` becomes `oolmikec`.

If it's not possible to make them equal, return -1.
Constraints: `1<=n<=50` and length of strings is also in `[1, 50]`.

## Idea

Since constraints are small, one can apply brute force. Here's a simple way to do:

Since after a certain number of moves, all strings become equal (unless it's not possible to make equal), it means that our "target" string can be any of the strings obtained by shifting the first string. For each "target", we can then count the number of moves required to reach that target from every string. Even this can be brute forced since the max number of moves possible for each string `s` is `len(s)`.

**Time Complexity:** $O(n\cdot S^2)$ where $S$ is the size of the strings.

## Code

```cpp
void solve() {
  int n;
  cin >> n;

  vector<string> strings(n);
  for (int i = 0; i < n; ++i) {
    cin >> strings[i];
  }

  string target = strings[0];
  int len = target.size();
  int res = INT_MAX;

  for (int j = 0; j < len; ++j) {
    int tres = 0;

    for (string str : strings) {
      bool found = false;
      int i = 0;
      for (; i < len; ++i) {
        if (str == target) {
          found = true;
          break;
        }
        // circular shift left for next iter
        str = str.substr(1) + str[0];
      }

      if (found)
        tres += i;
      else {
        tres = INT_MAX;
        break;
      }
    }

    res = min(res, tres);
    // new target formed by circular shifting left
    target = target.substr(1) + target[0];
  }

  cout << (res == INT_MAX ? -1 : res) << endl;
}
```

## Related
