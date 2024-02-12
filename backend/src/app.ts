import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { Client } from "pg";
import cors from "cors";
import routes from "./routes";

//For env File
dotenv.config();

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.options("*", cors());
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 8000;

//For Postgres
export const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is Fired at http://localhost:${port}`);
});
