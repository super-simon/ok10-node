"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./configs/config");
const User_model_1 = require("./models/User.model");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/users", async (_req, res) => {
    try {
        const users = await User_model_1.User.find().select("-password");
        return res.json(users);
    }
    catch (e) {
        console.log(e);
    }
});
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User_model_1.User.findById(req.params.id);
        res.json(user);
    }
    catch (e) {
        console.log(e);
    }
});
app.post("/users", async (req, res) => {
    try {
        const createdUser = await User_model_1.User.create(req.body);
        return res.status(201).json(createdUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User_model_1.User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
        res.json(updatedUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.delete("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User_model_1.User.findByIdAndDelete(req.params.id);
        res.json(updatedUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(config_1.configs.PORT, () => {
    mongoose_1.default.connect(config_1.configs.DB_URL);
    console.log(`Server has started on port ${config_1.configs.PORT}`);
});
