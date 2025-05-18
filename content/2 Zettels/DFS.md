---
{"publish":true,"created":"2025-04-19T21:20:50.274+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[graph traversal\|graph traversal]]
> - [[algorithmic paradigm\|algorithmic paradigm]]

Depth-First Search (DFS) algorithm for traversing/searching tree or graph data structure. Starts at root/arbitrary node, explores as far as possible along each branch before backtracking. Goes "deep" first.

Core mechanic: **backtracking**. Reach vertex with no unvisited neighbors? Step back to previous vertex. Explore next available path. Systematically explores/backtracks to visit all _reachable_ vertices.

Common implementations:

- **Recursion:** Intuitive. Function call stack acts as implicit stack. Mark current vertex `v` visited. For each neighbor `u` of `v`, if unvisited, recursive call `dfs(u)`. Backtracking natural when call returns
- **Iteration:** Explicit [[dfs using stack\|dfs using stack]]. Push start node. While stack not empty: Pop node. If unvisited: Mark visited, process. Push all unvisited neighbors onto stack. Avoids deep recursion limits.

Graphs with cycles: Must track **visited vertices** to avoid infinite loops. Use boolean array or hash set.

DFS traversal order concepts:

- [[pre-order traversal\|pre-order traversal]]: Process vertex _before_ recursive calls to neighbors. Typical basic DFS order. Reflects the order in which nodes are first discovered
- [[post-order traversal\|post-order traversal]]: Process vertex _after_ recursive calls for all neighbors complete. Node processed only after entire subtree explored

Post-ordering significant in algorithms like [[2 Zettels/topological sorting\|topological sorting]] and [[2 Zettels/finding connected components in undirected graphs\|finding connected components in undirected graphs]]. Aggregates descendant info before ancestor. Pre-ordering sufficient for basic reachability/path finding.

**Time Complexity:** $O(V+E)$
**Space Complexity:** $O(V)$ (visited array and recursion stack)

## Implementation (Recursive)

```cpp
vector<vector<int>> adj;
vector<bool> visited;
vector<int> dfs_order;  // To store the traversal order (pre-order)

void dfs(int u) {
    visited[u] = true;       // Mark current node as visited
    dfs_order.push_back(u); // Process node (add to pre-order traversal list)

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
    // Post-order processing could be done here after the loop
}

int main() {
    int n, m;
    cin >> n >> m;

    adj.resize(n);
    visited.resize(n, false);

    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); // undirected graph case
    }

    // handles disconnected graphs
    for (int i = 0; i < n; ++i) {
        if (!visited[i]) {
            dfs(i); // Start DFS for a new component
        }
    }


    for (int node : dfs_order) {
        cout << node << " ";
    }
    cout << endl;

    return 0;
}
```

## Related

- [[2 Zettels/BFS\|BFS]]
