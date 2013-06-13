brainfuck-js
============

A brainfuck interpreter written in JavaScript

## Usage ##

```javascript
var result = bf(program,input,debut,bits);
```

The ```bf``` function will return a string containing the output of the program. In this example the output is being stored in ```result```.


## Parameters ##

### Required ###

```program``` is a string providing the brainfuck program that will be interpreted.

### Optional ###

```input``` is a string of input that may be processed by the program. (default: '')

```debug``` is a boolean flag that allows printing of the operations to the console when set to true. (default: false)

```bits``` is an integer that controls the cell size in bits that the array will handle. (default: 8)

## Bugs ##

At this time, there are no known bugs in this implementation.
