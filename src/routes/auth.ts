import { Router, Request, Response } from "express";
import { User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, userType } = req.body;

    //check if user exists
    const userExists = await User.findOne({
      username,
    });

    if (userExists) {
      return res
        .status(400)
        .send("Email is already associated with an account");
    }

    await User.create({
      username,
      password: await bcrypt.hash(password, 15),
      userType,
    });

    return res.status(200).send("Registration Successful");
  } catch (err) {
    return res.status(401).send("Error in registering user");
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    //check if user exists
    const userExists = await User.findOne({
      username,
    });

    if (!userExists) {
      return res.status(404).send("username does not found");
    }

    //Verify password
    const passwordValid = await bcrypt.compare(
      password,
      userExists?.password as string
    );
    if (!passwordValid) {
      return res
        .status(404)
        .send("Incorrect username and password combination");
    }

    //Authenticate user with jwt
    const token = jwt.sign(
      { username, role: userExists.userType },
      `${process.env.JWT_SECRET}`
    );
    res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err, "error");
    return res.status(401).send("Error in Sign in");
  }
});

export default authRouter;
