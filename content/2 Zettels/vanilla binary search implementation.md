---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[search algorithms\|search algorithms]]
> - [[binary search\|binary search]]

```python
def binary_search(arr, x):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] < x:
            low = mid + 1
        elif arr[mid] > x:
            high = mid - 1
        else:
            return mid
    return -1

def main():
    arr = [2, 3, 4, 10, 40]
    x = 10
    result = binary_search(arr, x)
    print(result)

if __name__ == "__main__":
    main()
```


## Related
