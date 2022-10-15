---
sidebar_position: 5
---

# Authorization middleware
We have protected our api from unauthorized access. But how about situations when user with reader role trying to get access to author api or one author trying to get access to other author data. 

Let's create some rest api routers and then dive into this topic. But before adding some routers we will define new schema in `model/book.js`:

```js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, default: null },
    text: { type: String, default: null },
    author_id: { type: String, default: null }
});

module.exports = mongoose.model("book", bookSchema);
```

Now we can work with books. We will extend `server.js` with new routes. This following code should be added after `verifyToken` middleware:
```js
app.get('/api/books', async (req, res) => {
    const books = await Book.find({});

    return res.status(200).json(books);
});

app.post('/api/books', async (req, res) => {
    try {
        // Get user input
        const { title, text } = req.body;
        const author = req.user;

        // Validate user input
        if (!(title && text)) {
            return res.status(400).send("All input is required");
        }

        // Validate if user already exist in our database
        const oldBook = await Book.findOne({ title });

        if (oldBook) {
            return res.status(409).send("Book Already Exist.");
        }

        const book = await Book.create({
            title,
            text,
            author_id: author.user_id
        });

        res.status(201).json({
            book_id: book._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/api/books/:bookId', async (req, res) => {
    try {
        // Get user input
        const { bookId } = req.params;

        // Validate if user already exist in our database
        const oldBook = await Book.findById(bookId);

        if (!oldBook) {
            return res.status(404).send("Book not found");
        }

        await Book.deleteOne({
            _id: bookId
        });

        res.status(204).send("Book deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
```

In code above we have added to list books, create and delete book. As you can see, those routers available for any authorized user and for list books router it's ok, but we should  not allow readers create new books as well as delete book by user who is not the author of this book. Let's fix it.
First at all we will create middle to check if the current user author.  Create `middleware/isAuthor.js`:

```js
const isAuthor = (req, res, next) => {
    const currentUser = req.user;

    if (currentUser.role !== 'author') {
        return res.status(401).send('Only authors can manage books')
    }
    next();
}

module.exports = isAuthor;
```

After our middleware create, we need to guard our routes:

```js
const isAuthor = require("./middleware/isAuthor");

const bootstrap = async () => {
    app.post('/api/books', isAuthor, async (req, res) => {
        ...
    });

    app.delete('/api/books/:bookId', isAuthor, async (req, res) => {
        ...
    });
}
```

As you can see we fixed first problem and now only authors can create or delete books. The code above is example of RBAC (role base access control) authorization strategy.
Now let's fix another issue when one author can delete book of another. We need to create another middleware `middleware/isBookAuthor`:

```js
const Book = require("../model/book");

const isBookAuthor = async (req, res, next) => {
    try {
        // Get user input
        const { bookId } = req.params;

        // Validate if user already exist in our database
        const oldBook = await Book.findById(bookId);

        if (!oldBook) {
            return res.status(404).send("Book not found");
        }

        if (oldBook.author_id !== req.user.user_id) {
            return res.status(401).send("This book is relared to another author");
        }

        req.book = oldBook;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = isBookAuthor;
```

After we created middleware we now can update our delete route to guard it:
```js
const isBookAuthor = require("./middleware/isBookAuthor");

const bootstrap = async () => {
    ...
    app.delete('/api/books/:bookId', isAuthor, isBookAuthor, async (req, res) => {
        try {
            const { bookId } = req.params;

            await Book.deleteOne({
                _id: bookId
            });

            res.status(204).send("Book deleted successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    });
}
```

As you can see, this approach is different from RBAC. It was example of ABAC (attribute base access control) authorization strategy where book is subject and author_id is attribute to validate.