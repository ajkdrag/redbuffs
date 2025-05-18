---
{"publish":true,"created":"2025-01-25T15:53:31.677+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[coordinate geometry\|coordinate geometry]]

## Idea

To determine the minimal number of steps, we consider the horizontal and vertical distances between the two points, denoted as $dx = |x_1 - x_2|$ and $dy = |y_1 - y_2|$.

The key insight is that the robot can move diagonally, which allows it to reduce both $dx$ and $dy$ by 1 in a single step. Therefore, the number of diagonal steps is limited by the smaller of the two distances. After covering the smaller distance, the remaining distance in the larger dimension must be covered by moving in a straight line.

For example, if $dx \leq dy$, the robot can move diagonally $dx$ times, reducing both distances by 1 each time. This leaves a remaining vertical distance of $dy - dx$, which requires $dy - dx$ additional steps. The total number of steps is $dx + (dy - dx) = dy$, which is the maximum of $dx$ and $dy$. Similarly, if $dy \leq dx$, the total number of steps is $dx$.

Thus, the minimal number of steps is determined by the maximum of the horizontal and vertical distances

## Code

```cpp
inline void solve() {
  cout << max(abs(x1 - x2), abs(y1 - y2)) << endl;
}
```

## Related
