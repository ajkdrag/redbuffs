---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[programming basics\|programming basics]]
> - [[memory management\|memory management]]
> - [[competitive programming\|competitive programming]]

```cpp
int score = 50;
int main() {
    int score = 100;
    cout << "Local variable is " << score << '\n';
    cout << "Global variable is " << ::score << '\n';
    return 0;
}
```

- **Global**: Variables declared outside functions; stored in data segment
- **Local**: Variables declared inside functions; stored on stack

> [!Warning]
> - Use globals for large arrays in competitive programming, as opposed to declaring inside functions, since stack size is typically 1-8 MB in competitions
> - Globals initialized to 0/null, locals have garbage values
> - Thread safety concerns with globals

## Related
