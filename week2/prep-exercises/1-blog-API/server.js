const express = require("express");
const app = express();
const fs = require("fs");

// YOUR CODE GOES IN HERE
app.use(express.json());
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  // How to get the title and content from the request??
  const title = req.body.title;
  const content = req.body.content;
  fs.writeFileSync(title, content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  // How to get the title and content from the request?
  const title = req.params.title;
  const content = req.body.content;
  // What if the request does not have a title and/or content?
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    // Send response with error message
    res.status(400).send({ message: "This post does not exist!" });
  }
});

app.delete("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  if (fs.existsSync(title)) {
    // Add condition here
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    // Respond with message here
    res.status(400).send({ message: "This post does not exist!" });
  }
});

// Getting All Posts

app.get("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  // check if post exists
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.send(post);
  } else {
    // Send response with error message
    res.status(400).send({ message: "This post does not exist!" });
  }
  // send response
});

app.listen(3000);
