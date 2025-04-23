---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/minimum-window-substring/description/","PassFrontmatter":true,"created":"2025-04-23T09:44:03.531+05:30"}
---


> [!Topics]
>
> - [[sliding window\|sliding window]]

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window** substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

## Idea

We can apply the [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]] approach to solve this. As duplicates are also allowed, we need to use [[2 Zettels/frequency array\|frequency array]] as our state. The letters can only be `a-z` or `A-Z`, so max size of arr needs to be `26+26=52` (in code, I just used 64). The sliding window algo is simple: for each `tail`, try to consume/advance `head` only if consuming it _doesn't_ fulfil the _property_ P.

**Property P**: window `[tail, head]` contains all characters of `t` (with required frequencies)

Thus, if our window stops at `head`, then the seq `[tail, head+1]` is the smallest one that starts at `tail` and has all chars of `t`. There can be an edge case, where we reach end of `s` while consuming `head`. To simplify implementation, I added a dummy char `#` at the end of `s` which indicates that if `head` ever reaches till `#`, then that window isn't valid.

> [!Tip]
>
> If `head` reaches sentinel char `#`, we can early exit! Advancing `tail` will be of no use.
>
> ```
> s = "ADOBECODEBANC#"
> t = "ABC"
> ```
>
> When `tail` reaches the last B, `head` expands until we reach `N`, because if we consume the next char `C`, we would have all chars from `t`. So our valid window: `[tail, head + 1]`, i.e. `BANC` of len 4. Next, we move `tail` forward, so it's at A now, we can now consume C and `#`, and whoa, reached the end of `s`. At this stage, we know that this window has to invalid: `ANC#` so moving `tail` forward is useless: `NC#`, `C#` are all invalid.

**Time Complexity:** $O(64.|s| + |t|) \approx O(|s| + |t|)$
**Space Complexity:** $O(64)\approx O(1)$

## Code

```cpp
bool check(char c, vector<int> &freq, vector<int> &target_freq) {
  if (c == '#')
    return true;
  bool ok = false;
  freq[c - 'A']++;
  // atleast one char in t is not yet in s
  for (int i = 0; i < 64; ++i) {
    if (target_freq[i] == 0)
      continue;
    if (target_freq[i] > freq[i]) {
      ok = true;
      break;
    }
  }
  freq[c - 'A']--;
  return ok;
}

void solve(string s, string t) {
  int n = s.length();

  int tail = 0, head = -1;
  vector<int> freq(64, 0);

  vector<int> target_freq(64, 0);
  for (char &x : t) {
    target_freq[x - 'A']++;
  }

  int ans_start = -1;
  int ans_len = INT_MAX;

  while (tail < n) {
    while (head < n - 1 and (check(s[head + 1], freq, target_freq))) {
      // if we can "eat" next element
      head++;
      if (s[head] != '#')
        freq[s[head] - 'A']++;
    }

    // process *valid* windows only
    if (head != n - 1) {
      // update answer, valid window: [tail, head + 1]
      int curr_len = (head + 1 - tail + 1);
      if (curr_len < ans_len) {
        ans_len = curr_len;
        ans_start = tail;
      }
    } else break; // early exit

    // undo effect of tail
    if (tail <= head and s[tail] != '#') {
      freq[s[tail] - 'A']--;
    }

    tail++;
    head = max(head, tail - 1);
  }

  // print substring
  if (ans_start == -1) {
    cout << "" << endl;
    return;
  }
  cout << s.substr(ans_start, ans_len) << endl;
}
```

## Related
