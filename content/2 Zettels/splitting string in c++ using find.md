---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - string algorithms
> - c++ internals

```cpp
vector<string> split(string s, char delim) {
  size_t start = 0;
  size_t end = s.find(delim);
  vector<string> res;

  while (end != string::npos) {
    res.pb(s.substr(start, end - start));
    start = end + 1;
    end = s.find(delim, start);
  }

  if (start != string::npos) {
    res.pb(s.substr(start, s.length() - start));
  }

  return res;
}
```

For competitive programming, the `find()` method is usually faster and gives more control. Other simpler approaches include using [[2 Zettels/splitting string in c++ using stringstream\|stringstream and getline]].
## Related
