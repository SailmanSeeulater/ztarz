---
title: "Returning a pointer to a local"
module: os
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Dangling_pointer"
tags: ["memory", "stack", "heap"]
stack: ["c"]
choices:
  - text: "`snprintf` doesn't null-terminate the string"
    why: "`snprintf` always null-terminates when the size is greater than zero."
  - text: "The buffer is too small for long names"
    why: "`snprintf` truncates safely to the size given. That's a truncation issue, not garbage output."
  - text: "`buf` lives on the stack; it's gone when the function returns, so the caller holds a dangling pointer"
    correct: true
    why: "The next function call reuses that stack space. Allocate with `malloc` (caller frees) or have the caller pass a buffer in."
  - text: "`printf` needs `%c` for a char array"
    why: "`%s` is right for a null-terminated string. `%c` prints one character."
---

## Prompt

This sometimes prints the greeting and sometimes prints garbage. Why?

```c
char *greeting(const char *name) {
    char buf[64];
    snprintf(buf, sizeof buf, "Hello, %s", name);
    return buf;
}

int main(void) {
    char *msg = greeting("Ada");
    printf("%s\n", msg);
}
```

## Explanation

Local arrays are automatic variables on the stack. Their storage ends when the function returns, and any call after that, including `printf` itself, can overwrite it. Memory that must outlive the call belongs on the heap (`malloc`, and someone must `free` it) or in a buffer the caller owns.
