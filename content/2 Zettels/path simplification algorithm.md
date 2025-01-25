---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[string algorithms\|string algorithms]]
> - [[2 Zettels/stacks\|stacks]]

**Problem Statement**
Given an absolute file path in a Unix-style file system, simplify it by converting ".." to the previous directory and removing any "." or multiple slashes. The resulting string should represent the shortest absolute path.

```cpp
string simplifyPath(string path) {
  stack<string> st;
  vector<string> tokens = split(path, '/');

  for (string &token : tokens) {
    if (token == "." or token == "") {
      continue;
    }

    if (token == "..") {
      if (!st.empty())
        st.pop();
      continue;
    }
    st.push(token);
  }

  string res = "";
  while (!st.empty()) {
    res = "/" + st.top() + res;
    st.pop();
  }
  return res.empty() ? "/": res;
}
```

The algorithm is straightforward. It splits based on "/" to obtain the tokens and for ".." we make sure to pop out the prev token (if exists).

> [!Note]
> The `split()` function used above can be implemented using [[2 Zettels/splitting string in c++ using find\|find]] or [[2 Zettels/splitting string in c++ using stringstream\|stringstream]].

T.C: $O(n)$
S.C: $O(n)$
## Related
