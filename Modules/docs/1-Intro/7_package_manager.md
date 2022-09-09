---
sidebar_position: 7
---
# Node package manager

Before delving into the npm (node package manager), let's figure out what a package is. 

A package in Node.js contains all the files you need for a module. Modules are JavaScript libraries you can include, in your projects. To manage modules, Node.js provides built in dependency manager called NPM.

![Node package manager](img/npm.png)

## Project manifest

As a general rule, any project that's using Node.js will need to have a package.json file. What is a package.json file?

At it's simplest, a package.json file can be described as a manifest of your project that includes the packages and applications it depends on, information about its unique source control, and specific metadata like the project's name, description, and author.
Inside a package.json, you'll almost always find metadata specific to the project. This metadata helps identify the project and acts as a baseline for users and contributors to get information about the project.

Here's an example of how these fields would look in a package.json file:

```json
{
  "name": "gmp-node", // The name of your project
  "version": "0.0.1", // The version of your project
  "description": "Project developed during GMP node course.", // The description of your project
  "main": "app.js", // Entry point
  "license": "MIT", // The license of your project
  "scripts": {
    "start": "node app.js"
  },
  "devDependencies": {
    "mocha": "~3.1",
    "native-hello-world": "^1.0.0",
    "should": "~3.3",
    "sinon": "~1.9"
  },
  "dependencies": {
    "fill-keys": "^1.0.2",
    "module-not-found-error": "^1.0.0",
    "resolve": "~1.1.7"
  }
}
```

A package.json file is always structured in the JSON format, which allows it to be easily read as metadata and parsed by machines.

To generate base package.json file automatically you can use the following command: 

```shell
npm init
```

## Dependencies and development dependencies in your package.json

The one majorly important aspect of a package.json is that it contains a collection of any given project's dependencies. These dependencies are the modules that the project relies on to function properly.

Having dependencies in your project's package.json allows the project to install the versions of the modules it depends on. To install all the dependencies that are listed in the project's package.json you need to run the following command:

```shell
npm install
```
Second, it allows the separation of dependencies that are needed for production and dependencies that are needed for development. In production, you're likely not going to need a tool to watch your js files for changes and refresh the app when they change. But in both production and development, you'll want to have the modules that enable what you're trying to accomplish with your project - things like your framework and code utilities.

One key difference between the dependencies and the other common parts of a package.json is that they're both objects, with multiple key/value pairs. Every key in both dependencies and devDependencies is a name of a package, and every value is the version range that's acceptable to install (according to Semantic Versioning - to learn more about Semantic Versioning, also known as semver, check out our primer on semver).

## Install modules

To install node module you will use the following npm command:

```shell
npm install <module>
```

In the above command, you'd replace `<module>` with the name of the module you want to install. For example, if you want to install Express (the most used and most well known Node.js web framework), you could run the following command:

```shell
npm install <express>
```

The above command will install the express module into `./node_modules` folder in the current directory. Whenever you install a module from npm, it will be installed into the node_modules folder.

When you're running npm install to install a module, you can add the optional flag `--save` or `--save-dev` to the command: 

```shell
npm install <module> --save
```
or
```shell
npm install <module> --save-dev
```

These flags will add the module as a dependency or development dependency of your project to the project's package.json as an entry in dependencies or devDependencies respectively.

## Install modules globally

The final, and most common, flag for npm install that you should are the flags to install a module globally on your system.

Global modules can be extremely useful - there are tons tools, utilities, and more for both development and general usage that you can install globally to use.

To install a module from npm globally, you'll simply need to use the `--global` flag when running the install command to have the module install globally, rather than locally (to the current directory):
```shell
npm install <module> --global
```

## Run scripts

The "scripts" property of your package.json file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts. These all can be executed by running `npm run-script <stage>` or npm run `<stage>` for short. Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript).
According to package.json example that we show you in this module we can run command to start our node application:
```shell
npm run start
```

## Node package eXecute

Starting from Node.js version v8.2.0 and npm v5.2.0 we have one more useful build-in tool named npx. With npx you can execute your package without installation, to do so run the following command:

```shell
npm <module>
```

The npx is useful during a single time use package and reduce amount of global npm modules. 