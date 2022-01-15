const express = require("express");
const cors = require("cors");
const fortunesList = require('./db.json');

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];
  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});


app.get("/api/fortunes", (req, res) => {
  //console.log(fortunesList);
  let randomIndex = Math.floor(Math.random() * fortunesList.length);
  let randomFortune = fortunesList[randomIndex].fortune;
  res.status(200).send(randomFortune);
})

app.get("/api/allfortunes", (req, res) => {
  //console.log(fortunesList);
  let newArray = [];
  for (let i = 0; i < fortunesList.length; i++){
    newArray.push(fortunesList[i].fortune);
  }
  //console.log(newArray);
  //let fortunesString = newArray.join("  /  ");
  res.status(200).send(newArray);
})

app.post("/api/fortunes", (req, res) => {
  //console.log(req.body);
  let{fortune} = req.body;
  let newArray = [];
  //console.log(fortune);

  let newFortune = {
    fortune
  }

  //console.log(newFortune);
  fortunesList.push(newFortune);
  console.log(fortunesList);

  for (let i = 0; i < fortunesList.length; i++){
    newArray.push(fortunesList[i]);
  }
  res.status(200).send(newArray);
})

app.delete("/api/fortunes/:index", (req, res) => {
  //console.log(fortunesList);
  let {index} = req.params;
  //console.log(index);
  let newArray = [];
    fortunesList.splice(index, 1);
    for (let i = 0; i < fortunesList.length; i++){
      newArray.push(fortunesList[i]);
    }
    res.status(200).send(newArray);
})

app.put("/api/fortunes/:index", (req, res) => {
  let newArray = [];
  let {index} = req.params;
  let {fortune} = req.body;
  //console.log(index);
  //console.log(fortune);

  fortunesList[index].fortune = fortune;
  console.log(fortunesList[index]);
  for (let i = 0; i < fortunesList.length; i++){
    newArray.push(fortunesList[i]);
  }

  console.log(newArray);
  res.status(200).send(newArray);


})

app.listen(4040, () => console.log("Server running on 4040"));
