---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - c++ STL

`vector` is the go-to choice when we need a truly dynamic array in C++. It provides the best balance of functionality and performance while handling memory management automatically.

With vectors, we can use `arr.push_back()` to keep adding elements and internally the vector will be resized to accomodate the new elements. The [[2 Zettels/algorithm for dynamic resizing of arrays\|algorithm for dynamic resizing of arrays]] simply creates a new array of size 1.5x or 2x and copies over the contents from prev array.

The function `size()` returns the number of elements in the vector, while `capacity()` returns *how many elements can fit without reallocation*.

## Related
