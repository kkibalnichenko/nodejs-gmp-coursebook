# Node.js - Introduction 

In this introduction part of the home task, you need to become familiar with Node.js, install NPM, and be able to manage multiple versions of Node.js. An introduction task for Node.js would involve participants' practics with NPM (Node Package Manager) and NVM (Node Version Manager), installing Node.js on their computers.
This typically involves downloading the Node.js installer from the official website and running it to complete the installation. Once Node.js is installed, the participants can verify the installation by running the command "node -v" in their terminal, which should return the version of Node.js that they have installed.
After that, the participants could use Node.js and NPM to create and run their own applications, manage dependencies, and switch between different versions of Node.js using NVM.

## Practice

### Prerequisites

1. Install the latest `LTS` (Long Term Support) version of [Node.js](https://nodejs.org/en/), by any available means `(.exe, nvm, brew, etc.)`.
2. Check in the console (terminal) that the Node.js installation was done properly by running the following commands `node -v` or `node -version`.
3. Create a repo for your homework tasks on [GitHub](https://github.com/) or [Git Epam](https://git.epam.com).
4. Provide your mentor with the link to the repo and add read access permissions.

### Home tasks

1. Create `package.json` by running the following commands `npm init` or `npm init -y`.
2. Install globally or locally npm package [nodemon](https://github.com/remy/nodemon) to dev dependency.
3. Install [NVM](https://github.com/nvm-sh/nvm#intro) verify installation `command -v nvm`
4. Create `index.js` inside `index.js` implement function `getRandomNumber`, run program from CLI. The program should be started via npm script using `nodemon`.
5. In REPL mode be able to run `getRandomNumber` to performing operations in CLI. Screen results and attach screens into repository. 


## Evaluation criteria
1. Prerequisites are fulfilled to the full extent. 
2. The Repository access provided to the mentor. 
3. The repository contains package.json and index.js files with getRandomNumber function. 
4. The repository contains screens that prove the following:
   - working with different versions of Node.js by using nvm
   - working with REPL execution getRandomNumber function in CLI
   - working with nodemon 
