import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { User } from "../db";
import { Product } from "../db";
import { Order } from "../db";

const buyerRouter = Router();

//Get a list of all sellers
buyerRouter.get(
  "/list_sellers",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const allSellers = await User.find(
        { userType: "seller" },
        { username: 1 }
      );
      res.status(200).json({
        data: allSellers,
      });
    } catch (err) {
      res.status(500).json({
        msg: `Error is ${err}`,
      });
    }
  }
);

//Get the catalog of seller by seller_id
buyerRouter.get(
  "/seller_catalog/:seller_id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const sellerCatalog = await Product.find(
        {
          sellerId: req?.params?.seller_id,
        },
        { name: 1, price: 1 }
      );
      res.status(200).json({
        data: sellerCatalog,
      });
    } catch (err) {
      res.status(500).json({
        msg: `Error is ${err}`,
      });
    }
  }
);

//Send a list of item to create an order for seller with id=seller_id
buyerRouter.post(
  "/create-order/:seller_id",
  authMiddleware,
  async (req: any, res: Response) => {
    // send list of items refers to send product ids
    const itemsList = req.body;
    try {
      if (req.userType === "buyer") {
        itemsList.forEach(
          async (item: { orderedBy: string; productId: string }) => {
            await Order.create({
              orderedBy: item?.orderedBy,
              sellerId: req?.params?.seller_id,
              productId: item?.productId,
            });
          }
        );
        res.status(200).json({ message: "Order Created Successfully" });
      } else {
        res.status(403).json({
          message: "Role must be buyer",
        });
      }
    } catch (err) {
      res.status(500).json({
        msg: `Error is ${err}`,
      });
    }
  }
);

export { buyerRouter };
