---
title: JavaScript Engine
---

## The V8 JavaScript Engine
V8 is Google’s open-source JavaScript engine, which is written in C++. 
It was developed in 2008 for Google Chrome and Chromium-based browsers (like Brave) but was used to build Node.js for server-side coding. 
In fact, the V8 engine is also used by JSON-based No-SQL databases like Couchbase and the popular MongoDB. Besides this, V8 also powers the popular desktop application framework Electron and Deno's latest server-side runtime environment. 
V8 is consistently developing, just like the other JavaScript engines around, to speed up the Web and the Node.js ecosystem.
In this V8 introduction, we will ignore the implementation details of V8: they can be found on more authoritative sites (e.g., the [V8 official site](https://v8.dev/)), and they change over time, often radically.

There are other JavaScript engines like [SpiderMonkey](https://spidermonkey.dev/) used by Firefox, and [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore) used by Safari. 
Microsoft’s Edge was originally based on [ChakraCore](https://github.com/chakra-core/ChakraCore) JavaScript engine, but has been recently re-built with [Chromium](https://www.chromium.org/Home/) and V8 engine.

## Node.js and V8
V8 engine takes JavaScript code and compiles it into Machine Code. Node.js takes the V8 codebase and adds certain specific features such as CRUD operations with a local file system (that are not possible in the browser for security reasons). We can also extend the functionality of our node code by installing additional npm packages.
One thing to understand is that V8 is essentially an independent C++ library that is used by Node or Chromium to run JavaScript code. V8 exposes an API that other code can use, so if you have your own C++ program, you can embed V8 in it and run a JavaScript program. That is how it is done by Node and Chrome.

Just-in-time (JIT) compilation converts the native JavaScript code to machine code, which is how V8 uses it. So, the difference between the V8 code and others is that it does not produce any intermediate code.

:::info
JavaScript is internally compiled by V8 with just-in-time (JIT) compilation to speed up the execution.
:::

The current Node.js engine cannot work without V8. It would have no JavaScript engine and hence no ability to run any JavaScript code. The native code bindings, which come with Node.js like the fs module and the Net module, rely on the V8 interface between C++ and JavaScript.

Although in the tech world, everything is possible and Microsoft in July 2016, made an effort to use the Chakra JavaScript engine (which was used in Edge browser at that time) in Node.js and replace the V8 engine, that project never took off, and Microsoft Edge itself recently moved to Chromium, which uses V8 JavaScript engine. 
Another runtime environment Deno (many consider that it could be a replacement for Node.js in the next 2-3 years), also uses the V8 JavaScript engine under its hood. 
However, new JavaScript runtime environment Bun uses the JavaScriptCore engine, which tends to start and perform a little faster than more traditional choices like V8. Bun is written in [Zig](https://ziglang.org/), a low-level programming language with manual memory management.


## The Just-in-Time Paradigm
For a code to execute in any programming language, it must be converted into machine code, which the computer understands. There is a different paradigms for this transformation.

Most of the traditional languages created before JavaScript like C++ and Java, perform something called Ahead-of-Time (AoT) compilation. Here, the code is transformed into machine code before the execution of our program during compile time. On the other hand, in languages like JavaScript and Python, each line of code is executed at runtime. This is done because it is impossible to know the exact code before execution.

The approach of Just-in-Time (JIT) compilation was created to overcome problems in dynamic languages, combining the best interpretation and compilation. So, an interpretation step runs before the compilation step, where the V8 engine detects the more frequently used functions and code and compiles them using information from previous executions. During compile time, this code is re-compiled for optimal performance.
