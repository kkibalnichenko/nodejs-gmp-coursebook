---
sidebar_position: 4
---

# Auth middleware
We have implemented authentication flow. Now we need to identify if user logged in before allow to use server rest api. To identify if user logged in and if user session wasn't expired we will implement `middleware`

```ts
import * as jwt from "jsonwebtoken";

export async function verifyToken (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Token is required");
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        return res.status(403).send("Invalid Token");
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_KEY!);

        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
```

Now we can extend our server to protect rest api from unauthorized access:
```js
const verifyToken = require("./middleware/auth");

export async function bootstrap(): Promise<Express> {
    ...
    // registration here
    // login here here
    app.use('/api', verifyToken);
    ...
}
```

Now to have access to the `/api/*` routes we need to logged in first and then use token from the request to send `Authorization` header as `Bearer <token>` 