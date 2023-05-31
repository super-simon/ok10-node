//EVENTS

const events = require("node:events");

const eventEmitter = new events();

eventEmitter.on("click", () => {
  console.log("click click click");
});

eventEmitter.emit("click", { data: "hello" });
eventEmitter.emit("click");
eventEmitter.emit("click");
eventEmitter.emit("click");
eventEmitter.emit("click");

eventEmitter.once("clickAndDie", () => {
  console.log("Clicked and died.");
});

console.log(eventEmitter.eventNames());

eventEmitter.emit("clickAndDie");
eventEmitter.emit("clickAndDie");
eventEmitter.emit("clickAndDie");

console.log(eventEmitter.eventNames());

//STREAMS
const fs = require("fs");
const path = require("path");

const readStream = fs.createReadStream(
  "myrnyy-panas-khiba-revut-voly-iak-iasla-povni.html",
  { highWaterMark: 128 * 1024 }
);

const writeStream = fs.createWriteStream("test2.html");

// readStream.on("data", (chank) => {
//   writeStream.write(chank);
// });

readStream
  .on("error", (err) => {
    console.log(err);
    readStream.destroy();
    writeStream.end("ERROR ON READING FILE");
  })
  .pipe(writeStream);

//EXPRESS

const users = [
  {
    name: "Oleksandr",
    age: 38,
    gender: "male",
  },
  {
    name: "Stepan",
    age: 39,
    gender: "male",
  },
  {
    name: "Andriy",
    age: 40,
    gender: "male",
  },
  {
    name: "Viktor",
    age: 41,
    gender: "male",
  },
  {
    name: "Kateryna",
    age: 35,
    gender: "female",
  },
];

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  res.status(200).json(users[+userId - 1]);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).json({ message: "User created" });
});

app.put("/users/:userId", (req, res) => {
  const { userId } = req.params;
  users[+userId - 1] = req.body;

  res.status(200).json({
    message: "User updated",
    data: users[+userId - 1],
  });
});

app.delete("/users/:userId", (req, res) => {
  const { userId } = req.params;
  users.splice(+userId - 1, 1);

  res.status(200).json({ message: "User deleted" });
});

const PORT = 5100;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
