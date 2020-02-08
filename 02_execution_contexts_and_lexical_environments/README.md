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

❗ ES6 'let' and 'const' are not hoisted in the same way as 'var' and must be declared before calling; otherwise, you get a ReferenceError.