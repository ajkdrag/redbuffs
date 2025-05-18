---
{"publish":true,"created":"2025-01-27T14:15:16.114+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/two pointers + sorting\|two pointers + sorting]]

## Idea

- Sort both arrays to enable efficient nearest neighbor search
- For each house:
  - Use sliding window to find first heater on/after house -> call it `heaterIdx`
  - The heater right before the house will be `heaterIdx - 1`
  - Calculate distances to heaters before/after
  - Take `min` of these distances as best for this house
- Track maximum of all minimum distances to find optimal raidus

## Code

```cpp
class Solution {
public:
    int findRadius(vector<int>& houses, vector<int>& heaters) {
        sort(houses.begin(), houses.end());
        sort(heaters.begin(), heaters.end());

        int maxRadius = 0;
        int heaterIdx = 0;

        for (int house : houses) {
            // Find the first heater that is not to the left of current house
            while (heaterIdx < heaters.size() && heaters[heaterIdx] < house) {
                heaterIdx++;
            }

            // Calculate distances to nearest heaters
            int rightDist = (heaterIdx < heaters.size()) ? heaters[heaterIdx] - house : INT_MAX;
            int leftDist = (heaterIdx > 0) ? house - heaters[heaterIdx - 1] : INT_MAX;

            // Take the minimum of distances and update max radius if needed
            int currRadius = min(leftDist, rightDist);
            maxRadius = max(maxRadius, currRadius);
        }

        return maxRadius;
    }
};
```

T.C: $O(N+M)$ if houses and heaters already sorted, else $O(N\log N + M\log M)$.
S.C: $O(1)$

## Related
