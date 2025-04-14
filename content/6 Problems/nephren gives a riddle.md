---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/problemset/problem/896/A","PassFrontmatter":true,"created":"2025-03-09T16:47:37.764+05:30"}
---


> [!Topics]
>
> - [[recursion\|recursion]]

We are given a recursively defined sequence of strings:

- $f_0 =$ "What are you doing at the end of the world? Are you busy? Will you save us?"
- For $i \geq 1$, $f_i =$ "What are you doing while sending "$f_{i-1}$"? Are you busy? Will you send "$f_{i-1}$"?"

Given $n$ and $k$, we need to find the $k$-th character of string $f_n$, or return '.' if $k$ exceeds the length of $f_n$.

## Idea

Let's break down the pattern to understand the recursive structure. Let's define:

- $A =$ "What are you doing at the end of the world? Are you busy? Will you save us?"
- $B =$ "What are you doing while sending ""
- $C =$ ""? Are you busy? Will you send ""
- $D =$ ""?"

Now we can rewrite our recursive definitions:

- $f_0 = A$
- $f_i = B + f_{i-1} + C + f_{i-1} + D$ for $i \geq 1$

### Calculating String Lengths

Before we can find the $k$-th character, we need to know the length of each string $f_i$:
Let's define $len(f_i)$ as the length of string $f_i$:

- $len(f_0) = |A|$
- $len(f_i) = |B| + len(f_{i-1}) + |C| + len(f_{i-1}) + |D|$ for $i \geq 1$

However, for large $i$, length can quickly exceed the range of standard integer types. We'll need to handle potential overflow carefully.

### Finding the K-th Character

Once we know the length of the strings, we can find the $k$-th character recursively:

1. If $k > len(f_n)$, return `'.'`
2. If $n = 0$, return the $k$-th character of string $A$
3. If $k \leq |B|$, return the $k$-th character of string $B$
4. If $k \leq |B| + len(f_{n-1})$, find the $(k - |B|)$-th character of $f_{n-1}$
5. If $k \leq |B| + len(f_{n-1}) + |C|$, return the $(k - |B| - len(f_{n-1}))$-th character of string $C$
6. If $k \leq |B| + len(f_{n-1}) + |C| + len(f_{n-1})$, find the $(k - |B| - len(f_{n-1}) - |C|)$-th character of $f_{n-1}$
7. Otherwise, return the $(k - |B| - len(f_{n-1}) - |C| - len(f_{n-1}))$-th character of string $D$

**Time Complexity:** $O(n)$ per query
**Space Complexity:** $O(n)$ for precompting the lengths

## Code

```cpp
const string A = "What are you doing at the end of the world? Are you busy? "
                 "Will you save us?";
const string B = "What are you doing while sending \"";
const string C = "\"? Are you busy? Will you send \"";
const string D = "\"?";

vector<ll> lengthCache;

void precomputeLengths() {
  const ll MAX_N = 1e5 + 5;
  lengthCache.push_back(A.length());

  for (int i = 1; i <= MAX_N; i++) {
    // Check for potential overflow
    if (lengthCache[i - 1] >
        (LLONG_MAX - B.length() - C.length() - D.length()) / 2) {
      lengthCache.push_back(LLONG_MAX); // Mark as overflow
    } else {
      lengthCache.push_back(B.length() + C.length() + D.length() +
                            2 * lengthCache[i - 1]);
    }
  }
}

ll getLength(int n) {
  if (n < lengthCache.size())
    return lengthCache[n];
  return LLONG_MAX; // For very large n, length will exceed any possible k
}

char findKthCharacter(int n, ll k) {
  if (k > getLength(n))
    return '.';

  if (n == 0)
    return A[k - 1];

  // Check in which part of the string the kth character lies
  if (k <= B.length()) {
    return B[k - 1];
  }

  k -= B.length();
  ll prevLength = getLength(n - 1);

  if (k <= prevLength) {
    return findKthCharacter(n - 1, k);
  }

  k -= prevLength;

  if (k <= C.length()) {
    return C[k - 1];
  }

  k -= C.length();

  if (k <= prevLength) {
    return findKthCharacter(n - 1, k);
  }

  k -= prevLength;

  return D[k - 1];
}

void solve() {
  precomputeLengths();

  int q;
  cin >> q;

  string result;
  for (int i = 0; i < q; i++) {
    int n;
    ll k;
    cin >> n >> k;

    result += findKthCharacter(n, k);
  }

  cout << result << endl;
}

```

## Related
