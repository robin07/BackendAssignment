import mongoose from "mongoose";
import { Role } from "./constants";

mongoose.connect(`${process.env.MONGODB_URI}`);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  userType: Role,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const CatalogSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const OrderSchema = new mongoose.Schema({
  orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

export const User = mongoose.model("User", UserSchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Catalog = mongoose.model("Catalog", CatalogSchema);
export const Order = mongoose.model("Order", OrderSchema);
