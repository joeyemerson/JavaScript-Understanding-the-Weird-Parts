# Objects and Functions

## Objects and the Dot
Objects are collections of name/value pairs. Those values can be other collections of name/value pairs.

Objects can have properties and methods. Objects sit in memory with references to its properties' and methods' addresses in memory.
* Primitive "property"
* Object "property"
* Function "method"

### Example
```js
// initialize new person object
var person = new Object();

// create and assign object properties
person['firstname'] = 'Tony';
person['lastname'] = 'Bony';

// use variable to hold property name
var firstNameProperty = 'firstname';

// access object and properties using computed member access (square brackets)
console.log(person);
console.log(person[firstNameProperty]);

// access object properties using member access (dot notation), which has a higher precedence and has left-to-right associativity
console.log(person.firstname);
console.log(person.lastname);

// object properties can also be other objects
person.address = new Object();
person.address.street = '111 Main St.';
person.address.city = 'Buffalo';
person.address.state = 'NY';

// the dot notation is preferred, but either will function correctly
console.log(person.address.street);
console.log(person.address.city);
console.log(person['address']['state']);
```

## Objects and Object Literals
### Example
```js
// the preferred way to initialize objects
// can be initialized with values or not
// var person = {} is the same as
// var person = new Object()
var person = {
  firstname: 'Tony',
  lastname: 'the Tiger',
  address: {
    street: '111 Main St.',
    city: 'Buffalo',
    state: 'NY'
  }
};

// function expects object with firstname property as input
function greet(person) {
  console.log('Hi ' + person.firstname);
}

greet(Tony); // 'Hi Tony'

// can pass object literals as arguments and the object is created during execution
greet({
  firstname: 'Mary',
  lastname: 'Doe'
}); // 'Hi Mary'

Tony.address2 = {
  street: '333 Second St.'
}
```

### Explanation
You can assign properties uing the object literal syntax ({}) or using dot or bracket notation. They do the same thing, but object literals improve speed of writing and readability in many cases.

## Faking Namespaces
**Namespace**: A container for variables and functions, typically to keep variables and functions with the same name separate.

### Example
```js
var greet = 'Hello!';
var greet = 'Hola!';

console.log(greet); // 'Hola!'

// use objects as containers to avoid namespace collisions
var english = {
  greetings: {
    basic: 'Hello!'
  }
};

// can also assign using dot noatation
var spanish = {};
// this line is necessary to avoid an error
// the object has to exist before assigning properties
spanish.greetings = {};
spanish.greetings.basic = 'Hola!';
```

## JSON and Object Literals

### JSON Notation
```json
{
  "firstName": "Mary",
  "isAProgrammer": true
}
```

JSON property names must be wrapped in quotes. JSON is a subset of the object literal syntax. Anything that is valid JSON is valid object literal syntax, but not vice versa. JSON has stricter rules.

### JavaScript Functionality to Convert Object <-> JSON
```js
var objectLiteral = {
  firstName: 'Mary',
  isAProgrammer: true
};

console.log(JSON.stringify(objectLiteral));

var jsonValue = JSON.parse('{ "firstName": "Mary", "isAProgrammer": true }');
```

## Functions are Objects

**First Class Functions**: Everything you can do with other types you can do with functions. Assign them to variables, pass them around, and create them on the fly.

Functions are a special type of object. Can attach the following:
* Primitive
* Object
* Function
* Name (can also be anonymous)
* Code (the actual lines of code written live here - "invocable" ())

### Example
```js
function greet() {
  console.log('hi');
}

// assign a property to the FUNCTION greet
greet.language = 'english';
console.log(greet.language); // 'english'
```

## Function Statements and Function Expressions
**Expression**: A unit of code that results in a value. It doesn't have to save to a variable.

### Example
```js
// This can be called before the function statement because functions are hoisted before execution
greet();

// Function Statement
function greet() {
  console.log('hi');
}

// Function Expression
var anonymousGreet = function() {
  console.log('hi');
};

// Function expressions must be invoked AFTER they are written in the code.
// Otherwise, anonymousGreet would be undefined (variables initialized as undefined)
anonymousGreet();

// This function takes in another function as its argument
function log(a) {
  a();
}

// The function log() takes in an anonymous function as its argument.
// The function object is created on the fly during execution of log().
log(function() {
  console.log('hi');
});
```

## By Value vs. By Reference
**Mutate**: To change something. "Immutable" means it can't be changed.

```js
// by value
var a = 3; // applies to any primitive value
var b = a; // b points to a copy of the primitive value

a = 2; // assign a new value to a

console.log(a); // 2
console.log(b); // 3

// a and b can be changed, but do not affect each other

// by reference
var c = { name: 'Fred' }; // applies to any object
var d = c; // d points to the original object location in memory

c.name = 'John'; // mutate

console.log(c.name); // 'John'
console.log(d.name); // 'John'

// changes to c will also affect d (and vice versa)

// by reference (even as parameters)
function changeName(obj) {
  obj.name = 'Frank';
}

changeName(d);
console.log(c.name); // 'Frank'
console.log(d.name); // 'Frank'

// equals operator sets up new memory space (new address)
c = { name: 'Joe' }
console.log(c.name); // 'Joe'
console.log(d.name); // 'Frank'

// c and d no longer are pointing to the same location in memory
```

