---
{"publish":true,"tags":["type/problem"],"platform":"Codeforces","link":"https://codeforces.com/contest/637/problem/B","PassFrontmatter":true,"created":"2025-03-19T12:50:14.743+05:30"}
---


> [!Topics]
>
> - [[c++ STL\|c++ STL]]
> - [[2 Zettels/stacks\|stacks]]

User sends messages one after the other to other users. Output the recipients in the order of chats with them, from latest to oldest.

```
Input:
4
alex
ivan
roman
ivan

Output:
ivan
roman
alex
```

**Explanation:** In the first test case user first writes to friend by name "alex", and the list looks as follows: `[alex]` Then user writes to friend by name "ivan" and the list looks as follows: `[ivan, alex]`. User writes the third message to friend by name "roman" and the list looks as follows: `[roman, ivan, alex]`. Finally, user writes the fourth message to "ivan" again, so the order of chats changes as follows: `[ivan, roman, alex]`

## Idea

The problem asks for the order of chats from latest to oldest, eliminating duplicate entries for the same recipient. We can iterate through the input messages (stored in vector/stack) in **reverse**. Using an `unordered_set` called `seen`, we track the names already encountered. If a name hasn't been seen before, we output it and add it to the `seen` set. This ensures that only the most recent chat with each user is printed, effectively giving us the desired chat order.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(n)$

## Code

```cpp
// Approach 1 (Using stack)
void solve() {
  int n;
  cin >> n;

  stack<string> st;
  unordered_set<string> seen;

  string s;
  while (n--) {
    cin >> s;
    st.push(s);
  }
  while (!st.empty()) {
    if (seen.count(st.top()) == 0) {
      cout << st.top() << '\n';
      seen.insert(st.top());
    }
    st.pop();
  }
}

// Approach 2 (Using vector)
void solve() {
  int n;
  cin >> n;

  vector<string> messages(n);
  for (string &s : messages) {
    cin >> s;
  }

  unordered_set<string> seen;

  for (int i = n - 1; i >= 0; --i) {
    // If insertion succeeds, it's a new name
    if (seen.insert(messages[i]).second) {
      cout << messages[i] << endl;
    }
  }
}

```

## Related
