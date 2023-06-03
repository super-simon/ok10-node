"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", (_req, res) => {
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
