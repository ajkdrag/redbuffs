---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-20T19:50:37.749+05:30"}
---


> [!Topics]
>
> - [[graph algorithms\|graph algorithms]]
> - [[graph coloring\|graph coloring]]

A [[bipartite graph\|bipartite graph]] is one where vertices can be divided into two disjoint sets such that no two adjacent vertices share same color. Equivalent to 2-coloring problem where adjacent vertices must have different colors.

### Approach 1 (BFS)

1. Initialize color array with -1 (uncolored)
2. Start [[2 Zettels/BFS\|BFS]] from any node, assign color 0
3. For each node, color its neighbors with _opposite_ color
4. If neighbor already colored with same color → graph not bipartite
5. Repeat until all nodes colored or conflict found

Time complexity: $O(V + E)$ same as BFS  
Space complexity: $O(V)$ for color array

```cpp
bool isBipartiteBFS(const vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> color(n, -1);
    queue<int> q;

    for (int i = 0; i < n; ++i) {
        if (color[i] != -1) continue; // already colored

        q.push(i);
        color[i] = 0;

        while (!q.empty()) {
            int u = q.front();
            q.pop();

            for (int v : graph[u]) {
                if (color[v] == -1) {
                    color[v] = color[u] ^ 1; // alternate color
                    q.push(v);
                }
                else if (color[v] == color[u]) {
                    return false; // same color adjacent
                }
            }
        }
    }
    return true;
}
```

### Approach 2 (DFS)

Same logic as BFS but implemented recursively:

```cpp
bool isBipartiteDFS(const vector<vector<int>>& graph) {
    int n = graph.size();
    vector<int> color(n, -1);

    function<bool(int)> dfs = [&](int u) {
        for (int v : graph[u]) {
            if (color[v] == -1) {
                color[v] = color[u] ^ 1;
                if (!dfs(v)) return false;
            }
            else if (color[v] == color[u]) {
                return false;
            }
        }
        return true;
    };

    for (int i = 0; i < n; ++i) {
        if (color[i] == -1) {
            color[i] = 0;
            if (!dfs(i)) return false;
        }
    }
    return true;
}
```

> [!Note]
>
> Both approaches handle disconnected graphs by checking all components. The BFS method is generally preferred for its non-recursive nature and better cache performance

## Related
