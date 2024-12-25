export const lmp = new Map<string, { id: number; snippet: string }>([
  [
    "Assembly (NASM 2.14.02)",
    {
      id: 45,
      snippet: `
section .data
    hello db 'Hello, World!',0
section .text
    global _start
_start:
    ; write our string to stdout
    mov r0, 1
    mov r1, hello
    mov r2, 13
    mov r7, 4
    svc 0
    ; exit program
    mov r7, 1
    svc 0
`,
    },
  ],
  [
    "Bash (5.0.0)",
    {
      id: 46,
      snippet: `
#!/bin/bash
echo "Hello, World!"
`,
    },
  ],
  [
    "Basic (FBC 1.07.1)",
    {
      id: 47,
      snippet: `
PRINT "Hello, World!"
`,
    },
  ],
  [
    "C (GCC 9.2.0)",
    {
      id: 50,
      snippet: `
#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
    },
  ],
  [
    "C++ (GCC 9.2.0)",
    {
      id: 54,
      snippet: `
#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`,
    },
  ],
]);
