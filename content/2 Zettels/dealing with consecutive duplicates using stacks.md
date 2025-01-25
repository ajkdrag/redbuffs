---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/stacks\|stacks]]

Several problems exist where we are asked to repeatedly remove/count duplicates. Stacks can be used for such tasks. A well-defined problem statement would be:

**Problem statement**
Give a string `s`, convert it into a valid string. A string is considered valid if it does not have any two adjacent duplicate characters.

To make a string valid, we will perform a *duplicate removal process*.
> A duplicate removal consists of choosing two adjacent and equal letters and removing them. We repeatedly make duplicate removals on s until we no longer can.

**Example**
- Input: `"abbaca"`
- Expected Output: `"ca"`
- Description: We remove 'b' from "abbaca" to get "aaca", then remove 'a' from "aaca" to get "ca"

```cpp
string removeDuplicates(string s) {
  stack < char > st;

  for (char & c: s) {
    if (!st.empty() and st.top() == c) {
      st.pop();
    } else st.push(c);
  }

  string res = "";
  while (!st.empty()) {
    res += st.top();
    st.pop();
  }

  reverse(all(res));

  return res;
}
```

The core idea is to check if top of the stack matches the current element and then act accordingly. 

> [!Tip]
> Other variations of this problem include:
> - Remove all `*` characters from string `s` by pairing each `*` with the closest available non-star character to its left. Return the final string after all possible star removals. For example: `"abc**"` → `"a"` (first `*` removes 'c', second `*` removes 'b')
> - Remove adjacent character pairs that are the same letter but different case (e.g. 'aA' or 'Bb'). Keep doing this until no such pairs exist. Return the final string. For example: `"abBAcC"` → `""` (remove 'bB', then 'aA', then 'cC')

T.C: $O(n)$
S.C: $O(n)$

## Related
