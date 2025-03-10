---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-03-01T12:45:31.225+05:30"}
---


> [!Topics]
> - [[recursion\|recursion]]
> - [[tower of hanoi\|tower of hanoi]]

Classic Tower of hanoi with 3 pegs: move a stack of n disks from one peg (source) to another peg (destination), using a third peg as an auxiliary, and following the rules:
- Only one disk can be moved at a time
- A larger disk cannot be placed on top of a smaller disk

![](https://res.cloudinary.com/dcameztw9/image/upload/v1740891840/tower%20of%20hanoi%20recurrence-q8qz2w.webp)

```cpp
// Problem: https://cses.fi/problemset/task/2165/

void move(int diskNum, int source, int destination) { 
    cout << source << " " << destination << "\n"; 
}

void towerOfHanoi(int n, int source, int destination, int helper) {
  if (n == 0)
    return;

  towerOfHanoi(n - 1, source, helper, destination);
  move(n, source, destination);
  towerOfHanoi(n - 1, helper, destination, source);
}
```

## Related
- [[2 Zettels/kth move in classic tower of hanoi\|kth move in classic tower of hanoi]]