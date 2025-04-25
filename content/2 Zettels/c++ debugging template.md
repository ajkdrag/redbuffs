---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-22T11:28:56.141+05:30"}
---


> [!Topics]
>
> - [[c++ STL\|c++ STL]]

I use the following minimal template for solving coding problems. It has the `debug(...)` macro that allows me to print out vectors, maps, etc like python `print(...)` (pretty useful imo!). This template might change in future as I add other templates for common ds and algos.

```cpp
#include <bits/stdc++.h>
using namespace std;

// Type Aliases
using ll = long long;
using vi = vector<int>;
using vll = vector<ll>;
using vvi = vector<vector<int>>;
using vvll = vector<vector<ll>>;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using vpii = vector<pair<int, int>>;
using vpll = vector<pair<ll, ll>>;
using vvpii = vector<vector<pair<int, int>>>;
using vvpll = vector<vector<pair<ll, ll>>>;

// Macros
#define all(x) x.begin(), x.end()
#define pb push_back
#define mp make_pair

// Debugging Setup - Enabled when compiling with -DDEBUG
#ifdef DEBUG
// Helper to check if a type is iterable (has begin() and end())
template <typename T, typename = void> struct is_iterable : false_type {};
template <typename T>
struct is_iterable<T, void_t<decltype(begin(declval<T>())),
                                  decltype(end(declval<T>()))>>
    : true_type {};

// Overload for pair
template <typename A, typename B>
ostream &operator<<(ostream &os, const pair<A, B> &p) {
  return os << '(' << p.first << ", " << p.second << ')';
}

// Overload for iterable types (vector, set, map, etc.), except string
// This works recursively for nested containers (e.g., vector<vector<int>>,
// vector<vector<pair<int,int>>>)
template <typename T>
typename enable_if<is_iterable<T>::value && !is_same<T, string>::value,
                   ostream &>::type
operator<<(ostream &os, const T &v) {
  os << "[";
  bool first = true;
  for (const auto &x : v) {
    if (!first)
      os << ", ";
    os << x; // Recursively calls the appropriate operator<< for type of x
    first = false;
  }
  os << "]";
  return os;
}

// Base case for debug_out recursion (handles empty debug() call)
void debug_out() { cerr << "\n"; }

// Recursive variadic template for printing multiple arguments
template <typename Head, typename... Tail> void debug_out(Head H, Tail... T) {
  cerr << H; // Print the current argument
  if (sizeof...(T) > 0)
    cerr << " ";   // Add space only if more arguments follow
  debug_out(T...); // Recurse for remaining arguments
}

// The debug macro: prints variable names and values
// Example: debug(x, y, vec); -> prints "[x, y, vec] = value_of_x value_of_y
// [elements_of_vec]"
#define debug(...)                                                             \
  cerr << "[" << #__VA_ARGS__ << "] = ";                                       \
  debug_out(__VA_ARGS__)
#else
// If DEBUG is not defined, debug calls do nothing
#define debug(...)
#endif

void solve() {

}

signed main() {
  // Fast I/O
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int t = 1;
  cin >> t; // comment for single test case
  while(t--) {
    solve();
  }

  return 0;
}
```

## Related
