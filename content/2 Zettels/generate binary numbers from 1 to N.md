---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/queues\|queues]]

> [!Note]
> Observe that all natural numbers can be written in the form: `2k` (appending 0 as suffix in binary) and `2k + 1` (appending 1 as suffix in binary).

We can use a queue to systematically generate binary numbers in a **breadth-first manner**. Initially, we enqueue the binary representation of `1`. For each number from 1 to N, we perform the following steps: `dequeue` the front element of the queue and record it as the current binary number. Then, we generate the **next two binary numbers** by appending `0` and `1` to the current number and `enqueue` these new numbers. This process continues until we have generated all binary numbers up to N.

```cpp
class Solution {
public:
  vector<string> generateBinaryNumbers(int n) {
    vector<string> res;
    queue<string> q;
    q.push("1");
    while (n--) {
      string top = q.front();
      res.push_back(top);
      q.pop();
      q.push(top + "0");
      q.push(top + "1");
    }
    return res;
  }
};
```

**Time Complexity**
- $O(n)$ 
**Space Complexity**
- $O(n)$: The `res` array stores `n` elements. At any point in time, the queue `q` holds at most two binary numbers for each element processed. This means that the maximum number of elements in the queue is proportional to `n`. Thus $O(n+n)=O(n)$.

## Related
