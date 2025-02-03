---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - memory management
> - arrays

Under the hood, when dynamic array resizing is done as:
1. Allocate a new array with larger capacity (usually 1.5x or 2x)
2. Copy elements over from prev array to new array
3. Deallocate old memory by getting rid of prev array
4. Update the pointer

```cpp
// Initial allocation
int n = 5;
int* arr = new int[n];

// Need to resize to 2*n elements
int new_size = 2*n;
int* new_arr = new int[new_size];

// Copy old elements
for(int i = 0; i < n; i++) {
    new_arr[i] = arr[i];
}

// Delete old array
delete[] arr;

// Update pointer
arr = new_arr;
```

> [!Note]
> This algorithm is language agnostic, however, most languages already implement this under the hood (e.g. [[2 Zettels/using vectors in c++\|using vectors in c++]]).

> [!Tip]
> Reserving capacity by calling `reserve(value)` upfront can improve performance when you know the approximate number of elements you'll need, since we won't need to copy over.

## Related
