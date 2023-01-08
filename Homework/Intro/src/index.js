const rimraf = require('./rimraf');
const rename = require('./rename');

function grabArg(argName) {
  const argIndex = process.argv.findIndex((argument) => argument === argName);
  const notFound = argIndex === -1;

  if (notFound) {
    throw new Error(`Invalid arguments! Argument ${argName} is required!`);
  }

  const valueIndex = argIndex + 1;
  const argValue = process.argv[valueIndex]
  const incorrectValue = argValue.startsWith("--");

  if (incorrectValue) {
    throw new Error(`Invalid arguments! Value should not start with --! Received ${argValue} as value for ${argName}`);
  }

  return argValue;
}

const commandName = process.argv[2];

switch (commandName) {
  case "rimraf": {
    const path = grabArg("--path");

    rimraf(path, (err) => {
      if (err) {
        throw err;
      }

      console.log("Done!");
    })
    break;
  }
  case "rename": {
    const from = grabArg("--from");
    const to = grabArg("--to");

    rename(from, to, (err) => {
      if (err) {
        throw err;
      }

      console.log("Done!");
    })
    break;
  }
  default:
    throw new Error("Invalid command name! Please specify either rimraf or rename!");
}

