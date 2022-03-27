import express from "express";
import MensajeDaoMongoDb from "../daos/messages.js";
import { normalize, schema, denormalize } from "normalizr";

const messageRoute = express.Router();
const container = new MensajeDaoMongoDb();

const user = new schema.Entity("user", {}, { idAttribute: "email" });
const message = new schema.Entity("message", { author: user }, { idAttribute: "_id" });

messageRoute.get("/", async (req, res) => {
  let messages = await container.findAll();
  const messagesString = JSON.stringify(messages);
  messages = await JSON.parse(messagesString);

  const normalizedData = normalize(messages, [message]);
  const denormalizedData = await denormalize(
    normalizedData.result,
    [message],
    normalizedData.entities
  );

  //console.log(denormalizedData);

   console.log("Longitud objeto original: ", JSON.stringify(messages).length);
  console.log(
    "Longitud objeto normalizado: ",
    JSON.stringify(normalizedData).length
  );
  console.log(
    "Longitud objeto desnormalizado: ",
    JSON.stringify(denormalizedData).length
  ); 

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
