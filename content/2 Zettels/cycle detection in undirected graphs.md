---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-20T12:05:47.913+05:30"}
---


> [!Topics]
>
> - [[cycle detection\|cycle detection]]
> - [[graph algorithms\|graph algorithms]]

[[2 Zettels/DFS\|DFS]] is a powerful algorithm used for exploring graphs. It is effective for detecting cycles in both undirected and directed graphs.

For [[undirected graphs\|undirected graphs]], a cycle exists if, during a DFS traversal, you encounter an already visited node that is _not_ the immediate parent node from which you arrived at the current node. When traversing from node u to its neighbor v:

- If `v` is the parent of `u` in the DFS tree, not a cycle
- If `v` is already visited and is _not_ the parent of `u`, this `u-v` edge is a back edge connecting `u` to an ancestor (or another node in the same component already explored) in the DFS tree, thus forming a cycle

**Algorithm (recursive DFS):**

1. Initialize a `visited` array/set, marking all nodes as unvisited
2. Iterate through each node in the graph. If a node is unvisited, start a DFS traversal from it, indicating it as the root of a new DFS tree (its parent is null/special value)
3. The recursive DFS function `dfs(u, parent)`:
    - Mark node `u` as visited
    - For each neighbor `v` of `u`:
        - If `v` is the `parent` of `u`, ignore this edge (it's the one you came from)
        - If `v` is already `visited`, a cycle is found
        - If `v` is *not* `visited`, recursively call `dfs(v, u)`. If the recursive call finds a cycle, propagate that finding back up

**Time Complexity:** $O(V + E)$
**Space Complexity:** $O(V)$

```cpp
bool dfs_cycle_util(int u, int parent, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;

    for (int v : adj[u]) {
        // If recursion finds a cycle, return true.
        // Don't do: return dfs_cycle_util(...); we don't want to return false
        // without checking from other neighbors
        if (!visited[v]) {
            if (dfs_cycle_util(v, u, adj, visited)) {
                return true;
            }
        }
        // If v is visited AND not the parent of u, a cycle is found.
        else if (v != parent) {
            return true;
        }
    }
    return false;
}

// Check for cycles in the entire graph (handles disconnected components)
bool hasCycle(int n, const vector<vector<int>>& adj) {
    vector<bool> visited(n, false);

    for (int i = 0; i < n; ++i) {
        if (!visited[i]) {
            // Start DFS from unvisited node with parent as -1 (or any indicator)
            if (dfs_cycle_util(i, -1, adj, visited)) {
                return true; // Cycle found in this component
            }
        }
    }
    return false;
}

```

## Related

- [[2 Zettels/cycle detection in directed graphs\|cycle detection in directed graphs]]
