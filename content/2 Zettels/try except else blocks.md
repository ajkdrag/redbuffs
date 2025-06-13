---
{"publish":true,"created":"2025-06-09T20:42:44.104+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[idiomatic python\|idiomatic python]]

Putting too much code inside of a try catch exceptions you didn’t intend to handle. Instead of expanding a try block, put additional code into the `else` block following the associated except block, or in a totally separate try statement:

```python
try:
    with open('source.json', 'r') as f:
        data = json.load(f)
except FileNotFoundError:
    print("Error: Source file not found.")
except json.JSONDecodeError:
    print("Error: Could not decode JSON from source file.")
else:
    # This code runs only if the try block succeeds without exceptions
    # Process the data (e.g., extract a specific value)
    processed_data = data.get('important_key')

    # Now, attempt to write to a destination file in a separate try block
    try:
        with open('destination.txt', 'w') as f:
            f.write(str(processed_data))
    except IOError:
        # This exception is clearly from the write operation
        print("Error: Failed to write to destination file.")
```

In above code, if you place both read and write operations in a single try block and then catch `IOError`, you know an `IOError` occurred. You do not know which operation failed. Was it the read from `source.json` or the write to `destination.txt`? You would need to add more code inside the `except` block to figure that out, which complicates the error handling logic itself.

This approach _isolates_ the source of the error. An exception in the `try` block means the input failed. An exception in the `else` block means the output failed. This separation makes the code's intent clear and debugging far simpler.

## Related
