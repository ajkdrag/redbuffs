---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/stacks\|stacks]]
> - [[2 Zettels/queues\|queues]]

A queue (FIFO) is implemented using two stacks (LIFO) with the following approach:
- **Stack 1 (`st1`)** temporarily holds new elements when the front stack is non-empty
- **Stack 2 (`st2`)** holds elements in queue order. All `pop` and `peek` operations are performed here

Key operations:
1. **Push**:
   - If `st2` is empty, push directly to `st2` (this becomes the front)
   - If `st2` is not empty, push to `st1` (waiting to be transferred later).
2. **Pop**:
   - Remove the top of `st2` (front of the queue).
   - If `st2` becomes empty, transfer all elements from `st1` to `st2` (reversing their order again to restore FIFO sequence).

Why It Works:
- **Order Reversal**: Transferring elements from `st1` to `st2` reverses their order (LIFO → FIFO).
- **Lazy Transfer**: Elements stay in `st1` until `st2` is empty, minimizing unnecessary operations.


> [!Tip]
> Observe that `st2` will only be empty when the queue itself is empty. So now, if a single element has to be pushed, we can push it to `st2`. This will make sure we can always do `peek` in O(1). Further pushes should go to `st1` like usual.


```cpp
void copy_from_st1_to_st2(stack<int> &st1, stack<int> &st2) {
  while (!st1.empty()) {
    st2.push(st1.top());
    st1.pop();
  }
}

void solve() {
  int n;
  cin >> n;

  stack<int> st1, st2;

  string cmd;
  int val;

  while (n--) {
    cin >> cmd;

    if (cmd == "push") {
      cin >> val;
      if (st2.empty())
        st2.push(val);
      else
        st1.push(val);

    } else if (cmd == "pop") {
      if (!st2.empty()) {
        cout << st2.top() << endl;
        st2.pop();
      }
      if (st2.empty())
        copy_from_st1_to_st2(st1, st2);

    } else {
      // cmd will be "front" or "peek"
      if (!st2.empty())
        cout << st2.top() << endl;
    }
  }
}
```

> [!Example]
> **Commands**: `push 1`, `push 2`, `push 3`, `peek`, `pop`, `pop`, `pop`
> 1. push 1
>     1. `st2` is empty → `st2 = [1]`
> 2. push 2
>     1. `st2` not empty → `st1 = [2]`
> 3. push 3
>     1. `st2` not empty  → `st1 = [2, 3]`
> 4. peek
>     1. return `st2.top()` → `1`
> 5. pop (first)
>     1. pop `1` from `st2` (now `st2 = []`, i.e. empty)
>     2. Transfer `st1` to `st2`:
>         1. Pop `3` from `st1` → push to `st2` (`st2 = [3]`)
>         2. Pop `2` from `st1` → push to `st2` (`st2 = [3, 2]`)
> 6. pop (second)
>     1. Pop `2` from `st2` (now `st2 = [3]`)
> 7. pop (third)
>     1. Pop `3` from `st2` → `st2` is empty. No transfer needed as `st1` is empty
> 
> **Output**: `1`, `1`, `2`, `3` (correct FIFO order).
    
**Amortized Time Complexity**: 
- `push`: O(1)
- `peek`: O(1)
- `pop`: O(1) (amortized, as each element is moved at most twice)

**Space Complexity**: $O(n)$, where `n` is the number of elements.



## Related
