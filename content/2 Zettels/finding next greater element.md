---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/stacks\|stacks]]

**Problem**
Given an array, print the Next Greater Element (NGE) for every element.
The Next Greater Element for an element x is the first greater element on the right side of x in the array. Elements for which no greater element exist, consider the next greater element as -1.

>[!Hint]-
> Starting from the end of the array, for each element, keep removing stack items that are smaller than it, until we encounter a larger item. Make sure to always add itself to the stack.
> 
> This way, it ensures that a candidate for the "next larger element" exists on the stack. If there is no larger element (i.e. stack gets empty at any point), assign -1 in the result array.


```cpp
#define all(x) x.begin(), x.end()
#define pb push_back

vector<int> nextLargerElement(vector<int> arr) {
  int n = arr.size();
  vector<int> res(n);
  stack<int> st;

  int x, i;
  for (i = n - 1; i >= 0; i--) {
    x = arr[i];
    
    while (!st.empty()) {
      if (st.top() > x)
        break;
      st.pop();
    }

    if (st.empty()) {
      res[i] = -1;
    } else {
      res[i] = st.top();
    }
    
    st.push(x);
  }
  return res;
}

```

T.C: $O(n)$ Each element is pushed and popped from the stack atmost once.
S.C: $O(n)$ 
## Related
