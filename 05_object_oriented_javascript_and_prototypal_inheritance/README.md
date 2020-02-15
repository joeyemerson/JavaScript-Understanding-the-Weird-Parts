# Object-Oriented JavaScript and Prototypal Inheritance

## Classical versus Prototypal Inheritance
**Inheritance**: One object gets access to the properties and methods of another object.

### Classical Inheritance
* Verbose with many keywords

### Prototypal Inheritance
* Simple
* Flexible
* Extensible
* Easy to understand

### Understanding the Prototype
All objects have a prototype property (a reference to another object).

![Prototype Description](./prototype.png "Prototype Description")

### Manipulating the Prototype (DON'T DO THIS!)
```js
var person = {
  fname: 'Default',
  lname: 'Default',
  getFullName: function() {
    return this.fname + ' ' + this.lname;
  }
}

var john = {
  fname: 'John',
  lname: 'Doe'
}

// Currently unable to run this method
// console.log(john.getFullName());

// Don't do this EVER! Demo purposes only!
john.__proto__ = person;

// john now inherits from person
// If a property or method doesn't exist on john,
// it will go to the prototype to find it.

console.log(john.getFullName()); // 'John Doe'
console.log(john.fname); // 'John'

// It won't search the prototype chain any further
// after finding a match.

var jane = {
  fname: 'Jane'
  // no lname property added here
}

// jane and john both inheriting from person object
jane.__proto__ = person

console.log(jane.getFullName()); // 'Jane Default'
```

### Everything is an Object (or a Primitive)
```js
var a = {};
var b = function() { };
var c = [];

console.log(a.__proto__); // Object
console.log(a.__proto__.__proto__); // null - Object has no proto

console.log(b.__proto__); // function
console.log(b.__proto__.__proto__); // Object

console.log(c.__proto__); // Array
console.log(c.__proto__.__proto__); // Object
```

## Reflection and Extend
**Reflection**: An object can look at itself, listing and changing its properties and methods.

```js
var person = {
  fname: 'Default',
  lname: 'Default',
  getFullName: function() {
    return this.fname + ' ' + this.lname;
  }
}

var john = {
  fname: 'John',
  lname: 'Doe'
}

john.__proto__ = person;

for (var prop in john) {
  console.log(prop + ': ' + john[prop]);
}

// RETURN VALUES
// fname: John
// lname: Doe
// getFullName: getFullName: function() {
//   return this.fname + ' ' + this.lname;
// }

for (var prop in john) {
  if (john.hasOwnProperty(prop)) {
  	console.log(prop + ': ' + john[prop]);
  }
}

// RETURN VALUES
// fname: John
// lname: Doe
```