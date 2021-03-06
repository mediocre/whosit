# whosit

[![Build Status](https://github.com/mediocre/whosit/workflows/build/badge.svg)](https://github.com/mediocre/whosit/actions?query=workflow%3Abuild)
[![Coverage Status](https://coveralls.io/repos/github/mediocre/whosit/badge.svg?branch=main)](https://coveralls.io/github/mediocre/whosit?branch=main)

A personal name parser for Node.js: http://en.wikipedia.org/wiki/Personal_name

```js
var whosit = require('whosit');

var name = whosit.parse('Mr. Shawn Michael Miller Sr.');

console.log(name.salutation); // Mr.
console.log(name.first); // Shawn
console.log(name.middle); // Michael
console.log(name.last); // Miller
console.log(name.suffix); // Sr.
```

## Support for all kinds of names

```js
var name = whosit.parse('Shawn Miller');
console.log(name.first); // Shawn
console.log(name.last); // Miller

name = whosit.parse('Dr. Dre');
console.log(name.salutation); // Dr.
console.log(name.last); // Dre

name = whosit.parse('Prince');
console.log(name.first); // Prince
```

## Automatic detection of lexical formats

```js
var name = whosit.parse('Miller,Shawn');
console.log(name.first); // Shawn
console.log(name.last); // Miller

name = whosit.parse('Miller, Shawn Michael');
console.log(name.first); // Shawn
console.log(name.middle); // Michael
console.log(name.last); // Miller
```
