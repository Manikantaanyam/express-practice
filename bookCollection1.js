const exp = require("express");
const app = exp();
let book = [
  {
    title: "Power",
    author: "Robert Greene",
    status: false,
  },
  {
    title: "Power1",
    author: "Robert Greene1",
    status: false,
  },
];

app.use(exp.json());

app.get("/", (req, res) => {
  if (book.length == 0) {
    res.json({
      message: "No books in the collection.",
      books: [],
    });
  } else {
    const numberOfBooks = book.length;
    let readBooks = 0;
    for (let i = 0; i < book.length; i++) {
      if (book[i].status) {
        readBooks++;
      }
    }
    const unreadBooks = numberOfBooks - readBooks;
    res.json({
      numberOfBooks,
      readBooks,
      unreadBooks,
    });
  }
});

app.post("/", (req, res) => {
  const { title: title, author: author, status } = req.body;

  if (!title || !author || typeof status !== "boolean") {
    return res.status(400).json({
      error:
        "Invalid input. Title, author are required, and status must be true or false.",
    });
  }
  book.push({
    title,
    author,
    status,
  });
  res.json({ msg: "done" });
});

app.put("/", (req, res) => {
  const booklength = book.length;
  let updated = false;
  for (let i = 0; i < book.length; i++) {
    if (!book[i].status) {
      book[i].status = true;
      updated = true;
    }
  }

  if (updated) {
    res.json({
      message: "All books marked as read.",
    });
  } else {
    return res.json({
      message: "All books are already marked as read.",
    });
  }
});

app.delete("/", (req, res) => {
  const initialLength = book.length;
  const book1 = book.filter((b) => !b.status);
  if (book1.length === initialLength) {
    return res.json({
      message: "No read books to delete.",
    });
  } else {
    const unreadArr = [];
    let updated1 = false;
    for (let i = 0; i < book.length; i++) {
      if (!book[i].status) {
        unreadArr.push(book[i]);
        updated1 = true;
      }
    }
    book = unreadArr;

    res.json({
      message: "All read books have been removed.",
    });
  }
});

app.listen(4000);
