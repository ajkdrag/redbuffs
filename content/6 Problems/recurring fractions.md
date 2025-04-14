---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-02-16T19:29:36.215+05:30"}
---


> [!Topics]
>
> - [[modular arithmetic\|modular arithmetic]]

Given two integers representing the numerator and denominator of a fraction, print the fraction in string format. If the fractional part is repeating, enclose the repeating part in parentheses. If multiple answers are possible, print the one which has the smallest length.

Examples:

- 2 / 3 = 0.(6)
- 2 / 1 = 2
- 1 / 2 = 0.5

## Idea

1. **GCD Reduction**:  
   We first simplify the fraction by dividing the numerator and denominator by their gcd using [[2 Zettels/euclid's algorithm\|euclid's algorithm]]. This ensures the fraction is in its simplest form
2. **Sign Management**:  
   We determine if the result should be negative by checking if one (and only one) of the numerator or denominator is negative
3. **Integral Part Calculation**:  
   We calculate the integer (or whole) part of the fraction using integer division. If there is no remainder, we simply output the integral part
4. **Fractional Part & Long Division**:  
   If a remainder exists, we simulate the long division:
   - Multiply the remainder by 10 and find the next digit
   - Before adding the digit to the result string, we check if the current remainder was seen before (use map)
   - If it was, we know that the digits from the first occurrence to the current position form the repeating part. We then insert parentheses around this repeating sequence
   - Otherwise, we record the position of the current remainder and continue the process
5. **Output**:  
   Finally, the constructed result string is printed

## Code

```cpp
int gcd(int a, int b) {
    if (a == 0)
        return b;
    return gcd(b % a, a);
}


string long_div(int nume, int denom) {
    string fracs;
    // Map to store the remainder and its corresponding position in fracs.
    unordered_map<int, int> seen;

    int pos = 0;
    while (nume != 0) {
        // If this remainder has been seen before, we found a repeating cycle.
        if (seen.find(nume) != seen.end()) {
            // Insert parentheses to mark the repeating section.
            fracs.insert(seen[nume], "(");
            fracs.push_back(')');
            return fracs;
        }
        // Mark this remainder with the current position.
        seen[nume] = pos++;

        // Multiply the remainder by 10 to get the next digit.
        nume *= 10;
        int digit = nume / denom;
        fracs.push_back(digit + '0');
        nume %= denom;
    }
    return fracs;
}

void solve() {
    int n, d;
    cin >> n >> d;

    // Handle the zero numerator case.
    if (n == 0) {
        cout << "0" << "\n";
        return;
    }

    string sign = "";
    if ((n < 0) ^ (d < 0))
        sign = "-";

    n = abs(n);
    d = abs(d);

    int g = gcd(n, d);
    n /= g;
    d /= g;

    // Get the integral part.
    int integral = n / d;
    int remainder = n % d;

    string result = sign + to_string(integral);

    if (remainder == 0) {
        cout << result << "\n";
        return;
    }

    // Compute the fractional part.
    result.push_back('.');
    result += long_div(remainder, d);

    cout << result << "\n";
}
```

## Related
