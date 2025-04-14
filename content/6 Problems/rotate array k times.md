---
{"publish":true,"tags":["type/problem"],"platform":"Leetcode","link":"https://leetcode.com/problems/rotate-array/description/","PassFrontmatter":true,"created":"2025-02-22T11:06:18.192+05:30"}
---


> [!Topics]
>
> - [[arrays\|arrays]]
> - [[2 Zettels/circular and rotated array problems\|circular and rotated array problems]]
> - [[modular arithmetic\|modular arithmetic]]

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative. Note that if (k < 0), doing k += n is equivalent. Also if k > n, doing k%=n is equivalent too.

## Idea

By reversing the whole array and then carefully reversing specific segments, we effectively shift elements in a cyclical manner without needing extra space. This works in $O(n)$ t.c. Another approach is to use an aux array to store the elements in their new positions (which can found using mod operation).

Another interesting approach is to observe that when rotating an array of length `n` by `k` steps, elements are grouped into **cycles**. The number of cycles is equal to the GCD of `n` and `k`, and each cycle contains `n / GCD(n, k)` elements. By iterating over each cycle, i.e. starting index in `[0, GCD-1]`, and shifting elements in steps of `k` until the cycle returns to the start, we can rotate all elements optimally.

## Code

Approach 1 (reverse trick):

```cpp
class Solution {
public:
  void rotate(vector<int> &nums, int k) {
    int n = nums.size();
    k %= n;

    reverse(nums.begin(), nums.end());
    reverse(nums.begin(), nums.begin() + k);
    reverse(nums.begin() + k, nums.end());
  }
};
```

Approach 2 (mod operation + aux array):

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int[] a = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            a[(i + k) % nums.length] = nums[i];
        }
        for (int i = 0; i < nums.length; i++) {
            nums[i] = a[i];
        }
    }
}
```

Approach 3 (cyclic shifting)

```cpp
#include <vector>
#include <numeric> // for std::gcd
#include <algorithm> // for std::swap

class Solution {
public:
    void rotate(std::vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0 || k == 0) return;

        k = k % n;

        int cycles = std::gcd(n, k);

        for (int start = 0; start < cycles; ++start) {
            int prev_val = nums[start];
            int current = (start + k) % n;

            while (current != start){
                int temp = nums[current];
                nums[current] = prev_val;
                prev_val = temp;

                current = (current + k) % n;
            }

            // last assignment
            nums[start] = prev_val;
        }
    }
};
```

## Related
