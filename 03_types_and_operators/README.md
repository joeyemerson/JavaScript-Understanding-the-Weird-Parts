# Types and Operators

## Types in JavaScript
**Dynamic Typing**: You don't tell the engine what type of data a variable holds, it figures it out while your code is running

Variables can hold different types of values because it's all figured out during execution.

### Example
// Static typing\
bool isNew = 'hello'; // an error in a statically typed language

// Dynamic typing in JavaScript\
var isNew = true; // no errors\
isNew = 'yup!'; // still no errors\
isNew = 1; // yep, we can do this also


## Primitive Types
**Primitive Type**: A type of data that represents a single value (ie. not an object)

1. Undefined: Represents a lack of existence (the js engine sets variable values to this initially)
2. Null: Represents lack of existence (better for programmer to use this if assigning a variable a "nothing" value)
3. Boolean: true or false
4. Number: Floating point number (there's always some decimals). Unlike other languages, there's only one 'number' type... and it can make math weird.
5. String: A sequence of characters (both '' and "" can be used)
6. Symbol: Used in ES6 (not covered in this section of the course)

## Operators
**Operator**: A special function that is syntactically written differently. Generally, operators take two parameters and return one result.

**Operator Precedence**: Which operator function gets called first when more than one operator is present

### Example
```javascript
var a = 3 + 4 * 5;
console.log(a) // prints 23

var b = (3 + 4) * 5
console.log(b) // prints 35
```

### Explanation
* var a has the multiplication operator taking precedence over the addition operator
* var b uses grouping (parentheses) to give a higher precedence to the operations inside

**Associativity**: What order operator functions get called in (left-to-right or right-to-left) when functions have the *same* precedence

### Example
```javascript
var a = 2, b = 3, c = 4;

a = b = c;

console.log(a); // 4
console.log(b); // 4
console.log(c); // 4

// broken down
b = c;
a = b;
```

### Explanation
The equals sign (assignment operator) has right-to-left associativity.

**[MDN Operator Precedence Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)**

## Type Coercion
**Coercion**: Converting a value from one type to another. This happens quite a bit in JavaScript because it's dynamically typed.

## Example
```javascript
var a = 1 + 2;
console.log(a); // 3

var b = 'hello' + ' world';
console.log(b); // 'hello world'

var c = 1 + '2';
console.log(c); // '12'
```

### Explanation
The number 1 was coerced from number to string and they were concatenated. Strings take precedence in type coercion.

## Comparison Operators
### Example
```javascript
console.log(1 < 2 < 3); // true
console.log(3 < 2 < 1); // also true...

// broken down
console.log(3 < 2); // false
console.log(false < 1); // true

// false coerced to a number
console.log(Number(false)); // 0
```

### Explanation
Less than operator has left-to-right associativity.

### Example
```javascript
var a = 0;
var b = false;

// this returns 'They are equel!'
if (a == b) {
    console.log('They are equal!');
} else {
    console.log('Nope, not equal.');
}

// this returns 'Nope, not equal!'
if (a === b) {
    console.log('They are equal!');
} else {
    console.log('Nope, not equal.');
}
```

### Explanation
=== (strict equals) also checks that the types match. == (equals) will coerce the types before comparison. The same difference applies to != (not equals) and !== (strict not equals).

[MDN Equality and Sameness Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

## Existence and Booleans
### Example
```javascript
Boolean(undefined); // false
Boolean(null); // false
Boolean(""); // false

var a;

// Will not return string because var is intialized as undefined
if (a) {
    console.log('Something is there.');
}

a = 'hi'; // this would pass the if statement
a = 0; // this would not pass the if statment

// to fix this, you can do this
if (a || a === 0) {
    console.log('Do something.');
}
```

## Default Values
### Example
```javascript
function greet(name) {
    console.log('Hello ' + name);
}

greet('Bob'); // 'Hello Bob'
greet(); // 'Hello undefined' (strings take precedence in type coercion)

function greet2(name) {
    name = name || '<Your name here>' //..
    console.log('Hello ' + name);
}

greet2('Bob'); // 'Hello Bob' (as expected)
greet2(); // 'Hello <Your name here>' (name will be assigned whatever value coerces to true)
```

## Default Values in Frameworks
### Example
```html
<html>
    <head>
    </head>
    <body>
        <script src="lib1.js"></script>
        <script src="lib2.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```

### Lib1
```javascript
var libraryName = 'Lib 1';
```

### Lib2
```javascript
var libraryName = 'Lib 2';
```

```javascript
console.log(libraryName);
```

### Explanation
The console will output 'Lib 2'. All variables are a part of the global execution context. Lib1 is run first, then Lib2 overwrites the value of libraryName.



[//]: # (comments go here)