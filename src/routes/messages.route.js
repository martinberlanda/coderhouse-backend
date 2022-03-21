import express from "express";
import MensajeDaoMongoDb from "../daos/messages.js";
import { normalize, schema } from "normalizr";

const user = new schema.Entity("users", {
  id: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: String, required: true },
  avatar: { type: String, required: true },
  alias: { type: String, required: true },
});

const message = new schema.Entity("messages", {
  user: { type: user, required: true },
  message: { type: String, required: true },
  id: { type: String, required: true },
  _id: { type: String, required: true },
  __v: { type: String, required: true },
});

const messageRoute = express.Router();

const container = new MensajeDaoMongoDb();

messageRoute.get("/", async (req, res) => {
  const messages = await container.findAll();
  const normalizedData = normalize(messages, [message]);
  res.status(200).json(normalizedData);
});

messageRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).json(await container.findOne(id));
});

messageRoute.post("/", async (req, res) => {
  const item = req.body;
  res.status(200).json(await container.createOne(item));
});

messageRoute.post("/:id", async (req, res) => {
  const id = req.params.id;
  const item = req.body;
  res.status(200).json(await container.updateOne(id, item));
});

messageRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).json(await container.deleteOne(id));
});

messageRoute.delete("/", async (req, res) => {
  res.status(200).json(await container.deleteAll());
});

export default messageRoute;
