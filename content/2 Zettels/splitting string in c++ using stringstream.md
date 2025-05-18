---
{"publish":true,"created":"2025-01-10T10:15:21.585+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
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
