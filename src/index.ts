import express, { Express } from "express";
import bodyParser from "body-parser";
import { buyerRouter } from "./routes/buyer";
import { sellerRouter } from "./routes/seller";
import authRouter from "./routes/auth";

const app: Express = express();

app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/seller", sellerRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("running on 3000");
});
