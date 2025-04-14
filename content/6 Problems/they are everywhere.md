---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/701/C","PassFrontmatter":true,"created":"2025-01-31T11:22:58.140+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]

We need to find the shortest substring in a given string that contains all the unique characters present in the entire string.

```
Input:
3
AaA

Output:
2
```

Range 1 to 2 i.e. `Aa` (or even 2 to 3 -> `aA`) is valid. Thus, min length is 2.

## Idea

This is a classic sliding window problem where the goal is to efficiently track the minimum window that covers all required elements.

### Approach 1 (Sliding Window)

The optimal solution uses a sliding window (two pointers) technique. Here's a step-by-step breakdown:

1. **Identify Unique Characters:** First, determine all unique characters in the string using a set. Let the count of these be `total`.
2. **Sliding Window Setup:** Let `l` (left) and `r` (right), represent the current window. Expand `r` to include new characters until the window contains all `total` unique characters.
3. **Track Frequencies:** Maintain a frequency map to count occurrences of characters within the window. A counter `runner` tracks how many unique characters are currently in the window.
4. **Shrink the Window:** Once all characters are included (when `runner == total`), move `l` to the right to find the smallest valid window. If removing a character causes its frequency to drop to zero, decrement `runner` as that character is no longer in the window.
5. **Update Minimum Length:** During each valid window, update the minimum length if the current window is smaller.

**Time Complexity:** $O(n)$, each character is processed at most twice (once by `r` and by `l`)
**Space Complexity:** $O(k)$, where `k` is the number of unique characters, due to using `map`

### Approach 2 (Binary Search)

We can solve this problem by performing a [[binary search\|binary search]] on the possible lengths of the substring. The core idea is to check, for a given length `len`, whether a substring of that length exists which contains all unique characters. This check forms the basis of our binary search.

- **Search Space:** The minimum possible length is 1 (a single character), and the maximum is `n` (the entire string). So, our initial search space is `lo = 1` and `hi = n`
- **Feasibility check:** We need a function `check(len, ...)` that returns `true` if there exists *at least one* substring of length `len` in `s` that contains all characters in `uniques`. Otherwise, it returns `false`. We are looking for the *first* `true`, representing the smallest length for which a valid substring exists ([[2 Zettels/binary search boolean array framework\|binary search boolean array framework]])

We can check all substrings of length `len` to see if they contain all characters in `uniques` efficiently using the concept of [[2 Zettels/frequency arrays\|frequency arrays]] and [[2 Zettels/prefix sums\|prefix sums]] - create a 2D vector `partial` (or array) of size $52\times (n+1)$. 52 represents the possible English characters including lower and upper case (you could use a `map` if you're dealing with a larger character set). Now, `partial[c][i]` stores the number of times character `c` appears (**frequency**) in the **prefix** `s[0:i-1]` (the first `i` characters of the string `s`). Notice the `i-1`: `partial[c][0]` is always 0. This prefix sum array can be prefilled in $O(52\cdot n)$.

Inside the `check` function, we want to know how many times character `c` appears in some substring `s[i:i+len-1]`. We can get this count in $O(1)$ using `count = partial[c][i + len] - partial[c][i];`

- `partial[c][i + len]` gives the count of `c` in the prefix `s[0:i+len-1]`
- `partial[c][i]` gives the count of `c` in the prefix `s[0:i-1]`
- Subtracting the two gives us the count of `c` *only* within the substring `s[i:i+len-1]`

**Time Complexity:** $O(n\cdot k \cdot\log(n)$, where `n` is the length of the string and `k` is the number of unique characters. The `check` function iterates through all possible substrings of length `mid` (which is $O(n)$ in the worst case) and, for each substring, iterates through the unique characters and gets their counts (which is $O(k)$). The binary search itself contributes the $\log{n}$ factor.  
**Space Complexity:** $O(n\cdot k)$, due to the prefix sums array.

## Code

```cpp
// Approach 1
void solve() {
  int n;
  cin >> n;
  map<char, int> freq;
  set<char> uniques;
  char curr;
  vector<char> s(n);

  for (int i = 0; i < n; ++i) {
    cin >> curr;
    uniques.insert(curr);
    s[i] = curr;
  }

  int total = uniques.size();

  int l = 0;
  int runner = 0;
  int best = INT_MAX;

  for (int r = 0; r < n; ++r) {
    curr = s[r];
    if (freq[curr] == 0) {
      runner++;
    }
    freq[curr]++;
    while (runner == total) {
      char left = s[l];
      best = min(best, r - l + 1);
      freq[left]--;
      if (freq[left] == 0) {
        runner--;
      }
      l++;
    }
  }
  cout << best << endl;
}

// Approach 2
bool check(int len, const string &s, const set<char> &uniques,
           const vector<vi> &partial) {
  int n = s.length();
  for (int i = 0; i <= n - len; ++i) {
    for (const char &c : uniques) {
      if (partial[c][i + len] - partial[c][i] == 0) {
        goto next_substring;
      }
    }
    return true; // All unique characters found in this substring.

  next_substring:;
  }
  return false; // No substring of this length contains all unique characters.
}

int solve() {
  int n;
  cin >> n;
  string s;
  cin >> s;

  set<char> uniques;
  for (char &c : s) {
    uniques.insert(c);
  }

  vector<vi> partial(52, vector(n + 1, 0));
  for (int i = 0; i < n; ++i) {
    for (int j = 0; j < 52; ++j) {
      partial[j][i + 1] = partial[j][i];
    }
    partial[s[i]][i + 1]++;
  }

  int lo = 1;
  int hi = n;
  int ans = n;

  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid, s, uniques, partial)) {
      ans = mid;
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }

  return ans;
}

```

## Related
