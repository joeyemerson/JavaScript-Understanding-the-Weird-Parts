# Odds and Ends

## Array and Object Literal Syntax
JavaScript's literal syntax makes it easy to quickly prototype with sample data.
```js
var people = [
  {
    // the 'john' object
    fname: 'John',
    lname: 'Doe',
    addresses: [
      '111 Main St.',
      '222 Third St.'
    ]
  },
  {
    // the 'jane' object
    fname: 'Jane',
    lname: 'Doe',
    addresses: [
      '333 Main St.',
      '444 Fifth St.'
    ],
    greet: function() {
      return 'Hello!';
    }
  }
]
```

## typeof, instanceof, and Figuring out What Something Is
```js
var = 3;
console.log(typeof a); // number (lowercase -- primitive type)

var b = "Hello";
console.log(typeof b); // string

var c = {};
console.log(typeof c); // object

var d = [];
console.log(typeof d); // object (weird...)
console.log(Object.prototype.toString.call(d)); // [object Array]

function Person(name) {
    this.name = name;
}

var e = new Person('Jane');
console.log(typeof e); // object
console.log(e instanceof Person); // true

console.log(typeof undefined); // undefined
console.log(typeof null); // object (this is a bug...)

var z = function() { };
console.log(typeof z); // function
```

## Strict Mode
### Without Strict Mode
```js
var person;

persom = {};
console.log(persom); // Object { }
```

### With Strict Mode
```js
"use strict";

var person;

persom = {};
console.log(persom); // ReferenceError
```

**"use strict";** must be used at the top of a file or top of a function. Not every JavaScript engine implements it the same way.

[MDN Strict Mode Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)