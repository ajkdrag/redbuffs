---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - c++ STL
> - c++ internals

Key differences:

1. **Construction Location**
   - `push_back()` creates the object first, then copies/moves it into the vector
   - `emplace_back()` constructs the object directly in the vector's memory
2. **Parameter Handling**
   - `push_back()` takes a complete object of the container's type
   - `emplace_back()` takes *constructor arguments* and forwards them to the object's constructor
3. **Performance**
   - `emplace_back()` is generally more efficient as it avoids unnecessary copies/moves
   - Most noticeable with complex objects like strings or custom classes

```cpp
class MyClass {
  public:
    int x;
    std::string y;

  public:
    MyClass(int x, std::string y) : x(x), y(y) {}
  };

  std::vector<MyClass> vec;

  vec.push_back(MyClass(42, "test")); // Creates temporary object, then moves it
  vec.emplace_back(42, "test"); // Constructs object directly in vector}

  cout << vec[0].x << endl;
```

Best practices:

- Use `emplace_back()` when constructing new objects
- Use `push_back()` when adding existing objects
- `push_back()` might be clearer when working with simple types like int or double

## Related
