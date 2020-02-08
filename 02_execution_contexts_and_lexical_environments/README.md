# Execution Contexts and Lexical Environments

## Definitions
**Syntax Parser**\
A program that reads your code and determines what it does and if its grammar is valid

**Lexical Environment**\
Where something sits physically in the code you write

**Execution Context**\
A wrapper to help manage the code that is running

## Execution Context
**Global**\
Not inside a function (window object in browser)

**this**\
Special variable inside function - base level of scope

**Outer Environment**\
Everything outside of current scope (is nothing at global level)

## Hoisting
The JavaScript engine sets up memory space for variables and functions upon execution context creation. The code is not actually moved to the top of the file.

## Execution
**Single Threaded**\
One command at a time - JavaScript behaves in a single threaded manner

**Synchronous**\
Executed one line at a time, in the order that it appears

## Function Invocation and the Execution Stack
**Invocation**\
Running a function, by using parenthesis ()

### Example
```javascript
function b() {}

function a() {
    b();
}

a();
```
### Explanation
1. Global execution context is created and code is executed
2. a(): New execution context is created and executed on top of stack
3. b(): New execution context is created and executed on top of stack
4. After b() is finished, return to executing a()

## Functions, Context, and Variable Environments
**Variable Environment**\
Where the variables live and how they relate to each other in memory

### Example
```javascript
function b() {
    var myVar;
}

function a() {
    var myVar = 2;
    b();
}

var myVar = 1;
a();
```
### Explanation
1. Bottom myVar is put into global execution context
2. a(): New execution context
   * myVar is put into the execution context of a()
   * Its value will be 2 during a()'s execution context
3. b(): New execution context
   * myVar is put into the execution context of b()
   * Its value will be undefined during b()'s execution context

## The Scope Chain
### Example
```javascript
function b() {
    console.log(myVar);
}

function a() {
    var myVar = 2;
    b();
}

var myVar = 1;
a();
```
### Explanation
* Console log output of myVar within b() is 1 -- not 2
* Each execution context contains a reference to the outer environment
* Function b() sits at the top of the global environment lexically
* b()'s outer environment is global (so is a()'s) -- based on where it is defined, and not where it is invoked
### Example
```javascript
function a() {

    function b() {
        console.log(myVar);
    }

    var myVar = 2;
    b();
}

var myVar = 1;
a();
b();
```
### Explanation
* b() will not be found since it is not defined in the global environment
* b() will console log 2 because b() is defined within a()'s execution context

## Scope, ES6, and let
**Scope**\
Where a variable is available in your code (and if it's truly the same variable or a new copy)

### Example
```javascript
if (a > b) {
    let c = true;
}
```
### Explanation
* The variable is placed in memory and set to undefined, but you are not able to use it until after it has been defined in the code
* let is block scoped. When a variable is declared with let inside of a block, it is only available inside that block -- also true for for loops

## What About Asynchronous Callbacks?
**Asynchronous**\
More than one at a time

[//]: # (Watch this section again and write up good notes -- very interesting!)