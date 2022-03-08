/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */
import express from "express";
import fetch from "node-fetch";

function printChuckNorrisJoke() {
  const app = express();
  app.get("/", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.icndb.com/jokes/random/?firstName=John&lastName=Doe"
      );
      const data = await response.json();
      console.log(data);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  });
  const port = 3000;
  app.listen(port, () => console.log(`listening on port: ${port}`));
}

printChuckNorrisJoke();
