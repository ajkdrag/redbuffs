---
{"publish":true,"created":"2025-03-19T23:43:21.705+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/counting sort\|counting sort]]
> - [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]]

Counting Sort is a [[2 Zettels/stable sorting algorithm\|stable sorting algorithm]], meaning that it preserves the relative order of equal elements. This property is crucial when sorting objects with additional attributes, as it ensures that the sorting does not disrupt the original order of elements with the same key. This is achieved by processing the input array in *reverse* order when building the output array.

### Example: Sorting Objects with Duplicates
Consider an array of objects where each object has a `key` (used for sorting) and a `value` (used to distinguish between objects with the same key). For instance:

```cpp
struct Item {
    int key;
    string value;
};

vector<Item> arr = {{4, "A"}, {2, "B"}, {2, "C"}, {8, "D"}, {3, "E"}, {3, "F"}, {1, "G"}};
```

Here, the `key` is the sorting criterion, and the `value` represents additional information. Notice that there are duplicate keys (`2` and `3`), and we want to preserve the relative order of these elements.

### How Stability is Ensured

1. **Reverse Traversal**: When building the output array, Counting Sort processes the input array in reverse order. This ensures that for elements with the same key, the one appearing later in the input array is placed later in the output array, preserving their relative order.

2. **Example Execution**:
   - Input: `{{4, "A"}, {2, "B"}, {2, "C"}, {8, "D"}, {3, "E"}, {3, "F"}, {1, "G"}}`
   - Step 1: Count freqs of each key: `freqs: [0, 1, 2, 2, 1, 0, 0, 0, 1]`
   - Step 2: Compute cumulative freqs: `count: [0, 1, 3, 5, 6, 6, 6, 6, 7]`
   - Step 3: Build the output array in reverse order:
     - Process `{1, "G"}` → Place at position `count[1] - 1 = 0`, decrement count.
     - Process `{3, "F"}` → Place at position `count[3] - 1 = 4`, decrement count.
     - Process `{3, "E"}` → Place at position `count[3] - 1 = 3`, decrement count.
     - Process `{8, "D"}` → Place at position `count[8] - 1 = 6`, decrement count.
     - Process `{2, "C"}` → Place at position `count[2] - 1 = 2`, decrement count.
     - Process `{2, "B"}` → Place at position `count[2] - 1 = 1`, decrement count.
     - Process `{4, "A"}` → Place at position `count[4] - 1 = 5`, decrement count.

   - Output: `{{1, "G"}, {2, "B"}, {2, "C"}, {3, "E"}, {3, "F"}, {4, "A"}, {8, "D"}}`

   Notice that the relative order of `{2, "B"}` and `{2, "C"}` is preserved, as is the order of `{3, "E"}` and `{3, "F"}`.


Here’s how the reverse traversal ensures stability in Counting Sort:

```cpp
void countingSort(vector<Item>& arr) {
    int max_key = 0;
    for (Item &item : arr) {
        max_key = max(max_key, item.key);
    }

    vector<int> count(max_key + 1, 0);
    vector<Item> output(arr.size());

    // Count occurrences of each key
    for (Item &item : arr) {
        count[item.key]++;
    }

    // Compute cumulative counts
    for (int i = 1; i <= max_key; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array in reverse order
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i].key] - 1] = arr[i];
        count[arr[i].key]--;
    }

    // Copy the sorted elements back into the original array
    arr = output;
}
```

## Related
