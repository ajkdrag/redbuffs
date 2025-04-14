---
{"publish":true,"tags":["type/problem"],"platform":"USACO","link":"https://usaco.org/index.php?page=viewproblem2&cpid=643","PassFrontmatter":true,"created":"2025-01-31T18:05:48.500+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/two pointers + sorting\|two pointers + sorting]]
> - [[2 Zettels/precomputation techniques\|precomputation techniques]]
> - [[2 Zettels/greedy algorithms\|greedy algorithms]]

We are given N diamonds (with sizes) and a parameter K. Our goal is to split the diamonds between two display cases so that in each case the difference between the smallest and largest diamond is at most K, and we maximize the total number of diamonds displayed.

## Idea

1. **Sorting is Optimal:** If we sort the diamonds, any valid set for a case becomes a contiguous segment. Moreover, if an optimal solution were interleaved, we could always rearrange it into two non–overlapping segments without losing any diamonds.
2. **Contiguous Segments:** With the diamonds sorted, the problem reduces to choosing two non–overlapping contiguous segments such that each segment is "valid" (i.e. the difference between its minimum and maximum sizes is <= K. In the end we pick the segments having maximum size in total.

### Approach

- **Sort** the Diamonds: Sort the array of diamond sizes.
- **Two Pointers** to compute valid Segments: For each starting index $i$, determine the maximum number of consecutive diamonds (say $s[i]$) that can be grouped together so that:
  - $\text{diamonds}[j] \le \text{diamonds}[i] + K$
  - This can be done with a two–pointer (sliding window) technique in overall $O(N)$ time.
- **Precompute** best segment starting at or after an index:
  - Define an array `right_max` where: $\text{right\_max}[i] = \max_{j \ge i} s[j]$
  - This helps answer quickly: "If the first case ends at index $i-1$, what is the best (largest) valid segment starting _at or after_ index $i$ for the second case?"
- **Combine** Two Cases: For every possible starting index $i$ for the first segment:
  - The first case can include $s[i]$ diamonds (from $i$ to $i+s[i]-1$).
  - The second case can then use the best segment starting at index $i+s[i]$, which is given by `right_max[i + s[i]]`.
  - The candidate is: $s[i] + \text{right\_max}[i+s[i]]$ and we take the maximum over all $i$.

**Time Complexity**: Sorting: $O(N \log N)$ + 2 Pointers + Precomputation: $O(N)$ = $O(N \log N)$
**Space Complexity**: $O(N)$

## Code

```python
def main():
    with open("diamond.in", "r") as fin:
        n, k = map(int, fin.readline().split())
        diamonds = [int(fin.readline()) for _ in range(n)]

    diamonds.sort()
    s = []
    j = 0
    for i in range(n):
        curr = diamonds[i]
        while j < n and diamonds[j] <= curr + k:
            j += 1

        s.append(j - i)

    # Precompute right_max
    right_max = [0] * (n + 1)
    for i in range(n - 1, -1, -1):
        right_max[i] = max(s[i], right_max[i + 1])

    max_sum = 0
    for i in range(n):
        end = i + s[i]
        current_sum = s[i] + (right_max[end] if end < n else 0)
        if current_sum > max_sum:
            max_sum = current_sum

    with open("diamond.out", "w") as fout:
        fout.write(str(max_sum) + "\n")


if __name__ == "__main__":
    main()
```

## Related
