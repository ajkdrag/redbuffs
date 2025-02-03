---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - stacks
> - sorting algorithms

The idea is similar to [[insertion sort\|insertion sort]] where we take element and find the right place to insert. Using stacks, we keep one stack to store the sorted result, while use another to hold intermediate values.

```cpp
stack<int> sortStack(stack<int> &input) {
  stack<int> st;

  while (!input.empty()) {
    int curr = input.top();
    input.pop();
    while (!st.empty() and curr < st.top()) {
      input.push(st.top());
      st.pop();
    }
    st.push(curr);
  }

  return st;
}
```

T.C: $O(n^2)$
S.C: $O(n)$
## Related
