---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-20T01:33:10.858+05:30"}
---


> [!Topics]
>
> - [[graph algorithms\|graph algorithms]]

An **undirected graph** can be connected or consist of multiple [[connected components\|connected components]]. To check if an entire undirected graph is connected, start a [[2 Zettels/DFS\|DFS]] from any arbitrary node. If DFS visits all nodes in the graph, the graph is connected.

To find all connected components:

1. Iterate through all vertices
2. If a vertex `v` is unvisited, it marks the start of a new component
3. Start a DFS from `v`. All nodes visited during this DFS belong to the same connected component
4. Mark all visited nodes
5. Repeat process from step 1 until all vertices are visited

Each time DFS starts from an unvisited node, a _new connected component_ is discovered. DFS is often preferred for its potentially lower memory use on deep graphs compared to BFS and simpler recursive implementation. T.C: $O(V+E)$, S.C: $O(V)$

Here is a C++ implementation using DFS to find and print connected components:

```cpp
void dfs(int u, const vector<vector<int>>& adj, vector<bool>& visited, vector<int>& component) {
    visited[u] = true;
    component.push_back(u);
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, adj, visited, component);
        }
    }
}

void find_cc(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    int component_count = 0;

    for (int i = 0; i < n; ++i) {
        if (!visited[i]) {
            component_count++;
            vector<int> current_component;
            dfs(i, adj, visited, current_component);
            // display current_component (optional)
            cout << "Component " << component_count << endl;
        }
    }
    cout << "Total components: " << component_count << endl;
}
```

## Related
