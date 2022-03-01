import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
