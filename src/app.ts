//EXPRESS
import express from "express";
import { Request, Response } from "express";

import { sayHelloFunc } from "./helper";

console.log(sayHelloFunc());

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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (_req: Request, res: Response) => {
  res.status(200).json(users);
});

app.get("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  res.status(200).json(users[+userId - 1]);
});

app.post("/users", (req: Request, res: Response) => {
  users.push(req.body);
  res.status(201).json({ message: "User created" });
});

app.put("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  users[+userId - 1] = req.body;

  res.status(200).json({
    message: "User updated",
    data: users[+userId - 1],
  });
});

app.delete("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  users.splice(+userId - 1, 1);

  res.status(200).json({ message: "User deleted" });
});

const PORT = 5100;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
