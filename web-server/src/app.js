const path = require("path");
const express = require("express");
const { geocode, forecast } = require("./utils/utils");
//const forecast = require("./utils/forecast");
var cors = require("cors");

const app = express();
app.use(cors());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  console.log(req.header);
  if (!req.query.address) {
    return res.send("the weather is great!");
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
