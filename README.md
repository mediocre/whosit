whosit
======

A personal name parser for Node.js: http://en.wikipedia.org/wiki/Personal_name

```js
var whosit = require('whosit');

var name = whosit.parse('Mr. Shawn Michael Miller Sr.');

console.log('Salutation: ' + name.salutation);
console.log('First: ' + name.first);
console.log('Middle: ' + name.middle);
console.log('Last: ' + name.last);
console.log('Suffix: ' + name.suffix);
```
