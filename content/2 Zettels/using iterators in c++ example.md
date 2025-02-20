---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-25T16:33:31.066+05:30"}
---


> [!Topics]
> - [[c++ concepts\|c++ concepts]]
> - [[2 Zettels/queues\|queues]]

Given two `1d` vectors, implement an iterator to return their elements alternately. To solve this problem, we can use a queue to alternate between elements from two input lists, maintaining the order of appearance. Each non-empty list is converted into an iterator and added to the queue. The `next()` method retrieves the next element by dequeuing an iterator, extracting its next value, and **re-enqueuing** the iterator if it still has more elements. This ensures that elements from the two lists are accessed alternately, one by one. The `hasNext()` method checks if there are any iterators left in the queue, indicating whether more elements are available.


```cpp
#include <iostream>
#include <vector>
#include <queue>

class Solution {
private:
    std::queue<std::pair<std::vector<int>::iterator, std::vector<int>::iterator>> q;

public:

    Solution(std::vector<int>& v1, std::vector<int>& v2) {
        if (!v1.empty()) {
            q.push(make_pair(v1.begin(), v1.end()));
        }
        if (!v2.empty()) {
            q.push(make_pair(v2.begin(), v2.end()));
        }
    }

    int next() {
        // Retrieve the iterator to the current element, pop it from the queue, and push the next iterator if available.
        auto iter = q.front().first;
        auto end = q.front().second;
        q.pop();
        if (iter + 1 != end) {
            q.push(make_pair(iter + 1, end));
        }
        return *iter;
    }

    bool hasNext() {
        // Check if there are more elements to process in the queue.
        return !q.empty();
    }
};

int main() {
    std::vector<int> v1 = {1, 2};
    std::vector<int> v2 = {3, 4, 5, 6};
    Solution i(v1, v2);
    std::cout << i.next() << std::endl;  // returns 1
    std::cout << i.next() << std::endl;  // returns 3
    std::cout << i.next() << std::endl;  // returns 2
    std::cout << i.next() << std::endl;  // returns 4
    std::cout << i.next() << std::endl;  // returns 5
    std::cout << i.next() << std::endl;  // returns 6
    std::cout << std::boolalpha << i.hasNext() << std::endl;  // returns false
    return 0;
}

```


## Related
