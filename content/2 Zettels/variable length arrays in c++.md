---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-09T16:20:03.973+05:30"}
---


> [!Topics]
> - [[c++ internals\|c++ internals]]
> - [[arrays\|arrays]]
> - [[memory management\|memory management]]

Typically, in coding contests, we take size of array from input (variable `n`) and then have to create an array of that size, i.e. we don't know the array size during compile time. This creates a need for variable length arrays (VLAs). Usually, we get away by doing:

```cpp
#include <bits/stdc++.h> 
using namespace std; 
signed main() { 
    int n; 
    cin >> n; 
    int arr[n]; 
}
```

Above works with gcc compiler, but isn't **standard C++**, since GCC allows VLAs (variable length arrays) as an *extension*. In standard C++, we create static arrays with the square bracket notation, i.e. `int arr[20]` etc.

For variable length arrays, one can use **vectors** `vector<int> arr(n)` or **dynamic arrays**: `int* arr = new int[n];`

[[2 Zettels/using vectors in c++\|Using vectors]] is the popular choice as they [[2 Zettels/algorithm for dynamic resizing of arrays\|take care of dynamic array resizing]] as well.
## Related
