---
title: About Node.js
---

# About Node.js

Before we start, let's answer a fundamental question, "What is Node.js?".

If you are in this course, you probably use JavaScript in a web browser, create interactive user interfaces, manipulate and render content, implement interaction with servers, and create SPA. 
JavaScript runs in a browser that allows you to interact with the page after it is loaded. However, JavaScript is not limited by a browser. 
Also, you can put JavaScript in different environments and run JavaScrip on the server. 

## What is Node.js

[Node.js](https://nodejs.org/en/) is an open-source, cross-platform runtime environment for executing JavaScript code outside a browser.
Node.js alternatives are [Deno](https://deno.land/), [Bun](https://bun.sh/).

:::note
Remember that NodeJS is not a framework, and it's not a programming language - it's cross-platform runtime environment ([RTE](https://en.wikipedia.org/wiki/Runtime_system)). 
:::

The core takeaway it's that by using Node.js, we can run JavaScript outside of the browser.

## Node.js specifics
Node.js runs the [V8 JavaScript engine](/docs/Intro/about/engine) (written in C++), the core of Google Chrome, outside of the browser.
Another part of the definition on the official Node.js website says, Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

### Single-threaded
A Node.js, based on JavaScript specific runs in a single process without creating a new thread for every request, for example, as [Java](https://www.java.com/en/download/help/whatis_java.html) or [Phyton](https://www.python.org/) did.
Using the [single threaded](https://en.wikipedia.org/wiki/Thread_(computing)) event loop model, Node JS is able to handle multiple concurrent clients without creating multiple threads. This removes the performance cost of thread context switching and prevents errors arising from incorrect thread synchronization, which can be extremely hard to troubleshoot.
Tasks start being executed without waiting for a different task to finish. At a given time, only a single task can be executed.

### Non-blocking I/O model
Non-blocking I/O model refers to input/output. Node.js contains a set of [asynchronous I/O](https://en.wikipedia.org/wiki/Asynchronous_I/O) primitives in its standard library that prevent JavaScript code from blocking. We can read and edit local files in Node.js and make an HTTP request to an API; instead of blocking the thread and wasting CPU cycles waiting, Node.js will resume the operations when the response comes back.
This lets Node.js process thousands of concurrent connections with a single server without the burden of managing thread concurrency, which could be a significant source of bugs.

### JavaScript everywhere paradigm
Node.js represents a "JavaScript everywhere" paradigm or Full-Stack JavaScript. Engineers who write JavaScript for the browser can now write the server-side code in addition to the client-side code without learning a different language.

### new ECMAScript standards
Node.js uses the new ECMAScript standards without problems. Browsers required updates for supportability [TC39](https://tc39.es/) standards, with Node.js developers can use any ECMAScript version they want, aditionaly with flags can enable specific experimental features.

### Package ecosystem
Yet another part of the official definition on the Node.js website says,Node.js package ecosystem, npm is the largest ecosystem of open-source libraries in the world.
Amazing community of open-source enthusiasts created more than 1 million npm packages, which enhance the capabilities of Node.js.
It is completely open-source and anyone can use it, as it has an MIT licence, for developing server-side and networking applications. 
It can run on all three Operating Systems i.e., Mac OS, Windows, and Linux.

### Unified API
Node.js adopted popular server-side development patterns.
Based on that it can be readily combined with a browser or database that supports JSON for a unified JavaScript development stack.


## Node.js use cases
Node.js is designed to build scalable network applications. Node.js is primarily used in server applications, and it's true. 
Node.js can be installed on almost any machine and used for any purpose, including running applications on your PC or even your tablet, smartphone, or microcomputer.
What kind of applications and functionalities can developers build using Node.js? Below is a compiled list of the main types of applications, each with a real-world example:

- Data Streaming Applications such as real-time stock trades or real-time collaboration tools
- Data-Intensive Real-time Applications (DIRT) such as image processing and web crawling
- Single Page Applications such as Google Maps and Netflix
- Static file servers 
- Application based on microservice and serverless architecture
- Internet of Things (IoT) solutions
- Web Application frameworks such as [Socket.io](https://socket.io/) for chat apps
- Servers for HTML5 multiplayer games


## Node.js Frameworks and Tools
Thousands of libraries were built upon Node.js by the community to make things easy and productive for developers.
Many of those have been established over time as popular options. Here is a non-wide list of the ones worth knowing or learning:

- [Express](https://expressjs.com/): It provides one of the most simple yet powerful ways to create a web server. Its minimalist approach, unopinionated, focused on the core features of a server, is key to its success.
- [NestJS](https://nestjs.com/): A TypeScript based progressive Node.js framework for building enterprise-grade efficient, reliable and scalable server-side applications.
- [hapi](https://hapi.dev/): A rich framework for building applications and services that enables developers to focus on writing reusable application logic instead of spending time building infrastructure.
- [koa](https://koajs.com/): It is built by the same team behind Express, aims to be even simpler and smaller, building on top of years of knowledge. The new project born out of the need to create incompatible changes without disrupting the existing community.
- [AdonisJS](https://adonisjs.com/): A TypeScript-based fully featured framework highly focused on developer ergonomics, stability, and confidence. Adonis is one of the fastest Node.js web frameworks.
- [Egg.js](https://www.eggjs.org/): A framework to build better enterprise frameworks and apps with Node.js & Koa.
- [Loopback.io](https://loopback.io/): Makes it easy to build modern applications that require complex integrations.
- [Micro](https://github.com/vercel/micro): It provides a very lightweight server to create asynchronous HTTP microservices.
- [Socket.io](https://socket.io/): A real-time communication engine to build network applications.

