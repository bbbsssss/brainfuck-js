/**
 * interpret a bf program
 *
 * program -- a string containing the bf program
 * input   -- a user input string to be processed by the program (default: '')
 * debug   -- a boolean flag to specify whether operations should be logged to the JavaScript console (default: false)
 * bits    -- cell size in bits (default: 8)
 */
function bf(program, input, debug, bits) {

  // default parameter values
  input = (input || '').split('');
  debug = (typeof debug === undefined) ? false : debug;
  bits = bits || 8;

  // setup and initialization
  var maxVal = Math.pow(2, bits) - 1;
  var a = new Array(); // data array
  var n = new Array(); // nesting level pointer array
  var op = 0;          // operation counter used in debug outputput
  var p = 0;           // data pointer
  var x = 0;           // x flag used when a loop is encountered and the assocated data pointer is already 0
  var output = '';

  // begin stepping through program
  // i is the instruction pointer
  for (var i = 0; i < program.length; i++) {
    if (debug) ++op;

    switch (program[i]) {
      case '>':
        incrementPointer(i);
        break;
      case '<':
        decrementPointer(i);
        break;
      case '+':
        incrementByte(i);
        break;
      case '-':
        decrementByte(i);
        break;
      case '.':
        outputByte(i);
        break;
      case ',':
        inputByte(i);
        break;
      case '[':
        beginLoop(i);
        break;
      case ']':
        i = endLoop(i);
        break;
      default:
        break;
    }
  }

  // empty arrays
  a = null;
  n = null;

  // return any output
  return output;

  function incrementPointer(i) {

    if (x) return;
    ++p;
    if (debug) log(i, 'array pos. now '+p);
  }

  function decrementPointer(i) {

    if (x) return;
    if (p > 0) {
      --p;
      if (debug) log(i, 'array pos. now '+p);
    }
    else {
      if (debug) log(i, 'array pos. is already '+p);
    }
  }

  function incrementByte(i) {

    if (x) return;
    if ((a[p] || 0) < maxVal) {
      a[p] = (a[p] || 0) + 1;
    }
    else {
      a[p] = 0;
    }
    if (debug) log(i, 'a['+p+'] = '+a[p]);
  }

  function decrementByte(i) {

    if (x) return;
    if ((a[p] || 0) > 0) {
      a[p] = (a[p] || 0) - 1;
    }
    else {
      a[p] = maxVal;
    }
    if (debug) log(i, 'a['+p+'] = '+a[p]);
  }

  function outputByte(i) {

    if (x) return;
    output = output + String.fromCharCode(a[p]);
    if (debug) log(i, 'output \''+a[p]+'\' '+String.fromCharCode(a[p]));
  }

  function inputByte(i) {

    if (x != 0) {
      return;
    }
    var read = input.shift();
    if (read === undefined && program[i+1] == '+') a[p] = -1;
    else if (read === undefined) a[p] = 0;
    else a[p] = read.charCodeAt(0);
    if (debug) log(i, 'read in '+read+' ('+a[p]+')');
  }

  function beginLoop(i) {

    if (x != 0) {
      ++x;
      return;
    }
    if ((a[p] || 0) > 0) {
      n.push(i);
      if (debug) log(i, 'Array['+p+'] is \''+a[p]+'\' ** Loop nesting level: '+(n.length - 1)+'.');
    }
    else {
      ++x;
      if (debug) log(i, 'Array['+p+'] is \''+(a[p] || 0)+'\' ** Loop nesting level: '+(n.length - 1)+'.');
      if (debug) log(i, 'Not entering a loop but skipping this block');
    }
  }

  function endLoop(i) {

    if (x != 0) {
      --x;
      return i;
    }
    if ((a[p] || 0) > 0) {
      var origin = n.pop();
      if (debug) log(i, 'Array['+p+'] is \''+a[p]+'\'');
      if (debug) log(i, 'looping back to '+(origin));
      i = origin - 1;
    }
    else {
      n.pop();
      if (debug) log(i, 'Array['+p+'] is \''+(a[p] || 0)+'\'');
    }

    return i;
  }

  function log(i, message) {
    console.log(op+' ('+i+'): '+program[i]+' | '+message);
  }
}
