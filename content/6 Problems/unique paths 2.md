---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/unique-paths-ii/description/","PassFrontmatter":true,"created":"2025-02-16T09:17:23.465+05:30"}
---


> [!Topics]
>
> - [[dynamic programming\|dynamic programming]]
> - [[combinatorics\|combinatorics]]

## Idea

Number of ways to reach `(m, n)` from `(0, 0)` (down and right only, in 2D grid): `C(m+n, n)=C(m+n, m)`, but if we have obstacles, we can't directly use the [[binomial coefficient\|binomial coefficient]] formula. Instead we use [[dynamic programming\|dynamic programming]] with `dp[i][j]=dp[i−1][j]+dp[i][j−1]` (i.e, num of ways to reach pos i,j = num of ways to reach one cell left + num of ways to reach one cell above)

## Code

```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [[0]*n for _ in range(m)]
        dp[0][0] = 0 if obstacleGrid[0][0] else 1
        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[i][j] = 0
                    continue
                if i > 0: dp[i][j] += dp[i-1][j]
                if j > 0: dp[i][j] += dp[i][j-1]
        print(dp)
        return dp[m-1][n-1]
```

## Related
