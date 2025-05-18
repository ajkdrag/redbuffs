---
{"publish":true,"created":"2025-01-25T14:29:53.234+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[combinatorics\|combinatorics]]

## Idea

If we have string `s` with `n` characters, then we got `n+1` slots where a letter can be placed. For duplicates, the **number of slots decrease by the freq of duplicates** (this is an observation), e.g. "hi" has 3 slots where we can place letters other than 'h' and 'i'. For letters 'h' and 'i', we only have 2 slots since h`h`i and `h`hi count as the same.

Note that we can come up with a closed form solution with this observation by analyzing two cases:

- Inserting a new character (not in `s`) and inserting an existing character (already in `s`)
- For a character `c` (not in `s`), there are `n+1` unique insertion positions
- For a character `c` (in `s`) with frequency `f`, there are `n+1-f` unique insertion positions

**Derivation**:

1. **New Characters**: Each of the `26-k` characters (where `k` is the number of distinct characters in `s`) can be inserted into any of the `n+1` positions, yielding `(26-k)(n+1)` unique strings
2. **Existing Characters**: For each character `c` with frequency `f`:
   - Inserting `c` adjacent to existing instances of `c` may produce duplicate strings. For example, inserting `c` before or after an existing `c` merges into the same run, reducing unique positions by `f`
   - Thus, the number of unique insertions for `c` is `n+1-f`. Summing over all existing characters gives `sum_over_k(n+1-freq[k])

Thus, we have a formula:

$$
\begin{align*}
\text{Total}&=\sum_{c\notin{S}}(n+1) + \sum_{c\in{S}}(n+1-f_c)\\
&=(26-k)(n+1) + \sum_{k}(n+1-f_k)\\
&=(26-k)(n+1) + k(n+1) - \sum_{k}f_k\\
&=26n + 26 - n\\
&=25n + 26\\
\end{align*}
$$

## Code

```cpp
void solve() {
  string s;
  cin >> s;

  vector<int> cnt(26, 0);

  for (char &c : s) {
    cnt[c - 'a']++;
  }

  int slots = s.length() + 1;
  ll res = 0;
  for (int &v : cnt) {
    res += (slots - v);
  }

  cout << res << endl;
}

```

## Related
