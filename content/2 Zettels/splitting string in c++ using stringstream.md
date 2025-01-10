---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[string algorithms\|string algorithms]]
> - [[c++ internals\|c++ internals]]

```cpp
#include <sstream>
#include <vector>
#include <string>

vector<string> split(string s, char delimiter) {
    vector<string> tokens;
    stringstream ss(s);
    string token;
    
    while (getline(ss, token, delimiter)) {
        tokens.push_back(token);
    }
    return tokens;
}

// Usage:
string s = "apple,banana,orange";
vector<string> tokens = split(s, ',');
// tokens = ["apple", "banana", "orange"]
```

## Related
