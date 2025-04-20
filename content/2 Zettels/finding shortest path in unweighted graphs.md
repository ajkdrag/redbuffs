---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-20T19:32:25.116+05:30"}
---


> [!Topics]
>
> - [[graph algorithms\|graph algorithms]]
> - [[path finding algorithms\|path finding algorithms]]

[[2 Zettels/BFS\|BFS]] finds shortest path in unweighted graphs by exploring nodes layer by layer. First path found to any node is guaranteed to have fewest edges since all edges have equal weight (implicitly 1)

**Key points:**

- Maintain distance array initialized to infinity (`INT_MAX` in code)
- Track parent pointers to reconstruct path
- Works for both [[directed graphs\|directed graphs]] and [[undirected graphs\|undirected graphs]]
- Time complexity $O(V + E)$ same as standard BFS

> [!Warning]
> Only works for unweighted graphs. For weighted graphs use [[dijkstra's algorithm\|dijkstra's algorithm]] or [[bellman ford algorithm\|bellman ford algorithm]]

**Algorithm:**

- Initialize queue with source node
- Set `distance[source] = 0`
- While queue not empty:
    - Dequeue node `u`
    - For each neighbor `v` of `u`:
        - If `v` not visited:
        - Set `distance[v] = distance[u] + 1`
        - Set `parent[v] = u`
        - Enqueue v

```cpp
vector<int> shortestPathBFS(vector<vector<int>>& graph, int src, int dest) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    vector<int> parent(n, -1);
    queue<int> q;

    dist[src] = 0;
    q.push(src);

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : graph[u]) {
            if (dist[v] == INT_MAX) {
                dist[v] = dist[u] + 1;
                parent[v] = u;
                q.push(v);
            }
        }
    }

    // Reconstruct path
    vector<int> path;
    if (dist[dest] == INT_MAX) return path; // No path

    for (int v = dest; v != -1; v = parent[v]) {
        path.push_back(v);
    }
    reverse(path.begin(), path.end());
    return path;
}
```

## Related

- [[dijkstra's algorithm\|dijkstra's algorithm]]
- [[bellman ford algorithm\|bellman ford algorithm]]
