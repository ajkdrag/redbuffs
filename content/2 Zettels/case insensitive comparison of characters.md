---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[string algorithms\|string algorithms]]

```cpp
bool equalIgnoreCase(char a, char b) {
    return (a == b) || (isalpha(a) && isalpha(b) && abs(a - b) == 32);
}
```

This method works because in ASCII:
- Uppercase letters are from 65 ('A') to 90 ('Z')
- Lowercase letters are from 97 ('a') to 122 ('z')
- The difference between same letters in different cases is always 32

Another simpler approach is to use `tolower()`

```cpp
bool equalIgnoreCase(char a, char b) { return tolower(a) == tolower(b); }
```
## Related
