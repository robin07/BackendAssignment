import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { Product } from "../db";
import { Catalog } from "../db";

const sellerRouter = Router();

//Retrieve the list of orders recieved by seller
sellerRouter.get("/orders", authMiddleware, (req: any, res: Response) => {
  res.status(200).json({
    msg: "hey",
  });
});

//Send a list of items to create catalog for seller
sellerRouter.post(
  "/create_catalog/:seller_id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const items = req.body;
    if (items.length > 0) {
      try {
        const promiseResult = await Promise.all(
          items.map(async (item: { name: string; price: number }) => {
            const product = await Product.create({
              name: item.name,
              price: item.price,
            });
            return await Catalog.create({
              sellerId: req?.params?.seller_id,
              productId: product?._id,
            });
          })
        );
        res.status(200).json({
          data: promiseResult,
        });
      } catch (err) {
        res.status(500).json({
          msg: `Error is ${err}`,
        });
      }
    }
    res.status(200).json({
      message: "No items have been sent",
    });
  }
);

export { sellerRouter };
