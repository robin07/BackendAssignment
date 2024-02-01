import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { Product } from "../db";
import { Order } from "../db";

const sellerRouter = Router();

//Retrieve the list of orders recieved by seller
sellerRouter.get(
  "/orders/:seller_id",
  authMiddleware,
  async (req: any, res: Response) => {
    try {
      const orders = await Order.find(
        {
          sellerId: req?.params?.seller_id,
        },
        { sellerId: 0, orderedBy: 0 }
      ).populate("productId", "name price");
      res.status(200).json({
        data: orders,
      });
    } catch (err) {
      res.status(500).json({
        msg: `Error is ${err}`,
      });
    }
  }
);

//Send a list of items to create catalog for seller
sellerRouter.post(
  "/create_catalog",
  authMiddleware,
  async (req: Request, res: Response) => {
    const items = req.body;
    try {
      items.map(
        async (item: { name: string; price: number; sellerId: string }) => {
          const catalog = await Product.create({
            sellerId: item?.sellerId,
            name: item?.name,
            price: item?.price,
          });
          return catalog;
        }
      );
      res.status(200).json({
        message: "Catalog Created Successfully",
      });
    } catch (err) {
      res.status(500).json({
        msg: `Error is ${err}`,
      });
    }
  }
);

export { sellerRouter };
