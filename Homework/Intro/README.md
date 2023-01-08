# Node.js Essential Training 1. Implementing CLI

Create an index.js file that will play an entry point into your CLI program.
Here you should parse the arguments passed to you and then pass command arguments to the function that will implement a command.
In scope of this task, you will develop the following commands.

### rimraf

Recursively removes a folder and all its contents.

Create a file rimraf.js that will export a function that implements needed behavior.
The function should accept path to the folder that should be removed and the callback function.

```javascript
function rimraf (path, callback){};
module.exports = rimraf;
```

In the index.js file parse the arguments and pass `–path` argument value to the function.
In case the argument was not provided throw an exception.

Below you can find examples of the expected usage.

This one works okay - `node ./index.js rimraf –path ./folder`

This one fails with an error, because argument `–path` was not provided, `node ./index.js rimraf`

### rename

Renames a folder or a file.

Create a file rename.js that will export a function that implements expected behavior.
The function should accept three arguments from, to and the callback function.
From argument will point to the folder/file that should be renamed and to argument will tell the new name.

```javascript
function rename (from, to, callback){};
module.exports = rename;
```

In the index.js file parse the arguments and pass them to the rename function.
In case arguments `–from` and `–to` was not passed, throw an exception.

Below listed off examples of the expected usage for your CLI.

This one works okay - `node ./index.js rename –from ./folder/test.txt --to guide.txt`

This one fails with an error, because argument `–from` was not provided – `node ./index.js  --to guide.txt`

---

Apart from that add validation for command name if incorrect command name specified throw an exception. 