---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - c++ internals

```cpp
char arr[] = {'a', 'b', 'c', 'd', 'e', '\0'};
cout << arr << endl;
```

Above will give a runtime error if we don't have the `\0` char at the end of the array and use `cout << arr`, since the `cout` scans through and prints char arrays until it finds the **termination char** `\0`.


## Related
