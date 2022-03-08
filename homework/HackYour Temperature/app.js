import express from "express";
import keys from "./sources/keys.js";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  let cityName = req.body.cityName;
  if (!cityName) {
    res.status(400).json({ weatherText: "City is not found!" });
    return;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${keys.API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      const temp = data.main.temp;
      return res.status(200).json({ weatherText: `${cityName}: ${temp} °C!` });
    } else {
      res.status(400).json({ message: "Error" });
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

export default app;
