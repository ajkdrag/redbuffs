---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - stacks

> [!Hint]-
>  As we traverse the string, each time we encounter an opening parenthesis '(', '{', or '[', we push it onto the stack. When we find a closing parenthesis ')', '}', or ']', we check if it matches the type of the opening parenthesis at the top of the stack. If it matches, we pop the top element from the stack; if not, or if the stack is empty when we find a closing parenthesis, the string is not balanced, and we return `false`.
>  
>  After processing the entire string, if the stack is empty, it means all parentheses were properly closed and nested, so we return `true`. Otherwise, we return `false`

```cpp
bool solve(string &s) {
  int sz = s.length();
  unordered_set<char> push_set = {'(', '[', '{'};
  unordered_map<char, char> pop_set = {{')', '('}, {']', '['}, {'}', '{'}};
  stack<char> st;

  for (int i = 0; i < sz; ++i) {
    char curr = s[i];
    if (push_set.count(curr)) {
      st.push(curr);
    } else {
      if(st.empty()){
        return false;
      }
      char top = st.top();
      if (top == pop_set[curr]) {
        st.pop();
      } else {
        return false;
      }
    }
  }
  return st.empty();
}
```

T.C: $O(n)$
S.C: $O(n)$

## Related
