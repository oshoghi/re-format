# re-format
A simple string formatting funciton which is focused on being fast

#Example
```js
  var format = require("re-format");
  
  console.log(format("my favorite number is {n}", { n: 5 }));
  //=> my favorite number is 5

  console.log(format("my favorite number is {0}", 5));
  //=> my favorite number is 5
```
