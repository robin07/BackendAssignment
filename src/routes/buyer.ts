import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";

const buyerRouter = Router();

//Get a list of all sellers
buyerRouter.get(
  "/list_sellers",
  authMiddleware,
  (req: Request, res: Response) => {}
);

//Get the catalog of seller by seller_id
buyerRouter.get(
  "/seller_catalog/:seller_id",
  authMiddleware,
  (req: Request, res: Response) => {}
);

//Send a list of item to create an order for seller with id=seller_id
buyerRouter.post(
  "/create-order/:seller_id",
  authMiddleware,
  (req: Request, res: Response) => {}
);

export { buyerRouter };
