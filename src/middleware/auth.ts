import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtPayload } from "../interfaces/interface";

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  const words = token?.split(" ");
  const jwtToken = words?.length ? words[1] : "";
  const decodedValue = jwt.verify(
    jwtToken,
    `${process.env.JWT_SECRET}`
  ) as unknown as jwtPayload;

  if (decodedValue.username && decodedValue.role) {
    req.username = decodedValue.username;
    req.userType = decodedValue.role;
    next();
  } else {
    res.status(403).json({
      msg: "You are not authenticated",
    });
  }
}
