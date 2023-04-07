import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";

import { connectDb, disconnectDB } from "./config/database";

import {
  usersRouter
} from "./routers/users-router";

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/users", usersRouter)

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;