## Objects, Functions, and 'this'
REMINDER: When a function is invoked, a new execution context is created.

Each execution context includes:
* Variable Environment - all variables declared inside of the execution context
* Outer Environment - how to look down scope chain for variables
* 'this' - pointing at a different object depending how the function is invoked

### 'this' refers to the window (global) object
```js
function a() {
  console.log(this);
  this.newVar = 'hello';
}

var b = function() {
  console.log(this);
}

a(); // window
console.log(newVar); // 'hello'
b(); // window
```

### 'this' refers to the object in which the function was declared
```js
var c = {
  name: 'The c object',
  log: function() {
    console.log(this);
  }
}

c.log(); // Object { name: "The c object", log: log() }
```

### 'this' changing when function is declared inside of another function
```js
var d = {
  name: 'The c object',
  log: function() {
    this.name = 'updated c object';
    console.log(this);

    var setName = function(name) {
      this.name = name;
    }
    setName('updated again!');
    console.log(this);
  }
}

d.log(); // 1: Object { name: "updated c object", log: log() }
         // 2: Object { name: "updated c object", log: log() } <== why no change?

console.log(window.name); // 'updated again!' <== uh oh...
```

### Using variable 'self' to contain reference to current object 'this'
```js
var d = {
  name: 'The c object',
  log: function() {
    var self = this;
    self.name = 'updated c object';
    console.log(self);

    var setName = function(name) {
      self.name = name;
    }
    setName('updated again!');
    console.log(self);
  }
}

d.log(); // 1: Object { name: "updated c object", log: log() }
         // 2: Object { name: "updated again!", log: log() }
```

## Arrays - Collections of Anything
```js
var arr = [
  1,
  false,
  {
    name: 'Tony',
    address: '111 Main St.'
  },
  function(name) {
    var greeting = 'Hello ';
    console.log(greeting + name);
  },
  'hello'
];

console.log(arr); // Array(5) [ 1, false, Object {…}, function arr(name), "hello" ]
arr[3](arr[2].name); // 'Hello Tony'
```

## 'arguments' and Spread
When a function is invoked, a special keyword called 'arguments' is created.

**Arguments**: The parameters you pass to a function. JavaScript gives you a keyword of the same name which contains them all.

### Example
```js
function greet(fname, lname, lang) {

  // this sets default value the old way
  // see note below code block
  lang = lang || 'en'

  // alert if no arguments are passed in to the function
  if (arguments.length === 0) {
    console.log('Missing parameters!');
    return;
  }

  console.log(fname);
  console.log(lname);
  console.log(lang);
}

greet(); // undefined / undefined/ undefined
greet('John'); // 'John' / undefined / undefined
greet('John', 'Doe', 'en'); // 'John' / 'Doe' / 'en'

// arguments are read left to right
// any missing values are set to undefined due to hoisting
```

***In ES6, you are able to set default values using the assignment operator***
```js
function greet(fname, lname, lang = 'en') {
  return;
}
```

***ES6 also has the spread operator***
```js
// all other arguments past 'lang' will be in an array-like object 'others'
function greet(fname, lname, lang, ...others) {
  return;
}
```

## Immediately Invoked Function Expressions (IIFE)s
```js
// function statement
function greet(name) {
  console.log('Hello ' + name);
}

greet('Bob');

// function expression
var greetFunc = function(name) {
  console.log('Hello ' + name);
}

greetFunc('Bob');

// immediately invoked function expression
var greeting = function(name) {
  return 'Hello ' + name;
}('John'); // <== parens invoke the function immediately

console.log(greeting); // 'Hello John'
console.log(greeting()); // TypeError: greeting is not a function <== it is a string

var firstname = 'John'

// also an iife
(function(name) {
  var greeting = 'Hello';
  console.log(greeting + ' ' + name);
}(firstname)); // 'Hello John'
```

### IIFE's and Safe Code
IIFE's make it difficult (intentional) to affect the global object.

```js
var greeting;

(function(global, name) {
  var greeting = 'Hello';
  global.greeting = 'Hola';
  console.log(greeting + ' ' + name);
}(window, 'John')); // 'Hello John'

console.log(greeting); // 'Hola'
```

