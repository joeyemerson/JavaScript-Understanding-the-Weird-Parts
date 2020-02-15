# Building Objects

## Function Constructors, 'new', and the History of JavaScript
JavaScript was created primarily for use in the web. It was named as such to attract Java developers. It is nothing like Java.

### Java Developers Used This
```js
var john = new Person();
```

### Function Constructor
**Function Constructors**: A normal function that is used to construct objects. The 'this' variable poits to a new empty object, and that object is return from the function automagically.

```js
function Person(fname, lname) {
  this.fname = fname;
  this.lname = lname;
}

var john = new Person('John', 'Doe');
console.log(john);

// Object {
// 	 fname: 'John',
// 	 lname: 'Doe'
// }

// As long as the object doesn't return a value, JavaScript will return the new object.
```

### Function Constructors and '.prototype'
The .prototype property of a function is not the prototype of the object. It is where the prototype chain points for any object made with the function constructor.

```js
function Person(fname, lname) {
  this.fname = fname;
  this.lname = lname;
}

Person.prototype.getFullName = function() {
  return this.fname + ' ' + this.lname;
}

var john = new Person('John', 'Doe');

console.log(john.__proto__); // Person (empty object)

Person.prototype.getFormalFullName = function() {
  return this.lname + ', ' + this.fname;
}

console.log(john.getFullName()); // 'John Doe'
console.log(john.getFormalFullName()); // 'Doe, John'
```

#### Important Note
You could add methods in the function constructor, but it would take up memory space for each new object that was constructed. Adding it to the prototype, you only have one copy of the method for as many objects that are created with the function constructor.

If you forget to use the 'new' keyword, JavaScript will still execute the function because IT IS JUST A FUNCTION. No object will be created AND this will now point to the global execution context. 😶

Any function you intend to be a function constructor, use title case.

### Built-In Function Constructors
```js
// All of the string and number methods familiar to us live on the prototype.
var a = 5;
var b = new Number(5);

// The value of 'b' is not the primitive value 5, but an object holding a primitive value
// that also has a __proto__ of Number pointing to the Number object. That is how 5 has
// access to all of the Number methods automagically. Even if you just use the primitive
// value by itself, JavaScript will wrap in an object and point it to the __proto__ Number.

console.log(new Number(5).toFixed(2)); // 5.00
console.log(5.toFixed(2)); // SyntaxError: js will not convert numbers on the fly
```

#### Manipulating the Prototype
```js
String.prototype.isLengthGreaterThan = function(limit) {
  return this.length > limit;
}

// All strings will automatically have access to this method. Prototypal inheritance!
// Unlike the number example above, it will wrap strings in objects on the fly.

console.log("Joey".isLengthGreaterThan(2)); // true
console.log("Joey".isLengthGreaterThan(4)); // false

Number.prototype.isPositive = function() {
  return this > 0;
}

var a = new Number(3);
a.isPositive(); // true
```

#### Danger of Using Built-In Function Constructors for Primitives
```js
var a = 3;
var b = new Number('3');
var c = Number('3');

console.log(a == b); // true
console.log(a === b); // false
console.log(a === c); // true

// The primitive value 3 is not strict equal to the Number object holding primitive value 3.
// This is the danger of using the built in function constructors.

// Here is a safer way to convert this string to a number:

var a = 3;
var b = +'3';

console.log(a === b ); // true
```

### Arrays and for in
```js
Array.prototype.myCustomFeature = 'cool!';

var arr = ['John', 'Jane', 'Jim'];

for (var prop in arr) {
  console.log(prop + ': ' + arr[prop]);
}

// OUTPUT
// 0: John
// 1: Jane
// 2: Jim
// myCustomFeature: cool!
```

#### ES6 Note
We can use the for of loop to iterate over arrays safely.

```js
Array.prototype.myCustomFeature = 'cool!';

var arr = ['John', 'Jane', 'Jim'];

for (var item of arr) {
  console.log(item);
}

// OUTPUT
// John
// Jane
// Jim
```

## Object.create and Pure Prototypal Inheritance
```js
var person = {
  fname: 'Default',
  lname: 'Default',
  greet: function() {
    return 'Hi ' + this.fname;
  }
}

var john = Object.create(person);
console.log(john); // Empty object with prototype of person

john.fname = 'John';
john.lname = 'Doe';
console.log(john); // Object { fname: 'John', lname: 'Doe' } with prototype person
```

**Polyfill**: Code that adds a feature which the engine *may* lack.

```js
// Polyfill for older browsers to support Object.create()
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    // Create new empty function F()
    function F() {}
    // Overwrite F()'s prototype with object passed in (person below)
    F.prototype = o;
    // Return new object (if function does not return value, 'new' keyword returns object)
    // with prototype of o (person).
    return new F();
  };
}

var person = {
  fname: 'Default',
  lname: 'Default',
  greet: function() {
    return 'Hi ' + this.fname;
  }
}

var john = Object.create(person);
console.log(john); // Empty object with prototype of person
```

## ES6 and Classes
```js
class Person {

  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;
  }

  greet() {
    return 'Hi ' + fname;
  }

}

var john = new Person('John', 'Doe');
```

In other programming languages, class is not an object. It is just a definition or blueprint. Classes are actually objects in JavaScript and you are just creating new objects from that object.

### Setting the Prototype
```js
class InformalPerson extends Person {

  constructor(fname, lname) {
    super(fname, lname);
  }

  greet() {
    return 'Hey ' + fname;
  }

}

var james = new InformalPerson('James', 'Doe');
```

**Syntactic Sugar**: A different way to type something that doesn't change how it works under the hood.

Function constructors, Object.create(), and classes are just different ways of using prototypal inheritance. They work the same way at the lower level.