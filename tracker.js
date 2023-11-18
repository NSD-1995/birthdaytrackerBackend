const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const date = new Date();

const app = express();

const User = require("./list_schema");

let port = 3001;

mongoose.connect("mongodb://localhost:27017/birthdayList");

app.use(express.json());

app.use(cors());

let newArray = [];

app.post("/list", async (req, res) => {
  let output = await User.findOne({ firstName: req.body.firstName }).exec();
  let Output1 = await User.findOne({ lastName: req.body.lastName }).exec();
  if (output === null) {
    if (Output1 === null) {
      let data = new User(req.body);
      const result = await data.save();
      res.status(200).send("Event Added");
    } else {
      res.status(404).send("SecondName  should be unique");
    }
  } else {
    res.status(404).send("FirstName  should be unique");
  }
});

app.get("/", async (req, res) => {
  const result = await User.find({});
  let sorting = result.sort(function (a, b) {
    return a.birthDate.getMonth() - b.birthDate.getMonth();
  });

  let current = new Date().getMonth() + 1;

  let currentdate = new Date().getDate();

  let newSortingArray = [];

  for (let i = 0; i < sorting.length; i++) {
    if (current <= sorting[i].birthDate.getMonth() + 1) {
      if (currentdate <= sorting[i].birthDate.getDate()) {
        newSortingArray.push(sorting[i]);
      }
    }
  }

  let arrayreverse = newSortingArray.reverse();

  let FinalArray = [...arrayreverse, ...sorting];

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  let output = removeDuplicates(FinalArray);

  res.send(output);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