## Understanding Closures
```js
// start off in the global execution context
function greet(whatToSay) {

  return function(name) {
    console.log(`${whatToSay} ${name}`);
  }

}

// a new execution context is created for greet()
// whatToSay is in its variable environmet
// creates function on the fly and returns it
var sayHi = greet('Hi');

// greet() execution context is popped off the stack
// back to global execution context

// invoke sayHi(), anonymous function, creating a new execution context
// when it looks for whatToSay, it looks down the scope chain

// greet()'s execution context is gone, but what's in memory for that
// execution context is not

// JavaScript makes sure the function can go find the variable
// the execution context has "closed in" its variables it needs access to
// it keeps the scope intact

sayHi('Tony'); // 'Hi Tony'
```

```js
function buildFunctions() {
  var arr = [];

  for (var i = 0; i < 3; i++) {
    arr.push(
      function () {
        console.log(i);
      }
    );
  }

  return arr;
}

// buildFunctions() has new execution context with variables
// value of i is 3 when the return statement is reached
// i increments a final time before the evaluation statement is run
var fs = buildFunctions();

fs[0](); // 3
fs[1](); // 3
fs[2](); // 3
```

### What if we want it to run correctly (ES5)?
```js
function buildFunctions2() {
  var arr = [];

  for (var i = 0; i < 3; i++) {
    arr.push(
      (function(j) {
        return function() {
          console.log(j);
        }
      }(i))
    );
  }

  return arr;
}

var fs2 = buildFunctions2();

fs2[0](); // 0
fs2[1](); // 1
fs2[2](); // 2
```

### What if we want it to run correctly (ES6)?
```js
function buildFunctions3() {
  var arr = [];

  // use let to declare i and it will be block scoped
  for (let i = 0; i < 3; i++) {
    arr.push(
      function () {
        console.log(i);
      }
    );
  }

  return arr;
}

// buildFunctions() has new execution context with variables
// value of i is 3 when the return statement is reached
// i increments a final time before the evaluation statement is run
var fs3 = buildFunctions3();

fs3[0](); // 0
fs3[1](); // 1
fs3[2](); // 2
```

## Function Factories
Everytime you call a function with a closure, a new execution context is created.

### Example
```js
function makeGreeting(language) {

  return function(name) {

    if (language === 'en') {
      console.log('Hello ' + name);
    }

    if (language === 'es') {
      console.log('Hola ' + name);
    }

  }

}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('Joey');
greetSpanish('Joey');
```

## Closures and Callbacks
Because of closures, the 'greeting' variable below is available 3 seconds later when the setTimeout function is run.

```js
function sayHiLater() {

  var greeting = 'Hi!';

  setTimeout(function() {
    console.log(greeting);
  }, 3000)

}

sayHiLater();
```

**Callback Function**: A function you give to another function, to be run when the other function is finished. So the function you call (i.e. invoke), 'calls back' by calling the function you gave it when it finishes.

## call(), apply(), and bind()
All functions have access to call, apply, and bind methods.

```js
var person = {
  fname: 'John',
  lname: 'Doe',
  getFullName: function() {
    var fullName = this.fname + ' ' + this.lname;
    return fullName;
  }
}

var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
  console.log('Arguments: ' + lang1 + ' ' + lang2);
}

// bind() creates a copy of whatever function you attach to it.
var logPersonName = logName.bind(person);

logPersonName('en'); // 'Logged: John Doe'
                     // 'en undefined'

// call() lets you control where 'this' is pointing to along with calling the function
logName.call(person, 'en', 'es'); // 'Logged: John Doe'
                                  // 'en es'

// apply() takes an array of parameters, which is the only difference between it and call()
logName.apply(person, ['en', 'es']); // 'Logged: John Doe'
                                     // 'en es'


// function borrowing
var person2 = {
  fname: 'Jane',
  lname: 'Doe'
}

console.log(person.getFullName.apply(person2)); // 'Jane Doe'

// function currying
function multiply(a, b) {
  return a * b;
}

// passing parameters using bind will set permanent values for those parameters
var multiplyByTwo = multiply.bind(this, 2);
var multiplyByThree = multiply.bind(this, 3);

console.log(multiplyByTwo(9)); // 18
console.log(multiplyByThree(9)); // 27
```

## Functional Programming
```js
function mapForEach(arr, fn) {
  var newArr = [];
  for (var i=0; i < arr.length; i++) {
  	newArr.push(
  		fn(arr[i])
    );
  }
  return newArr;
}

var arr1 = [1,2,3];
console.log(arr1);

var arr2 = mapForEach(arr1, function(item) {
  return item * 2;
});
console.log(arr2); // [2, 4, 6]

var arr3 = mapForEach(arr1, function(item) {
  return item > 2;
});
console.log(arr3); // [false, false, true]

var checkPastLimit = function(limiter, item) {
  return item > limiter;
}

var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1));
console.log(arr4); // [false, true, true]

var checkPastLimitSimplified = function(limiter) {
  return function(limiter, item) {
    return item > limiter;
  }.bind(this, limiter);
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(2));
console.log(arr5); // [false, false, true]
```

Small functions that are passed around should not mutate data.

[//]: # (comments go here)