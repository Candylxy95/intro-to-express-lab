const express = require("express");
const validator = require("validator");

const app = express();

app.listen(3000, () => console.log(`listening on port 3000`));

app.get("/greetings/:name", (req, res) => {
  res.send(`<h1>Hello there, ${req.params.name}</h1>`);
});

app.get("/roll/:number", (req, res) => {
  validator.isNumeric(req.params.number)
    ? res.send(`<h1>You rolled a ${req.params.number}</h1>`)
    : res.send(`<h1>You must specify a number.</h1>`);
});

app.get("/collectibles/:id", (req, res) => {
  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];
  res.send(
    `<h1>So you want the ${collectibles[req.params.id].name}? For ${
      collectibles[req.params.id].price
    }, it can be yours!</h1>`
  );
});

app.get("/shoes", (req, res) => {
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
  ];

  const minPrice = req.query["min-price"] || 0;
  const maxPrice = req.query["max-price"] || Infinity;
  const type = req.query.type;
  const filteredPrice = shoes.filter(
    (shoe) =>
      (shoe.price >= minPrice &&
        shoe.price <= maxPrice &&
        shoe.type === type) ||
      shoe
  );
  res.send(filteredPrice);
});
