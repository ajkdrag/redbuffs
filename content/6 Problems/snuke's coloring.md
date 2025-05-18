---
{"publish":true,"created":"2025-02-28T10:37:34.721+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/contribution technique\|contribution technique]]

The problem asks us to:

1. **Initialize:** Start with a grid of `H` rows and `W` columns, all cells white
2. **Paint:** Paint `N` cells black, given their coordinates `(ai, bi)`
3. **Count Subrectangles:** Count how many 3x3 subrectangles contain exactly `j` black cells, for each `j` from 0 to 9

## Idea

The solution avoids brute-forcing every 3×3 subrectangle by using the contribution technique:

> Each black cell "contributes" to the subrectangles that include it.

Instead of iterating over all possible subrectangles—which number $(h-2) \times (w-2)$—we update only those subrectangles that a black cell influences. A black cell at position (a, b) lies in all 3×3 subrectangles whose center is one cell away from it in any direction. In other words, if you shift by offsets –1, 0, or 1 in both dimensions, you cover all 9 potential 3×3 subrectangles that contain (a, b). Of course, if the cell is near the border, fewer subrectangles are valid. To all those subrectangles, this black cell contributes 1.

**Updating counts via contribution:**
We can use a map `cnt` to keep track of how many black cells have been contributed to the subrectangle with center (x, y). When a black cell is found to lie in a valid subrectangle, `cnt[(x,y)]` is incremented.

However, since this subrectangle's classification changes (for example, from earlier having 2 black cells to now having 3), we need to update our final answer array as well: `ans[3]+=1` and `ans[2]-=1`, i.e. add one to the new count and subtract one from the old count.

> [!Note]
> Initially, all subrectangles are white, so the total count for zero black cells is precomputed as: `(h-2)*(w-2)` (since a 3×3 subrectangle is determined by its center and the center must be at least one cell away from every border).

This approach is very efficient because it only examines each black cell and the (at most) 9 subrectangles it affects, rather than checking every subrectangle in the grid.

**Time Complexity:** $O(N)$
**Space Complexity:** $O(N)$ (due to dictionary/map)

## Code

```python
def solve():
    h, w, n = map(int, input().split())
    cnt = {}
    ans = [0] * 10
    ans[0] = (h - 2) * (w - 2)
    for i in range(n):
        a, b = map(int, input().split())
        for j in range(-1, 2):
            for k in range(-1, 2):
                # (x, y): center of one of the subrectangles
                x = a + j
                y = b + k
                if 1 < x < h and 1 < y < w:
                    # current black cell (a, b) contributes 1
                    cnt[(x, y)] = cnt.get((x, y), 0) + 1

                    ans[cnt[(x, y)]] += 1
                    ans[cnt[(x, y)] - 1] -= 1

    for i in range(10):
        print(ans[i])
    return
```

## Related
