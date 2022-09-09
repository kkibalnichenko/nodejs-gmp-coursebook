---
sidebar_position: 7
---
# Node package manager

Before delving into the npm (node package manager), let's figure out what a package is. 

A package in Node.js includes all the files you need for your module. Modules are JavaScript libraries you can use, in your projects. Node.js provides built in dependency manager called NPM.

![Node package manager](img/npm.png)

## Project manifest

Usually Node.js projects will need to have a package.json file. What is a package.json file?

A package.json file is a manifest of your project that describes the packages and applications it depends on and specific metadata like the project's name, description, and author.
Inside a package.json, you'll almost always see metadata specific to the project.

As an example we can check the following package.json file:

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
    "cross-env": "~7.0.3",
    "supertest": "6.2.3",
    "jest": "^28.1.0"
  },
  "dependencies": {
    "pg": "8.7.3",
    "uuid": "~8.3.2",
    "express": "^4.18.1"
  }
}
```

As you can see the package.json file is structured in the JSON format, which allows it to be easily read as metadata and parsed by machines.

To generate base package.json file automatically you can use the following command: 

```shell
npm init
```

## Dependencies and development dependencies in your package.json

One of the important aspect of a package.json is that it contains a collection of any given project's dependencies. These dependencies are the modules that the project relies on to function properly.

Having these dependencies in your package.json allows the project to install the versions of the modules it depends on. To install all the dependencies from the package.json file you need to run the following command:

```shell
npm install
```
One more important aspect is separation of dependencies that are needed for production and dependencies that are needed for development. In production, you're likely not going to need a tool to watch your js files for changes and refresh the app when they change. But in both production and development, you'll want to have the modules that enable what you're trying to accomplish with your project - things like your framework and code utilities.

The key difference between the dependencies and the other common parts of a package.json is that they're both objects, with multiple key/value pairs where key is name of the module and value is the version range that's acceptable to install (according to Semantic Versioning). 

## Install modules

To install node module you need to use the following command:

```shell
npm install <module>
```

For example, if you want to install Express (the most used and most well known Node.js web framework), you will run the following command:

```shell
npm install <express>
```

This command will install the module into `./node_modules` folder in the current directory. Whenever you install a module from npm, it will be installed into the node_modules folder.

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

In some cases you will need to install module that can improve you development experience, but is not related to you project. In this case you can install this module globally.

To install a module from npm globally, you'll simply need to use the `--global` flag when running the `install` command:
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

The npx can be useful during a single time use package and reduce amount of global npm modules. 