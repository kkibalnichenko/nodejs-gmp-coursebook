---
sidebar_position: 1
---

# Signup
To implement registration flow we need to define user model first. Let's update our `model/user.js` file:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: {type: String}
});

module.exports = mongoose.model("user", userSchema);
```

Now we add route for our registration flow in `server.js`:
```js
const User = require("./model/user");
const bcrypt = require("bcryptjs");

const bootstrap = async () => {
    ...
    app.post("/register", async (req, res) => {
        try {
            // Get user input
            const { first_name, last_name, isAuthor, email, password } = req.body;

            // Validate user input
            if (!(email && password && first_name && last_name)) {
                res.status(400).send("All input is required");
            }

            // Validate if user already exist in our database
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                role: isAuthor === "true" ? "author" : "reader"
            });

            res.status(201).send("User successfully registered");
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
    ...
}
```

Now let's discuss our code snippet. In code above we validate user input first. After that we encrypt user password to make it secure from hackers:

```js
const encryptedPassword = await bcrypt.hash(password, 10);
```

Then we create new user with role based on user input and return result.
