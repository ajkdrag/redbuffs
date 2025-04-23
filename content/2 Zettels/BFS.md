---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-19T21:55:08.755+05:30"}
---


> [!Topics]
>
> - [[graph traversal\|graph traversal]]
> - [[algorithmic paradigm\|algorithmic paradigm]]

BFS is a graph traversal algorithm that explores nodes **level by level**. It starts at a source node and visits all nodes at the present distance before moving to the next level. BFS uses a [[2 Zettels/queues\|queue]] data structure (FIFO) to achieve this.

1. Enqueue source node `s` and mark as visited
2. While queue is not empty:
    - Dequeue node `u`
    - Process `u`
    - For unvisited neighbors `v` of `u`:
        - Mark `v` as visited
        - Enqueue `v`

BFS guarantees [[level-order traversal\|level-order traversal]] and finds the **shortest path in unweighted graphs**.

Tracking visited nodes is crucial. Prevents reprocessing nodes and infinite loops in graphs with cycles. Queue's FIFO property inherently drives level-by-level exploration. Nodes at distance k processed before nodes at distance k+1.

**Time Complexity:** $O(V + E)$
**Space Complexity:** $O(V)$

```cpp
using namespace std;

vector<vector<int>> adj; // Adjacency list
vector<bool> visited;   // Visited array
vector<int> bfs_order;  // To store the traversal order

void bfs(int s, int n) {
    queue<int> q;

    visited[s] = true;
    q.push(s);

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        bfs_order.push_back(u); // Process node

        for (int v : adj[u]) {
            if (!visited[v]) {
                // ensures each node processed only once
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

```

## Related

- [[2 Zettels/DFS\|DFS]]
