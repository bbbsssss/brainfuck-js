brainfuck-js
============

A brainfuck interpreter written in JavaScript

## Usage ##

```javascript
bf(program) // where program is a brainfuck string (required)
```

```javascript
bf(program,input) // where input is a string that will be processed by the program (default: '')
```

```javascript
bf(program,input,debug) // where debug is a boolean flag that controls the writing of operations to console (default: false)
```

```javascript
bf(program,input,debug,bits) // where bits is an integer that controls the size of a cell (default: 8)
```

The ```bf``` function will return a string containing the output of the program
