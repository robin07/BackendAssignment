import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { User } from "../db";

const buyerRouter = Router();

//Get a list of all sellers
buyerRouter.get(
  "/list_sellers",
  authMiddleware,
  async (req: Request, res: Response) => {
    const allSellers = await User.find({ userType: "seller" }, { username: 1 });
    res.status(200).json({
      data: allSellers,
    });
  }
);

//Get the catalog of seller by seller_id
buyerRouter.get(
  "/seller_catalog/:seller_id",
  authMiddleware,
  async(req: Request, res: Response) => {
    
  }
);

//Send a list of item to create an order for seller with id=seller_id
buyerRouter.post(
  "/create-order/:seller_id",
  authMiddleware,
  (req: Request, res: Response) => {}
);

export { buyerRouter };
