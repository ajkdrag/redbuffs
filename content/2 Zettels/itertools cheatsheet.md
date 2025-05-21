---
{"publish":true,"created":"2025-05-19T20:33:39.233+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[idiomatic python\|idiomatic python]]

The `itertools` module in Python provides a collection of functions for efficiently working with iterators and generators. They are concise and performant, falling into 3 main categories:

1.  **Linking Iterators Together:** Combining or extending iterators
2.  **Filtering Items from an Iterator:** Selecting specific items based on conditions
3.  **Producing Combinations of Items from Iterators:** Generating various [[2 Zettels/permutations and combinations\|permutations and combinations]]

### 1. Linking Iterators Together

- **`chain(*iterables)`:** Combines multiple iterables into a single sequence

    ```python
    import itertools

    it = itertools.chain([1, 2, 3], [4, 5, 6])
    print(list(it))  # Output: [1, 2, 3, 4, 5, 6]
    ```

- **`chain.from_iterable(iterable)`:** Takes an iterable of iterables and flattens it into a single iterator

    ```python
    it1 = [i * 3 for i in ("a", "b", "c")]
    it2 = [j * 2 for j in ("x", "y", "z")]
    nested_it = [it1, it2]
    output_it = itertools.chain.from_iterable(nested_it)
    print(list(output_it))  # Output: ['aaa', 'bbb', 'ccc', 'xx', 'yy', 'zz']
    ```

- **`repeat(object[, times])`:** Repeats an object indefinitely or a specified number of times

    ```python
    it = itertools.repeat("hello", 3)
    print(list(it))  # Output: ['hello', 'hello', 'hello']
    ```

- **`cycle(iterable)`:** Cycles through an iterable indefinitely

    ```python
    it = itertools.cycle([1, 2])
    result = [next(it) for _ in range(10)]
    print(result)  # Output: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    ```

- **`tee(iterable[, n])`:** Splits a single iterator into multiple independent iterators

    ```python
    it1, it2, it3 = itertools.tee(["first", "second"], 3)
    print(list(it1))  # Output: ['first', 'second']
    print(list(it2))  # Output: ['first', 'second']
    print(list(it3))  # Output: ['first', 'second']
    ```

- **`zip_longest(*iterables, fillvalue=None)`:** Similar to `zip`, but continues until the longest iterable is exhausted, filling shorter iterables with `fillvalue`

    ```python
    keys = ["one", "two", "three"]
    values = [1, 2]
    it = itertools.zip_longest(keys, values, fillvalue="N/A")
    print(list(it)) # Output: [('one', 1), ('two', 2), ('three', 'N/A')]
    ```

### 2. Filtering Items from an Iterator

- **`islice(iterable, stop)` or `islice(iterable, start, stop[, step])`:** Creates an iterator that returns selected items from the input iterable, similar to slicing

    ```python
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    first_five = itertools.islice(values, 5)
    print(list(first_five))  # Output: [1, 2, 3, 4, 5]
    middle_odds = itertools.islice(values, 2, 8, 2)
    print(list(middle_odds))  # Output: [3, 5, 7]
    ```

- **`takewhile(predicate, iterable)`:** Creates an iterator that returns items from the iterable as long as the predicate function returns `True`

    ```python
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    less_than_seven = lambda x: x < 7
    it = itertools.takewhile(less_than_seven, values)
    print(list(it))  # Output: [1, 2, 3, 4, 5, 6]
    ```

- **`dropwhile(predicate, iterable)`:** Creates an iterator that skips items from the iterable as long as the predicate function returns `True`, then returns the remaining items

    ```python
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    less_than_seven = lambda x: x < 7
    it = itertools.dropwhile(less_than_seven, values)
    print(list(it))  # Output: [7, 8, 9, 10]
    ```

- **`filterfalse(predicate, iterable)`:** Creates an iterator that returns items from the iterable for which the predicate function returns `False`

    ```python
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    evens = lambda x: x % 2 == 0
    filter_false_result = itertools.filterfalse(evens, values)
    print(list(filter_false_result))  # Output: [1, 3, 5, 7, 9]
    ```

### 3. Producing Combinations of Items from Iterators

- **`batched(iterable, n)`:** Groups items from the iterable into batches of size `n`

    ```python
    it = itertools.batched([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)
    print(list(it))  # Output: [(1, 2, 3), (4, 5, 6), (7, 8, 9)]
    ```

- **`pairwise(iterable)`:** Returns an iterator of overlapping pairs from the input iterable

    ```python
    route = ["Los Angeles", "Bakersfield", "Modesto", "Sacramento"]
    it = itertools.pairwise(route)
    print(list(it)) # Output: [('Los Angeles', 'Bakersfield'), ('Bakersfield', 'Modesto'), ('Modesto', 'Sacramento')]
    ```

- **`accumulate(iterable[, func])`:** Accumulates the items from the iterable using a specified function (or addition by default)

    ```python
    values = [1, 2, 3, 4, 5]
    sum_reduce = itertools.accumulate(values)
    print(list(sum_reduce))  # Output: [1, 3, 6, 10, 15]

    def sum_modulo_10(first, second):
        output = first + second
        return output % 10

    modulo_reduce = itertools.accumulate(values, sum_modulo_10)
    print(list(modulo_reduce))  # Output: [1, 3, 6, 0, 5]
    ```

- **`product(*iterables, repeat=1)`:** Returns the Cartesian product of input iterables

    ```python
    single = itertools.product([1, 2], repeat=2)
    print(list(single))  # Output: [(1, 1), (1, 2), (2, 1), (2, 2)]
    multiple = itertools.product([1, 2], ["a", "b"])
    print(list(multiple))  # Output: [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
    ```

- **`permutations(iterable, r=None)`:** Returns all possible orderings (permutations) of items from the iterable, optionally specifying the length (`r`)

    ```python
    it = itertools.permutations([1, 2, 3], 2)
    print(list(it)) # Output: [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
    ```

- **`combinations(iterable, r)`:** Returns all possible combinations of `r` items from the iterable

    ```python
    it = itertools.combinations([1, 2, 3, 4], 2)
    print(list(it))  # Output: [(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]
    ```

- **`combinations_with_replacement(iterable, r)`:** Similar to `combinations`, but allows for repeated items in the combinations

    ```python
    it = itertools.combinations_with_replacement([1, 2, 3], 2)
    print(list(it))  # Output: [(1, 1), (1, 2), (1, 3), (2, 2), (2, 3), (3, 3)]
    ```

## Related
