import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello robin here");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("running on 3000");
});
