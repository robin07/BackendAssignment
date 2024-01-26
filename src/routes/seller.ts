import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";

const sellerRouter = Router();

//Retrieve the list of orders recieved by seller
sellerRouter.get(
  "/orders",
  authMiddleware,
  (req: Request, res: Response) => {}
);

//Send a list of items to create catalog for seller
sellerRouter.post(
  "/create_catalog",
  authMiddleware,
  (req: Request, res: Response) => {}
);

export { sellerRouter };
