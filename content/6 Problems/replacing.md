---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc171/tasks/abc171_d","PassFrontmatter":true,"created":"2025-02-27T15:19:42.121+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/frequency array\|frequency array]]

For each query `q`, you are provided numbers `a` and `b`. Replace all occurrences of `a` with `b` and print the total sum.

## Idea

Store frequencies in frequency array and for each query, account for the "change" i.e. `(b-a)*freq[a]` and then update the frequency array accordingly:

- Update frequency of b's: `freq[b] += freq[a]` (since all a's became b)
- Clear a's: `freq[a] = 0`

## Code

```cpp
void solve() {
  int n;
  cin >> n;
  vector<int> freq(1e5 + 1);
  ll total = 0;
  int el;
  for (int i = 0; i < n; ++i) {
    cin >> el;
    total += el;
    freq[el]++;
  }

  int q;
  int a, b;
  cin >> q;
  while (q--) {
    cin >> a >> b;
    total += (b-a)*freq[a];
    cout << total << '\n';
    freq[b] += freq[a];
    freq[a] = 0;
  }
}
```

## Related
