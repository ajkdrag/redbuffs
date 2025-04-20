---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-25T16:01:43.956+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/BFS\|BFS]]
> - [[2 Zettels/queues\|queues]]

In breadth-first search (bfs), if we are at state S have 4 tasks to do from our current layer, we do task 1, reach a a new state S1, then come back, do task 2, reach state S2 so on. Once we are done with all the tasks from our current state, we check if there are any other states to explore in our current layer, before moving to the next layer.

A queue data structure synergizes well with the bfs algorithm, as we can store the explored states in a queue and can be sure they will be picked up in the order they were added (FIFO). A very simple example where we have to [[2 Zettels/generate binary numbers from 1 to N\|generate binary numbers from 1 to N]], shows use the power of this idea. At every state, our next states are formed by appending "0" and "1" to the current binary representation (i.e. 2k and 2k+1) and we push them to the queue in that order (since 2k < 2k+1).

**Time Complexity:** $O(V+E)$
**Space Complexity:** $O(V)$

```python
from collections import deque

adj = [] # Adjacency list (list of lists)
visited = [] # Visited list (boolean)
bfs_order = [] # To store the traversal order

def bfs(s, n):
    q = deque()

    visited[s] = True
    q.append(s)

    while q:
        u = q.popleft()
        bfs_order.append(u)

        for v in adj[u]:
            if not visited[v]:
                # ensures each node only processed once
                visited[v] = True
                q.append(v)
```

## Related
